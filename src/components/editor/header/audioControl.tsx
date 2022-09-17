import { HStack, IconButton } from "@chakra-ui/react";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";

import { useEditor } from "@/providers/editor";

const AudioControl = () => {
  const { audioState, setAudioState } = useEditor();

  const handler = () => {
    if (audioState === "play") setAudioState("pause");
    else setAudioState("play");
  };

  const setInit = () => {
    setAudioState("init");
  };

  const audioControlMiddleIcon = () => {
    if (audioState === "play") return <FaPause />;
    if (audioState === "pause") return <FaPlay />;
    return <FaPlay />;
  };

  return (
    <HStack
      bgColor="gray.100"
      borderRadius="md"
      align="center"
      justify="center"
    >
      <IconButton
        variant="ghost"
        colorScheme="brand"
        aria-label="Play Back"
        onClick={setInit}
        icon={<FaBackward />}
      />
      <IconButton
        variant="ghost"
        colorScheme="brand"
        aria-label="Play"
        onClick={handler}
        icon={audioControlMiddleIcon()}
      />
      <IconButton
        variant="ghost"
        colorScheme="brand"
        aria-label="Play Forward"
        icon={<FaForward />}
      />
    </HStack>
  );
};

export default AudioControl;
