import { Divider, Text, VStack } from "@chakra-ui/react";

interface Props {
  num: number;
  unit?: string;
}

export const TimelineScaleItem = ({ num, unit }: Props) => (
  <VStack align="center" height={50}>
    <Divider orientation="vertical" />
    <Text fontSize="md" color="gray.400">
      {num + (unit || "")}
    </Text>
  </VStack>
);
