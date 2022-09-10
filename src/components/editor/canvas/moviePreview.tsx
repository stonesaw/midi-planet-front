import dynamic from "next/dynamic";
import p5Types from "p5";
import { useState } from "react";

import { floorAt, toMinutes } from "@/libs/utils";
import MIDI from "@/model/editor/midi";
import Shape from "@/model/editor/shape";
import Text from "@/model/editor/text";
import { useEditor } from "@/providers/editor";

const Sketch = dynamic(import("react-p5"), {
  ssr: false,
});

// timer
let currentTime = 0; // 経過時間 (ミリ秒)
let beforeTime = 0; // 1フレーム前のミリ秒
let beforePlayed = false; // 再生イベントを発火するために使う
let startTime = 0;

// canvas
let fps = 0;

// midi
let bpm = 0;

// TODO: use Context

const objects: (Shape | Text | MIDI)[] = [
  new Shape(100, 200, 100, 50, "#eee", {
    radius: [10, 20, 10, 20],
    border: { size: 1, color: "#000" },
  }),
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
  new Shape(130, 500, 60, 30, [100, 255, 100], {
    duration: { startMs: 0, endMs: 1000 },
  }),
  new Shape(130, 500, 60, 30, [100, 255, 100], {
    duration: { startMs: 2000, endMs: 3000 },
  }),
  new Shape(130, 500, 60, 30, [100, 255, 100], { duration: { startMs: 4000 } }),
  new Shape(230, 500, 60, 30, [100, 255, 100], { duration: { endMs: 4000 } }),
  new Shape(600, 60, 640, 100, [0, 255, 255]),
  new Text(604, 54, "Hello, World!", 100, "#0cc"),
  new Text(600, 50, "Hello, World!", 100, "#fff"),
];

interface Props {
  maxSize: {
    width: number;
    height: number;
  };
}

export const MoviePreview = ({ maxSize }: Props) => {
  const { midi, setMidi, audioState } = useEditor();

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
    p5.rectMode(p5.CORNER);
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
      setBeatCounter(Math.floor((timer / 1000) * (bpm / 60)));
    }

    // draw background
    p5.fill(p5.color("#ffffff"));
    p5.rect(0, 0, p5.width, p5.height);

    // draw objects
    objects.forEach((obj) => obj.draw(p5, currentTime, beatCounter));

    p5.textSize(16);
    p5.fill(50);
    p5.text("hello", 200, 100, 100, 100);

    // draw midi
    if (midi) {
      objects.push(
        new MIDI(
          midi,
          "sep8",
          (1280 - 720 * 0.8) / 2,
          720 * 0.1,
          720 * 0.8,
          720 * 0.8,
          "#eee",
          new Shape(0, 0, 0, 10, "#5BE8FD"),
          {
            alpha: 0,
          }
        )
      );
      p5.print("midi");

      bpm = midi.header.tempos[0].bpm;
      setMidi(null);
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
    p5.text(`beat: ${beatCounter} ${"!".repeat((beatCounter % 4) + 1)}`, 0, 80);
    p5.text(`bpm: ${bpm}`, 200, 32);
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
