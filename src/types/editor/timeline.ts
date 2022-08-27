import { MidiJSON } from "@tonejs/midi";

const TIMELINE_BAR_KINDS = {
  shape: "SHAPE",
  midi: "MIDI",
  audio_visualizer: "AUDIO VISUALIZER",
} as const;

export interface BaseTimelineItem {
  kind: keyof typeof TIMELINE_BAR_KINDS;
  color: string;
  position: number;
  depth: number;
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
  kind: "audio_visualizer";
}

export type TimelineItem =
  | ShapeTimelineItem
  | MidiTimelineItem
  | AudioVisualizerTimelineItem;
