import Link from 'next/link'
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from './recuperar.module.scss';
import { FaUserCircle } from 'react-icons/fa';

import { useState } from 'react';

import { useAuth } from '../../components/context/authContext';


import { useEffect } from 'react';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';

export default function recuperarSenha() {


  const [email, setEmail] = useState('');

  const {
    currentUser,
  } = useAuth();



  const router = useRouter();

  useEffect(() => {
    /* se existe current user quer dizer que ja estava logado */
    if (currentUser) {
      router.push('/home');
    }
  }, [currentUser]);


  const auth = getAuth();

  function resetPass() {
    if (email.length > 10) {
      return sendPasswordResetEmail(auth, email).then(() => {
        alert('Envio da senha para reset enviado com sucesso!');
      }).catch((error) => {
        alert("não foi possivel resetar a senha ou não existe email cadastrado");
        console.log('error: ', error);
      })
    }


  }




  return (
    <div className={styles.container}>
      <Head>{/* head eh o titulo da aba */}
        <title>Recuperar Senha</title>
      </Head>

      <div className={styles.recuperar}>
        <h1>Recuperar Senha</h1>
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
        </div >{/* div inputGroup */}

        <div className={styles.button}>
          <button onClick={() => resetPass}>Recuperar Senha</button>
        </div>

        <div className={styles.voltar}>
          <div>
            <span>Lembrou do Login?`</span>
            <Link href='/'>
              <p>Voltar</p>
            </Link>
          </div>

        </div>
        {/* div cadastro */}
      </div>
      {/* div container */}
    </div>
  )
}