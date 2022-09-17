import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { CanvasEditor } from "@/components/editor/canvas";
import { HeaderEditor } from "@/components/editor/header";
import { ParamsEditor } from "@/components/editor/params";
import { TimelineEditor } from "@/components/editor/timeline";
import VanillaLayout from "@/components/layouts/vanilla";
import { EditorProvider } from "@/providers/editor";
import { NextPageWithLayout } from "@/types/page";

const Editor: NextPageWithLayout = () => {
  const [editorParentSize, setEditorParentSize] = useState({
    width: 0,
    height: 0,
  });
  const editorParentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (editorParentRef.current)
        setEditorParentSize({
          width: editorParentRef.current.offsetWidth,
          height: editorParentRef.current.offsetHeight,
        });
    });
    observer.observe(document.body);
  }, []);

  return (
    <EditorProvider>
      <Grid
        templateColumns="100%"
        templateRows="auto 1fr"
        height="100vh"
        maxH="100vh"
        width="100vw"
        maxW="100vw"
      >
        <HeaderEditor />
        <Box p={4} h="calc(100vh - 72px)">
          <Grid
            templateColumns="calc(100% - 316px) 300px"
            templateRows="calc(100% - 316px) 300px"
            gap={4}
            height="100%"
            width="100%"
          >
            <GridItem gridColumn="1 / 2" gridRow="1 / 2" ref={editorParentRef}>
              <CanvasEditor maxSize={editorParentSize} />
            </GridItem>
            <GridItem gridColumn="1 / 2" gridRow="2 / 3">
              <TimelineEditor />
            </GridItem>
            <GridItem gridColumn="2 / 3" gridRow="1 / 3">
              <ParamsEditor />
            </GridItem>
          </Grid>
        </Box>
      </Grid>
    </EditorProvider>
  );
};

Editor.getLayout = (page) => <VanillaLayout>{page}</VanillaLayout>;

export default Editor;
