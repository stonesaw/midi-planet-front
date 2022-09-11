import p5Types from "p5";

import { Color, IBaseElement } from "@/types/editor/element";

export class BaseElement implements IBaseElement {
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

  constructor(
    id: number,
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    background: Color,
    startMs?: number,
    endMs?: number
  ) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.background = background;
    this.startMs = startMs;
    this.endMs = endMs;
  }

  draw(_p5: p5Types, _currentTimeMs: number, _currentBeat: number): void {
    throw new Error("Method not implemented.");
  }

  isDraw(currentTimeMs: number) {
    if (
      currentTimeMs < (this.startMs || -Infinity) ||
      (this.endMs || Infinity) < currentTimeMs
    ) {
      return false;
    }
    return true;
  }

  toRealX(p5: p5Types, x: number) {
    const canvasWidth = p5.width;
    const virtualWidth = 1280;
    return (x * canvasWidth) / virtualWidth;
  }

  toRealY(p5: p5Types, x: number) {
    const canvasHeight = p5.height;
    const virtualHeight = 720;
    return (x * canvasHeight) / virtualHeight;
  }
}
