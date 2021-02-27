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
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Console } from 'console';


interface UserData {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  email: string;
}

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  token: string;
  user: UserData;
}

export default function Home(props: HomeProps) {

  const { saveUserLogged, user, token } = useAuth();

  useEffect(() => {
    if(!token && Object.keys(user).length == 0) {
      saveUserLogged(props.user, props.token);
    }
  }, []);

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
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
                <Profile user={user} />
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
  )
}

interface ResponseAuthData {
  token: string;
  user: UserData;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted, isDark, token, user } = ctx.req.cookies;

  const { code } = ctx.query;
  
  let tokenProps: String;
  let userProps: UserData;

  try {
    tokenProps = String(token);
    userProps = JSON.parse(user);
  } catch (e) {
    try {
      if(!code) throw new Error();
      
      const { data } = 
      await axios.post<ResponseAuthData>(`${process.env.MOVEIT_BASE_URL}/api/login/github/auth`, {
        code
      });
  
      tokenProps = data.token;
      userProps = data.user;

      axios.post(`${process.env.MOVEIT_BASE_URL}/api/users/new`, {
        user: userProps
      });

    } catch(e) {
      console.log(e.message);  
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
  }

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      isDark: Boolean(isDark),
      token: String(tokenProps),
      user: userProps
    }
  }
}