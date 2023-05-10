import React, { useState } from 'react';
import classes from './LoginReg.module.css';
import { useDispatch } from 'react-redux';
import { Login } from '../ApiCalls/Login';

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(Login(email, password));
  };

  return (
    <form className={classes.loginForm} onSubmit={handleSubmit}>
      <h2>Login Form</h2>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type='submit'>Login</button>
      <p
        onClick={() => props.onSwap((old) => !old)}
        style={{ cursor: 'pointer', color: 'blue' }}
      >
        Register?
      </p>
    </form>
  );
}

export default LoginForm;
