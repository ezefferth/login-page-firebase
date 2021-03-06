//import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { useState} from 'react';

import styles from './login.module.scss';

import {
  FaUserCircle,
  FaGoogle,
  FaGithub,
  FaLinkedinIn
} from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'




/* export esta abaixo */
function Login() {
  return (
    <div className={styles.container}>

      <Head>{/* head eh o titulo da aba */}
        <title>Login Page</title>
      </Head>

      <div className={styles.login}>
        <h1>Login</h1>
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
            />
          </div>{/* div input */}
        </div >{/* div inputGroup */}

        <div className={styles.forgotPassword}>
          <Link href='/recuperarSenha'>
            <span>Esqueceu a Senha?</span>
          </Link>

        </div>


        <div className={styles.button}>
          <button>Login</button>
        </div>

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
            <span>N??o possui conta?` </span>
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
