//import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
//import Image from 'next/image'
import styles from './login.module.scss';

import { FaUserCircle } from 'react-icons/fa'

import img from '../../public/images/background-img.jpg';

function Home() {
  return (
    <div className={styles.container}>
      <Image
       src={img}
      /> 
      <Head>{/* head eh o titulo da aba */}
        <title>Login Page Firebase</title>
      </Head>

      <div className={styles.login}>
        <h1>Login</h1>

        <div className={styles.inputs}>
          <span><FaUserCircle /></span>
          <input className={styles.input}/>
        </div >


      </div>

    </div>
  )
}

export default Home
