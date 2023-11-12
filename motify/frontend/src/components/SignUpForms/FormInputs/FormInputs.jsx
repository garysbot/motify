import { Link } from 'react-router-dom'
import useFormContext from "../../../hooks/useFormContext"
import Email from "../FormInputs/Email"
import Password from "../FormInputs/Password"
import Details from "../FormInputs/Details"
import MarketingOptIn from "../FormInputs/MarketingOptIn"
import './FormInputs.css'

const FormInputs = () => {

    const { page, handleNext, handlePrev } = useFormContext()

    const display = {
        0: <Email />,
        1: <Password />,
        2: <Details />,
        3: <MarketingOptIn />
    }

    const content = (
        <div className='form-container'>
            {/* <Email /> */}
            {display[page]}
            <div className="form-container">
                <button type="submit" onClick={handleNext}>Next</button>
                <button type="submit" onClick={handlePrev}>Prev</button>
                <hr/>
                <p className="login-link-hover">Already have an account? <Link to='/login'>Log in here.</Link></p>
            </div>
        </div>
    )


    return content
}
export default FormInputs