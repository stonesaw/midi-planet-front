import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";

import AudioControl from "@/components/editor/header/audioControl";
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

  const FORM_INPUT_IDS = {
    AUDIO: "input-audio",
    MIDI: "input-midi",
  };

  return (
    <Box as="header" bgColor="white">
      <HStack
        as="nav"
        align="stretch"
        justify="space-between"
        p={4}
        flexDir={{
          base: "column",
          md: "row",
        }}
        gap={4}
      >
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Import Something"
            colorScheme="brand"
            icon={<AddIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem>
              <FormLabel
                cursor="pointer"
                htmlFor={FORM_INPUT_IDS.AUDIO}
                m={0}
                w="100%"
              >
                Import Audio
              </FormLabel>
            </MenuItem>
            <MenuItem>
              <FormLabel
                cursor="pointer"
                htmlFor={FORM_INPUT_IDS.MIDI}
                m={0}
                w="100%"
              >
                Import MIDI
              </FormLabel>
            </MenuItem>
          </MenuList>
        </Menu>
        <HStack gap={4}>
          <HStack
            px={4}
            py={2}
            bgColor="gray.100"
            borderRadius="md"
            divider={<StackDivider borderColor="gray.300" />}
          >
            <Text>BPM: 168</Text>
            <Text>4/4</Text>
          </HStack>
          <AudioControl />
          <Input
            type="file"
            id={FORM_INPUT_IDS.MIDI}
            accept="audio/midi"
            onChange={handleUploadMidi}
            display="none"
          />
          <Input
            type="file"
            id={FORM_INPUT_IDS.AUDIO}
            accept="audio/*"
            onChange={handleUploadAudio}
            display="none"
          />
          <audio src={audioSrc || ""} ref={refAudio}></audio>
          <HStack
            px={4}
            py={2}
            bgColor="gray.100"
            borderRadius="md"
            divider={<StackDivider borderColor="gray.300" />}
          >
            <Text>1/3</Text>
            <Text>00:03.1</Text>
          </HStack>
        </HStack>
        <Button colorScheme="brand">Save</Button>
      </HStack>
    </Box>
  );
};
