import useFormContext from "../../../hooks/useFormContext";
import SignUpStepHeader from "./FormComponents/SignUpStepHeader/SignUpStepHeader";


const Details = () => {
  const { 
    data, 
    handleChange, 
    usernameError,
    monthError,
    dayError,
    yearError,
    genderError 
  } = useFormContext();

  const handleDobChange = (e) => {
    const newDob = { ...data.birth_date, [e.target.name]: e.target.value };
    const dobString = `${newDob.year}-${newDob.month}-${newDob.day}`;
    // Validate the date string before updating the state
    if (dobString) {
      handleChange({ target: { name: 'birth_date', value: dobString } });
    }
  };
  
  return (
    <>
      {/* {console.log(`Details page opened`)} */}
      <div className="signup-container">
        <SignUpStepHeader />
        <div className="form-details-field name-label">
          <label className="form-field-full-width">
            Name
            <p className="helper-text name-helper">This name will appear on your profile</p>
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              required
              className="text-input"
            />
          </label>
          {/* //! Error Handling for Name */}
          { usernameError &&  
            <div className='field-error-container'>
              <div className='field-error-icon'></div>
              <p className='field-error-text'>{usernameError}</p>
            </div>
          }
        </div>

        <div className="form-details-field-dob">
          <label className="form-detail-labels">
            Date of birth
            <p className="helper-text">Why do we need your date of birth? <span>Learn more.</span></p>
            <div className="dob-container"> {/* Added container for DOB fields */}
              <select className="dropdown-width" name="month" onChange={handleChange} value={data.birth_date.m}> {/* Modified class name */}
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
              
              <div className="dd-yy-container">
                <input className="dd-input text-input" name="day" placeholder="dd" onChange={handleChange} value={data.birth_date.day}/>

                <input className="yy-input text-input" name="year" placeholder="yy" onChange={handleChange} value={data.birth_date.year}/>

              </div>
            </div>
            {/* //! Error Handling for Month */}
            { monthError &&  
                <div className='field-error-container'>
                  <div className='field-error-icon'></div>
                  <p className='field-error-text'>{monthError}</p>
                </div>
            }
            {/* //! Error Handling for Day */}
            { dayError &&  
              <div className='field-error-container'>
                <div className='field-error-icon'></div>
                <p className='field-error-text'>{dayError}</p>
              </div>
            }
            {/* //! Error Handling for Year */}
            { yearError &&  
              <div className='field-error-container'>
                <div className='field-error-icon'></div>
                <p className='field-error-text'>{yearError}</p>
              </div>
            }
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
              <input type="radio" value='man' name="gender" onChange={handleChange} checked={data.gender === 'man'}/> Man
            </label>
            <label className="radio-label">
              <input type="radio" value='woman' name="gender" onChange={handleChange} checked={data.gender === 'woman'}/> Woman
            </label>
            <label className="radio-label">
              <input type="radio" value='non-binary' name="gender" onChange={handleChange} checked={data.gender === 'non-binary'}/> Non-binary
            </label>
            <label className="radio-label">
              <input type="radio" value='something-else' name="gender" onChange={handleChange} checked={data.gender === 'something-else'}/> Something else
            </label>
            <label className="radio-label">
              <input type="radio" value='undisclosed' name="gender" onChange={handleChange} checked={data.gender === 'undisclosed'}/> Prefer not to say
            </label>
          </div>
          {
            genderError &&  
            <div className='field-error-container'>
              <div className='field-error-icon'></div>
              <p className='field-error-text'>{genderError}</p>
            </div>
          }

        </div>

      </div>
    </>
  );
};

export default Details;
