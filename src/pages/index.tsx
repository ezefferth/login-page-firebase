//import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import styles from './login.module.scss';

import {
  FaUserCircle,
  FaGoogle,
  FaGithub,
  FaLinkedinIn
} from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'

import { useAuth } from '../components/context/authContext';


/* export esta abaixo */
function Login() {

  const {
    Login,
    currentUser
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
