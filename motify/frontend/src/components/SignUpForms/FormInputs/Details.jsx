import useFormContext from "../../../hooks/useFormContext";

const Details = () => {
  const { data, handleChange } = useFormContext();

  return (
    <>
      <div className="signup-container">
        <p className="helper-text">Step 2 of 3</p>
        <p className="form-title">Tell us about yourself</p>

        <div className="form-details-field">
          <label className="form-detail-labels">
            Name
            <p className="helper-text">This name will appear on your profile</p>
            <input
              type="text"
              // value={data.password}
              onChange={handleChange}
              required
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
                {/* ... other month options */}
              </select>
              <div className="mm-yy-container"> {/* Added container for month and year fields */}
                <input className="mm-input" placeholder="MM" /> {/* Added class name */}
                <input className="yy-input" placeholder="YY" /> {/* Added class name */}
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default Details;
