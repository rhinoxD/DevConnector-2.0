import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setAlert from '../../actions/alert';
import register from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    image: null,
  });
  const { name, email, password, password2, image } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
    // const fd = new FormData();
    // fd.append('name', name);
    // fd.append('email', email);
    // fd.append('password', password);
    // fd.append('image', image);
    // try {
    //   const res = await fetch('http://localhost:5000/api/users', 'POST', fd);
    //   res.json(res);
    // } catch (err) {}
  };
  const fileUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='background2'>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form
        className='form'
        onSubmit={(e) => onSubmit(e)}
        encType='multipart/form-data'
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input type='file' name='file' onChange={(e) => fileUpload(e)} />
        </div>
        <div className='center-btn'>
          <input type='submit' className='btn2 first' value='Register' />
        </div>
      </form>
      <p className='my-1'>
        Already have an account?{' '}
        <Link to='/login' className='button3 wobble-horizontal'>
          Sign In
        </Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
