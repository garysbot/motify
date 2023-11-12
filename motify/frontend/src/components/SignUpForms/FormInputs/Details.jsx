import useFormContext from "../../../hooks/useFormContext";

const Details = () => {
  const { data, handleChange } = useFormContext();

  return (
    <>
      {console.log(`Details page opened`)}
      <div className="signup-container">
        <p className="helper-text">Step 2 of 3</p>
        <p className="form-title">Tell us about yourself</p>

        <div className="form-details-field">
          <label className="form-field-full-width">
            Name
            <p className="helper-text">This name will appear on your profile</p>
            <input
              type="text"
              // value={data.password}
              onChange={handleChange}
              required
              className="text-input"
            />
          </label>
        </div>

        <div className="form-details-field-dob">
          <label className="form-detail-labels">
            Date of birth
            <p className="helper-text">Why do we need your date of birth? <span>Learn more.</span></p>
            <div className="dob-container"> {/* Added container for DOB fields */}
              <select className="dropdown-width"> {/* Modified class name */}
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
              <div className="dd-yy-container"> {/* Added container for month and year fields */}
                <input className="dd-input text-input" placeholder="dd" /> {/* Added class name */}
                <input className="yy-input text-input" placeholder="yy" /> {/* Added class name */}
              </div>
            </div>
          </label>
        </div>

        <div className="form-details-field">
          <div className="question-container">
            <label>
              Gender
            </label>
            <p className="helper-text">We use your gender to help personalize our content recommendations and ads for you.</p>
          </div>
          
          <div className="radio-options-container">
            <label className="radio-label">
              <input type="radio" value='man' name="gender"/> Man
            </label>
            <label className="radio-label">
              <input type="radio" value='woman' name="gender"/> Woman
            </label>
            <label className="radio-label">
              <input type="radio" value='non-binary' name="gender"/> Non-binary
            </label>
            <label className="radio-label">
              <input type="radio" value='something-else' name="gender"/> Something else
            </label>
            <label className="radio-label">
              <input type="radio" value='undisclosed' name="gender"/> Prefer not to say
            </label>
          </div>

        </div>

      </div>
    </>
  );
};

export default Details;
