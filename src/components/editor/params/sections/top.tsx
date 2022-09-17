import { Input, HStack, Text, Spacer, Box } from "@chakra-ui/react";

import { useEditor } from "@/providers/editor";

export const TopSection = () => {
  const { singleTimeLine, setSingleTimeLine, selectedElementIndex } =
    useEditor();

  return (
    <HStack align="flex-end">
      <Input
        type="text"
        variant="unstyled"
        color="gray.50"
        borderColor="gray.500"
        size="lg"
        value={singleTimeLine[selectedElementIndex].name}
        onChange={(e) => {
          const newTimeLine = [...singleTimeLine];
          newTimeLine[selectedElementIndex].name = e.target.value;
          setSingleTimeLine(newTimeLine);
        }}
      />
      <Spacer />
      <Box pos="relative" top="0" right="0">
        <Text color="gray.300" as="b">
          {singleTimeLine[selectedElementIndex].type}
        </Text>
      </Box>
    </HStack>
  );
};
