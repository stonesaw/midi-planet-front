import { VStack } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import * as z from "zod";

import { UserCard } from "@/components/card/user";
import HeaderFooterLayout from "@/components/layouts/headerFooter";
import { fetchUsers } from "@/pages/api/user";
import { fetchUserById } from "@/pages/api/user/[id]/show";
import { CustomPageProps, NextPageWithLayout } from "@/types/page";

const queryParamsSchema = z.object({
  uid: z.string(),
});

interface Props extends CustomPageProps {
  user: User;
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const params = queryParamsSchema.safeParse(ctx.params);
  if (!params.success) return { notFound: true };
  const { uid } = params.data;
  const user = await fetchUserById(uid);
  if (!user) return { notFound: true };

  return {
    props: {
      title: "Home",
      isIndex: true,
      user,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await fetchUsers();
  const paths = users
    ? users.map((user) => ({
        params: { uid: user.id },
      }))
    : [];

  return { paths, fallback: false };
};

const UserProfilePage: NextPageWithLayout<Props> = ({ user }) => {
  const [userProfile, setUserProfile] = useState<User>(user);

  return (
    <VStack maxW="4xl" w="100%" mx="auto" my="6" alignItems="stretch">
      <UserCard userProfile={userProfile} setUserProfile={setUserProfile} />
    </VStack>
  );
};

UserProfilePage.getLayout = (page) => {
  return <HeaderFooterLayout>{page}</HeaderFooterLayout>;
};

export default UserProfilePage;
