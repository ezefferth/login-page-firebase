
import Firebase from '../firebase/firebase';

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect

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


  const auth = getAuth(Firebase);

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

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
      setCurrentUser(user)
      setLoading(false)

    })

    return unsubscribe //quando
  }, [auth])

  return (
    <AuthContext.Provider
      value={{
        SignUp,
        Login,
        Logout
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