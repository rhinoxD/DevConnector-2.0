import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CgSun } from 'react-icons/cg';
import { HiMoon } from 'react-icons/hi';
import { logout } from '../../actions/auth';

const Toggle = styled.button`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.titleColor};
  color: ${(props) => props.theme.pageBackground};
  &:focus: {
    outline: none;
  }
  transition: all 0.5s ease;
  margin-left: auto;
`;

const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  theme,
  setTheme,
}) => {
  const authLinks = (
    <ul className='links'>
      <Link to='/dashboard' className='link'>
        <i className='fas fa-user' />
        <span className='hide-sm'> Dashboard</span>
      </Link>
      <Link onClick={logout} to='#!' className='link'>
        <i className='fas fa-sign-out-alt' />
        <span className='hide-sm'> Logout</span>
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
  function changeTheme() {
    if (theme === 'light') {
      document.body.style.background = '#282c36';
      document.body.style.color = '#fff';
      document.body.style.transition = 'all 0.5s ease';
      setTheme('dark');
    } else {
      document.body.style.background = '#fff';
      document.body.style.color = '#000';
      document.body.style.transition = 'all 0.5s ease';
      setTheme('light');
    }
  }
  const icon = theme === 'light' ? <HiMoon size={30} /> : <CgSun size={30} />;
  return (
    <div className='navbar'>
      <h1>
        <Link to='/' className='link'>
          <i className='fas fa-code' /> DevConnector
        </Link>
      </h1>
      {/* {window.location.pathname !== '/' && ( */}
      <Toggle onClick={changeTheme}>{icon}</Toggle>
      {/* )} */}
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
