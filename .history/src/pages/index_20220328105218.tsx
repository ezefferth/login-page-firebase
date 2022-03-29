import type { NextPage } from 'next'
import Head from 'next/head'
//import Image from 'next/image'
import styles from '../styles/Home.module.scss'

function Home() {
  return (
    <div className={styles.container}>

      <Head>{/* head eh o titulo da aba */}
        <title>Login Page Firebase</title>
      </Head>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default Home
