//import type { NextPage } from 'next'
import Head from 'next/head'

//import Image from 'next/image'
import styles from './login.module.scss';

import {
  FaUserCircle,
  FaGoogle,
  FaGithub,
  FaLinkedinIn
} from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'





function Home() {
  return (
    <div className={styles.container}>

      <Head>{/* head eh o titulo da aba */}
        <title>Login Page Firebase</title>
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
              placeholder='Password'
              type="password"
            />
          </div>{/* div input */}
        </div >{/* div inputGroup */}

        <div className={styles.forgotPassword}>
          <span>Forgot Password</span>
        </div>


        <div className={styles.button}>
          <button>Login</button>
        </div>

        {/* div dos icons de login rede social */}
        <div className={styles.loginWith}>
          <span>
            <FaGoogle
              size={'1.25rem'}
              className={styles.iconLogin}

            />
          </span>
          <span>
            <FaLinkedinIn
              size={'1.4rem'}
              className={styles.iconLogin}
            />
          </span>
          <span>
            <FaGithub
              size={'1.4rem'}
              className={styles.iconLogin}
            />
          </span>
        </div>

        <div className={styles.createAccount}>
          <span>N??o possui conta?
            <a> Cadastre-se</a>
          </span>
        </div>


      </div>{/* div login */}
      {/* container end*/}
    </div>
  )
}

export default Home
