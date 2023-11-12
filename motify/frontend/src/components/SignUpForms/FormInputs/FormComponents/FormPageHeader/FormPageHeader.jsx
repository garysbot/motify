import './FormPageHeader.css'

const FormPageHeader = ({ bgColor }) => {


  return (
    <>
      <header className={`form-page-header-logo-container-${bgColor}`}>
        <div className="form-page-header-logo"/>
      </header>
    </>
  );

}

export default FormPageHeader