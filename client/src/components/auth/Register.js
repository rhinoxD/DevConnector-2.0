import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import setAlert from '../../actions/alert';
import axios from 'axios';

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2, avatar } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      console.log(formData);
    }
    const formData2 = new FormData();
    formData2.append('name', name);
    formData2.append('email', email);
    formData2.append('password', password);
    formData2.append('avatar', avatar);
    axios
      .post('http://localhost:5000/api/users', formData2)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAvatar = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };
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
        <input
          type='file'
          accept='.png, .jpg, .jpeg'
          name='avatar'
          onChange={handleAvatar}
        />
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

Register.prototypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
