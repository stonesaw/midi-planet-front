import p5Types from "p5";

import { BasicObject, Duration } from "./basicObject";

interface ShapeBorder {
  size: number;
  color: string;
}

class Text extends BasicObject {
  text: string;
  size: number;
  // width: number;
  // height: number;
  color: [number, number, number]; // [r, g, b] r,g,b = (0-255),
  alpha: number; // 0-100
  font?: string;
  radius?: number[]; // [all] | [top-left, top-right, bottom-right, bottom-left]
  border?: ShapeBorder;

  constructor(
    x: number,
    y: number,
    // width: number,
    // height: number,

    text: string,
    size: number,
    color: string | [number, number, number],
    option?: {
      font?: string;
      background: string | [number, number, number];
      alpha?: number;
      border?: ShapeBorder;
      duration?: Duration;
    }
  ) {
    super(x, y, option?.duration);
    this.text = text;
    this.size = size;
    // this.width = width;
    // this.height = height;
    if (typeof color == "string") {
      this.color = this.hex2rgb(color);
    } else {
      this.color = color;
    }
    this.font = option?.font;
    this.alpha = option?.alpha || 100;
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
    // p5.rect(
    //   this.toRealX(p5, this.x),
    //   this.toRealY(p5, this.y),
    //   this.toRealX(p5, this.width),
    //   this.toRealY(p5, this.height),
    //   ...(this.radius ? this.radius : [0])
    // );

    p5.textSize(this.toRealY(p5, this.size));
    p5.text(
      this.text,
      this.toRealX(p5, this.x),
      this.toRealY(p5, this.y + this.size)
    );
  }
}

export default Text;
