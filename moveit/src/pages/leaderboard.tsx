import Head from 'next/head';

import { Sidebar } from '../components/Sidebar';

import styles from '../styles/pages/LeaderBoard.module.css';

export default function Leaderboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ranking | move.it</title>
      </Head>

      <Sidebar active="leaderboard"/>

      <div className={styles.content}>
        <header>
          <h1>Leaderboard</h1>
        </header>

        <main>
          
          <div>
            <p>PONTUAÇÃO</p>
            <p>USUÁRIO</p>
            <p>DESAFIOS</p>
            <p>EXPERIÊNCIA</p>
          </div>

          <div>
            <div className={styles.punctuation}>1</div>

            <div className={styles.user}>
              <img src="https://github.com/lmiguelm.png"/>
              <article>
                <strong>Luis Miguel Fernandes Marcelo</strong>
                <article>
                  <p>Level 100</p>
                  <img src="/icons/up.svg" alt="level"/>
                </article>
              </article>
            </div>

            <div>
              <span>100</span> completados
            </div>

            <div>
              <span>112012</span> xp
            </div>

          </div>

          <br/>

        </main>
      </div>
    </div>
  )
}