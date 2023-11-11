import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignUpForms/SignUpFormPage';


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
    </Switch>
  );
}

export default App;
