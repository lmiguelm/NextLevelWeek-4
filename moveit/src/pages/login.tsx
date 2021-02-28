import Link from 'next/link';
import { GetServerSideProps, GetStaticProps } from 'next';
import styles from '../styles/pages/Login.module.css';

import {
  Trophy,
  Github
} from 'react-bootstrap-icons';

interface LoginProps {
  githubClientId: number;
}

export default function Login({ githubClientId }: LoginProps) {

  function handleLogin() {
    window.location.href = 
    `https://github.com/login/oauth/authorize?client_id=${githubClientId}`;
  }
  
  return (
    <div className={styles.container}>
      <main>
        <img src="/logo-full-white.svg" alt="Logo"/>

        <h1>Bem-vindo</h1>

        <div>
          <p>
            Nosso objetivo é fazer pessoas que passaam <br/>
            horas e horas em frente ao computador praticarem <br/>
            exercícios em forma de desafios.
          </p>
        </div>

        <button type="button" onClick={handleLogin}>
          <Github size={24} style={{ marginRight: '0.8rem' }}/>
          Logar com GitHub
        </button>

        <Link href="/leaderboard">
          <button type="button">
            <Trophy size={24} style={{  marginRight: '0.8rem' }}/>
            Ver classificação
          </button>
        </Link>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      githubClientId: process.env.GITHUB_CLIENT_ID
    }
  }
}