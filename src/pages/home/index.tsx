import { useAuth } from '../../components/context/authContext';

import { useRouter } from 'next/router';
import Head from 'next/head';

import { useEffect, useState } from 'react';
import styles from './home.module.scss';

import { FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';




export default function Home() {

  const date = new Date().getFullYear();

  const [about, setAbout] = useState<boolean>(false);
  const [aboutMe, setAboutMe] = useState<boolean>(false);
  const [loginPageApp, setLoginPageApp] = useState<boolean>(true);

  const [onMouseFooter, setOnMouseFooter] = useState<boolean>(false);


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

    console.log(aboutMe)

  }


  const router = useRouter();

  const {
    currentUser,
    Logout
  } = useAuth();

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
      <nav className={`navbar navbar-expandlg fixed-top ${styles.navbar}`}>
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
          <div className={styles.divAbout}>
            <p>Esta aplicação conta com elementos scss e react para seu desenvolvimento,
              vale ressaltar a utilização do Firebase Authentication para autenticação do login,
              criação de login, recuperação de senha. Foi utilizado useContext entre outras features
              react para o desenvolvimento desta aplicação como um todo. A aplicação está
              no github e pode ser acessada pelo <a href='https://github.com/ezefferth/login-page-firebase'>link</a>.
              O código conta com partes comentadas para o auxílio no entendimento do funcionamento do mesmo.
              Não esqueça de deixar eu STAR!
            </p>
          </div>
        </div>
      )}
      {aboutMe && ( /* se os 2 forem true */
        <div className={styles.containerDiv}>
          <div className={styles.divAboutMe}>
            <p> Me chamo Ezéfferth Chlysman, pai da Isabella, esposo da Taynara, guitarrista,
              graduado em engenharia de computação,
              apaixonado em desenvolvimento web e mobile, gosto de trabalhar com React,
              ReactNative, NextJS, trabalhei com projetos que envolviam MySQL,
              MongoDB como banco de dados,
              Firebase Firestore e Authentication. FullStack Jr. em busca de um trabalho
              remoto na parte de desenvolvimento.
            </p>
          </div>
        </div>
      )}
      <footer
        className={styles.footer}
        onMouseOver={() => setOnMouseFooter(true)}
        onMouseOut={() => setOnMouseFooter(false)}
      >
        <div
          className={onMouseFooter ? (
            styles.onFooter
          ) : (
            styles.outFooter
          )}
        >{
            onMouseFooter && (
              <div className='row' >
                <div className={`col-sm ${styles.colOne}`}>
                  one
                </div>
                <div className={`col-sm ${styles.colTwo}`}>
                  
                  <p>Follow me on</p>
                  <FaGithub/>
                  <FaTwitter/>
                  <FaInstagram/>

                </div>

              </div>

            )
          }
          

          <span>Copyright &copy;{date}, Ezéfferth C A Fernandes. All Rights Reserved</span>

        </div>

      </footer>
    </div>
  )
}