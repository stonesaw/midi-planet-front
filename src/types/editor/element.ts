import { MidiJSON } from "@tonejs/midi";
import p5Types from "p5";

export interface Color {
  rgb: [number, number, number]; // 0-255
  alpha: number; // 0 to 255
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
  type?: string;
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

export interface IText extends IBaseElement {
  type: "TEXT";
  text: string;
  color: Color;
  size: number;
  font?: string;
}

export type Element = IShape | IMIDI | IText;
