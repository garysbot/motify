import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPageOne from './components/SignUpForms/SignUpFormPageOne';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPageOne />
      </Route>
    </Switch>
  );
}

export default App;
