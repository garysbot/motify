import useFormContext from "../../../hooks/useFormContext";

const Password = () => {
  const { data, handleChange } = useFormContext();

  return (
    <>
    <div className="signup-container">
      <p className="helper-text">Step 1 of 3</p>
      <label className="form-field-full-width">
        Create a Password
        <input
          type="password"
          // value={data.password}
          onChange={handleChange}
          required
          className="text-input"
        />
      </label>
        <p className="helper-text">
          The password must contain at least 8 characters.
          We recommend including at least 1 number and 1 special character.
        </p>
    </div>
  </>
  );

};

export default Password;