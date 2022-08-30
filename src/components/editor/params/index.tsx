import { Divider, VStack } from "@chakra-ui/react";

import { AppearanceParamsEditor } from "@/components/editor/params/sections/appearance";

export const ParamsEditor = () => {
  return (
    <VStack align="stretch" width="fit-content">
      <AppearanceParamsEditor />
      <Divider orientation="horizontal" colorScheme="white.700" />
    </VStack>
  );
};
