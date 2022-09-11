import p5Types from "p5";

export interface Color {
  rgb: [number, number, number]; // 0-255
  alpha: number; // 0 to 255
}

export interface Border {
  size: number;
  color: Color;
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
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  background: Color;
  startMs?: number;
  endMs?: number;
  draw(p5: p5Types, currentTimeMs: number, currentBeat: number): void;
}

export interface IShape extends IBaseElement {
  type: "SHAPE";
  radius?: Radius;
  border?: Border;
}

export interface IMidi extends IBaseElement {
  type: "MIDI";
  animation: "sep2" | "sep4" | "sep8" | "scroll";
  shape: IShape;
}

export interface IText extends IBaseElement {
  type: "TEXT";
  text: string;
  color: Color;
  size: number;
  font?: string;
}

export type Element = IShape | IMidi | IText;
