import { HStack } from "@chakra-ui/react";

import { TimelineScaleItem } from "@/components/editor/timeline/scale/item";

interface Props {
  perSec: number;
}

export const TimelineScaleContainer = ({ perSec }: Props) => {
  return (
    <HStack gap={perSec}>
      {[...Array(99)].map((_, i) => (
        <TimelineScaleItem key={i} num={(i + 1) * 10} />
      ))}
    </HStack>
  );
};
