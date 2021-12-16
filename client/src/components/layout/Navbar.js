import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className='links'>
      <Link to='/dashboard' className='link'>
        <i className='fas fa-user' />
        <span className='hide-sm'>Dashboard</span>
      </Link>
      <Link onClick={logout} to='#!' className='link'>
        <i className='fas fa-sign-out-alt' />
        <span className='hide-sm'>Logout</span>
      </Link>
    </ul>
  );
  const guestLinks = (
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
  );
  return (
    <div className='navbar'>
      <h1>
        <Link to='/' className='link'>
          <i className='fas fa-code' /> DevConnector
        </Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
