import p5Types from "p5";

import { BaseElement } from "./baseElement";

import { toP5Radius } from "@/libs/utils";
import {
  IShape,
  Border,
  Color,
  Radius,
  Duration,
} from "@/types/editor/element";

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
      duration?: Duration;
      radius?: Radius;
      border?: Border;
    }
  ) {
    super(id, name, x, y, width, height, background, option?.duration);
    this.type = "SHAPE";
    this.radius = option?.radius;
    this.border = option?.border;
  }

  draw(p5: p5Types, currentTimeMs: number) {
    if (!this.isDraw(currentTimeMs)) return;

    this.drawBorder(p5, this.border);

    p5.fill(this.toP5Color(p5, this.background));
    p5.rect(
      this.toRealX(p5, this.x),
      this.toRealY(p5, this.y),
      this.toRealX(p5, this.width),
      this.toRealY(p5, this.height),
      ...toP5Radius(this.radius)
    );
  }

  drawBorder(p5: p5Types, border?: Border) {
    if (border) {
      p5.stroke(this.toP5Color(p5, border.color));
      p5.strokeWeight(this.toRealX(p5, border.size));
    } else {
      p5.noStroke();
    }
  }
}

export default Shape;
