"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  HStack,
  Container,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useUserContext } from "../context/UserContext";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";

export interface User {
  id: number;
  nome: string;
  email: string;
  type: string;
  telefone: string;
  points: number;
}

const ProfilePage = () => {
  const toast = useToast();
  const { user, updateUser } = useUserContext();
  const [isSaving, setIsSaving] = useState(false);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const [updatedUser, setUpdatedUser] = useState<User>({
    id: user?.id || 0,
    nome: user?.name || "",
    email: user?.email || "",
    type: user?.type || "",
    telefone: user?.phone?.toString() || "",
    points: user?.points || 0,
  });

  const niveis = [
    { nome: "Iniciante ESG", pontos: 0 },
    { nome: "Explorador ESG", pontos: 500 },
    { nome: "Guia ESG", pontos: 1000 },
    { nome: "Embaixador ESG", pontos: 2000 },
  ];

  const badges = [
    {
      id: 1,
      nome: "Primeiro Passo",
      descricao: "Você deu seu primeiro passo no ESG!",
      pontos: 0,
    },
    {
      id: 2,
      nome: "Persistente",
      descricao: "Você alcançou 500 pontos em ESG!",
      pontos: 500,
    },
    {
      id: 3,
      nome: "Avançado",
      descricao: "Parabéns por alcançar 1000 pontos em ESG!",
      pontos: 1000,
    },
    {
      id: 4,
      nome: "Mestre ESG",
      descricao: "Você é um verdadeiro Embaixador ESG com 2000 pontos!",
      pontos: 2000,
    },
  ];

  function calcularNivel(pontosTotais: number) {
    return niveis.reduce((nivelAtual, nivel) => {
      return pontosTotais >= nivel.pontos ? nivel : nivelAtual;
    }, niveis[0]);
  }

  const handleInputChange = useCallback(
    (field: keyof User) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setUpdatedUser((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    if (!updatedUser.nome || !updatedUser.email || !updatedUser.telefone) {
      toast({
        title: "Erro",
        description: "Todos os campos devem ser preenchidos.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await updateUser({
        ...updatedUser,
        telefone: Number(updatedUser.telefone),
      });
      toast({
        title: "Sucesso",
        description: "Usuário atualizado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar usuário.",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  }, [updatedUser]);

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/api/profile/delete/user?id=${user?.id}`);
      toast({
        title: "Usuário excluído com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir usuário.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    onDeleteModalClose();
  };

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        id: user.id,
        nome: user.name,
        email: user.email,
        type: user.type,
        telefone: user.phone.toString(),
        points: user.points ?? 0,
      });
    }
  }, [user]);

  return (
    <Container minH="100vh" maxW="fit" p={0}>
      <Header title="Perfil" />

      <Box mt={8} textAlign="center">
        <Heading size="lg">
          Nível Atual: {calcularNivel(user?.points ?? 0).nome}
        </Heading>
        <Text mt={2}>Pontos Totais: {user?.points}</Text>
      </Box>

      <Box mt={4} p={8}>
        <Heading size="md">Conquistas</Heading>
        <SimpleGrid columns={3} spacing={4} mt={2}>
          {badges
            .filter((badge) => (user?.points ?? 0) >= badge.pontos)
            .map((badge) => (
              <Badge key={badge.id} colorScheme="green" p={2} borderRadius="lg">
                <Text fontWeight="bold">{badge.nome}</Text>
                <Text fontSize="sm">{badge.descricao}</Text>
              </Badge>
            ))}
        </SimpleGrid>
      </Box>

      <Box bg="white" borderRadius="md" shadow="md">
        <Flex bg="gray.100" align="center" mb={4} p={4}>
          <Avatar size="xl" name={user?.name} src="" />
          <VStack align="start" ml={4}>
            <Heading size="md">{user?.name}</Heading>
            <Text color="gray.500">Detalhes do Perfil</Text>
          </VStack>
          <VStack ml="auto">
            <Button colorScheme="blue" size={"sm"}>
              Editar Perfil
            </Button>
            <Button colorScheme="red" size={"sm"} onClick={onDeleteModalOpen}>
              Excluir Perfil
            </Button>
          </VStack>
        </Flex>

        <Heading size="md" mb={4} p={4}>
          Informações Pessoais
        </Heading>
        <Text mb={4} p={4}>
          Atualize suas informações
        </Text>
        <VStack spacing={4} align="stretch" p={4}>
          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                placeholder="Digite seu novo e-mail"
                value={updatedUser.email}
                onChange={handleInputChange("email")}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                placeholder="Digite seu nome"
                value={updatedUser.nome}
                onChange={handleInputChange("nome")}
              />
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Telefone</FormLabel>
              <Input
                type="tel"
                placeholder="Telefone"
                value={updatedUser.telefone}
                onChange={handleInputChange("telefone")}
              />
            </FormControl>
          </HStack>
          <Button colorScheme="green" onClick={handleSave} isLoading={isSaving}>
            Salvar alterações
          </Button>
        </VStack>
      </Box>

      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir Perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Tem certeza que deseja excluir o perfil? Esta ação não pode ser
              desfeita.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDeleteUser}>
              Sim, Excluir
            </Button>
            <Button variant="ghost" onClick={onDeleteModalClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </Container>
  );
};

export default ProfilePage;
