import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import * as z from "zod";

import { IProjectCreateOutput } from "@/pages/api/project/create";

interface NewProject {
  title: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const createProjectSchema = z.object({
  title: z.string().min(1).max(50),
});

export const CreateProjectModal = ({ isOpen, onClose }: Props) => {
  const initialProject: NewProject = { title: "" };
  const router = useRouter();
  const [newProject, setNewProject] = useState<NewProject>(initialProject);
  const [error, setError] = useState<boolean>(false);

  const closeModal = () => {
    onClose();
    setNewProject(initialProject);
    setError(false);
  };

  const submit = async () => {
    const validated = createProjectSchema.safeParse(newProject);
    if (!validated.success) return setError(true);
    setError(false);
    const res = await fetch("/api/project/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });
    if (res.ok) {
      const data: IProjectCreateOutput = await res.json();
      setNewProject(initialProject);
      router.push(`/editor/?projectId=${data.id}`);
    }
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>新規プロジェクト作成</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={error}>
            <FormLabel>プロジェクト名</FormLabel>
            <Input
              value={newProject.title}
              onChange={(e) => setNewProject({ title: e.target.value })}
            />
            {!error ? (
              <FormHelperText>
                プロジェクト名を入力してください。プロジェクト名は後から変更できます。
              </FormHelperText>
            ) : (
              <FormErrorMessage>
                プロジェクト名は1文字以上50文字以下で入力してください。
              </FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <HStack spacing="4">
            <Button colorScheme="brand" mr={3} onClick={submit}>
              作成
            </Button>
            <Button variant="ghost" onClick={() => closeModal()}>
              キャンセル
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
