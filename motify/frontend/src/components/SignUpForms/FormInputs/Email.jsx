import { useState } from "react";
import useFormContext from "../../../hooks/useFormContext";
import './FormInputs.css'

const Email = () => {
  const { data, handleChange, emailError } = useFormContext();

  return (
    <>
    {/* {console.log(`Email page opened`)} */}

    <div className="signup-container">

      <h1>Sign up to start listening</h1>

      <div className="form-field-container">

        <label className="form-field-full-width">
          Email address
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder='name@domain.com'
            required
            className="text-input"
            />
        </label>
        {/* //! Error Handling for Email */}
        { emailError &&  
            <div className='field-error-container'>
              <div className='field-error-icon'></div>
              <p className='field-error-text'>{emailError}</p>
            </div>
        }

      </div>

    </div>

  </>
  );

};

export default Email;