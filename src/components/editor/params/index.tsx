import {
  Divider,
  VStack,
  Text,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

import { AppearanceParamsEditor } from "@/components/editor/params/sections/appearance";
import { BorderParamsEditor } from "@/components/editor/params/sections/border";
import { ColorParamsEditor } from "@/components/editor/params/sections/color";
import { DurationParamsEditor } from "@/components/editor/params/sections/duration";
import { RadiusParamsEditor } from "@/components/editor/params/sections/radius";
import { TextParamsEditor } from "@/components/editor/params/sections/text";
import { TopParamsEditor } from "@/components/editor/params/sections/top";
import { useEditor } from "@/providers/editor";

export const ParamsEditor = () => {
  const { singleTimeLine, selectedElementIndex, setSelectedElementIndex } =
    useEditor();

  return (
    <VStack
      align="stretch"
      flex="1"
      background="#292c36"
      borderRadius="md"
      overflowX="scroll"
      overflowY="scroll"
      p="4"
      w="100%"
      h="100%"
    >
      <Text color="white">デバッグ用 / len: {singleTimeLine.length}</Text>
      <NumberInput
        color="gray.50"
        defaultValue={selectedElementIndex}
        min={0}
        onChange={(value) => setSelectedElementIndex(Number(value))}
      >
        <NumberInputField borderColor="gray.500" pl={2} pr={2} />
      </NumberInput>
      {/* デバッグ用 */}

      {singleTimeLine[selectedElementIndex] && (
        <>
          <TopParamsEditor />
          <Divider orientation="horizontal" colorScheme="white.700" />
          <AppearanceParamsEditor />
          <ColorParamsEditor />
          <TextParamsEditor />
          <DurationParamsEditor />
          <BorderParamsEditor />
          <RadiusParamsEditor />
        </>
      )}
    </VStack>
  );
};
