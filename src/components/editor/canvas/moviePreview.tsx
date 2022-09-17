import dynamic from "next/dynamic";
import p5Types from "p5";
import { useState } from "react";

import { floorAt, toMinutes } from "@/libs/utils";
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

interface Props {
  maxSize: {
    width: number;
    height: number;
  };
}

export const MoviePreview = ({ maxSize }: Props) => {
  const { midi, setMidi, audioState, singleTimeLine } = useEditor();

  const [timer, setTimer] = useState<number>(0); // 再生時間 (ミリ秒)
  const [beatCounter, setBeatCounter] = useState<number>(0); // 拍子のカウント

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(100, 100).parent(canvasParentRef);
    windowResized(p5);
    p5.print(p5.windowWidth);
    p5.print(p5.windowHeight);
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
      // FIXME: 2度目の init になった後に、playするとバグ
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
    singleTimeLine.forEach((elm) => elm.draw(p5, currentTime, beatCounter));

    // draw midi
    if (midi) {
      // TODO: define Provider

      bpm = midi.header.tempos[0].bpm;
      setMidi(null);
    }

    // debag log
    p5.fill(p5.color("#000000"));
    p5.textSize(16);
    p5.noStroke();
    p5.textFont();
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
