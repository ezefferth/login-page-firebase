//import type { NextPage } from 'next'
import Head from 'next/head'

//import Image from 'next/image'
import styles from './login.module.scss';

import { FaUserCircle } from 'react-icons/fa'



function Home() {
  return (
    <div className={styles.container}>

      <Head>{/* head eh o titulo da aba */}
        <title>Login Page Firebase</title>
      </Head>

      <div className={styles.login}>
        <h1>Login</h1>

        <div className={styles.inputs}>
          <span>
            <FaUserCircle
              className={styles.icon}
              size={'1.25rem'}
            />
          </span>
          <input 
          className={styles.input}
          placeholder='Email'
          type="email"
          
          />
        </div >


      </div>

    </div>
  )
}

export default Home
