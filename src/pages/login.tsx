import { Box, VStack } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

import { GoogleIcon } from "@/components/icon/google";
import { TwitterIcon } from "@/components/icon/twitter";
import VanillaLayout from "@/components/layouts/vanilla";
import { LoginSection } from "@/components/login/section";
import { Title } from "@/components/title";
import { NextPageWithLayout } from "@/types/page";

const Login: NextPageWithLayout = () => {
  return (
    <Box
      bgGradient={["linear(to-r, #6e9cc7, #b6ffd1)"]}
      w="100%"
      h="100vh"
      pos="fixed"
      top="0"
      left="0"
    >
      <VStack
        w="sm"
        h="fit-content"
        bg="rgba(255, 255, 255, 0.5)"
        borderRadius="lg"
        p="4"
        pos="absolute"
        top="50%"
        left="50%"
        gap="4"
        transform="translate(-50%, -50%)"
      >
        <Title />
        <LoginSection
          text="Google"
          icon={<GoogleIcon />}
          onClick={() => signIn("google", { callbackUrl: "/" })}
        />
        <LoginSection
          text="Twitter"
          icon={<TwitterIcon />}
          onClick={() => signIn("twitter", { callbackUrl: "/" })}
        />
      </VStack>
    </Box>
  );
};

Login.getLayout = (page) => <VanillaLayout>{page}</VanillaLayout>;

export default Login;
