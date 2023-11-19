import useFormContext from "../../../../hooks/useFormContext";
import SignUpStepHeader from "./FormComponents/SignUpStepHeader/SignUpStepHeader";

const Password = () => {
  const { data, handleChange, passwordError } = useFormContext();

  return (
    <>
      {/* {console.log(`Password page opened`)} */}
      <div className="signup-container">
        <SignUpStepHeader />

        <label className="form-field-full-width">
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
            className="text-input"
          />
        </label>
        {/* //! Error Handling for Email */}
        {passwordError &&
          <div className='field-error-container'>
            <div className='field-error-icon'></div>
            <p className='field-error-text'>{passwordError}</p>
          </div>
        }

        <p className="helper-text">
          The password must contain at least 8 characters.
          We recommend including at least 1 number and 1 special character.
        </p>
      </div>
    </>
  );

};

export default Password;