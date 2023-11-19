import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import LoginFormPage from './components/Forms/LoginFormPage/LoginFormPage.jsx';
import SignupFormPage from './components/Forms/SignUpForms/SignUpFormPage';
import UserHomePage from './components/UserHomePage/UserHomePage';


function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <FormProvider>
          <SignupFormPage />
        </FormProvider>
      </Route>
      <Route path="/home" exact>
        <UserHomePage />
      </Route>
      <Route path="/album" exact>
        <UserHomePage />
      </Route>
    </Switch>
  );
}

export default App;
