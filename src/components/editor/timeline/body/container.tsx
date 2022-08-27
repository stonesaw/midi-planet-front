import { VStack } from "@chakra-ui/react";

import { TimelineBodyRow } from "@/components/editor/timeline/body/row";
import { TimelineItem } from "@/types/editor/timeline";

const timelineItems: TimelineItem[] = [
  { depth: 1, kind: "audio_visualizer", color: "#FF8797", position: 0 },
  { depth: 2, kind: "midi", color: "#FFA048", position: 70 },
  { depth: 3, kind: "shape", color: "#48ff94", position: 100 },
  { depth: 2, kind: "midi", color: "#45BCFF", position: 540 },
];

const maxDepth = Math.max(...timelineItems.map((item) => item.depth));

export const TimelineBodyContainer = () => {
  return (
    <VStack align="flex-start">
      {[...Array(maxDepth)].map((_, i) => (
        <TimelineBodyRow
          key={i}
          items={timelineItems.filter((item) => item.depth === i + 1)}
        />
      ))}
    </VStack>
  );
};
