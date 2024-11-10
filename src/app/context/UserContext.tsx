import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

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

interface UserContextType {
  user: {
    id: number;
    name: string;
    email: string;
    type: string;
    phone: number;
    activities?: AtividadeESG[];
    points?: number;
  } | null;
  setUser: (
    user: {
      id: number;
      name: string;
      email: string;
      type: string;
      phone: number;
      points?: number;
    } | null
  ) => void;
  updateUser: (user: {
    id: number;
    nome: string;
    email: string;
    type: string;
    telefone: number;
  }) => void;
  otherUsersActivities: () => void;
  addActivity: (activityData: Partial<AtividadeESG>) => Promise<void>;
  inputs: AtividadeESG[];
  userInputs: AtividadeESG[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserContextType["user"]>(null);
  const [inputs, setInputs] = useState<AtividadeESG[]>([]);
  const [userInputs, setUserInputs] = useState<AtividadeESG[]>([]);

  const updateUser = async (user: {
    id: number;
    nome: string;
    email: string;
    type: string;
    telefone: number;
  }) => {
    await axios.put(`/api/profile/update/user?id=${user.id}`, user);
  };

  const getUserInputs = async (id: number) => {
    const { data } = await axios.get(`/api/inputs/user-inputs?id=${id}`);

    setUserInputs(data.data.atividades);
  }

  const otherUsersActivities = async () => {
    const { data } = await axios.get(`/api/inputs`);

    console.log(data);

    setInputs(data.data);
  };

  const addActivity = async (activityData: Partial<AtividadeESG>) => {
    await axios.post("/api/inputs/create-input", {
      ...activityData,
      usuarioId: user?.id,
      data_envio: new Date(),
      status: "pendente",
    });
  };

  useEffect(() => {
    if (user) {
      getUserInputs(user.id);
    }
  }, [user]);

  useEffect(() => {
    otherUsersActivities();
    if (session && !user) {
      console.log(session);
      setUser({
        id: session.user.id,
        phone: session.user.telefone,
        name: session.user.nome,
        email: session.user.email,
        type: session.user.tipo_usuario,
        points: session.user.pontuacao,
      });
    }
  }, [session]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        otherUsersActivities,
        addActivity,
        inputs,
        userInputs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
