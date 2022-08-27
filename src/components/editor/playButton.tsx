import { Button } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  setPlayed(): void;
  onPlay(): void;
  onStop(): void;
}

const PlayButton = (props: Props) => {
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  const handler = () => {
    props.setPlayed();
    isPlayed ? props?.onStop() : props?.onPlay();
    setIsPlayed(!isPlayed);
  };
  return <Button onClick={handler}>{isPlayed ? "Stop" : "Play"}</Button>;
};

export default PlayButton;
