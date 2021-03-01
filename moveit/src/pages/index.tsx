import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CountDown } from "../components/CountDown";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChanllengeBox";
import { ExperienceBar } from "../components/ExperienceBar";
import { CompletedChalenges } from "../components/CompletedChalenges";
import { Sidebar } from '../components/Sidebar';

import { CountDownProvider } from '../contexts/CountDownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { AuthProvider } from '../contexts/AuthContext';

import styles from '../styles/pages/Home.module.css';
import { useEffect } from 'react';
import Loading from '../components/Loading';

interface UserData {
  githubId: number;
  login: string;
  name: string;
  avatar_url: string;
  email: string;
}

interface ScoreData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  totalExperience: number;
}

interface HomeProps {
  token: string;
  user: UserData;
  score: ScoreData
}

export default function Home(props: HomeProps) {

  useEffect(() => {
    console.log(props.user);
  }, [])

  return (
    <AuthProvider
      user={props.user}
      token={props.token}
    >
      <ChallengesProvider
        level={props.score.level}
        currentExperience={props.score.currentExperience}
        challengesCompleted={props.score.challengesCompleted}
        totalExperience={props.score.totalExperience}
        userId={props.user.githubId}
      > 
        <div className={styles.container}>

          <Sidebar active="home"/>
        
          <Head>
            <title>Início | move.it</title>
          </Head>

          <div className={styles.content}>
            <ExperienceBar/>

            <CountDownProvider>
              <section>
                <div>   
                  <Profile user={props.user} />
                  <CompletedChalenges/>
                  <CountDown/>
                </div>

                <div>
                  <ChallengeBox/>
                </div>
              </section>
            </CountDownProvider>
          </div>
        </div>
      </ChallengesProvider>
    </AuthProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {
    user,
    score,
    token
  } = ctx.req.cookies;

  if(!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      user: JSON.parse(user),
      score: JSON.parse(score),
      token
    }
  }
}