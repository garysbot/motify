import { createContext, useState, useEffect } from "react";

// Create the FormContext
const FormContext = createContext({});

// Create the FormProvider to provide the context to other components
export const FormProvider = ({ children }) => {
  // Page State -- determine which sign up page we're on
  const [page, setPage] = useState(0);

  //  Control which signup form component to display
  const formPage = {
    0: 'email',
    1: 'password',
    2: 'details',
    3: 'marketing'
  };

  // Data State -- saves each signup field via handleChange
  const [data, setData] = useState({
    email: '',
    password: '',
    username: '',
    birth_date: '',
    gender: '',
    optinmarketing: false
  });

  // Error States
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [usernameError, setUsernameError] = useState();
  const [monthError, setMonthError] = useState();
  const [dayError, setDayError] = useState();
  const [yearError, setYearError] = useState();
  const [genderError, setGenderError] = useState();

  // Field Validations
  // Helper for Month and Year validation
  function isInteger(str) {
    // Define a regular expression pattern for integers (positive or negative)
    const integerPattern = /^-?\d+$/;
  
    // Use the test() method to check if the string matches the pattern
    return integerPattern.test(str);
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email) && email.length >= 0) {
      setEmailError(`This email is invalid. Make sure it's written like example@email.com`);
      return false;
    }
    setEmailError('');
      return true;
  };

  const validatePassword = (password) => {
    let passwordChars = password.split("")
    const SPECIAL_CHARS = [
      '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '|', `/`
    ]

    if(password.length <= 3){
      setPasswordError(`Password should contain at least 8 characters.`);
      return false;
    } else if (password.length >= 255) {
      setPasswordError(`Password should contain less than 255 characters.`);
    } else if (!SPECIAL_CHARS.some(char => passwordChars.includes(char))) {
      setPasswordError(`Password should include at least one special character.`);
      return false;
    } else {
      setPasswordError('');
        return true;
    }
  };

  const validateUsername = (username) => {
    if (username.length < 3){
      setUsernameError(`Name should contain at least 3 characters.`);
      return false
    } else {
      setUsernameError('');
      return true;
    }
  };

  const validateMonth = (month) => {
    const MONTHS = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]
    if (MONTHS.includes(month)) {
      setMonthError('');
      return true
    } else {
      setMonthError('Select a month.')
      return false;
    }
  }

  const validateDay = (day) => {
    if (!isInteger(day)){
      setDayError('Must be a valid day');
      return false;
    }

    if (day < 1 || day > 31) {
      setDayError('Must be a valid day.')
      return false;
    } else {
      setDayError('');
      return true;
    }
  }

  const validateYear = (year) => {
    if (!isInteger(year)){
      setYearError('Must be a valid year.');
      return false
    }

    if (year.length === 4 && (year < 1900 || year > 2023)) {
      setYearError('Must be a valid year.')
      return false;
    } else {
      setYearError('');
      return true;
    }
  }

  const validateGender = (gender) => {
    const GENDERS = [
      'man', 'woman', 'non-binary', 'something-else', 'undisclosed'
    ]
    if (GENDERS.includes(gender)) {
      setGenderError('');
      return true
    } else {
      setGenderError('Select a gender.')
      return false;
    }

  }
  
  // Handle Change -> real-time error validation
  const handleChange = e => {
    // Define field type
    const type = e.target.type;
    // Define field name -- i.e. email / password / name birthdate gender / marketingoptin
    const name = e.target.name;
    // Define value -- ternary handler for marketingOptIn checkbox
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    
    // Validation Switch Case
    switch (name) {
      case 'email':
        validateEmail(value)
        break;
      case 'password':
        validatePassword(value)
        break;
      case 'username':
        validateUsername(value)
        break;
      case 'month':
        console.log(`switch case worked for month`)
        validateMonth(value)
        break;
      case 'day':
        console.log(`switch case worked for day`)
        validateDay(value)
        break;
      case 'year':
        console.log(`switch case worked for year`)
        validateYear(value)
        break;
      case 'gender':
        validateGender(value)
        break;
      default:
        break;
    }
    
    // Set the data upon completed front-end validations
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  

  // ^ Validating all required fields are filled out before allowing submit?
  const {
    email,
    password,
    username,
    birth_date,
    gender,
    optinmarketing,
    ...requiredInputs } = data

  // ! next/prev button handlers
  // const handlePrev = () => {
  //   // console.log(`handlePrev invoked`)
  //   setPage(prev => prev - 1)
  // }

  // const handleNext = () => {
  //   console.log(`handleNext invoked`)
  //   console.log(`Page 1 to Page 2? ${canNextPage1}`)
  //   console.log(`Page 2 to Page 3? ${canNextPage2}`)
  //   console.log(`Page 3 to Page 4? ${canNextPage3}`)
  //   if (canNextPage1){
  //     setPage(prev => prev + 1)
  //     if (canNextPage2){
  //       setPage(prev => prev + 1)
  //     }
  //   }
  // }

  // ~ Updated handleNext for frontend error validation next button control
  const handleNext = () => {
    console.log(`The status of !disablenext() is: ${!disableNext()}`)
    console.log(`The value we're validating is data.year: ${data.day}`)
    if (!disableNext()) {
      setPage(prev => prev + 1);
    }
  }

  // ~ Updated handleNext for frontend error validation next button control
  const handlePrev = () => {
    if (page > 0) {
      setPage(prev => prev - 1);
    }
  }

  const canSubmit = [...Object.values(requiredInputs)].every(Boolean) &&
    page === Object.keys(formPage).length - 1

  const canNextPage1 = Object.keys(data)
    .filter(key => key === 'email')
    .map(key => data[key])
    .every(Boolean)
  
  const canNextPage2 = Object.keys(data)
    .filter(key => key === 'password')
    .map(key => data[key])
    .every(Boolean)
  
  const canNextPage3 = Object.keys(data)
    .filter(key => 
      key === 'name' || 
      key === 'birth_date' ||
      key === 'gender'
      )
      .map(key => data[key])
      .every(Boolean)

  const canNextPage4 = Object.keys(data)
    .filter(key => key === 'optinmarketing')
    .map(key => data[key])
    .every(Boolean)

  // const disableNext =
  //   (page === Object.keys(formPage).length - 1)
  //   || (page === 0 && !canNextPage1)
  //   || (page === 1 && !canNextPage2)
  //   || (page === 2 && !canNextPage3)
  
  // ~ Updated handleNext for frontend error validation next button control
  const disableNext = () => {
    if (page === Object.keys(formPage).length - 1) return true; // true if on last page

    switch (page) {
      case 0:
        return !!emailError || !data.email; // Disable next button if email error or nan
      case 1:
        return !!passwordError || !data.password; // Disable next if password error or nan
      case 2:
        return !!usernameError || !data.username || !!monthError || !data.month || !!dayError || !data.day || !!yearError || !data.year
        // return !!usernameError || !data.username || !!monthError || !data.month || !!dayError || !data.day || !!yearError || !data.year || !!genderError || !data.gender
      default:
        return false;
    }
  };
    
  const prevHide = page === 0 && "remove-button"

  const nextHide = page === Object.keys(formPage).length - 1 && "remove-button"

  const submitHide = page !== Object.keys(formPage).length - 1 && "remove-button"

  return (
    <FormContext.Provider value={{ formPage, page, setPage, data, setData, canSubmit, handleChange, disableNext, prevHide, nextHide, submitHide, handlePrev, handleNext, emailError, setEmailError, passwordError, setPasswordError, usernameError, setUsernameError, monthError, setMonthError, dayError, setDayError, yearError, setYearError, genderError, setGenderError }}>
        {children}
    </FormContext.Provider>
)

};

export default FormContext 