import { ThemeProvider } from 'styled-components';

import { Theme } from './constants/theme';
import Router from "./routers"

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router/>
    </ThemeProvider>
  );
}

export default App;
