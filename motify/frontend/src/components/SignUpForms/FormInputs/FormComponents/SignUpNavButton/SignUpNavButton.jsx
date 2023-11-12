import useFormContext from "../../../../../hooks/useFormContext";
import './SignUpNavButton.css'

const SignUpButtons = () => {
  const { page, handleNext, handlePrev } = useFormContext();
  let buttonType, classType, handleType

  if (page < 3) {
    buttonType = 'Next'
    classType = 'next'
    handleType = handleNext
  } else if (page === 3) {
    buttonType = 'Submit'
    classType = 'prev'
    handleType = handlePrev
  }

  return (
    <>
      {console.log(page)}
      <div className="sign-up-buttons-container">
        <button onClick={handleType} className={`sign-up-buttons ${classType}`}>{buttonType}</button>
      </div>
    </>
  );
}

export default SignUpButtons;