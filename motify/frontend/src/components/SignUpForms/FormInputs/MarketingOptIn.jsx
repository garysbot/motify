import useFormContext from "../../../hooks/useFormContext";

const MarketingOptIn = () => {
  const { data, handleChange } = useFormContext();

  return (
    <>
      {console.log(`MarketingOptIn page opened`)}
      <div className="signup-container">
        <p className="helper-text">Step 3 of 3</p>
        <p className="form-title">Terms & Conditions</p>

      <div className="optin-container">
        <p className="optin-helper-text helper-text">Share my registration data with Spotify's content providers for marketing purposes.</p>
      </div>
      
      <div className="legal-text-container">
        <p className="helper-text">By clicking on sign-up, you agree to Spotify's Terms and Conditions of Use.</p>
        <p className="helper-text">To learn more about how Spotify collects, uses, shares and protects your personal data, please see Spotify's Privacy Policy.</p>
      </div>

      </div>
    </>
  );
};

export default MarketingOptIn;
