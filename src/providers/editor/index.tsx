import { MidiJSON } from "@tonejs/midi";
import { createContext, ReactNode, useContext, useState } from "react";

import { theme } from "@/libs/theme";
import { toColor } from "@/libs/utils";
import MIDI from "@/model/editor/midi";
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
  newMIDIElement: (midi: MidiJSON) => void;
  newShapeElement: () => void;
  newTextElement: () => void;
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
  newMIDIElement: () => undefined,
  newShapeElement: () => undefined,
  newTextElement: () => undefined,
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
  ]);
  const [selectedElementIndex, setSelectedElementIndex] = useState<number>(0);

  const newMIDIElement = (midi: MidiJSON) => {
    const newSingleTimeLine = [...singleTimeLine];
    newSingleTimeLine.push(
      new MIDI(
        0,
        "MIDIだよ！",
        midi,
        "sep4",
        100,
        100,
        520,
        520,
        toColor("#fff", 0),
        new Shape(1, "shape", 0, 0, 100, 16, toColor("#5BE8FD"))
      )
    );
    setSingleTimeLine(newSingleTimeLine);
  };

  const newShapeElement = () => {
    console.log("shape");
    const newSingleTimeLine = [...singleTimeLine];
    newSingleTimeLine.push(
      new Shape(
        0,
        "図形だよ～",
        100,
        100,
        200,
        100,
        toColor(theme.colors["brand"][100])
      )
    );
    setSingleTimeLine(newSingleTimeLine);
  };

  const newTextElement = () => {
    console.log("text");
    const newSingleTimeLine = [...singleTimeLine];
    newSingleTimeLine.push(
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
      )
    );
    setSingleTimeLine(newSingleTimeLine);
  };

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
        newMIDIElement,
        newShapeElement,
        newTextElement,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
