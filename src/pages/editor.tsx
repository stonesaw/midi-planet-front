import { VStack } from "@chakra-ui/react";

import { EditorCanvas } from "@/components/editor/canvas";
import { EditorTimeline } from "@/components/editor/timeline";
import VanillaLayout from "@/components/layouts/vanilla";
import { NextPageWithLayout } from "@/types/page";

const Editor: NextPageWithLayout = () => {
  return (
    <VStack align="flex-start">
      <EditorCanvas />
      <EditorTimeline />
    </VStack>
  );
};

Editor.getLayout = (page) => <VanillaLayout>{page}</VanillaLayout>;

export default Editor;
