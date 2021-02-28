import { createContext, useContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';
import axios from 'axios';

interface ChallengesProviderProps {
  children: React.ReactNode
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  totalExperience: number;
  userId: number;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number; 
  challengesCompleted: number;
  startNewChallenge(): void;
  levelUp(): void;
  activeChallenge: Challenge;
  resetChallenge(): void;
  experienceToNextLevel: number;
  completeChallenge(): void;
  closeLevelUpModal(): void;
}

const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) { 

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [totalExperience, setTotalExperience] = useState(rest.totalExperience ?? 0);

  const [isLevelUpModalOpen, SetIsLevelModalOpen] = useState(false);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => { 
    Cookies.set('level', level.toString());
    Cookies.set('currentExperience', currentExperience.toString());
    Cookies.set('challengesCompleted', challengesCompleted.toString());
    Cookies.set('totalExperience', totalExperience.toString());
  }, [level, currentExperience, challengesCompleted]);

  async function challengeChange(data) {
    await axios.post(`/api/scores/update/${data.githubId}`, {
      currentExperience: data.currentExperience,
      challengesCompleted: data.challengesCompleted,
      level: data.level,
      totalExperience: data.totalExperience
    });
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio 🥳', {
        body: `Valendo ${challenge.amount} XP!`
      });
    }
  }

  function levelUp() {
    setLevel(level + 1);
    SetIsLevelModalOpen(true);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() { 
    if(!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    let l = level;


    if(finalExperience >= experienceToNextLevel) {
      levelUp();
      l++;
      finalExperience = finalExperience - experienceToNextLevel;
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
    setTotalExperience( totalExperience + amount);
    
    challengeChange({
      githubId: rest.userId,
      currentExperience: finalExperience,
      challengesCompleted: challengesCompleted + 1,
      level: l,
      totalExperience: totalExperience + amount,
    });
  }

  function closeLevelUpModal() {
    SetIsLevelModalOpen(false);
  }

  return (
    <ChallengesContext.Provider 
      value={{  
        level, 
        currentExperience, 
        experienceToNextLevel,
        challengesCompleted,
        startNewChallenge,
        levelUp,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
      }}>
      {children}

      {isLevelUpModalOpen && (
        <LevelUpModal/>
      )}
    </ChallengesContext.Provider>
  )
}

export function useChallengeContext() {
  return useContext(ChallengesContext);
}