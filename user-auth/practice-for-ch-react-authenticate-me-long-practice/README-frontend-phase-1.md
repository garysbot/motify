# Auth Me Frontend, Phase 1: Login Form Page

The login form page is the first page that you will add to your frontend
application.

## Session actions and reducer

First, you will add the Redux store actions and reducers that you need for this
feature. You will use the `POST /api/session` backend route to login in a user
as well as add the session user's information to the frontend Redux store.

Make a file called __session.js__ in the __frontend/src/store__ folder. This
file will contain all the actions specific to the session user's information and
the session user's Redux reducer.

In this file, add a `session` reducer that will hold the current session user's
information. The `session` slice of state should look like this if there is a
current session user:

```js
{
  user: {
    id,
    email,
    username,
    createdAt,
    updatedAt
  }
}
```

If there is no session user, then the `session` slice of state should look like
this:

```js
{
  user: null
}
```

By default, there should be no session user in the `session` slice of state.

Create two POJO action creators. One that will set the session user in the
`session` slice of state to the action creator's input parameter, and another
that will remove the session user. Their types should be exported as
constants and used by the action creator and the `session` reducer.

You need to call the API to login then set the session user from the response,
so add a thunk action for the `POST /api/session`. Make sure to use the custom
`csrfFetch` function from __frontend/src/store/csrf.js__. The `POST
/api/session` route expects the request body to have a key of `credential` with
an existing username or email and a key of `password`. After the response from
the AJAX call comes back, parse the JSON body of the response, and dispatch the
action for setting the session user to the user in the response's body.

Export the `login` thunk action and export the reducer as the default.

Import the reducer from __session.js__ into the file with the root reducer,
__frontend/src/store/index.js__.

Set a key of `session` in the `rootReducer`'s `combineReducer` object argument
to the session reducer.

### Test the session actions and reducer

Login should be working so give it a try! Test the `login` thunk action and the
`session` reducer.

Import all the actions from the __session.js__ file into the frontend
application entry file, __frontend/src/index.js__. Then attach the actions to
the `window` at the key of `sessionActions`:

```js
// frontend/src/index.js

// ... other imports
import * as sessionActions from './store/session';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}
// ...
```

