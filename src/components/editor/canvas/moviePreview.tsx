import { NoteJSON } from "@tonejs/midi/dist/Note";
import dynamic from "next/dynamic";
import p5Types from "p5";
import { useState } from "react";

import { floorAt, toMinutes } from "@/libs/utils";
import Shape from "@/model/editor/shape";
import { useEditor } from "@/providers/editor";

const Sketch = dynamic(import("react-p5"), {
  ssr: false,
});

let currentTime = 0; // 経過時間 (ミリ秒)
let beforeTime = 0; // 1フレーム前のミリ秒
let beforePlayed = false; // 再生イベントを発火するために使う
let startTime = 0;
let fps = 0;
let bpm = 0;
let beats: number[] = [0, 0];
let ppq = 0; // 4分音符あたりのtick数 Pulses per quarter note
let notes: NoteJSON[] = [];
const offsetX = 0; // MIDI表示開始位置
const offsetY = 300; // MIDI表示開始位置
const noteWidth = 40; // 4分音符の横幅
const noteHeight = 10; // 4分音符音符の高さ

// TODO: use Context
const shapes = [
  new Shape(640, 360, 100, 50, "#123456"),
  new Shape(540, 260, 60, 50, "#123456", { radius: [10] }),
  new Shape(640, 260, 60, 50, "#123456", { radius: [25] }),
  new Shape(100, 200, 100, 50, "#eee", { border: { size: 1, color: "#000" } }),
  new Shape(100, 300, 100, 50, [255, 100, 100], {
    alpha: 50,
    radius: [10],
    border: { size: 1, color: "#fff" },
  }),
  new Shape(130, 330, 100, 50, [100, 255, 100], {
    alpha: 50,
    radius: [10],
    border: { size: 1, color: "#fff" },
  }),
  new Shape(130, 500, 60, 30, [100, 255, 100]),
];

interface Props {
  maxSize: {
    width: number;
    height: number;
  };
}

export const MoviePreview = ({ maxSize }: Props) => {
  const { midi, audioState } = useEditor();

  const [timer, setTimer] = useState<number>(0); // 再生時間 (ミリ秒)
  const [beatCounter, setBeatCounter] = useState<number>(0); // 拍子のカウント

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(100, 100).parent(canvasParentRef);
    windowResized(p5);
    p5.print(p5.windowWidth);
    p5.print(p5.windowHeight);
    p5.noStroke();
  };

  const draw = (p5: p5Types) => {
    // reset window
    p5.clear();
    p5.noStroke();
    p5.fill(p5.color("#ffffff"));

    // update process
    beforeTime = currentTime;
    currentTime = p5.millis();
    fps = 1.0 / ((currentTime - beforeTime) / 1000);

    // timer
    if ((audioState === "play") !== beforePlayed) {
      if (audioState === "play") {
        // p5.print("start! (0)");
        startTime = currentTime;
        (currentTime - startTime) / 1000;
      } else {
        // p5.print(`stop! (${floorAt(timer / 1000, 0.01)})`);
      }
    }

    beforePlayed = audioState === "play";

    if (audioState === "play") {
      setTimer(currentTime - startTime);
      if (midi) {
        setBeatCounter(Math.floor((timer / 1000) * (bpm / 60)));
      }
    }

    // draw background
    p5.fill(p5.color("#ffffff"));
    p5.rect(0, 0, p5.width, p5.height);

    // draw shapes
    shapes.forEach((shape) => shape.draw(p5, currentTime));

    // draw midi
    if (midi) {
      bpm = midi.header.tempos[0].bpm;
      beats = midi.header.timeSignatures[0].timeSignature;
      ppq = midi.header.ppq;
      notes = midi.tracks[0].notes;

      for (let i = 0; i < notes.length; i++) {
        const note: NoteJSON = notes[i];
        // note.midi C3 is 48
        p5.fill(p5.color("#5BE8FD"));
        p5.rect(
          offsetX + (noteWidth * note.ticks) / ppq,
          offsetY - (note.midi - 48) * noteHeight,
          (noteWidth * note.durationTicks) / ppq - 1,
          noteHeight - 1
        );
      }

      // debug log
      p5.fill(p5.color("#000"));
      p5.noStroke();
      p5.textSize(16);
      p5.text(`midi loaded (${notes.length} notes)`, 200, 16);
      p5.text(`bpm: ${bpm}`, 200, 32);
      p5.text(`beat: ${beats[0]}/${beats[1]}`, 200, 48);
    }

    // debag log
    p5.fill(p5.color("#000000"));
    p5.textSize(16);
    p5.noStroke();
    p5.text("passed: " + toMinutes(p5.millis()), 0, 16);
    p5.text(`FPS: ${floorAt(fps, 0.1)}`, 0, 32);
    p5.text(`a: ${audioState}`, 0, 150);
    p5.text(`played: ${audioState === "play"}`, 0, 48);
    p5.text(`timer: ${floorAt(timer / 1000, 0.01)}`, 0, 64);
    p5.text(
      `beat: ${beatCounter} ${
        midi ? "!".repeat((beatCounter % 4) + 1) : " (please import midi)"
      }`,
      0,
      80
    );
  };

  const windowResized = (p5: p5Types) => {
    const ASPECT_RATIO = 16 / 9;
    const parentWidth = maxSize.width;
    const parentHeight = maxSize.height;

    if (parentWidth / parentHeight > ASPECT_RATIO) {
      // 横長だったとき
      p5.resizeCanvas(parentHeight * ASPECT_RATIO, parentHeight);
    } else {
      // 縦長だったとき
      p5.resizeCanvas(parentWidth, parentWidth / ASPECT_RATIO);
    }
  };

  return (
    <Sketch
      //   preload={preload}
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    />
  );
};

export default MoviePreview;
