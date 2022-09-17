import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const BaseCard = ({ children }: Props) => (
  <Box
    overflow="hidden"
    bgColor="white"
    shadow="sm"
    borderRadius="md"
    position="relative"
  >
    {children}
  </Box>
);
