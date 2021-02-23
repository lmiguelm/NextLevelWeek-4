import styles from '../styles/components/Profile.module.css';

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="http://github.com/lmiguelm.png" alt="Luis Miguel"/>
      <div>
        <strong>Luis Miguel</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level: 1
        </p>
      </div>
    </div>
  )
}