import { Box, Text } from "@chakra-ui/react";
import { useDrag } from "react-dnd";

import { useTimeline } from "@/components/editor/timeline/provider";
import { useEditor } from "@/providers/editor";
import { DnDItems, DropResult } from "@/types/editor/dnd";
import { TimelineItem } from "@/types/editor/timeline";

interface Props {
  item: TimelineItem;
  width: number;
}

export const TimelineBodyBar = ({ item, width }: Props) => {
  const { setTimelineItemById } = useTimeline();
  const {
    singleTimeLine,
    setSingleTimeLine,
    selectedElementIndex,
    setSelectedElementIndex,
  } = useEditor();

  const [collected, drag] = useDrag({
    type: DnDItems.TimelineBar,
    item: {
      item,
    },
    end: (_, monitor) => {
      const dropResult = monitor.getDropResult() as DropResult;
      if (dropResult)
        setTimelineItemById(item.id, {
          ...item,
          depth: dropResult.newDepth,
          position: dropResult.newPosition,
        });
    },
    collect: (monitor) => ({ dragging: monitor.isDragging() }),
  });

  const { dragging } = collected;

  return (
    <Box
      ref={drag}
      w={width}
      h="calc(100% - 8px)"
      bgGradient={`linear(to-r, ${item.color} 0%,#fff 200%)`}
      opacity={dragging ? 0.5 : 1}
      borderRadius="md"
      position="absolute"
      left={item.position}
      border={item.id == selectedElementIndex ? "3px solid" : ""}
      borderColor={item.id == selectedElementIndex ? "blue.400" : ""}
      onClick={() => {
        setSelectedElementIndex(item.id);
      }}
      _hover={
        item.id != selectedElementIndex
          ? {
              border: "1px solid",
              borderColor: "blue.500",
            }
          : {}
      }
    >
      <Text>{singleTimeLine[item.id] && singleTimeLine[item.id].name}</Text>
    </Box>
  );
};
