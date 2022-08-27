import { Box } from "@chakra-ui/react";
import { DropTargetMonitor, useDrop } from "react-dnd";

import { TimelineBodyBar } from "@/components/editor/timeline/body/bar";
import { DnDItems, DropResult } from "@/types/editor/dnd";
import { TimelineItem } from "@/types/editor/timeline";

interface Props {
  items: TimelineItem[];
  rowNumber: number;
}

export const TimelineBodyRow = ({ items, rowNumber }: Props) => {
  // const { druggingItem } = useTimeline();
  const [, drop] = useDrop<unknown, DropResult>({
    accept: DnDItems.TimelineBar,
    drop: (_, monitor) => ({
      newDepth: rowNumber,
      newPosition: calcPosition(monitor),
    }),
  });

  const calcPosition = (monitor: DropTargetMonitor<unknown, DropResult>) => {
    console.log("ClientOffset", monitor.getClientOffset());
    console.log("SourceClientOffset", monitor.getSourceClientOffset());
    console.log("InitialClientOffset", monitor.getInitialClientOffset());
    console.log(
      "InitialSourceClientOffset",
      monitor.getInitialSourceClientOffset()
    );
    console.log(
      "DifferenceFromInitialOffset",
      monitor.getDifferenceFromInitialOffset()
    );
    return monitor.getSourceClientOffset()?.x ?? 0;
  };

  // const isDropped = rowNumber === druggingItem?.depth;

  return (
    <Box w="100%" h="14" position="relative" ref={drop} p="4px 0">
      {items.map((item, i) => (
        <TimelineBodyBar key={item.color} item={item} width={item.width} />
      ))}
    </Box>
  );
};
