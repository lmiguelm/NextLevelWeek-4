import styles from '../styles/components/Settings.module.css';

import {
  Gear,
  X,
  ToggleOn,
  ToggleOff
} from 'react-bootstrap-icons';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';

export function Settings() {

  const { changeTheme, isDark } = useTheme();
  const { isSettingsModalOpen, openSettingsModal, closeSettingsModal } = useSettings();

  function handleChangeTheme() {
    changeTheme(!isDark);
  }

  return (
    <>
      <button 
        className={styles.settingButton}
        type="button"
        onClick={openSettingsModal}
      >
        <Gear size={30} color="var(--white)"/>
      </button>

      { isSettingsModalOpen && (
        <div className={styles.modalContainer}>
          <header>
            <h1>Configurações</h1>
            <X size={30} onClick={closeSettingsModal}/>
          </header>

          <main>
            <div>
              <p>Tema Dark </p>

              { isDark ? (
                <ToggleOn size={30} onClick={handleChangeTheme}/>
              ) : (
                <ToggleOff size={30} onClick={handleChangeTheme}/>
              )}
            </div>
          </main>
        </div>
      ) }
    </>
  )
}