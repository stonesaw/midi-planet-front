import { Box } from "@chakra-ui/react";

import { TimelineBodyBar } from "@/components/editor/timeline/body/bar";
import { TimelineItem } from "@/types/editor/timeline";

interface Props {
  items: TimelineItem[];
}

export const TimelineBodyRow = ({ items }: Props) => {
  return (
    <Box w="100%" h="12" position="relative">
      {items.map((item) => (
        <TimelineBodyBar
          key={item.color}
          color={item.color}
          position={item.position}
          width={Math.random() * 300}
        />
      ))}
    </Box>
  );
};
