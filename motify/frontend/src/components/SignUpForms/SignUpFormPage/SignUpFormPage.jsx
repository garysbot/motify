import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import './SignUpFormPage.css'

import useFormContext from "../../../hooks/useFormContext.jsx"
import FormInputs from "../FormInputs/FormInputs";
import FormPageHeader from "../../Forms/FormPageHeader.jsx";

function SignupFormPage() {
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);

  const {
    page,
    setPage,
    data,
    formType,
    canSubmit
  } = useFormContext()

  if (sessionUser) return <Redirect to="/" />;

  return (
    <>
    <div className="background">
        <div className="main-form-container">

          <FormPageHeader bgColor='transparent'/>

            <form onSubmit={(e) => e.preventDefault()}>
              <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
              </ul>
              
              <FormInputs/>

            </form>

          <div className="signup-footer">
            <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service Apply.</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default SignupFormPage;