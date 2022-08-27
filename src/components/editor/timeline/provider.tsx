import { createContext, ReactNode, useContext, useState } from "react";

import { TimelineItem } from "@/types/editor/timeline";

const TimelineContext = createContext<{
  timelineItems: TimelineItem[];
  setTimelineItems: (items: TimelineItem[]) => void;
  setTimelineItemById: (id: TimelineItem["id"], item: TimelineItem) => void;
  druggingItem: TimelineItem | null;
  setDruggingItem: (item: TimelineItem | null) => void;
}>({
  timelineItems: [],
  setTimelineItems: () => undefined,
  setTimelineItemById: () => undefined,
  druggingItem: null,
  setDruggingItem: () => undefined,
});

interface Props {
  children: ReactNode;
}

export const TimelineProvider = ({ children }: Props) => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    {
      id: 1,
      depth: 1,
      kind: "advz",
      color: "#FF8797",
      position: 30,
      width: 140,
    },
    {
      id: 2,
      depth: 2,
      kind: "midi",
      color: "#FFA048",
      position: 70,
      width: 260,
    },
    {
      id: 3,
      depth: 3,
      kind: "shape",
      color: "#48ff94",
      position: 100,
      width: 80,
    },
    {
      id: 4,
      depth: 2,
      kind: "midi",
      color: "#45BCFF",
      position: 230,
      width: 90,
    },
  ]);
  const [druggingItem, setDruggingItem] = useState<TimelineItem | null>(null);

  const setTimelineItemById = (id: number, item: TimelineItem) => {
    setTimelineItems((items) => {
      const newItems = [...items];
      const index = newItems.findIndex((item) => item.id === id);
      newItems[index] = item;
      return newItems;
    });
  };

  return (
    <TimelineContext.Provider
      value={{
        timelineItems,
        setTimelineItems,
        setTimelineItemById,
        druggingItem,
        setDruggingItem,
      }}
    >
      {children}
      <p>{JSON.stringify(timelineItems)}</p>
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => useContext(TimelineContext);
