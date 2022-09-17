import p5Types from "p5";

import { BaseElement } from "./baseElement";

import { Color, Duration, IText } from "@/types/editor/element";

class Text extends BaseElement implements IText {
  type!: "TEXT";
  text: string;
  color: Color; // [r, g, b] r,g,b = (0-255),
  size: number;
  font?: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    size: number,
    color: Color,
    background: Color,
    option?: {
      duration?: Duration;
      font?: string;
    }
  ) {
    super(id, name, x, y, width, height, background, option?.duration);
    this.type = "TEXT";
    this.text = text;
    this.size = size;
    this.color = color;
    this.font = option?.font;
  }

  draw(p5: p5Types, currentTimeMs: number) {
    if (!this.isDraw(currentTimeMs)) {
      return;
    }

    // draw background
    p5.fill(p5.color(...this.background.rgb, this.background.alpha * 2.55));
    p5.rect(
      this.toRealX(p5, this.x),
      this.toRealY(p5, this.y),
      this.toRealX(p5, this.width),
      this.toRealY(p5, this.height)
    );

    p5.fill(p5.color(...this.color.rgb, this.color.alpha));
    p5.textSize(this.toRealY(p5, this.size));
    if (this.font) {
      p5.textFont(this.font);
    } else {
      p5.textFont();
    }
    p5.text(
      this.text,
      this.toRealX(p5, this.x),
      this.toRealY(p5, this.y + this.size)
    );
  }
}

export default Text;
