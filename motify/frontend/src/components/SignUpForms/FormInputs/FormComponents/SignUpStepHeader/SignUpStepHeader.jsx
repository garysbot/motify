import useFormContext from "../../../../../hooks/useFormContext";

const SignUpStepHeader = () => {

  const { page } = useFormContext()

  const stepTitle = {
    1: 'Create a Password',
    2: 'Tell us about yourself',
    3: 'Terms & Conditions'
  }

  return (
    <>
      <div className="sign-up-step-header">
        <p className="helper-text">Step {page} of 3</p>
        <h4 className="form-title">{stepTitle[page]}</h4>
      </div>
    </>
  );
}

export default SignUpStepHeader;