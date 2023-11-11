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

      <div className="form-details-field">
        <label className="form-detail-labels">
          Date of birth
        <p className="helper-text">Why do we need your date of birth? <span>Learn more.</span></p>
          <select>
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
          <select>
            <option>Hello</option>
          </select>
        </label>
      </div>

      




    </div>
  </>
  );

};

export default Details;