import { Box, Divider, VStack } from "@chakra-ui/react";

import { TimelineBody } from "@/components/editor/timeline/body";
import { TimelineProvider } from "@/components/editor/timeline/provider";
import { TimelineScale } from "@/components/editor/timeline/scale";

export const TimelineEditor = () => {
  return (
    <TimelineProvider>
      <Box
        background="#292c36"
        borderRadius="md"
        overflowX="scroll"
        margin="2"
        padding="2"
        pt="0"
        width="100%"
      >
        <VStack align="stretch" width="fit-content">
          <TimelineScale />
          <Divider orientation="horizontal" colorScheme="white.700" />
          <TimelineBody />
        </VStack>
      </Box>
    </TimelineProvider>
  );
};
