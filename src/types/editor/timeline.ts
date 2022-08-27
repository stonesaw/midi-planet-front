import { MidiJSON } from "@tonejs/midi";

const TIMELINE_BAR_KINDS = {
  shape: "SHAPE",
  midi: "MIDI",
  advz: "AUDIO VISUALIZER",
} as const;

export interface BaseTimelineItem {
  id: number;
  kind: keyof typeof TIMELINE_BAR_KINDS;
  color: string;
  position: number;
  depth: number;
  width: number;
  midi?: MidiJSON;
}

export interface ShapeTimelineItem extends BaseTimelineItem {
  kind: "shape";
}

export interface MidiTimelineItem extends BaseTimelineItem {
  kind: "midi";
  // midi: MidiJSON;
}

export interface AudioVisualizerTimelineItem extends BaseTimelineItem {
  kind: "advz";
}

export type TimelineItem =
  | ShapeTimelineItem
  | MidiTimelineItem
  | AudioVisualizerTimelineItem;
