import Head from 'next/head';
import Link from 'next/link';

import styles from './cadastro.module.scss';

import { FaUserCircle } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

export default function Cadastro() {


  return (
    <div className={styles.container}>
      <Head>{/* head eh o titulo da aba */}
        <title>Cadastro</title>
      </Head>

      <div className={styles.cadastro}>
        <h1>Cadastro</h1>
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

        <div className={styles.button}>
          <button>Cadastrar</button>
        </div>

        <div className={styles.voltar}>
          <span>Já possui cadastro?
            <Link href='/' >
              <a>Voltar</a>
            </Link>

          </span>
        </div>

      </div>
    </div>
  )
}