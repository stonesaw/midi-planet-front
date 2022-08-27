import p5Types from "p5";

interface ShapeBorder {
  size: number;
  color: string;
}

// interface ShapeText {
//   content: string
//   fontName: string;
// }

interface ShapeDuration {
  startMs: number;
  endMs: number;
}

class Shape {
  x: number;
  y: number;
  width: number;
  height: number;
  color: [number, number, number]; // [r, g, b] r,g,b = (0-255),
  alpha: number; // 0-100
  radius?: number[]; // [all] | [top-left, top-right, bottom-right, bottom-left]
  border?: ShapeBorder;
  // text?: ShapeText;
  duration?: ShapeDuration; // 表示時間

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
      // text?: ShapeText,
      duration?: ShapeDuration;
    }
  ) {
    this.x = x;
    this.y = y;
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
    // this.text = option?.text;
    this.duration = option?.duration;
  }

  draw(p5: p5Types, currentTimeMs: number) {
    if (
      this.duration &&
      (currentTimeMs < this.duration.startMs ||
        this.duration.endMs < currentTimeMs)
    ) {
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

  hex2rgb(hex: string): [number, number, number] {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shortHex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
    const color = shortHex
      ? shortHex[1] +
        shortHex[1] +
        shortHex[2] +
        shortHex[2] +
        shortHex[3] +
        shortHex[3]
      : hex;

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (result) {
      return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ];
    } else {
      throw new Error("failed convert. (hex to rgb)");
    }
  }
}

export default Shape;
