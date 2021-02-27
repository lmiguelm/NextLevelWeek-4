import styles from '../styles/components/Profile.module.css';

import { useChallengeContext } from '../contexts/ChallengesContext';

interface UserData {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
}

interface ProfileProps {
  user: UserData;
}

export default function Profile( { user }: ProfileProps) {

  const { level } = useChallengeContext();

  return (
    <div className={styles.profileContainer}>
      <img src={user.avatar_url} alt="Luis Miguel"/>
      <div>
        <strong>{user.login}</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level: {level}
        </p>
      </div>
    </div>
  )
}