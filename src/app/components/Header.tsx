import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { Link } from "@chakra-ui/next-js";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  IconButton,
  Stack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
  Image,
  Button,
} from "@chakra-ui/react";
import { useUserContext } from "../context/UserContext";
import { HamburgerIcon } from "@chakra-ui/icons";
import Logo from "src/app/assets/images/logo.png";
import { RegistrationModal } from "./RegistrationModal"; // Importando o modal de registro

interface Props {
  title: string;
}

export const Header = ({ title }: Props) => {
  const { user } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: openRegistrationModal,
    onOpen: openRegistrationModalHandler,
    onClose: onCloseRegistrationModal,
  } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      as="nav"
      bg="#53ba83"
      color="white"
      p={4}
      alignItems="center"
      justifyContent={"space-evenly"}
    >
      <Heading
        as="h1"
        size="lg"
        letterSpacing="tight"
        display={"flex"}
        alignItems={"center"}
        gap={5}
      >
        <Image
          src={Logo.src}
          alt="Logo"
          width="100px"
          height={"100px"}
          borderRadius={"50%"}
        />
        {title}
      </Heading>
      <Spacer />
      {isMobile ? (
        <>
          <IconButton
            aria-label="Abrir menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="outline"
            colorScheme="whiteAlpha"
            mr={4}
          />

          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>

              <DrawerBody>
                <Stack as="ul" spacing={4} listStyleType="none">
                  <li>
                    <Link href="/" onClick={onClose}>
                      Início
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" onClick={onClose}>
                      Suporte
                    </Link>
                  </li>

                  {user ? (
                    <>
                      <Link href="/inputs" onClick={onClose}>
                        Atividades
                      </Link>

                      <Link href="/store" onClick={onClose}>
                        Loja
                      </Link>

                      {user.type === "administrador" && (
                        <Button
                          colorScheme="teal"
                          variant="ghost"
                          onClick={openRegistrationModalHandler}
                        >
                          Criar Usuário
                        </Button>
                      )}

                      <li>
                        <Flex align="center">
                          <Avatar name={user.name} src="" bg="#86a6d7" />
                          <Box ml="3">
                            <Text fontWeight="bold" textTransform="capitalize">
                              {user.name}
                            </Text>
                            <Text>pontuação: {user.points}</Text>
                            <Text
                              fontSize="sm"
                              cursor="pointer"
                              onClick={() =>
                                signOut({ callbackUrl: "/auth/login" })
                              }
                            >
                              Sair
                            </Text>
                          </Box>
                        </Flex>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link href="/auth/login" onClick={onClose}>
                        Login
                      </Link>
                    </li>
                  )}
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <HStack as="ul" spacing={6} listStyleType="none" fontWeight={700}>
          <li>
            <Link href="/">Início</Link>
          </li>
          <li>
            <Link href="/support">Suporte</Link>
          </li>
          {user ? (
            <>
              <Link href="/inputs" onClick={onClose}>
                Atividades
              </Link>

              <Link href="/store" onClick={onClose}>
                Loja
              </Link>

              {user.type === "administrador" && (
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  onClick={openRegistrationModalHandler}
                >
                  Criar Usuário
                </Button>
              )}

              <Flex>
                <Link href={"/profile"}>
                  <Avatar name={user.name} src="" bg="#86a6d7" />
                </Link>
                <Box ml="3">
                  <Text fontWeight="bold" textTransform="capitalize">
                    {user.name}
                  </Text>
                  <Text fontSize={"10px"}>pontuação: {user.points}</Text>
                  <Text
                    fontSize="sm"
                    cursor="pointer"
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  >
                    Sair
                  </Text>
                </Box>
              </Flex>
            </>
          ) : (
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
          )}
        </HStack>
      )}

      <RegistrationModal
        isOpen={openRegistrationModal}
        onClose={onCloseRegistrationModal}
      />
    </Flex>
  );
};
