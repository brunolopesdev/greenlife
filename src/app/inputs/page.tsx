"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Stack,
  Progress,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Activity } from "../components/Svg/Activity";

interface AtividadeESG {
  id: number;
  usuarioId: number;
  data_envio: Date;
  tipo_atividade: string;
  descricao: string;
  impacto?: string;
  status: string;
  pontuacao?: number;
}

const tipoAtividadeConfig: {
  [key: string]: { impacto: string; pontuacao: number };
} = {
  "Plantio de Árvores": { impacto: "Alto", pontuacao: 100 },
  "Coleta de Lixo": { impacto: "Médio", pontuacao: 50 },
  "Educação Ambiental": { impacto: "Baixo", pontuacao: 30 },
  "Reciclagem de Plásticos": { impacto: "Alto", pontuacao: 80 },
  "Palestra de Conscientização": { impacto: "Médio", pontuacao: 40 },
  "Horta Comunitária": { impacto: "Alto", pontuacao: 90 },
  "Redução de Desperdício de Água": { impacto: "Médio", pontuacao: 60 },
  "Doação de Roupas": { impacto: "Baixo", pontuacao: 20 },
  "Limpeza de Praia": { impacto: "Alto", pontuacao: 100 },
  "Campanha de Reciclagem": { impacto: "Médio", pontuacao: 70 },
};

export default function AtividadesPage() {
  const { user, inputs, userInputs, addActivity } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [newActivity, setNewActivity] = useState({
    data_envio: new Date(),
    tipo_atividade: "",
    descricao: "",
    impacto: "",
    pontuacao: 0,
  });

  // Gamificação
  const [userLevel, setUserLevel] = useState(1);
  const [pointsForNextLevel, setPointsForNextLevel] = useState(500);

  useEffect(() => {
    // Calcular nível com base nos pontos acumulados do usuário
    const calculateLevel = () => {
      const totalPoints = userInputs.reduce(
        (sum, activity) => sum + (activity.pontuacao || 0),
        0
      );
      const newLevel = Math.floor(totalPoints / 500) + 1;
      setUserLevel(newLevel);
      setPointsForNextLevel(newLevel * 500 - totalPoints);
    };
    calculateLevel();
  }, [userInputs]);

  const handleAddActivity = () => {
    // Verifique o ciclo de 3 meses antes de adicionar a nova atividade
    const cicloDe3Meses = new Date();
    cicloDe3Meses.setMonth(cicloDe3Meses.getMonth() - 3);

    addActivity({
      ...newActivity,
      usuarioId: user?.id,
      status: "pendente",
      data_envio: newActivity.data_envio || new Date(),
    });

    onClose();
    toast({
      title: "Nova atividade adicionada!",
      description: `Você ganhou ${newActivity.pontuacao} pontos!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleTipoAtividadeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const tipoAtividade = e.target.value;
    setNewActivity({
      ...newActivity,
      tipo_atividade: tipoAtividade,
      impacto: tipoAtividadeConfig[tipoAtividade]?.impacto ?? "",
      pontuacao: tipoAtividadeConfig[tipoAtividade]?.pontuacao || 0,
    });
  };

  return (
    <Container maxW="fit" p={0}>
      <Header title="Atividades" />

      <Box
        as="header"
        bg="gray.100"
        color="black"
        p={8}
        textAlign="center"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Activity />
        <Heading as="h2">
          Aqui você pode registrar e consultar todas as atividades!
        </Heading>
        <Text fontSize="lg" mt={4}>
          Nível: {userLevel}
        </Text>
        <Progress
          colorScheme="teal"
          size="lg"
          value={(500 - pointsForNextLevel) / 5}
          max={100}
          mt={2}
        />
        <Text fontSize="sm" color="gray.500">
          Pontos para o próximo nível: {pointsForNextLevel}
        </Text>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={8}
      >
        <Box mb={8} py={8} width="100%" p={8}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {userInputs.length > 0 &&
              userInputs.map((activity: AtividadeESG) => (
                <Box
                  key={activity.id}
                  p={4}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="lg"
                >
                  <Text fontWeight="bold">{activity.tipo_atividade}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(activity.data_envio).toLocaleDateString()}
                  </Text>
                  <Text mt={2}>{activity.descricao}</Text>
                  <Text fontSize="sm" color="blue.500" mt={2}>
                    Impacto: {activity.impacto || "Não especificado"}
                  </Text>
                  <Text fontSize="sm" color="green.500">
                    pontuação: {activity.pontuacao}
                  </Text>
                </Box>
              ))}
          </SimpleGrid>
        </Box>

        <Button colorScheme="teal" onClick={onOpen} mb={6}>
          Adicionar Atividade
        </Button>

        <Heading mt={12} mb={6} textAlign="center">
          Atividades de Outros Usuários
        </Heading>

        <Box py={8} width="100%" p={8}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {inputs.length > 0 &&
              inputs.map((activity: AtividadeESG) => (
                <Box
                  key={activity.id}
                  p={4}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="lg"
                >
                  <Text fontWeight="bold">{activity.tipo_atividade}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(activity.data_envio).toLocaleDateString()}
                  </Text>
                  <Text mt={2}>{activity.descricao}</Text>
                  <Text fontSize="sm" color="blue.500" mt={2}>
                    Impacto: {activity.impacto || "Não especificado"}
                  </Text>
                  <Text fontSize="sm" color="green.500">
                    pontuação: {activity.pontuacao}
                  </Text>
                </Box>
              ))}
          </SimpleGrid>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Nova Atividade ESG</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Tipo de Atividade</FormLabel>
                <Select
                  placeholder="Selecione o tipo de atividade"
                  value={newActivity.tipo_atividade}
                  onChange={handleTipoAtividadeChange}
                >
                  {Object.keys(tipoAtividadeConfig).map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  placeholder="Descreva a atividade realizada"
                  value={newActivity.descricao}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      descricao: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleAddActivity}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </Container>
  );
}
