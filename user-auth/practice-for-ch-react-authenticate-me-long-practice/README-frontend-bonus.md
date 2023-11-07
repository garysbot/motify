# Auth Me Frontend, Bonus: Make The Login Form Page Into A Modal

Modals are everywhere in modern applications. Here's one way of implementing a
modal in React without any external libraries/packages.

You will create a modal using `ReactDOM`'s `createPortal` method. [Portals in
React] provide a way to render React elements into an entirely separate HTML DOM
element from where the React component is rendered.

Let's get started!

## Modal context

First, make a folder in __frontend/src__ called __context__. This folder will
hold all the different context and context providers for your application. Add a
file in the __context__ folder called __Modal.js__. Create a React context
called a `ModalContext`.

Create a functional component called `ModalProvider` that renders the
`ModalContext.Provider` component with all the `children` from the props as a
child. Render a `div` element as a sibling right after the
`ModalContext.Provider`.

Create a React ref called `modalRef` with the [`useRef`] hook. Set the `ref`
prop on the rendered `div` element to this `modalRef`. `modalRef.current` will
be set to the actual HTML DOM element that gets rendered from the `div`. Create
a component state variable called `value` that will be set to `modalRef.current`
after the initial render (hint: use the `useEffect` hook). Pass this `value` as
the `value` prop to the `ModalContext.Provider` component. Export the
`ModalProvider` component. Import the `ModalProvider` component in
__frontend/src/index.js__ and wrap all the contents of the Root component with
it.

Back in __context/Modal.js__, create a functional component called `Modal` that
expects an `onClose` function and `children` as props. Get the value of the
`ModalContext` into the `Modal` component by using the `useContext` hook and
setting the value equal to a variable called `modalNode`. Render a `div` with an
`id` of `modal`. Inside the `modal` div, nest two other `div`s, one with an `id`
of `modal-background` and another with an `id` of `modal-content`. In the
`modal-content` div, render the `children` props. When the `modal-background` is
clicked, the `onClose` prop should be invoked. Return `null` if `modalNode` is
falsey.

The `modal-background` div needs to be rendered **before** the `modal-content`
because it will naturally be placed "behind" the depth of the `modal-content`
if it comes before the `modal-content` in the DOM tree.

To get these elements to show up in the `div` in the `ModalProvider` component,
pass the rendered elements in the `Modal` component as the first argument of
`ReactDOM.createPortal` and pass in the `modalNode` as the second argument,
which is the reference to the actual HTML DOM element of the `ModalProvider`'s
`div`. Return the invocation of `ReactDOM.createPortal`. Make sure to import
`ReactDOM` from the `react-dom` package.

Add a CSS file in the __context__ folder called __Modal.css__. The `modal` div
should have a `position` `fixed` and take up the entire width and height of the
window. The `modal-background` should also take up the entire width and height
of the window and have a `position` `absolute`. The `modal-content` div should
be centered inside of the `modal` div by flexing the `modal` div and have a
`position` of `absolute`. You may want to give the `modal-background` a
`background-color` of `rgba(0, 0, 0, 0.7)` and the `modal-content` a
`background-color` of `white` just to see them better.

Import the __Modal.css__ file into the __Modal.js__ context file.

## Login form modal

Now it's time to refactor the `LoginFormPage` component to be a modal instead
of a page.

Rename the __LoginFormPage__ folder to __LoginFormModal__. Rename the
__index.js__ file to __LoginForm.js__. Rename the component from `LoginFormPage`
to just `LoginForm`. Remove the code for redirecting the user if there is no
session user in the Redux store.

Create a new __index.js__ file. Inside it, import the `LoginForm` component.
Create a functional component called `LoginFormModal`. Add a component state
variable called `showModal` and default it to `false`. Render a button with the
text `Log In` that, when clicked, will set the `showModal` state variable to
`true`.

Import the `Modal` component into this file. Render the `Modal` component with
the `LoginForm` component as its child **only when** the `showModal` state
variable is `true`. Add an `onClose` prop to the `Modal` component set to a
function that will change the `showModal` state variable to `false` when
invoked. Export the `LoginFormModal` component as default from this file.

Import the new `LoginFormModal` component into the `Navigation` component.
Replace the link to the login page with this `LoginFormModal` component.

Remove the `LoginFormPage` component from the `App` component.

It's finally time to test out your login form modal! Head to the home page,
[http://localhost:3000], and make sure you are logged out. Click the `Log In`
button. The login form modal should pop up. It should close when you click
anywhere outside of the form. Make sure the login functionality still works!

**Commit, commit, commit!**

## Example modal and login form modal

Here's an example of what __Modal.js__ might look like:

```js
// frontend/src/context/Modal.js

import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}
```

Here's an example of what __Modal.css__ could look like:

```css
/* frontend/src/context/Modal.css */

#modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#modal-background {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
}

#modal-content {
  position: absolute;
  background-color:white;
}
```

Here's an example of what __LoginFormModal/index.js__ could look like:

```js
// frontend/src/components/LoginFormModal/index.js

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
```

Here's an example of what __LoginForm.js__ might look like:

```js
// frontend/src/components/LoginFormModal/LoginForm.js

import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

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
  };

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

export default LoginForm;
```

Here's an example of what __Navigation.js__ could look like now:

```js
// frontend/src/components/Navigation/index.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation(){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
```

Here's an example of what __App.js__ might look like now:

```js
// frontend/src/App.js

import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
```

Here's an example of what __frontend/src/index.js__ could look like:

```js
// frontend/src/index.js

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/Modal";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import csrfFetch from "./store/csrf";
import * as sessionActions from "./store/session";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null 
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}
```

[Portals in React]: https://reactjs.org/docs/portals.html
[`useRef`]: https://reactjs.org/docs/hooks-reference.html#useref
[http://localhost:3000]: http://localhost:3000