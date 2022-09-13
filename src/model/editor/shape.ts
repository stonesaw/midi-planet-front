import p5Types from "p5";

import { BaseElement } from "./baseElement";

import { IShape, Border, Color, Radius } from "@/types/editor/element";

class Shape extends BaseElement implements IShape {
  type!: "SHAPE";
  radius?: Radius; // [all] | [top-left, top-right, bottom-right, bottom-left]
  border?: Border;

  constructor(
    id: number,
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    background: Color,
    option?: {
      startMs?: number;
      endMs?: number;
      radius?: Radius;
      border?: Border;
    }
  ) {
    super(
      id,
      name,
      x,
      y,
      width,
      height,
      background,
      option?.startMs,
      option?.endMs
    );
    this.type = "SHAPE";
    this.radius = option?.radius;
    this.border = option?.border;
  }

  draw(p5: p5Types, currentTimeMs: number) {
    if (!this.isDraw(currentTimeMs)) {
      return;
    }

    if (this.border) {
      p5.stroke(
        p5.color(...this.border.color.rgb, this.border.color.alpha * 2.55)
      );
      p5.strokeWeight(this.toRealX(p5, this.border.size));
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
  }
}

export default Shape;
