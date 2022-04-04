import { useAuth } from '../../components/context/authContext';

import { useRouter } from 'next/router';
import Head from 'next/head';

import { useEffect, useState } from 'react';
import styles from './home.module.scss';

import { FaTwitter, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

export default function Home() {

  const date = new Date().getFullYear();

  const [about, setAbout] = useState<boolean>(false);
  const [aboutMe, setAboutMe] = useState<boolean>(false);
  const [loginPageApp, setLoginPageApp] = useState<boolean>(true);

  /* boolean qnd passa mouse embaixo do footer */
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
    Logout,
    auth,
    authProvider,
    UnlinkProvider
  } = useAuth();

  useEffect(() => {
    console.log('auth', auth)

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

  function passwordPrompt() {
    const pass = prompt('Digite a nova senha: ', '');


    if (pass === '') {
      alert('Digite uma senha ou cancele a operação!');
      passwordPrompt();
    }
    else if (pass !== null && pass.length < 8) {
      alert('digite uma senha superior a 8 dígitos!');
      passwordPrompt();
    }
    else if (pass !== null && pass.length >= 8) {
      const oldPass = prompt('Digite sua antiga senha')
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        //@ts-ignore
        oldPass
      );
      /* para atualizar senha eh preciso fazer a reautenticacao do user */
      reauthenticateWithCredential(auth.currentUser, credential).then(() => {
        updatePassword(auth.currentUser, pass).then(() => {
          alert('senha atualizada com sucesso!');
        }).catch((error) => {
          alert("erro ao atualizar a senha, por favor tente novamente");
          console.log('erro ao atualizar senha: ', error);
        })
      }).catch(error => {
        alert('Nao foi possivel reautenticar');
        console.log('Erro ao reautenticar', error);
      });
    }
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

            <li className='nav-item dropdown'>
              <span className={`dropdown-toggle ${styles.configuracoes}`}
                id='dropdownMenu'
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              /* onClick={Logout} */
              >Configurações</span>
              <ul className={`dropdown-menu ${styles.configMenu}`} aria-labelledby='dropdownMenu' >
                <li><a
                  /* se authprovider nao existir quer dizer que nao foi feito login pelo provider */
                  className={`dropdown-item ${!authProvider && ('disabled')}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Desvincular conta com provedor de login"
                  onClick={UnlinkProvider}
                >Desvincular conta</a></li>
                <li><a
                  className='dropdown-item'
                  onClick={passwordPrompt}
                >Alterar Senha</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className='dropdown-item' onClick={Logout}>Sair</a></li>
              </ul>
            </li>

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
        className={styles.footer}/* quando passar o mouse em cima do footer ele fica true e quando sai false */
        onMouseEnter={() => setOnMouseFooter(true)}
        onMouseLeave={() => setOnMouseFooter(false)}
      >
        <div
          className={onMouseFooter ? (
            styles.onFooter
          ) : (
            styles.outFooter
          )}
        >
          {onMouseFooter && (
            <div className={`row ${styles.divRow}`}>
              <div className={`col-sm ${styles.colOne}`}>
                <h5>About Me</h5>
                <p>Um dev em busca de uma oportunidade!</p>
              </div>
              <div className={`col-sm ${styles.colTwo}`}>

                <h5>Follow me on</h5>


                <FaGithub
                  className={styles.colTwoIcons}
                  onClick={() => window.open('https://github.com/ezefferth', '_blank')}
                />


                <FaTwitter
                  className={styles.colTwoIcons}
                  onClick={() => window.open('https://twitter.com/ezefferth', '_blank')}
                />
                <FaInstagram
                  className={styles.colTwoIcons}
                  onClick={() => window.open('https://instagram.com/ezefferth', '_blank')}
                />


              </div>

              <div className={`col-sm ${styles.colTree}`}>
                <h5>Contact</h5>
                <div className={styles.colTreeDiv}>
                  <FaWhatsapp className={styles.colTreeIcons} /> <p> 65 9 9649-3590</p>
                </div>
                <div className={styles.colTreeDiv}>
                  <FiMail className={styles.colTreeIcons} /> <p>ezefferth@gmail.com</p>
                </div>

              </div>

            </div>

          )}
          <p className={styles.trace}></p>

          <span>Copyright &copy;{date}, Ezéfferth C A Fernandes. All Rights Reserved</span>



        </div>

      </footer>
    </div>
  )
}