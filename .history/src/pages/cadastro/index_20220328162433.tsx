import Head from 'next/head'
import styles from './cadastro.module.scss';



export default function Cadastro (){


  return(
    <div className={styles.container}>
      <Head>{/* head eh o titulo da aba */}
        <title>Cadastro</title>
      </Head>
      <h1>Cadastro</h1>
    </div>
  )
}