Navigate to [http://localhost:3000]. In the browser's DevTools console, try
dispatching the `login` thunk action with the demo user's login credentials.

The `previous state` in the console should look like this:

```js
{
  session: {
    user: null
  }
}
```

The `next state` in the console should look something like this:

```js
{
  session: {
    user: {
      createdAt: "<Some date time format>",
      email: "demo@user.io",
      id: 1,
      updatedAt: "<Some date time format>",
      username: "Demo-lition"
    }
  }
}
```

If there is an error or if the previous or next state does not look like this,
then check the logic in your session reducer and your actions.

To give yourself a clean slate for upcoming tests, go ahead and logout by
calling `await csrfFetch('api/session', { method: 'DELETE'})` in your browser
console.

After you have finished testing, **commit your code**.

### Example session actions and reducer

There is no absolute "right" way of doing this. As long as your `session`
actions and reducers are displaying the expected initial state and states after
each dispatched action, then your setup is fine.

Here's an example of the `session` actions and reducer:

```js
// frontend/src/store/session.js

import csrfFetch from './csrf';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  dispatch(setCurrentUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
```

Here's an example of the `rootReducer` setup:

```js
// frontend/src/store/index.js

// ...
import session from './session';

const rootReducer = combineReducers({
  session
});
// ...
```

Here's an example of how to test the `login` thunk action in the browser's
DevTools console:

```js
> await store.dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
```

## `LoginFormPage` component

After finishing the Redux actions and the reducer for the login feature, the
React components are next.

Create a __components__ folder in the __frontend/src__ folder. This is where all
your components besides `App` will live.

Make a folder called __LoginFormPage__ nested in the new __components__ folder
which will hold all the files for the login form. Add an __index.js__ file
inside __LoginFormPage__. Inside this file, add a React functional component
named `LoginFormPage`.

Render a form with a controlled input for the user login credential (username or
email) and a controlled input for the user password.

On submit of the form, dispatch the `login` thunk action with the form input
values. Make sure to handle and display errors from the `login` thunk action
if there are any.

Export the `LoginFormPage` component as the default at the bottom of the file,
then render it in __App.js__ at the `/login` route.

If there is a current session user in the Redux store, then redirect the user
to the `/` path if trying to access the `LoginFormPage`.

Test your component by navigating to the `/login` page. Try logging into the
form there with the demo user's credentials. Once you login, you should be
redirected to the `/` route. Check your code for the `LoginFormPage` and the
`App` component if this is not the flow that you are experiencing.

Also try logging in with invalid fields to test your handling and displaying of
error messages. (Don't forget to logout via the console after any successful
logins.)

After testing, **commit your `LoginFormPage` code**!

### Example `LoginFormPage` component

Again, there is no absolute "right" way of doing this. As long as your React
application is behaving as expected, you don't need to make your code look
exactly like the example code.

Here's an example for `LoginFormPage` component:

```js
// frontend/src/components/LoginFormPage/index.js

import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginFormPage;
```

Here's an example of what __App.js__ might look like now:

```js
// frontend/src/App.js

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
```

### `LoginForm` CSS

Add a __LoginForm.css__ file in your __LoginFormPage__ folder. Import this CSS
file in __frontend/src/components/LoginFormPage/index.js__.

```js
// frontend/src/components/LoginFormPage/index.js

// ...
import './LoginForm.css';
// ...
```

Define all your CSS styling rules for the `LoginFormPage` component in the
__LoginForm.css__ file. Practice doing some CSS now to make your login page
look better. Make sure to **commit your code afterwards!**

## Restore the session user

Right now, if you login successfully, you get redirected to the `/` route. If
you refresh at that `/` page and navigate to the `/login` page, you
will not be redirected because the store does not retain the session user
information on a refresh. How do you retain the session user information across
a refresh? By storing the current user in `sessionStorage`, as you did the
CSRF token. If a current user has not yet been set, you'll wait to render
your application until after retrieving the current session user from `GET
/api/session` and adding the user info to the Redux store.

Add a thunk action, `restoreSession`, in __frontend/src/store/session.js__ that
will call the `GET /api/session`, pass the response to `storeCSRFToken`, parse
the JSON body of the response, pass the user in the response's body to a
`storeCurrentUser` helper function, and finally dispatch the action for setting
the session user to the user in the response's body.

`storeCurrentUser` should take in a `user`, call `JSON.stringify` on the `user`,
and store the result in `sessionStorage` at the key of `currentUser`. (Remember:
**You don't want to set a `sessionStorage` value to `null`;** if `user` is
`null`, remove the `currentUser` key instead.) To keep the stored user up to
date after logging in, add a call to `storeCurrentUser` to your `login` thunk
action as well.

Test your thunk action by logging in and then refreshing at the
[http://localhost:3000] route. In the browser's DevTools console, try
dispatching the `restoreSession` thunk action.

The `previous state` in the console should look like this:

```js
{
  session: {
    user: null
  }
}
```

The `next state` in the console should look something like this:

```js
{
  session: {
    user: {
      createdAt: "<Some date time format>",
      email: "demo@appacademy.io",
      id: 1,
      updatedAt: "<Some date time format>",
      username: "Demo-lition"
    }
  }
}
```

If you don't see this behavior, check your syntax for the `restoreSession` thunk
action.

After you verify that `restoreSession` works, head over to
__frontend/src/index.js__. Since both a CSRF token and the current user are
required before rendering your application, and both values are retrieved and
stored when you dispatch `restoreSession`, you can replace `restoreCSRF` with
`restoreSession`.

Remove the import of `restoreCSRF`. Then, before rendering your application,
check that **both** `X-CSRF-Token` and `currentUser` are stored in
`sessionStorage`. If either is `null`, call
`store.dispatch(sessionActions.restoreSession())` instead of `restoreCSRF()`.

There's still one missing piece: if there is a current user stored in
`sessionStorage`, this user should be included in the initial Redux state. Head
back to __frontend/src/store/session.js__. Replace the default initial value for
`user` within the session slice of state: instead of `null`, it should point to
the value stored in `currentUser` within `sessionStorage`, parsed into a POJO
via `JSON.parse`.

Test that the session is being restored by logging in, then refreshing. You
should remain logged in upon refresh.

You can now safely remove `restoreCSRF` from __frontend/src/store/csrf.js__.
While you're at it, feel free to remove `storeCSRFToken` and add it to
__frontend/src/store/session.js__ instead; don't forget to remove the
corresponding `import` if you do.

**Commit after testing!**

## Example `restoreSession` thunk action

Again, there is no absolute "right" way of doing this. As long as your React
application is behaving as expected, you don't need to make your code look
exactly like the example code.

Here's an example of the `restoreSession` thunk action, the accompanying storage
helper functions, the adjustment to `login`, and the new `initialState` for the
session reducer:

```js
// frontend/src/store/session.js

// ...
const storeCSRFToken = response => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
}

export const login = ({ credential, password }) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password })
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const restoreSession = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

// ...

const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

// ...
```

Here's an example of how to test the `restoreSession` thunk action in the
console:

```js
> await store.dispatch(sessionActions.restoreSession())
```

Here's an example of what the refactored portion of __frontend/src/index.js__
could look like now:

```js
// frontend/src/index.js

// ...
if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null 
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}
```

[http://localhost:3000]: http://localhost:3000