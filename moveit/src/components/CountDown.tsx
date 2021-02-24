import { useState, useEffect } from 'react';
import styles from '../styles/components/CountDown.module.css';

import { useChallengeContext } from '../contexts/ChallengesContext';

let countDownTimeout: NodeJS.Timeout;

const START_TIME = 0.1 * 60;

export default function CountDown() {

  const { startNewChallenge } = useChallengeContext();

  const [time, setTime] = useState(START_TIME);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFineshed] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [ minuteLeft, minuteRight ] = String(minutes).padStart(2, '0').split('');
  const [ secondLeft, secondRight ] = String(seconds).padStart(2, '0').split('');

  function startCountDown() { 
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(START_TIME);   
  }

  useEffect(() => {
    if(isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if(isActive && time <= 0) {
      setHasFineshed(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
   <> 
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
         <button 
          disabled
          className={styles.countDownButton}
        >
          Ciclo encerrado
       </button>
      ) : (
        <>
          { isActive ? (
            <button 
              onClick={resetCountDown}
              type="button" 
              className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
            >
              Abandonar ciclo
            </button>
          )  : (
            <button 
              onClick={startCountDown}
              type="button" 
              className={styles.countDownButton}
            >
              Iniciar uim ciclo
            </button>
          )}
        </>
      )}
 
      
   </>
  )
}