import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './cadastro.module.scss';

import { FaUserCircle } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import { useState } from 'react';

import { useAuth } from '../../components/context/authContext';
import { sendEmailVerification } from "firebase/auth";



export default function Cadastro() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');



  const {
    SignUp,
    currentUser,
    loading,
    auth
  } = useAuth();

  const router = useRouter()

  /* se houver current user ele ira redirecionar. Quando o usuario abre a pagina
  e a pagina for cadastro, irá verificar se ja consta login e redirecionar, se nao
  ele permanecerá na pagina */
  if (currentUser && loading === false) {
    router.push('/');
  }//este evento ocorre uma vez e faz o push para a home


  async function Cadastrar(e: any) {
    /* Cancela o evento se for cancelável, sem parar a propagação do mesmo. */

    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Senhas divergentes');
      return
    }

    try {
      await SignUp(email, password).then(
        () => {
          alert('Cadastro realizado com sucesso!');
          router.push('/'); //push para o login
        }
      ).catch((error: any) => {
        alert('Erro ao cadastrar, tente novamente!');
        console.log(error);
      });
      /* funcao sentEmailVerification nativa do firebase
      onde encaminha um email para que o usuario possa verificar */
      await sendEmailVerification(auth.currentUser).then(
        () => {
          alert('Foi encamiado um email de verificação, confirme para ativar seu cadastro!');
          console.log('Email enviado com sucesso!');
        }
      ).catch((error: any) => {
        alert('Erro ao enviar email de verificação! Contate o Suporte!');
        console.log(error);
      });
    }
    catch (error) {
      console.log('catch: error', error);
    }

  }



  return (
    <div className={styles.container}>
      <Head>{/* head eh o titulo da aba */}
        <title>Cadastro</title>
      </Head>

      <div className={styles.cadastro}>
        <h1>Cadastro</h1>
        <form onSubmit={Cadastrar}>
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
                onChange={e => setEmail(e.target.value)}

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
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputs}>
              <span>
                <RiLockPasswordFill
                  className={styles.icon}
                  size={'1.4rem'}
                />
              </span>
              <input
                className={styles.input}
                placeholder='Confirmar senha'
                type="password"
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>{/* div input */}
          </div >{/* div inputGroup */}

          <div className={styles.button}>
            <button
              type='submit'
             
            >Cadastrar</button>
          </div>
        </form>
        <div className={styles.voltar}>
          <div>
            <span>Já possui cadastro?`</span>
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