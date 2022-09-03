import p5Types from "p5";

import { BasicObject, Duration } from "./basicObject";

interface ShapeBorder {
  size: number;
  color: string;
}

class Shape extends BasicObject {
  width: number;
  height: number;
  color: [number, number, number]; // [r, g, b] r,g,b = (0-255),
  alpha: number; // 0-100
  radius?: number[]; // [all] | [top-left, top-right, bottom-right, bottom-left]
  border?: ShapeBorder;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string | [number, number, number],
    option?: {
      alpha?: number;
      radius?: number[];
      border?: ShapeBorder;
      duration?: Duration;
    }
  ) {
    super(x, y, option?.duration);
    this.width = width;
    this.height = height;
    if (typeof color == "string") {
      this.color = this.hex2rgb(color);
    } else {
      this.color = color;
    }
    this.alpha = option?.alpha || 100;
    this.radius = option?.radius;
    this.border = option?.border;
  }

  draw(p5: p5Types, currentTimeMs: number) {
    if (!this.isDraw(currentTimeMs)) {
      return;
    }

    if (this.border) {
      p5.stroke(p5.color(this.border.color));
    } else {
      p5.noStroke();
    }

    p5.fill(p5.color(...this.color, this.alpha * 2.55));
    p5.rect(
      this.toRealX(p5, this.x),
      this.toRealY(p5, this.y),
      this.toRealX(p5, this.width),
      this.toRealY(p5, this.height),
      ...(this.radius ? this.radius : [0])
    );
  }
}

export default Shape;
