import Head from 'next/head';
import { GetStaticProps, } from 'next';
import Router from 'next/router';

import { User } from 'next-auth';
import { useSession } from 'next-auth/client';

import axios from 'axios';

import { Sidebar } from '../components/Sidebar';

import {
  ArrowUpCircle,
  InfoCircleFill
} from 'react-bootstrap-icons';

import styles from '../styles/pages/LeaderBoard.module.css';
import { useEffect } from 'react';

interface LeaderboardProps {
  users: User[];
}

export default function Leaderboard({ users }: LeaderboardProps) {

  const [session, loading] = useSession();

  useEffect(() => {
    if(!session) {
      Router.push('/login');
    }
  }, []);

  if(loading) {
    return <h1>Carregando....</h1>
  } else {
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
  
            { users.map((user, index) => (
              <div
                key={user.id}
              >
                <div
                  className={styles.punctuation}
                >
                    {index + 1}
                </div>
  
                <div 
                  className={styles.user}
                >
                  <img src={user.image}/>
                  <article>
                    <strong>{user.name}</strong>
                    <article>
                      <ArrowUpCircle color="var(--green)" style={{ marginRight: '0.5rem' }}/>
                      <p>Level {user.level}</p>
                    </article>
                  </article>
                </div>
  
                <div>
                  <span>
                    {user.challengesCompleted}
                  </span> 
                  completados
                </div>
  
                <div>
                  <span>
                    {user.totalExperience}
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
}

export const getStaticProps: GetStaticProps = async () => {

  const reponse = await axios.get(`${process.env.MOVEIT_BASE_URL}/api/getRanking`);

  return {
    props: {
      users: reponse.data,
    },
    revalidate: 5 * 60
  }
}