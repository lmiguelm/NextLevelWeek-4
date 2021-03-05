import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/pages/Login.module.css';

import {
  Trophy,
  Github
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
