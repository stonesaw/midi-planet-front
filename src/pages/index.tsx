import { Box, Heading, StackDivider, VStack } from "@chakra-ui/react";
import { Project, User } from "@prisma/client";
import { GetServerSideProps } from "next";

import HeaderFooterLayout from "@/components/layouts/headerFooter";
import { ProjectList } from "@/components/project/list";
import { fetchProjects } from "@/pages/api/project";
import { CustomPageProps, NextPageWithLayout } from "@/types/page";
import { DateToString } from "@/types/utils/date";

interface Props extends CustomPageProps {
  projects: DateToString<
    Project & {
      owner: User;
    }
  >[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const projects = await fetchProjects();
  if (!projects) return { notFound: true };

  return {
    props: {
      title: "ホーム",
      isIndex: true,
      projects,
    },
  };
};

const HomePage: NextPageWithLayout<Props> = ({ projects }) => {
  return (
    <VStack
      maxW="5xl"
      w="100%"
      mx="auto"
      my="6"
      px="4"
      alignItems="stretch"
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
    >
      <Box>
        <Heading as="h1" size="lg" mb="4">
          🔥 急上昇中
        </Heading>
        <Box overflowX="auto" w="100%">
          <ProjectList projects={projects} isNoWrap />
        </Box>
      </Box>
      <Box>
        <Heading as="h1" size="lg" mb="4">
          🕐 最新
        </Heading>
        <Box overflowX="auto" w="100%">
          <ProjectList projects={projects} isNoWrap />
        </Box>
      </Box>
    </VStack>
  );
};

HomePage.getLayout = (page) => {
  return <HeaderFooterLayout>{page}</HeaderFooterLayout>;
};

export default HomePage;
