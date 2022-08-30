import { Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export const BaseSection = ({ title, children }: Props) => {
  return (
    <Box>
      <Heading size="md" as="h4">
        {title}
      </Heading>
      {children}
    </Box>
  );
};
