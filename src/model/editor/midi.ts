import { MidiJSON } from "@tonejs/midi";
import { NoteJSON } from "@tonejs/midi/dist/Note";
import p5Types from "p5";

import { BaseElement } from "./baseElement";
import Shape from "./shape";

import { Color, Duration, IMIDI } from "@/types/editor/element";

class MIDI extends BaseElement implements IMIDI {
  type!: "MIDI";
  midi: MidiJSON;
  animation: "sep2" | "sep4" | "sep8" | "scroll"; // TODO: scroll
  shape: Shape;

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
    }
  ) {
    super(id, name, x, y, width, height, background, option?.duration);
    this.type = "MIDI";
    this.midi = midi;
    this.animation = animation;
    this.shape = shape;
  }

  draw(p5: p5Types, currentTimeMs: number, currentBeat: number) {
    if (!this.isDraw(currentTimeMs)) {
      return;
    }

    p5.noStroke();

    // draw background
    p5.fill(p5.color(...this.background.rgb, this.background.alpha * 2.55));
    p5.rect(
      this.toRealX(p5, this.x),
      this.toRealY(p5, this.y),
      this.toRealX(p5, this.width),
      this.toRealY(p5, this.height)
    );

    // draw midi
    const ppq = this.midi.header.ppq;
    const notes = this.midi.tracks[0].notes;

    if (this.shape.border) {
      p5.stroke(
        p5.color(
          ...this.shape.border.color.rgb,
          this.shape.border.color.alpha * 2.55
        )
      );
    } else {
      p5.noStroke();
    }

    p5.fill(
      p5.color(...this.shape.background.rgb, this.shape.background.alpha * 2.55)
    );
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
