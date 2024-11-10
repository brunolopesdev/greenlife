"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Link } from "@chakra-ui/next-js";
import { useUserContext } from "./context/UserContext";
import { RatingsCard } from "./components/ui/RatingsCard";
import { ServiceCard } from "./components/ui/ServiceCard";
import { Development } from "./components/Svg/Development";

export default function Home() {
  const services = [
    {
      id: 1,
      title: "Compensação de Carbono",
      img: "https://plus.unsplash.com/premium_photo-1682310562583-bfc0a85646da?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Calcule e reduza sua pegada de carbono com nossas soluções de compensação ambiental.",
    },
    {
      id: 2,
      title: "Responsabilidade Social",
      img: "https://plus.unsplash.com/premium_photo-1683121608450-08d5ee613dd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Apoie iniciativas locais e projetos sociais que impactam diretamente as comunidades.",
    },
    {
      id: 3,
      title: "Práticas Sustentáveis",
      img: "https://plus.unsplash.com/premium_photo-1678865183765-696a4b1887d5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Adote práticas sustentáveis no seu dia a dia e ganhe recompensas com o Greenlife.",
    },
  ];

  const ratings = [
    {
      id: 1,
      nota: 5,
      comentarios:
        "Incrível! A plataforma me ajudou a adotar práticas sustentáveis de forma fácil.",
    },
    {
      id: 2,
      nota: 4,
      comentarios:
        "Ótimo serviço. Agora posso acompanhar minha pegada de carbono!",
    },
    {
      id: 3,
      nota: 5,
      comentarios:
        "A Greenlife é essencial para promover a sustentabilidade no meu dia a dia.",
    },
  ];


  return (
    <Container maxW="fit" p={0}>
      <Header title="Greenlife" />

      <Box
        as="header"
        bg="gray.100"
        color="black"
        p={8}
        textAlign="center"
        shadow="md"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Development />
        <Heading as="h2">Transforme suas ações em impacto positivo!</Heading>
        <Text my={4}>
          Simplifique a adoção de práticas sustentáveis com o Greenlife.
        </Text>
        <Button colorScheme="green" bg="#4CAF50">
          Começar
        </Button>
      </Box>

      <Box py={8}>
        <Heading as="h2" textAlign="center" mb={8}>
          Serviços em destaque
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} placeItems={"center"}>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </SimpleGrid>
      </Box>

      <Box py={8}>
        <Heading as="h2" textAlign="center" mb={8}>
          Avaliações de clientes
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {ratings?.map((rating, index) => (
            <Flex gap={4} justify="center" key={rating.id}>
              <RatingsCard rating={rating} index={index} />
            </Flex>
          ))}
        </SimpleGrid>
      </Box>

      <Box py={8} bg="gray.50" borderRadius="md">
        <Heading as="h2" textAlign="center" mb={8}>
          Comece já!
        </Heading>
        <VStack spacing={4} maxW="lg" mx="auto">
          <Input placeholder="Nome completo" />
          <Input placeholder="Email" />
          <Link
            href={"/auth/login"}
            as={Button}
            colorScheme="green"
            variant="outline"
            fontWeight={700}
          >
            Enviar
          </Link>
        </VStack>
      </Box>

      <Footer />
    </Container>
  );
}
