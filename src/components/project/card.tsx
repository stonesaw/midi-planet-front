import {
  Avatar,
  Box,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Project, User } from "@prisma/client";
import Image from "next/image";
import NextLink from "next/link";
import { FaRegClock } from "react-icons/fa";

import { BaseCard } from "@/components/card";
import { DateToString } from "@/types/utils/date";

interface Props {
  isNoWrap?: boolean;
  width: string;
  project: DateToString<
    Project & {
      owner: User;
    }
  >;
}

export const ProjectCard = ({ width, project, isNoWrap }: Props) => {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  };

  return (
    <Box w={width} flexShrink={isNoWrap ? 0 : 1}>
      <NextLink href={`/editor?projectId=${project.id}`}>
        <a>
          <BaseCard>
            <VStack alignItems="stretch" p="4">
              <Box
                position="relative"
                h="160px"
                w="100%"
                borderRadius="md"
                overflow="hidden"
              >
                <Image
                  src={`https://picsum.photos/seed/${Math.round(
                    Number.MAX_VALUE
                  )}/300/200`}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
              <Heading fontSize="xl" fontWeight="semibold" as="h4">
                {project.title}
              </Heading>
              <HStack justify="space-between" color="gray.500">
                <object>
                  <NextLink href={`/user/${project.owner.id}`}>
                    <Link>
                      <HStack>
                        <Avatar
                          size="xs"
                          name={project.owner.name || ""}
                          src={project.owner.image || ""}
                          bgColor="transparent"
                        />
                        <Text fontSize="sm">{project.owner.name}</Text>
                      </HStack>
                    </Link>
                  </NextLink>
                </object>
                <HStack>
                  <FaRegClock size={16} />
                  <Text fontSize="sm">{formatDate(project.createdAt)}</Text>
                </HStack>
              </HStack>
            </VStack>
          </BaseCard>
        </a>
      </NextLink>
    </Box>
  );
};
