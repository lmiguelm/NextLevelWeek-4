import { createContext, useContext, useState } from 'react';
import challenges from '../../challenges.json';

interface ChallengesProviderProps {
  children: React.ReactNode
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
}

const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps){ 

  const [level, setLevel] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function levelUp() {
    setLevel(level + 1);
  }

  function resetChallenge() {
    setActiveChallenge(null);
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
        resetChallenge
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}

export function useChallengeContext() {
  return useContext(ChallengesContext);
}