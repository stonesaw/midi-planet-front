import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { Project, User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import * as z from "zod";

import HeaderFooterLayout from "@/components/layouts/headerFooter";
import { ProjectList } from "@/components/project/list";
import { UserCard } from "@/components/user/card";
import { fetchUserById } from "@/pages/api/user/[id]/show";
import { CustomPageProps, NextPageWithLayout } from "@/types/page";
import { DateToString } from "@/types/utils/date";

const queryParamsSchema = z.object({
  uid: z.string(),
});

interface Props extends CustomPageProps {
  user: User & {
    projects: DateToString<
      Project & {
        owner: User;
      }
    >[];
  };
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const params = queryParamsSchema.safeParse(ctx.params);
  if (!params.success) return { notFound: true };
  const { uid } = params.data;
  const user = await fetchUserById(uid);
  if (!user) return { notFound: true };

  return {
    props: {
      title: user.name + "のプロフィール",
      isIndex: true,
      user,
    },
  };
};

const UserProfilePage: NextPageWithLayout<Props> = ({ user }) => {
  const { projects, ...userData } = user;
  const [userProfile, setUserProfile] = useState<User>(userData);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  return (
    <VStack maxW="5xl" w="100%" mx="auto" my="6" px="4" alignItems="stretch">
      <UserCard userProfile={userProfile} setUserProfile={setUserProfile} />
      <Tabs
        index={currentTabIndex}
        onChange={(index) => setCurrentTabIndex(index)}
      >
        <TabList>
          <Tab>Projects</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProjectList projects={projects} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

UserProfilePage.getLayout = (page) => {
  return <HeaderFooterLayout>{page}</HeaderFooterLayout>;
};

export default UserProfilePage;
