import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const LightTheme = {
  pageBackground: 'white',
  titleColor: '#141E61',
  tagLineColor: 'black',
};

const DarkTheme = {
  pageBackground: '#282c36',
  titleColor: '#lightpink',
  tagLineColor: 'lavender',
};

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

function App() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <ThemeProvider theme={themes[theme]}>
      <Provider store={store}>
        <Router>
          <Navbar theme={theme} setTheme={setTheme} />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
