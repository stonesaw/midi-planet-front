import p5Types from "p5";

import { BaseElement } from "./baseElement";

import { Border, Color, IText, Radius } from "@/types/editor/element";

class Text extends BaseElement implements IText {
  type!: "TEXT";
  text: string;
  color: Color; // [r, g, b] r,g,b = (0-255),
  size: number;
  font?: string;
  radius?: Radius; // [all] | [top-left, top-right, bottom-right, bottom-left]
  border?: Border;

  constructor(
    id: number,
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    size: number,
    color: Color,
    background: Color,
    startMs?: number,
    endMs?: number,
    option?: {
      font?: string;
      border?: Border;
      radius?: Radius;
    }
  ) {
    super(id, name, x, y, width, height, background, startMs, endMs);
    this.type = "TEXT";
    this.text = text;
    this.size = size;
    this.color = color;
    this.font = option?.font;
    this.border = option?.border;
    this.radius = option?.radius;
  }

  draw(p5: p5Types, currentTimeMs: number) {
    if (!this.isDraw(currentTimeMs)) {
      return;
    }

    // draw background
    if (this.border) {
      p5.stroke(p5.color(...this.background.rgb, this.background.alpha * 2.55));
    } else {
      p5.noStroke();
    }

    p5.fill(p5.color(...this.background.rgb, this.background.alpha * 2.55));
    p5.rect(
      this.toRealX(p5, this.x),
      this.toRealY(p5, this.y),
      this.toRealX(p5, this.width),
      this.toRealY(p5, this.height),
      ...(this.radius ? Object.values(this.radius) : [0])
    );

    p5.fill(p5.color(...this.color.rgb, this.color.alpha * 2.55));
    p5.textSize(this.toRealY(p5, this.size));
    p5.text(
      this.text,
      this.toRealX(p5, this.x),
      this.toRealY(p5, this.y + this.size)
    );
  }
}

export default Text;
