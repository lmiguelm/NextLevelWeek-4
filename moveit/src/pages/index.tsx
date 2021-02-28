import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { ExperienceBar } from "../components/ExperienceBar";
import { CompletedChalenges } from "../components/CompletedChalenges";
import CountDown from "../components/CountDown";
import Profile from "../components/Profile";
import ChallengeBox from "../components/ChanllengeBox";

import styles from '../styles/pages/Home.module.css';

import { CountDownProvider } from '../contexts/CountDownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { Sidebar } from '../components/Sidebar';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import axios from 'axios';


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

interface ResponseApi {
  user: UserData;
  score: ScoreData;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { token } = ctx.req.cookies;

  if(!token) {

    const tokenUrl = ctx.query.access_token;

    if(!tokenUrl) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const { data } = await axios.post<ResponseApi>(`${process.env.MOVEIT_BASE_URL}/api/${tokenUrl}`);

    return {
      props: {  
        score: data.score,
        user: data.user,
        token: tokenUrl,
      }
    }
  } else {

    const {
      user,
      level,
      currentExperience,
      challengesCompleted,
      totalExperience,
      
    } = ctx.req.cookies;

    const score = {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      totalExperience: Number(totalExperience),
    }

    return {
      props: {
        token,
        score,
        user: JSON.parse(user)
      }
    }
  }
}