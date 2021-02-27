import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';

import '../styles/global.css';
import '../styles/theme.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Component {...pageProps} /> 
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
