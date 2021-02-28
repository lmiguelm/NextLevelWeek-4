import styles from '../styles/components/Profile.module.css';

import { useChallengeContext } from '../contexts/ChallengesContext';

import { ArrowUpCircle } from 'react-bootstrap-icons';

interface UserData {
  githubId: number;
  login: string;
  name: string;
  avatar_url: string;
}

interface ProfileProps {
  user: UserData;
}

export function Profile( { user }: ProfileProps) {

  const { level } = useChallengeContext();

  return (
    <div className={styles.profileContainer}>
      <img src={user.avatar_url} alt={user.login}/>
      <div>
        <strong>{user.login}</strong>
        <p>
          <ArrowUpCircle color="var(--green)" style={{ marginRight: '0.5rem' }} />
          Level: {level}
        </p>
      </div>
    </div>
  )
}