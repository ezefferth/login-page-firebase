

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect

} from "react";

import Firebase from '../firebase/firebase';
/* funcoes do firebase para exportar como context */
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";




type AuthContextProviderProps = {
  /* ReactNode, vem de dentro do proprio
  react feita para isso quando nao se sabe
  o conteudo que tem ou que pode ter, 
  qualquer coisa que react aceitaria como conteudo JSX*/
  children: ReactNode;
}

/* como boas praticas de typagem, eh importante definir cada tipo para as variaveis
isso ajuda em varios casos onde vc nao sabe oque pode vir ou ir, e isso define como
eles deveriam se comportar, logo para cada dado do context definimos seu tipo
*/

type AuthContextData = {
  loading: boolean,
  currentUser: any,
  SignUp: (email: string, password: string) => any;//vai retornar alguma coisa, nesse caso se deu certo ou errado
  Login: (email: string, password: string) => any;//vai retornar alguma coisa, nesse caso se deu certo ou errado
  Logout: () => any; //funcao vazia que retorna se deu certo
  auth: any;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  //recebe todas as propriedades ao chamar getAuth, podendo entao...
  //...receber os users do Firebase
  const auth = getAuth(Firebase);

  //<any> pois nao se sabe oque pode vir, sendo o current user ou nada
  const [currentUser, setCurrentUser] = useState<any>();
  //boolean
  const [loading, setLoading] = useState<boolean>(true);

  //SignUp
  function SignUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  //Login
  function Login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }
  //Logout
  function Logout() {
    return signOut(auth)
  }

  /*  
      function ResetPassword(email) {
          return auth.sendPasswordResetEmail(email)
      }
   
      function UpdateEmail(email) {
          return currentUser.updateEmail(email)
      }
   
      function UpdatePassword(password) {
          return currentUser.updatePassword(password)
      } */


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

    });

    return unsubscribe //quando auth mudar, ou seja, se ele receber um currentUser
    //ou se ele na otiver nd, ele vai alterar
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        SignUp,
        Login,
        Logout,
        auth
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