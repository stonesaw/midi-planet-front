import { MidiJSON } from "@tonejs/midi";
import { createContext, ReactNode, useContext, useState } from "react";

import { theme } from "@/libs/theme";
import { toColor } from "@/libs/utils";
import Shape from "@/model/editor/shape";
import Text from "@/model/editor/text";
import { Element } from "@/types/editor/element";

type AudioState = "play" | "pause" | "init";
interface ContextProps {
  audioState: AudioState;
  setAudioState: (state: AudioState) => void;
  audioSrc: string | null;
  setAudioSrc: (src: string) => void;
  midi: MidiJSON | null;
  setMidi: (midi: MidiJSON | null) => void;
  singleTimeLine: Element[];
  setSingleTimeLine: (singleTimeLine: Element[]) => void;
  selectedElementIndex: number; // FIXME
  setSelectedElementIndex: (selectedElementIndex: number) => void;
}

const EditorContext = createContext<ContextProps>({
  audioState: "init",
  setAudioState: () => undefined,
  audioSrc: null,
  setAudioSrc: () => undefined,
  midi: null,
  setMidi: () => undefined,
  singleTimeLine: [],
  setSingleTimeLine: () => undefined,
  selectedElementIndex: 0,
  setSelectedElementIndex: () => undefined,
});

interface Props {
  children: ReactNode;
}

export const EditorProvider = ({ children }: Props) => {
  const [audioState, setAudioState] = useState<"play" | "pause" | "init">(
    "init"
  );
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [midi, setMidi] = useState<MidiJSON | null>(null);
  const [singleTimeLine, setSingleTimeLine] = useState<Element[]>([
    new Shape(
      0,
      "図形だよ～",
      100,
      100,
      200,
      100,
      toColor(theme.colors["brand"][100])
    ),
    new Text(
      1,
      "文字だよ～",
      150,
      150,
      100,
      100,
      "文字だよ～",
      32,
      toColor("#abc"),
      toColor("#000")
    ),
  ]);
  const [selectedElementIndex, setSelectedElementIndex] = useState<number>(0);

  return (
    <EditorContext.Provider
      value={{
        audioState,
        setAudioState,
        audioSrc,
        setAudioSrc,
        midi,
        setMidi,
        singleTimeLine,
        setSingleTimeLine,
        selectedElementIndex,
        setSelectedElementIndex,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
