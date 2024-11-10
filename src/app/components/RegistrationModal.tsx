import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal = ({ isOpen, onClose }: Props) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    password: "",
    tipo_usuario: "colaborador",
    data_registro: new Date(),
  });
  const [error, setError] = useState({
    message: "",
    status: false,
  });
  const [success, setSuccess] = useState(false);

  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      message: "",
      status: false,
    });
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.nome ||
      !formData.email ||
      !formData.telefone ||
      !formData.password
    ) {
      setError({
        message: "Todos os campos são obrigatórios!",
        status: true,
      });
      return;
    }

    try {
      const { data } = await axios.post(`/api/registration`, {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        password: formData.password,
        data_registro: formData.data_registro,
        tipo_usuario: formData.tipo_usuario,
      });

      setSuccess(true);
      toast({
        title: "Usuário cadastrado com sucesso.",
        description: "O novo usuário foi criado.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      setSuccess(false);
      toast({
        title: "Erro ao cadastrar usuário.",
        description: "Houve um erro durante o cadastro do usuário.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar Novo Usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4} isInvalid={error.status}>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
            {error.status && (
              <FormErrorMessage>{error.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mb={4} isInvalid={error.status}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {error.status && (
              <FormErrorMessage>{error.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mb={4} isInvalid={error.status}>
            <FormLabel>Telefone</FormLabel>
            <Input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
            />
            {error.status && (
              <FormErrorMessage>{error.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mb={4} isInvalid={error.status}>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {error.status && (
              <FormErrorMessage>{error.message}</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={handleSubmit}>
            Cadastrar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
