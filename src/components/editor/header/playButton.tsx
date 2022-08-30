import { Button } from "@chakra-ui/react";

import { useEditor } from "@/providers/editor";

const PlayButton = () => {
  const { audioState, setAudioState } = useEditor();

  const handler = () => {
    if (audioState === "play") setAudioState("pause");
    else setAudioState("play");
  };

  return (
    <Button onClick={handler}>
      {audioState === "pause" ? "Stop" : "Play"}
    </Button>
  );
};

export default PlayButton;
