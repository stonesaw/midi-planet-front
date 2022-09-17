import { MIDIAppearanceSection } from "./shape/appearance";
import { MIDIBorderSection } from "./shape/border";
import { MIDIColorSection } from "./shape/color";
import { MIDIRadiusSection } from "./shape/radius";

import { useEditor } from "@/providers/editor";

export const MIDISection = () => {
  const { singleTimeLine, selectedElementIndex } = useEditor();

  const currentElm = singleTimeLine[selectedElementIndex];
  if (!("midi" in currentElm)) return <></>;

  return (
    <>
      <MIDIAppearanceSection />
      <MIDIColorSection />
      <MIDIBorderSection />
      <MIDIRadiusSection />
    </>
  );
};
