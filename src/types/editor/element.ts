interface Color {
  rgb: [number, number, number];
  alpha: string;
}

interface Border {
  size: number;
  color: Color;
}

interface Position {
  x: number;
  y: number;
}

interface Radius {
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
}

interface BaseElement {
  type: string;
  name: string;
  position: Position;
  width: number;
  height: number;
  background: Color;
  border?: Border;
  startMS?: number;
  endMs?: number;
}

interface Shape extends BaseElement {
  type: "SHAPE";
  radius: Radius;
}

interface Midi extends BaseElement {
  type: "MIDI";
  animation: "sep4" | "sep4" | "sep8" | "scroll";
  shape: Shape;
}

interface Text extends BaseElement {
  type: "TEXT";
  text: string;
  color: Color;
  size: number;
  font?: string;
}

export type Element = Shape | Midi | Text;
