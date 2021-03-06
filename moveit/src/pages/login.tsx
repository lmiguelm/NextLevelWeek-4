import styles from '../styles/pages/Login.module.css';

import {
  Github,
  Google
} from 'react-bootstrap-icons';

import { signIn } from 'next-auth/client';

export default function Login() {
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

        <button type="button" onClick={() => signIn('github', { callbackUrl: '/', })}>
          <Github size={24} style={{ marginRight: '0.8rem' }}/>
          Logar com GitHub
        </button>

        <button type="button" onClick={() => signIn('google', { callbackUrl: '/', })}>
          <Google   size={24} style={{ marginRight: '0.8rem' }}/>
          Logar com Google
        </button>
      </main>
    </div>
  )
}
