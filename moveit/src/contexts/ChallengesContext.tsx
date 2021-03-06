import { createContext, useContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';
import axios from 'axios';
import { User } from 'next-auth';

interface ChallengesProviderProps {
  children: React.ReactNode
  user: User;
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

  const [level, setLevel] = useState(rest.user.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.user.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.user.challengesCompleted ?? 0);
  const [totalExperience, setTotalExperience] = useState(rest.user.totalExperience ?? 0);

  const [isLevelUpModalOpen, SetIsLevelModalOpen] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  async function challengeChange({
    id, 
    currentExperience, 
    challengesCompleted, 
    level, 
    totalExperience 
  }: User) {
    await axios.put('/api/update', {
      currentExperience,
      challengesCompleted,
      level,
      totalExperience
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
      ...rest.user,
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