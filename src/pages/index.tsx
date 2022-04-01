//import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import styles from './login.module.scss';


import { unlink, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

import {
  FaUserCircle,
  FaGoogle,
  FaGithub,
  FaLinkedinIn
} from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'

import { useAuth } from '../components/context/authContext';
import Firebase from '../components/firebase/firebase';


/* export esta abaixo */
function Login() {

  const {
    Login,
    SignWithGoogle,
    SignWithGithub,
    currentUser,
    auth
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    /* se existe current user quer dizer que ja estava logado */
    if (currentUser) {
      router.push('/home');
    }
  }, [currentUser]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  /* prompt error do github */
  function promptUserForPassword() {

    const senha = window.prompt('Digite sua Senha:');

    if (senha !== null || senha !== '') {
      return setPassword(senha!);
    }
  }
  function getProviderForProviderId(id: any) {
    switch (id) {
      case auth.GitubAuthProvider.PROVIDER_ID:
        return new GithubAuthProvider();

      case auth.GoogleAuthProvider.PROVIDER_ID:
        return new GoogleAuthProvider();
    }
  }

  async function handleLogin(e: any) {
    e.preventDefault();

    try {
      await Login(email, password).then(() => {
        router.push('/home');
        return <>Loading...</>
      }).catch((error: any) => {
        alert('Erro ao realizar o login, tente novamente!');
        console.log('erro no login', error);//faz o console do erro
      })
    } catch {//da o alert do erro
      alert('Erro ao realizar o login, tente novamente!');
    }
  }

  async function handleLoginGoogle() {
    try {
      await SignWithGoogle().then(() => {
        router.push('/home');
        return <>loading...</>
      }).catch((error: any) => {
        alert('Erro ao realizar o login, tente novamente!');
        console.log('Erro no login with google', error)
      })
    }
    catch {
      console.log('Erro no login with google');
    }
  }
  async function handleLoginGithub() {
    try {
      await SignWithGithub().then(() => {
        router.push('/home');
      }).catch((error: any) => {
        console.log(error.customData);
        console.log('error.credential: ',GithubAuthProvider.credentialFromError(error));

        const credential: any = GithubAuthProvider.credentialFromError(error.credential);

        const email = error.customData.email;

        if (error.code === 'auth/account-exists-with-different-credential') {

          alert('Esta email já possui cadastro');
        }
      });


    }
    catch {
      console.log('Erro no login with github');
    }
  }


  return (
    <div className={styles.container}>

      <Head>{/* head eh o titulo da aba */}
        <title>Login Page</title>
      </Head>

      <div className={styles.login}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <div className={styles.inputs}>
              <span
              /*  data-bs-toggle="tooltip"
               data-bs-placement="top"
               title="Tooltip on top" */
              >
                <FaUserCircle
                  className={styles.icon}
                  size={'1.4rem'}
                />
              </span>
              <input
                className={styles.input}
                placeholder='Email'
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div >
            <div className={styles.inputs}>
              <span>
                <RiLockPasswordFill
                  className={styles.icon}
                  size={'1.4rem'}
                />
              </span>
              <input
                className={styles.input}
                placeholder='Senha'
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>{/* div input */}
          </div >{/* div inputGroup */}
          <div className={styles.forgotPassword}>
            <Link href='/recuperarSenha'>
              <span>Esqueceu a Senha?</span>
            </Link>

          </div>


          <div className={styles.button}>
            <button type='submit'>Login</button>
          </div>
        </form>



        {/* div dos icons de login rede social */}
        <div className={styles.loginWith}>

          <span className={styles.spanLoginWith}>Logar com</span>
          <div>
            <span>
              <FaGoogle
                size={'1.25rem'}
                className={styles.iconLoginGoo}
                onClick={handleLoginGoogle}

              />
            </span>
            <span>
              <FaLinkedinIn
                size={'1.4rem'}
                className={styles.iconLoginLink}
              />
            </span>
            <span>
              <FaGithub
                size={'1.4rem'}
                className={styles.iconLoginGit}
                onClick={handleLoginGithub}
              />
            </span>
          </div>
        </div>


        <div className={styles.createAccount}>
          <div>
            <span>Não possui conta?` </span>
            <Link href='/cadastro'>

              <p>Cadastre-se</p>
            </Link>
          </div>

        </div>


      </div>{/* div login */}
      {/* container end*/}
    </div>
  )
}

export default Login


/*

if (error.code === 'auth/account-exists-with-different-credential') {
          // User's email already exists.
          // The pending GitHub credential.
          var pendingCred = error.credential;
          // The provider account's email address.
          var email = error.email;
          // Get sign-in methods for this email.
          fetchSignInMethodsForEmail(auth, email).then(function (methods) {
            if (methods[0] === 'password') {
              // Asks the user their password.
              // In real scenario, you should handle this asynchronously.
              var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
              auth.signInWithEmailAndPassword(email, password).then(function (result: any) {
                // Step 4a.
                return result.user.linkWithCredential(pendingCred);
              }).then(function () {
                // GitHub account successfully linked to the existing Firebase user.
                router.push('/home');
              });
              return;

            }
             var provider = getProviderForProviderId(methods[0]);

            auth.signInWithPopup(provider).then(function (result: any) {
              result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function (usercred: any) {
                // Google account successfully linked to the existing Firebase user.
                router.push('/home');
              });
            }); 
          })
        } */