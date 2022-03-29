


import {
  createContext,
  useState,
  ReactNode,
  useContext
} from "react";

/* funcoes do firebase para exportar como context */
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";


export const AuthContext = createContext({});

type AuthContextProviderProps = {
  /* ReactNode, vem de dentro do proprio
  react feita para isso quando nao se sabe
  o conteudo que tem ou que pode ter, 
  qualquer coisa que react aceitaria como conteudo JSX*/
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {



  return (
    <AuthContext.Provider
      value={{

      }}
    >
      {children}
    </AuthContext.Provider>
  )

}


export const useAuth = () => {
  /* usar useAuth nas importacoes ira ajudar a escrever menos */
  return useContext(AuthContext);
}