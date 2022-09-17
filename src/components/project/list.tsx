import { Flex } from "@chakra-ui/react";
import { Project, User } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

import { ProjectCard } from "@/components/project/card";
import { DateToString } from "@/types/utils/date";

interface Props {
  projects: DateToString<
    Project & {
      owner: User;
    }
  >[];
  isNoWrap?: boolean;
}

export const ProjectList = ({ projects, isNoWrap }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [cardCountPerRow, setCardCountPerRow] = useState(1);
  const updateCardCountPerRow = () => {
    if (!listRef.current) return setCardCountPerRow(1);
    const listRefWidth = listRef.current.getBoundingClientRect().width;
    if (listRefWidth >= 840) return setCardCountPerRow(3);
    if (listRefWidth >= 550) return setCardCountPerRow(2);
    return setCardCountPerRow(1);
  };
  const listGap = "1rem";

  useEffect(() => {
    const resizeObserver = new ResizeObserver(updateCardCountPerRow);
    if (!listRef.current) return;
    resizeObserver.observe(listRef.current);
  }, []);

  return (
    <Flex gap={listGap} wrap={isNoWrap ? "nowrap" : "wrap"} ref={listRef}>
      {projects.map((project) => (
        <ProjectCard
          width={
            isNoWrap
              ? "300px"
              : `calc((100% - ${listGap} * ${
                  cardCountPerRow - 1
                }) / ${cardCountPerRow})`
          }
          isNoWrap={isNoWrap}
          key={project.id}
          project={project}
        />
      ))}
    </Flex>
  );
};
