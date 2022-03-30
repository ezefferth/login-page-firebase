
import { useAuth } from '../../components/context/authContext';

import { useRouter } from 'next/router';
import Head from 'next/head';

import { useEffect, useState } from 'react';
import styles from './home.module.scss';

export default function Home() {


  const [about, setAbout] = useState<boolean>(false);
  const [aboutMe, setAboutMe] = useState<boolean>(false);
  const [loginPageApp, setLoginPageApp] = useState<boolean>(true);

  const handleLoginPage = () => {
    setAbout(false);
    setAboutMe(false);
    setLoginPageApp(true);
  }

  const handleAbout = () => {
    setAbout(true);
    setAboutMe(false);
    setLoginPageApp(false);

  }

  const handleAboutMe = () => {
    setAbout(false);
    setAboutMe(true);
    setLoginPageApp(false);

  }

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
    <div className={styles.container}>
      <Head>{/* title da aba */}
        <title>Home Page</title>
      </Head>
      <nav className={`navbar navbar-expandlg fixed-top navbar-dark bg-dark`}>
        <div className={`container-fluid ${styles.containerNav}`}>
          <span
            className={`navbar-brand ${styles.loginPageApp}`}
            onClick={handleLoginPage}
          >Login Page App</span>


          <div className={styles.dados}>

            <span
              className={styles.aboutMe}
              onClick={handleAboutMe}
            >Sobre mim</span>

            <span
              className={styles.about}
              onClick={handleAbout}
            >Sobre a aplicação</span>

            <span className={styles.sair}
              onClick={Logout}
            >Sair</span>
          </div>

        </div>
      </nav>

      {loginPageApp && (
        <div className={styles.bemVindo}>
          <p>Bem Vindo!</p>
        </div>
      )}
      {about && (
        <div className={styles.containerDiv}>
          <h1>about</h1>

        </div>
      )}
      {aboutMe && (
        <div className={styles.containerDiv}>
          <h1>aboutMe</h1>
          <h1>aboutMe</h1>
          <h1>aboutMe</h1>
          <h1>aboutMe</h1>

        </div>
      )}
    </div>
  )
}