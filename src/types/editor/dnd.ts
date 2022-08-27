export const DnDItems = {
  TimelineBar: "TimelineBar",
} as const;

export type DnDItems = typeof DnDItems[keyof typeof DnDItems];

export interface DropResult {
  newDepth: number;
  newPosition: number;
}
