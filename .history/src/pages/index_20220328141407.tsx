//import type { NextPage } from 'next'
import Head from 'next/head'

//import Image from 'next/image'
import styles from './login.module.scss';

import { FaUserCircle } from 'react-icons/fa'

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
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Tooltip on top"
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
          </div>
        </div >
      </div>

    </div>
  )
}

export default Home
