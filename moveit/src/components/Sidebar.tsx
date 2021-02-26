import Link from 'next/link';

import styles from '../styles/components/Sidebar.module.css';

interface SidebarProps {
  active: 'home' | 'leaderboard'
}

export function Sidebar({ active }: SidebarProps) {
  return (
    <div className={styles.container}>
      <header>
        <Link href="/">
          <a>
            <img src="/logo.svg" alt="Logo" />
          </a>
        </Link>
      </header>

      <main>

        <Link href="/">
          <button 
            type="button"
            style={ active == 'home' ? { borderLeft: '2px solid var(--blue)' } : {} }
            
          >
            { active == 'home' ? (
              <img src="/icons/home-active.svg" alt="Home"/>
            ) : (
              <img src="/icons/home.svg" alt="Home"/>
            )}
          </button>
        </Link>

        <Link href="/leaderboard">
          <button 
            type="button"
            style={ active == 'leaderboard' ? { borderLeft: '2px solid var(--blue)' } : {} }
          >
            { active == 'leaderboard' ? (
              <img src="/icons/award-active.svg" alt="Home"/>
            ) : (
              <img src="/icons/award.svg" alt="Home"/>
            )}
          </button>
        </Link>

      </main>

      <footer>
        <button type="button">
          <img src="/icons/logout.svg" alt="Sair"/>
        </button>
      </footer>
    </div>
  )
}