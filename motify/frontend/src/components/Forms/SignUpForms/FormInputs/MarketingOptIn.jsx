import useFormContext from "../../../../hooks/useFormContext";
import SignUpStepHeader from "./FormComponents/SignUpStepHeader/SignUpStepHeader";


const MarketingOptIn = () => {
  const { data, handleChange } = useFormContext();

  return (
    <>
      {/* {console.log(`MarketingOptIn page opened`)} */}
      <div className="signup-container">
        <SignUpStepHeader />

        <div className="optin-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="optinmarketing"
              checked={data.optinmarketing}
              onChange={handleChange}
              className="checkbox-input"
            />
          </label>
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
