import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

import './App.css';

function App() {
  return (
    <Router>
        <Navbar />
        <Landing />
    </Router>
  );
}

export default App;
