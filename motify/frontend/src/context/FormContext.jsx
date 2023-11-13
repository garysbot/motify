import { createContext, useState, useEffect } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {

  // ! Control which form component to display
  const formPage = {
    0: 'email',
    1: 'password',
    2: 'details',
    3: 'marketing'
  }

  const [page, setPage] = useState(0)

  const [data, setData] = useState({
    email: '',
    password: '',
    username: '',
    birth_date: '',
    gender: '',
    optinmarketing: false
  })

  // ! handleChange for form components
  // checks React tag attrib "type" and "name" to deploy correct data setter
  // const handleChange = e => {
  //   const type = e.target.type

  //   const name = e.target.name

  //   const value = type === "checkbox"
  //       ? e.target.checked
  //       : e.target.value

  //   setData(prevData => ({
  //       ...prevData,
  //       [name]: value
  //   }))
  // }

  const [emailError, setEmailError] = useState()
  
  // ! Updated handleChange with email validation
  const handleChange = e => {
    const type = e.target.type;
    const name = e.target.name;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
  
    // Email validation function
    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
      if (!emailRegex.test(email)) {
        setEmailError(`This email is invalid. Make sure it's written like example@email.com`);
        return false;
      }
      setEmailError('');
        return true;
      };
  
      // Check if the changed field is 'email' and validate it
      if (name === 'email') {
        validateEmail(value);
      }
    
      setData(prevData => ({
        ...prevData,
        [name]: value
      }));
  }
  

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
  const handlePrev = () => {
    // console.log(`handlePrev invoked`)
    setPage(prev => prev - 1)
  }

  const handleNext = () => {
    // console.log(`handleNext invoked`)
    setPage(prev => prev + 1)
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

  const disableNext =
    (page === Object.keys(formPage).length - 1)
    || (page === 0 && !canNextPage1)
    || (page === 1 && !canNextPage2)
    || (page === 2 && !canNextPage3)

    
  const prevHide = page === 0 && "remove-button"

  const nextHide = page === Object.keys(formPage).length - 1 && "remove-button"

  const submitHide = page !== Object.keys(formPage).length - 1 && "remove-button"

  return (
    <FormContext.Provider value={{ formPage, page, setPage, data, setData, canSubmit, handleChange, disableNext, prevHide, nextHide, submitHide, handlePrev, handleNext, emailError, setEmailError }}>
        {children}
    </FormContext.Provider>
)

};

export default FormContext 