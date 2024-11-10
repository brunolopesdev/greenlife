"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useUserContext } from "../context/UserContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { GiftSvg } from "../components/Svg/Gift";


export default function Loja() {
  const prizes = [
    {
      id: 1,
      title: "Vale Presente Amazon",
      description: "Troque seus pontos por um vale presente da Amazon.",
      pointsRequired: 500,
      imageUrl:
        "https://via.placeholder.com/300x200.png?text=Vale+Presente+Amazon",
    },
    {
      id: 2,
      title: "Vale Presente iTunes",
      description: "Troque seus pontos por um vale presente do iTunes.",
      pointsRequired: 300,
      imageUrl:
        "https://via.placeholder.com/300x200.png?text=Vale+Presente+iTunes",
    },
    {
      id: 3,
      title: "Assinatura Spotify",
      description: "Troque seus pontos por uma assinatura premium do Spotify.",
      pointsRequired: 800,
      imageUrl:
        "https://via.placeholder.com/300x200.png?text=Assinatura+Spotify",
    },
    {
      id: 4,
      title: "Kit Sustentável",
      description: "Receba um kit sustentável com itens ecológicos.",
      pointsRequired: 600,
      imageUrl:
        "https://via.placeholder.com/300x200.png?text=Kit+Sustent%C3%A1vel",
    },
    {
      id: 5,
      title: "Camiseta Ecológica",
      description: "Troque seus pontos por uma camiseta ecológica.",
      pointsRequired: 400,
      imageUrl:
        "https://via.placeholder.com/300x200.png?text=Camiseta+Ecol%C3%B3gica",
    },
    {
      id: 6,
      title: "Garrafas Reutilizáveis",
      description:
        "Ganhe garrafas reutilizáveis para reduzir o consumo de plástico.",
      pointsRequired: 250,
      imageUrl:
        "https://via.placeholder.com/300x200.png?text=Garrafas+Reutiliz%C3%A1veis",
    },
    {
      id: 7,
      title: "Assinatura Netflix",
      description: "Troque seus pontos por uma assinatura da Netflix.",
      pointsRequired: 1000,
      imageUrl:
        "https://via.placeholder.com/300x200.png?text=Assinatura+Netflix",
    },
    {
      id: 8,
      title: "Vale Restaurante",
      description: "Troque seus pontos por um vale presente de restaurante.",
      pointsRequired: 700,
      imageUrl: "https://via.placeholder.com/300x200.png?text=Vale+Restaurante",
    },
    {
      id: 9,
      title: "Assinatura Kindle",
      description: "Ganhe uma assinatura Kindle com seus pontos.",
      pointsRequired: 1200,
      imageUrl:
        "https://via.placeholder.com/300x200.png?text=Assinatura+Kindle",
    },
    {
      id: 10,
      title: "Curso Online",
      description:
        "Troque seus pontos por um curso online sobre sustentabilidade.",
      pointsRequired: 1000,
      imageUrl: "https://via.placeholder.com/300x200.png?text=Curso+Online",
    },
  ];

  const { user } = useUserContext();

  return (
    <Container maxW="fit" p={0}>
      <Header title="Loja de Recompensas" />

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
        <GiftSvg />
        <Heading as="h2">Troque seus pontos por prêmios incríveis!</Heading>
        <Text my={4}>
          Escolha entre diversos prêmios e produtos para resgatar seus pontos.
        </Text>
      </Box>

      <Box py={8}>
        <Heading as="h2" textAlign="center" mb={8}>
          Prêmios disponíveis
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8} p={8} placeItems={'center'}>
          {prizes.map((prize) => (
            <Box
              key={prize.id}
              borderWidth={1}
              borderRadius="md"
              overflow="hidden"
              boxShadow="lg"
              p={4}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              maxW={'md'}
            >
              <img src={prize.imageUrl} alt={prize.title} />
              <Heading as="h3" size="md" mt={4}>
                {prize.title}
              </Heading>
              <Text mt={2} fontSize="sm">
                {prize.description}
              </Text>
              <Text fontSize="xl" fontWeight="bold" mt={2}>
                {prize.pointsRequired} Pontos
              </Text>
              <Button
                mt={4}
                colorScheme="green"
                isDisabled={(user?.points ?? 0) < prize.pointsRequired}
              >
                {(user?.points ?? 0) >= prize.pointsRequired
                  ? "Resgatar"
                  : "Pontos insuficientes"}
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Footer />
    </Container>
  );
}
