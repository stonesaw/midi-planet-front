// 3.14, 0.1 -> 3.1

import { Color, Radius } from "@/types/editor/element";

export function floorAt(num: number, at = 0): number {
  if (at != 0) {
    return Math.floor(num * (1.0 / at)) / (1.0 / at);
  } else {
    return Math.floor(num);
  }
}

export function roundAt(num: number, at = 0): number {
  if (at != 0) {
    return Math.round(num * (1.0 / at)) / (1.0 / at);
  } else {
    return Math.round(num);
  }
}

export function toMinutes(milliSec: number, decimal = 0.01): string {
  const sec = floorAt(milliSec / 1000, decimal);
  return `${Math.floor(sec / 60)}:${roundAt(sec % 60, decimal)}`;
}

export function toRadius(radius: number[]): Radius {
  if (radius.length == 1) {
    return {
      topLeft: radius[0],
      topRight: radius[0],
      bottomLeft: radius[0],
      bottomRight: radius[0],
    };
  } else {
    return {
      topLeft: radius[0],
      topRight: radius[1],
      bottomLeft: radius[2],
      bottomRight: radius[3],
    };
  }
}

export function hex2rgb(hex: string): [number, number, number] {
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

export function toColor(
  color: string | [number, number, number],
  alpha = 255
): Color {
  return {
    rgb: typeof color == "string" ? hex2rgb(color) : color,
    alpha: alpha,
  };
}
