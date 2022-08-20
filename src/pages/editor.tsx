import { Box, FormLabel, Heading, Input, Link } from "@chakra-ui/react";
import React from "react";

import type { NextPage } from "next";

import { loadMidi } from "@/libs/midi";

const Editor: NextPage = () => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    loadMidi(file, (midi) => {
      console.log("midi");
      console.log(midi);
    });
  };

  return (
    <Box>
      <Heading as="h1">test</Heading>
      <Input
        type="file"
        id="inputMidi"
        accept="audio/midi"
        onChange={(e) => handleUpload(e)}
        display="none"
      />
      <FormLabel htmlFor="inputMidi">
        <Link colorScheme="brand">Import MIDI</Link>
      </FormLabel>
    </Box>
  );
};

export default Editor;
