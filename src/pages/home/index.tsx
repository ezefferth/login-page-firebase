
import { useAuth } from '../../components/context/authContext';

import { useRouter } from 'next/router';
import Head from 'next/head';

import { useEffect } from 'react';
import styles from './home.module.scss';

export default function Home() {

  const {
    currentUser,
    Logout
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      console.log('Usuário logado!');
    }
    else if (currentUser === null) {
      router.push('/');
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }


  return (
    <div>
      <Head>{/* title da aba */}
        <title>Home Page</title>
      </Head>
      <nav className={`navbar navbar-expandlg fixed-top navbar-dark bg-dark`}>
        <div className={`container-fluid ${styles.containerNav}`}>
          <span className={`navbar-brand`}>Login Page App</span>


          <div className={styles.dados}>

            <span className={styles.aboutMe}>Sobre mim</span>

            <span className={styles.about}>Sobre a aplicação</span>

            <span className={styles.sair}
              onClick={Logout}
            >Sair</span>
          </div>





        </div>
      </nav>
      {/* <h1>HOME</h1>
      <button onClick={Logout}>
        logout
      </button> */}
    </div>
  )
}