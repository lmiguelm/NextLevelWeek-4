import { ThemeProvider } from '../contexts/ThemeContext';
import { SettingsProvider } from '../contexts/SettingsContext';

import '../styles/global.css';
import '../styles/theme.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <Component {...pageProps} /> 
      </SettingsProvider>
    </ThemeProvider>
  )
}

export default MyApp
