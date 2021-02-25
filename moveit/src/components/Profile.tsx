import styles from '../styles/components/Profile.module.css';

import { useChallengeContext } from '../contexts/ChallengesContext';

export default function Profile() {

  const { level } = useChallengeContext();

  return (
    <div className={styles.profileContainer}>
      <img src="http://github.com/lmiguelm.png" alt="Luis Miguel"/>
      <div>
        <strong>Luis Miguel</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level: {level}
        </p>
      </div>
    </div>
  )
}