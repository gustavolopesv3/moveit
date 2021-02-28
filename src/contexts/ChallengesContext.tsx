import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challeges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModel';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLeveUpModal: () => void;
}
export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModal, setIsLevelUpModal] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function closeLeveUpModal() {
    setIsLevelUpModal(false);
  }

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModal(true);
  }

  function startNewChallenge() {
    const randonChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randonChallengeIndex];
    setActiveChallenge(challenge);

    new Audio('notification.mp3').play();
    if (Notification.permission === 'granted') {
      new Notification('Novo desafio !!!', {
        body: `Valendo ${challenge.amount} xp `,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;
    let finalExperiece = currentExperience + amount;

    if (finalExperiece >= experienceToNextLevel) {
      finalExperiece = finalExperiece - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperiece);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLeveUpModal,
      }}
    >
      {children}

      {isLevelUpModal && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
