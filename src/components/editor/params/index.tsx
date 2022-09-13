import { Divider, VStack } from "@chakra-ui/react";

import { AppearanceParamsEditor } from "@/components/editor/params/sections/appearance";
import { ColorParamsEditor } from "@/components/editor/params/sections/color";
import { TopParamsEditor } from "@/components/editor/params/sections/top";

export const ParamsEditor = () => {
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
      <TopParamsEditor />
      <Divider orientation="horizontal" colorScheme="white.700" />
      <AppearanceParamsEditor />
      <Divider orientation="horizontal" colorScheme="white.700" />
      <ColorParamsEditor />
      <Divider orientation="horizontal" colorScheme="white.700" />
    </VStack>
  );
};
