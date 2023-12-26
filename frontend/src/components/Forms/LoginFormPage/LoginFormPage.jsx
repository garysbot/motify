import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import './LoginForm.css';
import FormPageHeader from '../SignUpForms/FormInputs/FormComponents/FormPageHeader/FormPageHeader';


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const demoLogin = () => {
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
  }

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
      <div className='login-form-page-bg'>
        <FormPageHeader bgColor="black" />
        <div className='form-bg'>
          <div className='form-container'>

            <h1 className='header-container'>Log in to Motify</h1>

            {errors ? errors.map(error =>
              <div className='login-page-error-container'>
                <div className='login-page-error-icon'></div>
                <p className='login-page-error-text'>{error}</p>
              </div>
            )
              : null
            }

            <hr />

            <form onSubmit={handleSubmit}>
              <label>
                Email or username
              </label>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                placeholder='Email or username'
                className='text-input'
                required
              />
              <br />
              <label>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='text-input'
                placeholder='Password'
                required
              />
              <button type="submit">Log In</button>
            </form>



            <p 
              onClick={demoLogin}
              className='demo-login'
              style={{
                'margin-top':'1rem',
                'cursor':'pointer'
              }}
            >
              Demo Account Login
            </p>

            <hr />

            <div className='new-user-container'>
              <p className='helper-text'>Don't have an account?</p>
              <p className='login-link-hover'><Link to='/signup'>Sign up for Motify</Link></p>
            </div>

          </div>
        </div>

        <p className='captcha'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
      </div>
    </>
  );
}

export default LoginFormPage;