import {
  Avatar,
  Button,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  FaEdit,
  FaGithub,
  FaInstagram,
  FaSave,
  FaTwitter,
} from "react-icons/fa";

import { BaseCard } from "@/components/card/base";
import { BASE_URL } from "@/constants/site";

interface Props {
  userProfile: User;
  setUserProfile: (user: User) => void;
}

interface NewProfile {
  name: string;
  description: string;
  twitter: string;
  instagram: string;
  github: string;
}

export const UserCard = ({ userProfile, setUserProfile }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const { id, name, image, description, twitter, instagram, github } =
    userProfile;
  const [newProfile, setNewProfile] = useState<NewProfile>({
    name: name ?? "",
    description: description ?? "",
    twitter: twitter ?? "",
    instagram: instagram ?? "",
    github: github ?? "",
  });
  const { data: session, status } = useSession();
  if (status !== "authenticated") return null;
  const currentUid = session?.user?.id;

  const save = async () => {
    const updateObj = Object.fromEntries(
      Object.entries(newProfile).map(([key, value]) => [
        key,
        value === "" ? undefined : value,
      ])
    );
    const res = await fetch(`${BASE_URL}/api/user/${id}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateObj),
    });
    if (res.ok) {
      setEditMode(false);
      setUserProfile({ ...userProfile, ...updateObj });
    }
  };

  return (
    <BaseCard>
      <HStack p="6" spacing="6" alignItems="stretch">
        <Avatar
          w="32"
          h="32"
          bgColor={image ? "transparent" : undefined}
          src={userProfile.image || undefined}
          name={name ?? undefined}
          alignItems="baseline"
          referrerPolicy="no-referrer"
        />
        <VStack alignItems="baseline" flex="1" justifyContent="center">
          {editMode ? (
            <Input
              placeholder="名前"
              size="lg"
              fontWeight="bold"
              value={newProfile.name}
              onChange={(e) =>
                setNewProfile({ ...newProfile, name: e.target.value })
              }
            />
          ) : (
            <Heading
              as="h1"
              color="gray.700"
              fontWeight="bold"
              letterSpacing="wide"
              fontSize="3xl"
            >
              {name}
            </Heading>
          )}
          {editMode ? (
            <Input
              placeholder="コメント"
              size="lg"
              fontWeight="bold"
              value={newProfile.description}
              onChange={(e) =>
                setNewProfile({ ...newProfile, description: e.target.value })
              }
            />
          ) : (
            <Text color="gray.700" fontSize="xl">
              {description}
            </Text>
          )}
          <HStack spacing="2" fontSize="1.2rem">
            <SocialLinkItem
              icon={<FaTwitter />}
              type="twitter"
              link={userProfile.twitter}
              editMode={editMode}
              newProfile={newProfile}
              setNewProfile={setNewProfile}
            />
            <SocialLinkItem
              icon={<FaInstagram />}
              type="instagram"
              link={userProfile.instagram}
              editMode={editMode}
              newProfile={newProfile}
              setNewProfile={setNewProfile}
            />
            <SocialLinkItem
              icon={<FaGithub />}
              type="github"
              link={userProfile.github}
              editMode={editMode}
              newProfile={newProfile}
              setNewProfile={setNewProfile}
            />
          </HStack>
        </VStack>
        {currentUid === id && (
          <ActionButton
            editMode={editMode}
            setEditMode={setEditMode}
            save={save}
          />
        )}
      </HStack>
    </BaseCard>
  );
};

const ActionButton = ({
  editMode,
  setEditMode,
  save,
}: {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  save: () => void;
}) => (
  <VStack justify={editMode ? "flex-end" : "flex-start"}>
    <Button
      leftIcon={editMode ? <FaSave /> : <FaEdit />}
      colorScheme="brand"
      variant={editMode ? "solid" : "outline"}
      size="md"
      onClick={() => {
        setEditMode(!editMode);
        editMode && save();
      }}
    >
      {editMode ? "Save" : "Edit"}
    </Button>
  </VStack>
);

const SocialLinkItem = ({
  icon,
  type,
  link,
  editMode,
  newProfile,
  setNewProfile,
}: {
  icon: JSX.Element;
  type: "twitter" | "instagram" | "github";
  link: string | null;
  editMode: boolean;
  newProfile: NewProfile;
  setNewProfile: (newProfile: NewProfile) => void;
}) => {
  if (editMode) {
    return (
      <HStack spacing="2">
        {icon}
        <Input
          placeholder={`${type} link`}
          value={newProfile[type]}
          onChange={(e) =>
            setNewProfile({ ...newProfile, [type]: e.target.value })
          }
        />
      </HStack>
    );
  }

  if (!link) return null;

  return (
    <Link href={link} isExternal>
      <HStack spacing="2">
        {icon}
        <Text>{link}</Text>
      </HStack>
    </Link>
  );
};
