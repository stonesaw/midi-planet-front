import { MidiJSON } from "@tonejs/midi";
import p5Types from "p5";

export interface Color {
  rgb: [number, number, number]; // 0-255
  alpha: number; // 0 to 100
}

export interface Border {
  size: number;
  color: Color;
}

export interface Duration {
  startMs?: number;
  endMs?: number;
}

export interface Radius {
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
}

export interface IBaseElement {
  id: number;
  type?: string;
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  background: Color;
  duration?: Duration;
  draw(p5: p5Types, currentTimeMs: number, currentBeat: number): void;
}

export interface IShape extends IBaseElement {
  type: "SHAPE";
  radius?: Radius;
  border?: Border;
}

export interface IMIDI extends IBaseElement {
  type: "MIDI";
  animation: "sep2" | "sep4" | "sep8" | "scroll";
  shape: IShape;
  midi: MidiJSON;
  radius?: Radius;
  border?: Border;
}

export const MIDIAnimationTypes = ["sep2", "sep4", "sep8", "scroll"] as const;

export const MIDIAnimationTypesText = {
  sep2: "2小節",
  sep4: "4小節",
  sep8: "8小節",
  scroll: "スクロール",
} as const;

export interface IText extends IBaseElement {
  type: "TEXT";
  text: string;
  color: Color;
  size: number;
  font?: string;
}

export type Element = IShape | IMIDI | IText;
