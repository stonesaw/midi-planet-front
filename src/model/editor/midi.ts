import { MidiJSON } from "@tonejs/midi";
import { NoteJSON } from "@tonejs/midi/dist/Note";
import p5Types from "p5";

import { BasicObject, Duration } from "./basicObject";
import Shape from "./shape";

interface ShapeBorder {
  size: number;
  color: string;
}

class MIDI extends BasicObject {
  midi: MidiJSON;
  animation: "sep2" | "sep4" | "sep8" | "scroll";
  shape: Shape;
  width: number;
  height: number;
  background: [number, number, number]; // [r, g, b] r,g,b = (0-255),
  alpha: number; // 0-100
  radius?: number[]; // [all] | [top-left, top-right, bottom-right, bottom-left]
  border?: ShapeBorder;

  constructor(
    midi: MidiJSON,
    animation: "sep2" | "sep4" | "sep8" | "scroll",
    x: number,
    y: number,
    width: number,
    height: number,
    background: string | [number, number, number],
    shape: Shape,
    option?: {
      alpha?: number;
      radius?: number[];
      border?: ShapeBorder;
      duration?: Duration;
    }
  ) {
    super(x, y, option?.duration);
    this.midi = midi;
    this.animation = animation;
    this.shape = shape;
    this.width = width;
    this.height = height;

    if (typeof background == "string") {
      this.background = this.hex2rgb(background);
    } else {
      this.background = background;
    }
    if (typeof option?.alpha == "number") {
      this.alpha = option?.alpha;
    } else {
      this.alpha = 100;
    }
    this.radius = option?.radius;
    this.border = option?.border;
  }

  draw(p5: p5Types, currentTimeMs: number, currentBeat: number) {
    if (!this.isDraw(currentTimeMs)) {
      return;
    }

    // draw background
    if (this.border) {
      p5.stroke(p5.color(this.border.color));
    } else {
      p5.noStroke();
    }

    p5.print(this.alpha);

    p5.fill(p5.color(...this.background, Math.floor(this.alpha * 2.55)));
    p5.rect(
      this.toRealX(p5, this.x),
      this.toRealY(p5, this.y),
      this.toRealX(p5, this.width),
      this.toRealY(p5, this.height),
      ...(this.radius ? this.radius : [0])
    );

    // draw midi
    const ppq = this.midi.header.ppq;
    const notes = this.midi.tracks[0].notes;

    if (this.shape.border) {
      p5.stroke(p5.color(this.shape.border.color));
    } else {
      p5.noStroke();
    }

    p5.fill(p5.color(this.shape.color));
    for (let i = 0; i < notes.length; i++) {
      const note: NoteJSON = notes[i];
      const noteBeat = note.ticks / ppq;
      const noteWidthPerBeat = note.durationTicks / ppq;

      if (this.animation == "scroll") {
        return;
      }

      let sep;
      switch (this.animation) {
        case "sep2":
          sep = 2;
          break;
        case "sep4":
          sep = 4;
          break;
        case "sep8":
          sep = 8;
          break;
        default:
          console.log("error");
          return;
      }

      if (Math.floor(noteBeat / sep) == Math.floor(currentBeat / sep)) {
        // note.midi C3 is 48
        p5.rect(
          this.toRealX(p5, this.x + (this.width / sep) * (noteBeat % sep)),
          this.toRealY(
            p5,
            this.y + this.height - (note.midi - 48 + 1) * this.shape.height
          ),
          this.toRealX(p5, (this.width / sep) * noteWidthPerBeat),
          this.toRealY(p5, this.shape.height)
        );
      }
    }
  }
}

export default MIDI;
