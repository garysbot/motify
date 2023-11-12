import { Link } from 'react-router-dom'
import useFormContext from "../../../hooks/useFormContext"
// ! Form Sub-Components
import SignUpButtons from './FormComponents/SignUpNavButton/SignUpNavButton'

// ! Form Fields
import Email from "../FormInputs/Email"
import Password from "../FormInputs/Password"
import Details from "../FormInputs/Details"
import MarketingOptIn from "../FormInputs/MarketingOptIn"
import './FormInputs.css'

const FormInputs = () => {

    const { page } = useFormContext()

    const display = {
        0: <Email />,
        1: <Password />,
        2: <Details />,
        3: <MarketingOptIn />
    }

    const content = (
        <div className='form-container'>
            {display[page]}
            <SignUpButtons />
            <div className="form-container">
                <hr />
                <p className="login-link-hover">Already have an account? <Link to='/login'>Log in here.</Link></p>
            </div>
        </div>
    )


    return content
}
export default FormInputs