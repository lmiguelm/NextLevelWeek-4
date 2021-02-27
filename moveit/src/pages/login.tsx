
import { GetServerSideProps } from 'next';
import styles from '../styles/pages/Login.module.css';

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
          <img src="/icons/github.svg" alt=""/>
          <p>Faça login com o GitHub para começar</p>
        </div>

        <button onClick={handleLogin}>
          Entrar com o GitHub
        </button>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { token } = ctx.req.cookies;

  if(token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      githubClientId: process.env.GITHUB_CLIENT_ID
    }
  }
}