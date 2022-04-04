

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
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  unlink,
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
  SignWithGoogle: () => any;
  SignWithGithub: () => any;
  auth: any;
  authProvider: string;
  setAuthProvider: (authProvider: string) => void;
  UnlinkProvider: () => any;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  //vai receber o tipo de login em caso de provedores como google, github
  const [authProvider, setAuthProvider] = useState<string>('');


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
  async function Logout() {
    return await signOut(auth).then(() => {
      setAuthProvider('');//como fez logout entao provider eh zero
    });
  }

  /* faz o desvinculo com provedor de login */
  function UnlinkProvider() {
    console.log(authProvider);
    if (authProvider === 'google') {
      const provider = new GoogleAuthProvider();

      const user: any = auth.currentUser;

      return unlink(user, provider.providerId).then(() => {
        alert('Conta desvinculada com sucesso!')
        signOut(auth);
      }).catch((error) => {
        alert("erro ao desvincular conta, tente novamente");
        console.log('erro ao desvincular conta: ', error)
      });
    }
    else if (authProvider === 'github') {
      const provider = new GithubAuthProvider();

      const user: any = auth.currentUser;

      return unlink(user, provider.providerId).then(() => {
        alert('Conta desvinculada com sucesso!')
        signOut(auth);
      }).catch((error) => {
        alert("erro ao desvincular conta, tente novamente");
        console.log('erro ao desvincular conta: ', error)
      });
    }
  }

  function SignWithGoogle() {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);

  }
  function SignWithGithub() {
    const provider = new GithubAuthProvider();

    return signInWithPopup(auth, provider);
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      /* provedores de login, sendo varios ou 1 de password */
      user?.providerData.forEach((profile) => {
        console.log('userProvider', profile.providerId);
      });


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
        SignWithGoogle,
        SignWithGithub,
        auth,
        authProvider,
        setAuthProvider,
        UnlinkProvider,
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