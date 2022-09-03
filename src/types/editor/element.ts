interface Color {
  rgb: string;
  alpha: string;
}

interface Border {
  size: number;
  color: string;
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
  width: number;
  height: number;
  background: Color;
  border: Border;
  startMS: number;
  endMs: number;
  position: Position;
}

interface Shape extends BaseElement {
  type: "SHAPE";
  radius: Radius;
}

interface Midi extends BaseElement {
  type: "MIDI";
  shape: Shape;
}

interface Text extends BaseElement {
  type: "TEXT";
  text: string;
}

export type Element = Shape | Midi | Text;
