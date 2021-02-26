import { ThemeProvider } from '../contexts/ThemeContext';

import '../styles/global.css';
import '../styles/theme.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} /> 
    </ThemeProvider>
  )
}

export default MyApp
