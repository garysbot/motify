import useFormContext from "../../../../../hooks/useFormContext";
import './SignUpNavButton.css'
import csrfFetch from '../../../../../store/csrf';

const SignUpButtons = () => {
  const { page, handleNext, handlePrev, data, canSubmit } = useFormContext();
  let buttonType, classType, handleType

  const handleSubmit = async () => {
    if (canSubmit) {
      const formattedData = {
        user: {
          email: data.email,
          password: data.password,
          username: data.username, // Ensure this field is in your form
          dob: data.dob, // Ensure your Rails controller permits this parameter
          gender: data.gender, // Ensure your Rails controller permits this parameter
          marketingOptIn: data.marketingOptIn, // Ensure your Rails controller permits this parameter
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
      {console.log(page)}
      <div className="sign-up-buttons-container">
        <button onClick={handleType} className={`sign-up-buttons ${classType}`}>{buttonType}</button>
        {}
      </div>
    </>
  );
}

export default SignUpButtons;