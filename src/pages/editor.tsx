import { Grid, GridItem } from "@chakra-ui/react";
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
      <Grid templateColumns="100%" templateRows="auto 1fr" height="100vh">
        <HeaderEditor />
        <Grid
          templateColumns="85% 15%"
          templateRows="2.5fr 1fr"
          gap={4}
          padding={4}
          height="calc(100% - 1rem)"
          width="calc(100% - 1rem)"
        >
          <GridItem
            gridColumn="1 / 2"
            gridRow="1 / 2"
            ref={editorParentRef}
            width="100%"
          >
            <CanvasEditor maxSize={editorParentSize} />
          </GridItem>
          <GridItem gridColumn="1 / 2" gridRow="2 / 3" width="100%">
            <TimelineEditor />
          </GridItem>
          <GridItem gridColumn="2 / 3" gridRow="1 / 3" width="100%">
            <ParamsEditor />
          </GridItem>
        </Grid>
      </Grid>
    </EditorProvider>
  );
};

Editor.getLayout = (page) => <VanillaLayout>{page}</VanillaLayout>;

export default Editor;
