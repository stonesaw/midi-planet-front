import { GetStaticPaths, GetStaticProps } from "next";
import * as z from "zod";

import HeaderFooterLayout from "@/components/layouts/headerFooter";
import { fetchUsers } from "@/pages/api/user";
import { fetchUserById } from "@/pages/api/user/[id]/show";
import { CustomPageProps, NextPageWithLayout } from "@/types/page";

const queryParamsSchema = z.object({
  uid: z.string(),
});

export const getStaticProps: GetStaticProps<CustomPageProps> = async (ctx) => {
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

const UserProfilePage: NextPageWithLayout = () => {
  return <div></div>;
};

UserProfilePage.getLayout = (page) => {
  return <HeaderFooterLayout>{page}</HeaderFooterLayout>;
};

export default UserProfilePage;
