import { Grid, HStack, VStack } from "@chakra-ui/react";

import { CanvasEditor } from "@/components/editor/canvas";
import { HeaderEditor } from "@/components/editor/header";
import { ParamsEditor } from "@/components/editor/params";
import { TimelineEditor } from "@/components/editor/timeline";
import VanillaLayout from "@/components/layouts/vanilla";
import { EditorProvider } from "@/providers/editor";
import { NextPageWithLayout } from "@/types/page";

const Editor: NextPageWithLayout = () => {
  return (
    <EditorProvider>
      <Grid templateColumns="100%" templateRows="auto 1fr" minH="100vh">
        <HeaderEditor />
        <HStack>
          <VStack align="flex-start" width="300px">
            <CanvasEditor />
            <TimelineEditor />
          </VStack>
          <ParamsEditor />
        </HStack>
      </Grid>
    </EditorProvider>
  );
};

Editor.getLayout = (page) => <VanillaLayout>{page}</VanillaLayout>;

export default Editor;
