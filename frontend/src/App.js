import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FormProvider } from './context/FormContext';


import MainPage from './components/MainPage/MainPage.jsx';
import LoginFormPage from './components/Forms/LoginFormPage/LoginFormPage.jsx';
import SignupFormPage from './components/Forms/SignUpForms/SignUpFormPage';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={MainPage}/>
      <Route path='/create'>
        <MainPage/>
      </Route>
      <Route path='/albums'>
        <MainPage/>
      </Route>
      <Route path='/artists'>
        <MainPage/>
      </Route>
      <Route path='/songs'>
        <MainPage/>
      </Route>
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
