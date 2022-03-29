


import {
  createContext,
  useState,
  ReactNode,
  useContext
} from "react";


export const AuthContext = createContext({});

type AuthContextProviderProps = {
  /* ReactNode, vem de dentro do proprio
  react feita para isso quando nao se sabe
  o conteudo que tem ou que pode ter, 
  qualquer coisa que react aceitaria como conteudo JSX*/
  children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {



}