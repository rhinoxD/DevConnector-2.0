import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
      </Switch>
      <section className='container'>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </section>
    </Router>
  );
}

export default App;
