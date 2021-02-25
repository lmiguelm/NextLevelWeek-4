import Head from 'next/head';

import { ExperienceBar } from "../components/ExperienceBar";
import { CompletedChalenges } from "../components/CompletedChalenges";

import CountDown from "../components/CountDown";
import Profile from "../components/Profile";
import ChallengeBox from "../components/ChanllengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountDownProvider } from '../contexts/CountDownContext';

export default function Home() {
  return (
    <div className={styles.container}>

      <Head>
        <title>Início | move.it</title>
      </Head>

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
  )
}
