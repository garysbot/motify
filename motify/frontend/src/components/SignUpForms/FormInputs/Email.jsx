import useFormContext from "../../../hooks/useFormContext";
import './FormInputs.css'

const Email = () => {
  const { data, handleChange, emailError } = useFormContext();

  return (
    <>
      <div className="signup-container">
        <h1>Sign up to start listening</h1>
        <div className="form-field-container">
          <label className="form-field-full-width">
            Email address
            <input
              className="text-input"
              type="text"
              name="email"
              placeholder='name@domain.com'
              value={data.email}
              onChange={handleChange}
              required
              />
          </label>
          {/* Email Error Handling */}
          { 
            emailError &&  
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