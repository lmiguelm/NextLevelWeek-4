import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

import styles from '../styles/components/Sidebar.module.css';

import { 
  ArrowLeft,
  House,
  Trophy,
  BoxArrowInLeft
} from 'react-bootstrap-icons';
import { useEffect } from 'react';

interface SidebarProps {
  active: 'home' | 'leaderboard'
}

export function Sidebar({ active }: SidebarProps) {

  const { logout, token } = useAuth();

  useEffect(() => {
    console.log('sidebar', token)
  })

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

       { token && (
          <Link href="/">
            <button 
              type="button"
              style={ active == 'home' ? { borderLeft: '2px solid var(--blue)' } : {} }
              
            >
              <House color={ active == 'home' ? 'var(--blue)' : 'var(--gray-line)' } size={30}/>
            </button>
          </Link>
       )}

        <Link href="/leaderboard">
          <button 
            type="button"
            style={ active == 'leaderboard' ? { borderLeft: '2px solid var(--blue)' } : {} }
          >
            <Trophy color={ active == 'leaderboard' ? 'var(--blue)' : 'var(--gray-line)' } size={30}/>
          </button>
        </Link>

      </main>

      <footer>
        { token ? ( 
          <Link href="/login">
            <button type="button" onClick={logout}>
              <BoxArrowInLeft size={30} color="var(--gray-line)"/>
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button type="button" onClick={logout}>
              <ArrowLeft color="var(--text)" size={30}/>
            </button>
          </Link>
        )}
      </footer>
    </div>
  )
}