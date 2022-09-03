import { MidiJSON } from "@tonejs/midi";
import { createContext, ReactNode, useContext, useState } from "react";

type AudioState = "play" | "pause" | "init";
interface ContextProps {
  audioState: AudioState;
  setAudioState: (state: AudioState) => void;
  audioSrc: string | null;
  setAudioSrc: (src: string) => void;
  midi: MidiJSON | null;
  setMidi: (midi: MidiJSON) => void;
}

const EditorContext = createContext<ContextProps>({
  audioState: "init",
  setAudioState: () => undefined,
  audioSrc: null,
  setAudioSrc: () => undefined,
  midi: null,
  setMidi: () => undefined,
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

  return (
    <EditorContext.Provider
      value={{
        audioState,
        setAudioState,
        audioSrc,
        setAudioSrc,
        midi,
        setMidi,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
