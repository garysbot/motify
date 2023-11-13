import useFormContext from "../../../../../hooks/useFormContext";
import './SignUpNavButton.css'
import csrfFetch from '../../../../../store/csrf';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signup as signupAction } from '../../../../../store/session'

const SignUpButtons = () => {
  const { page, handleNext, handlePrev, data, canSubmit, handleChange } = useFormContext();
  let buttonType, classType, handleType

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (canSubmit) {
      const formattedData = {
        user: {
          email: data.email,
          password: data.password,
          username: data.username, 
          birth_date: data.birth_date, 
          gender: data.gender, 
          optinmarketing: data.optinmarketing
        },
      };
  
      try {
        const response = await csrfFetch('/api/users', {
          method: 'POST',
          body: JSON.stringify(formattedData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error('Failed to submit form: ' + errorData.errors.join(', '));
        }
  
        const responseData = await response.json();
        // Handle success (e.g., redirect or show success message)
        console.log('Form submitted successfully:', responseData);
        // Add your success handling code here
        history.push('/testing');
        
      } catch (error) {
        // Handle errors (e.g., show error message to the user)
        console.error('Error submitting form:', error.message);
        // Add your error handling code here
      }
    } else {
      // Handle the case where the form is not valid for submission
      console.log('Form is not valid for submission');
      // Add your code for handling invalid form submission here
    }
  };
  

  if (page < 3) {
    buttonType = 'Next'
    classType = 'next'
    handleType = handleNext
  } else if (page === 3) {
    buttonType = 'Submit'
    classType = 'prev'
    handleType = handleSubmit
  }

  

  return (
    <>
      {/* {console.log(page)} */}
      <div className="sign-up-buttons-container">
        <button
          onClick={handleType} 
          className={`sign-up-buttons ${classType}`}
          onChange={handleChange}
        >
          {buttonType}
        </button>
      </div>
    </>
  );
}

export default SignUpButtons;