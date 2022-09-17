import HeaderFooterLayout from "@/components/layouts/headerFooter";
import { NextPageWithLayout } from "@/types/page";

const UserProfilePage: NextPageWithLayout = () => {
  return <div>Profile Page</div>;
};

UserProfilePage.getLayout = (page) => {
  return <HeaderFooterLayout>{page}</HeaderFooterLayout>;
};

export default UserProfilePage;
