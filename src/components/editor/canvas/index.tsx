import { MoviePreview } from "./moviePreview";

interface Props {
  maxSize: {
    width: number;
    height: number;
  };
}

export const CanvasEditor = ({ maxSize }: Props) => {
  return <MoviePreview maxSize={maxSize} />;
};
