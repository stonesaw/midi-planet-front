import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, FormLabel, Input, Link } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

import PlayButton from "@/components/editor/header/playButton";
import { loadMidi } from "@/libs/midi";
import { useEditor } from "@/providers/editor";

export const HeaderEditor = () => {
  const refMidiInput = useRef<HTMLInputElement>(null);
  const refAudio = useRef<HTMLAudioElement>(null);
  const { audioState, setMidi, setAudioSrc, audioSrc } = useEditor();

  const handleUploadMidi = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const midi = await loadMidi(file);
    if (typeof midi == "string") setMidi(JSON.parse(midi));
  };

  const handleUploadAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setAudioSrc(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (audioState === "play") refAudio.current?.play();
    if (audioState === "pause") refAudio.current?.pause();
    if (audioState === "init") {
      refAudio.current?.pause();
      if (refAudio.current) refAudio.current.currentTime = 0;
    }
  }, [audioState]);

  return (
    <Box as="header" bgColor="white">
      <Flex
        as="nav"
        align="stretch"
        justify="space-between"
        maxW="6xl"
        mx="auto"
        p={4}
        flexDir={{
          base: "column",
          md: "row",
        }}
        gap={4}
      >
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
        <audio src={audioSrc || ""} ref={refAudio}></audio>
        <PlayButton />
      </Flex>
    </Box>
  );
};
