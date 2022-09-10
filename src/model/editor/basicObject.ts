import p5Types from "p5";

export interface Duration {
  startMs?: number;
  endMs?: number;
}

export class BasicObject {
  x: number;
  y: number;
  duration?: Duration;

  constructor(x: number, y: number, duration?: Duration) {
    this.x = x;
    this.y = y;
    this.duration = duration;
  }

  isDraw(currentTimeMs: number) {
    if (
      this.duration &&
      (currentTimeMs < (this.duration.startMs || -Infinity) ||
        (this.duration.endMs || Infinity) < currentTimeMs)
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
