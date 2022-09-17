import { MidiJSON } from "@tonejs/midi";
import { NoteJSON } from "@tonejs/midi/dist/Note";
import p5Types from "p5";

import { BaseElement } from "./baseElement";
import Shape from "./shape";

import { toP5Radius } from "@/libs/utils";
import { Border, Color, Duration, IMIDI, Radius } from "@/types/editor/element";

class MIDI extends BaseElement implements IMIDI {
  type!: "MIDI";
  midi: MidiJSON;
  animation: "sep2" | "sep4" | "sep8" | "scroll"; // TODO: scroll
  shape: Shape;
  radius?: Radius;
  border?: Border;

  // MEMO
  // shape.x: note offset x (px)
  // shape.y: note offset y (px)
  // shape.width: 0-100 note width (%)
  // shape.height: note height (px)

  constructor(
    id: number,
    name: string,
    midi: MidiJSON,
    animation: "sep2" | "sep4" | "sep8" | "scroll",
    x: number,
    y: number,
    width: number,
    height: number,
    background: Color,
    shape: Shape,
    option?: {
      duration?: Duration;
      radius?: Radius;
      border?: Border;
    }
  ) {
    super(id, name, x, y, width, height, background, option?.duration);
    this.type = "MIDI";
    this.midi = midi;
    this.animation = animation;
    this.shape = shape;
    this.radius = option?.radius;
    this.border = option?.border;
  }

  draw(p5: p5Types, currentTimeMs: number, currentBeat: number) {
    if (!this.isDraw(currentTimeMs)) return;

    // draw background
    this.drawBorder(p5, this.border);
    p5.fill(p5.color(...this.background.rgb, this.background.alpha * 2.55));
    p5.rect(
      this.toRealX(p5, this.x),
      this.toRealY(p5, this.y),
      this.toRealX(p5, this.width),
      this.toRealY(p5, this.height),
      ...toP5Radius(this.radius)
    );

    // draw midi
    const ppq = this.midi.header.ppq;
    const notes = this.midi.tracks[0].notes;

    this.drawBorder(p5, this.shape.border);

    p5.fill(this.toP5Color(p5, this.shape.background));
    for (let i = 0; i < notes.length; i++) {
      const note: NoteJSON = notes[i];
      const noteBeat = note.ticks / ppq;
      const noteWidthPerBeat = note.durationTicks / ppq;

      p5.textSize(16);
      if (this.animation == "scroll") {
        p5.text("TODO: scroll", 0, 100);
        // return;
      }

      let sep; // 何小節のページングか
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
          return;
      }

      // is draw
      if (Math.floor(noteBeat / sep) == Math.floor(currentBeat / sep)) {
        // note.midi C3 is 48
        p5.rect(
          this.toRealX(
            p5,
            this.x + this.shape.x + (this.width / sep) * (noteBeat % sep)
          ),
          this.toRealY(
            p5,
            this.y +
              this.shape.y +
              this.height -
              (note.midi - 48 + 1) * this.shape.height
          ),
          this.toRealX(
            p5,
            (this.width / sep) * noteWidthPerBeat * (this.shape.width / 100)
          ),
          this.toRealY(p5, this.shape.height),
          ...toP5Radius(this.shape.radius)
        );
      }
    }
  }

  drawBorder(p5: p5Types, border?: Border) {
    if (border) {
      p5.stroke(this.toP5Color(p5, border.color));
      p5.strokeWeight(this.toRealX(p5, border.size));
    } else {
      p5.noStroke();
    }
  }
}

export default MIDI;
