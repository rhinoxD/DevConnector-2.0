import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1>
        <Link to='/' className='link'>
          <i className='fas fa-code' /> DevConnector
        </Link>
      </h1>
      <ul className='links'>
        <Link to='/profiles' className='link'>
          Developers
        </Link>
        <Link to='/register' className='link'>
          Register
        </Link>
        <Link to='/login' className='link'>
          Login
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
