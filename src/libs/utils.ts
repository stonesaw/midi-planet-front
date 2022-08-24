// 3.14, 0.1 -> 3.1

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
