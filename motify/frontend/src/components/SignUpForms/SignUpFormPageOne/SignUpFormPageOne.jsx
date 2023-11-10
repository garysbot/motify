import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import './SignUpFormOne.css'

function SignupFormPageOne() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
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
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
    <div className="bg-container">
        <div>
          <div className='logo'/>
        </div>
        <div className="main-form-container">
            <div className="header-container">
              <h1>Sign up to start listening</h1>
            </div>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
              </ul>

              <label>
                Email address
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='name@domain.com'
                  required
                />
              </label>
              
              <button type="submit" className='next-button'>Next</button>
              <hr/>
            </form>

            <div className="login-container">
              <p className="existing-user">Already have an account? <Link to='/login'>Log in here.</Link></p>
            </div>

          </div>

          <div className="signup-footer">
            <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service Apply.</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default SignupFormPageOne;