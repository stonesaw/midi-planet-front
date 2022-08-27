import { AddIcon } from "@chakra-ui/icons";
import { Input, Link, Box, FormLabel, Button } from "@chakra-ui/react";
import { useRef, useState } from "react";

import {
  MoviePreview,
  MoviePreviewHandler,
} from "@/components/editor/moviePreview";
import PlayButton from "@/components/editor/playButton";
import { loadMidi } from "@/libs/midi";

export const EditorCanvas = () => {
  const childRef = useRef({} as MoviePreviewHandler);
  const refMidiInput = useRef<HTMLInputElement>(null);
  const refAudio = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState("");

  const handleUploadMidi = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }
    const file = e.target.files[0];
    console.log(file);
    const midi = await loadMidi(file);
    if (typeof midi == "string") {
      console.log(midi);
      childRef.current.loadMidi(midi);
    }
  };

  const handleUploadAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }
    const file = e.target.files[0];
    console.log(URL.createObjectURL(file));
    setAudioSrc(URL.createObjectURL(file));
  };

  const playAudio = () => {
    if (refAudio.current && audioSrc != "") {
      refAudio.current.play();
    }
  };

  const stopAudio = () => {
    if (refAudio.current && audioSrc != "") {
      refAudio.current.pause();
      refAudio.current.currentTime = 0;
    }
  };

  // TODO:disable default layout
  return (
    <Box>
      {/* TODO: Header に移動 */}
      <Input
        type="file"
        id="input-midi"
        accept="audio/midi"
        onChange={handleUploadMidi}
        display="none"
        ref={refMidiInput}
      />
      <FormLabel htmlFor="input-midi">
        <Button
          leftIcon={<AddIcon />}
          color="brand.500"
          onClick={() => refMidiInput?.current?.click()}
        >
          Import MIDI
        </Button>
      </FormLabel>
      <Input
        type="file"
        id="input-audio"
        accept="audio/*"
        onChange={handleUploadAudio}
        display="none"
      />
      <FormLabel htmlFor="input-audio">
        <Link color="brand.500">Import Audio</Link>
      </FormLabel>
      <audio src={audioSrc} ref={refAudio}></audio>
      <PlayButton
        setPlayed={() => childRef.current.setPlayed(!childRef.current.played)}
        onPlay={() => {
          playAudio();
        }}
        onStop={() => {
          stopAudio();
        }}
      ></PlayButton>

      <MoviePreview ref={childRef} />
    </Box>
  );
};
