import { useEffect, useState } from 'react';

import { GetStaticProps, } from 'next';
import Head from 'next/head';

import axios from 'axios';
import Cookies from 'js-cookie';

import { Sidebar } from '../components/Sidebar';
import { AuthProvider } from '../contexts/AuthContext';

import {
  ArrowUpCircle,
  InfoCircleFill
} from 'react-bootstrap-icons';

import styles from '../styles/pages/LeaderBoard.module.css';
import { useTheme } from '../contexts/ThemeContext';

interface ScoreFullData {
  currentExperience: number;
  level: number;
  challengesCompleted: number;
  totalExperience: number;
  user: UserData;
  _id: string;
}

interface UserData {
  githubId: number;
  login: string;
  name: string;
  avatar_url: string;
  email: string;
}

interface LeaderboardProps {
  scores: ScoreFullData[];
}

export default function Leaderboard({ scores }: LeaderboardProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ranking | move.it</title>
      </Head>

      <Sidebar active="leaderboard"/>

      <div className={styles.content}>
        <header>
          <h1>Leaderboard</h1>
          <p>
            <InfoCircleFill color="var(--blue-dark)" style={{ marginRight: '0.25rem' }}/>
            Ranking é atualizado a cada 5 minutos.
          </p>
        </header>

        <main>
          
          <div>
            <p>PONTUAÇÃO</p>
            <p>USUÁRIO</p>
            <p>DESAFIOS</p>
            <p>EXPERIÊNCIA</p>
          </div>

          { scores.map((score, index) => (
            <div
              key={score._id}
            >
              <div
                className={styles.punctuation}
              >
                  {index + 1}
              </div>

              <div 
                className={styles.user}
              >
                <img src={score.user.avatar_url}/>
                <article>
                  <strong>{score.user.login}</strong>
                  <article>
                    <ArrowUpCircle color="var(--green)" style={{ marginRight: '0.5rem' }}/>
                    <p>Level {score.level}</p>
                  </article>
                </article>
              </div>

              <div>
                <span>
                  {score.challengesCompleted}
                </span> 
                completados
              </div>

              <div>
                <span>
                  {score.totalExperience}
                </span> 
                xp
              </div>

            </div>
          )) }

          <br/>

        </main>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await axios.get<ScoreFullData[]>(`${process.env.MOVEIT_BASE_URL}/api/scores/ranking`);

  return {
    props: {
      scores: data,
    },
    revalidate: 5 * 60
  }
}