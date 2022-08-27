import { VStack } from "@chakra-ui/react";

import { TimelineBodyRow } from "@/components/editor/timeline/body/row";
import { useTimeline } from "@/components/editor/timeline/provider";

export const TimelineBodyContainer = () => {
  const { timelineItems } = useTimeline();

  const maxDepth = Math.max(...timelineItems.map((item) => item.depth));

  return (
    <VStack align="flex-start" spacing="0">
      {maxDepth > 0 &&
        [...Array(maxDepth)].map((_, i) => (
          <TimelineBodyRow
            key={i}
            items={timelineItems.filter((item) => item.depth === i + 1)}
            rowNumber={i + 1}
          />
        ))}
    </VStack>
  );
};
