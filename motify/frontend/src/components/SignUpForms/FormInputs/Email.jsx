import { Link } from "react-router-dom";
import useFormContext from "../../../hooks/useFormContext";
import './FormInputs.css'

const Email = () => {
  const { data, handleChange } = useFormContext();

  return (
    <>
    {console.log(`Email page opened`)}

    <div className="signup-container">

      <h1>Sign up to start listening</h1>

      <div className="form-field-container">

        <label className="form-field-full-width">
          Email address
          <input
            type="text"
            // value={data.email}
            onChange={handleChange}
            placeholder='name@domain.com'
            required
            className="text-input"
            />
        </label>

      </div>

    </div>

  </>
  );

};

export default Email;