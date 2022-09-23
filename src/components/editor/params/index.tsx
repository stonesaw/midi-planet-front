import { Divider, VStack } from "@chakra-ui/react";

import { AppearanceSection } from "@/components/editor/params/sections/appearance";
import { BorderSection } from "@/components/editor/params/sections/border";
import { ColorSection } from "@/components/editor/params/sections/color";
import { DurationSection } from "@/components/editor/params/sections/duration";
import { MIDISection } from "@/components/editor/params/sections/midi";
import { MIDITopSection } from "@/components/editor/params/sections/midiTop";
import { RadiusSection } from "@/components/editor/params/sections/radius";
import { TextSection } from "@/components/editor/params/sections/text";
import { TopSection } from "@/components/editor/params/sections/top";
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
      {/* <Text color="white">デバッグ用 / len: {singleTimeLine.length}</Text>
      <NumberInput
        color="gray.50"
        defaultValue={selectedElementIndex}
        min={0}
        onChange={(value) => setSelectedElementIndex(Number(value))}
      >
        <NumberInputField borderColor="gray.500" pl={2} pr={2} />
      </NumberInput> */}

      {singleTimeLine[selectedElementIndex] && (
        <>
          <TopSection />
          <Divider orientation="horizontal" colorScheme="white.700" />
          <MIDITopSection />
          <AppearanceSection />
          <MIDISection />
          <TextSection />
          <ColorSection />
          <DurationSection />
          <BorderSection />
          <RadiusSection />
        </>
      )}
    </VStack>
  );
};
