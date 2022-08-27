import { Box } from "@chakra-ui/react";

interface Props {
  color: string;
  position: number;
  width: number;
}

export const TimelineBodyBar = ({ color, position, width }: Props) => (
  <Box
    w={width}
    h="100%"
    bgGradient={`linear(to-r, ${color} 0%,#fff 200%)`}
    borderRadius="md"
    position="absolute"
    left={position}
  />
);
