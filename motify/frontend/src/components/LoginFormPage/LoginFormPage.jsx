import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styles from './LoginForm.module.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  return (
    <>
    <div className={styles.login}>
        <div className={styles['logo-container']}>
          <div className={styles['logo']}/>
        </div>

        <div className={styles['form-bg']}>
          <div className={styles['form-container']}>

            <h1 className={styles['form-name']}>Log in to Motify</h1>

            <hr/>
            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
              </ul>

              <label className={styles['form-label']}>
                Email or username
              </label>
              <input
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  placeholder='Email or username'
                  required
              />
              <br/>

              <label className={styles['form-label']}>
                Password
              </label>
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  required
              />
              <button type="submit">Log In</button>
            </form>

            <div className={styles['login-helper']}>
              <p className={styles['link-hover']}><Link to='https://google.com'>Forgot your password?</Link></p>
              <hr/>
              <div className={styles['new-user-container']}>
                <p className={styles['helper-text']}>Don't have an account?</p>
                <p className={styles['link-hover']}><Link to='https://google.com'>Sign up for Motify</Link></p>
              </div>
            </div>
          </div>
        </div>

        <p className={styles['captcha']}>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
      </div>
    </>
  );
}

export default LoginFormPage;