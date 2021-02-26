import Head from 'next/head';
import { GetServerSideProps } from 'next';


import { ExperienceBar } from "../components/ExperienceBar";
import { CompletedChalenges } from "../components/CompletedChalenges";
import CountDown from "../components/CountDown";
import Profile from "../components/Profile";
import ChallengeBox from "../components/ChanllengeBox";

import styles from '../styles/pages/Home.module.css';

import { CountDownProvider } from '../contexts/CountDownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { useTheme } from '../contexts/ThemeContext';
import { Sidebar } from '../components/Sidebar';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {

  const { changeTheme } = useTheme();

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
                <Profile/>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted, isDark } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      isDark: Boolean(isDark)
    }
  }
}