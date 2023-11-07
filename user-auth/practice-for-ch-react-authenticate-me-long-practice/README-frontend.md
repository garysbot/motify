# Authenticate Me, Part 2: Frontend

This is Part 2 of a three-part project. In the first part, you should have
implemented the entire Rails API backend with user authentication routes. In
this part, you will add a React frontend that uses your backend API routes to
log in, sign up, and log out a user. In Part 3, you will deploy the full stack
project to Heroku.

## Phase 0: Frontend setup

Use the `create-react-app` command from inside your __authenticate-me__ root
folder to initialize your React frontend:

```bash
npx create-react-app frontend --template @appacademy/react-v17 --use-npm
```

This will create a React project in a __frontend__ folder inside your Rails
backend. It is important to note that nothing requires this particular setup:
your frontend will run independently of your backend, interacting with it only
through HTTP requests and responses. Your frontend could accordingly be housed
in an entirely unrelated directory and even hosted on a separate domain.
Creating the frontend inside the backend is simply a design decision intended to
make certain aspects of deploying them together more straightforward (see Part
3).

### Dependencies

In the __frontend__ folder, `npm install` the following packages as
dependencies:

- `react-redux` - React components and hooks for Redux
- `react-router-dom@^5` - routing for React
- `redux` - Redux
- `redux-thunk` - add Redux thunk

`npm install -D` the following packages as dev-dependencies:

- `redux-logger` - log Redux actions in the browser's DevTools console

### Setting up the Redux store

First, set up your Redux store. Make a folder in __frontend/src__ called
__store__ and add an __index.js__ file. In this file, import `createStore`,
`combineReducers`, `applyMiddleware`, and `compose` from the `redux` package.
Import `thunk` as the default export from `redux-thunk`.

Create a `rootReducer` that calls `combineReducers` with an empty object (for
now) as the argument.

Initialize an `enhancer` variable that will be set to different store enhancers
depending on whether the Node environment is development or production.

In production, the `enhancer` should apply only the `thunk` middleware.

In development, add the `logger` middleware and Redux DevTools compose enhancer
as well. To use these tools, create a `logger` variable that uses the default
export of `redux-logger`.  Grab the Redux DevTools compose enhancer with
`window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__` and store it in a variable called
`composeEnhancers`. You can use an __or__ (`||`) to keep Redux's original
`compose` as a fallback in case the DevTools are not installed. Then set the
`enhancer` variable to the return of the `composeEnhancers` function passing in
`applyMiddleware` invoked with `thunk` then `logger`.

```js
// frontend/src/store/index.js

// ...
let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}
```

Next, create a `configureStore` function that takes in an optional
`preloadedState`. Return `createStore` invoked with the `rootReducer`, the
`preloadedState`, and the `enhancer`.

```js
// frontend/src/store/index.js

// ...
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};
```

Finally, export the `configureStore` function at the bottom of the file as the
default export. This function will be used by __index.js__ to attach the Redux
store to the React application.

### `BrowserRouter` and Redux `Provider`

In your React application, you'll be using `BrowserRouter` from React Router for
routing and `Provider` from Redux to provide the Redux store. Import those
components as well as the `configureStore` function that you just wrote in
__frontend/src/store/index.js__.

Your imports should now look something like this:

```js
// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
```

Create a variable to access your store and expose it to the `window`. It should
not be exposed in production, be sure this is only set in development.

```js
// frontend/src/index.js

// ...
const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}
```

Next, define a `Root` React functional component that returns the `App`
component wrapped in Redux's `Provider` and React Router DOM's `BrowserRouter`
provider components. Make sure to pass in the key of `store` with the value of
`store` to the `Provider`.

```js
// frontend/src/index.js

// ...
function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
```

After defining the `Root` functional component, call `ReactDOM.render` passing
in the `Root` component and the HTML element with the id of `"root"`.

```js
// frontend/src/index.js

// ...
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
```

### Test the Redux store setup

Test your Redux store setup by starting your React frontend server (run
`npm start` in your `frontend` folder) and navigate to [http://localhost:3000].

Check to see if your Redux DevTools was successfully connected and if there is
a `store` on the `window` in your browser's DevTools console.

You can ignore the "Store does not have a valid reducer" error. This error is a
result of not passing anything into the `rootReducer`'s `combineReducer`.

Try to dispatch an action from your browser's DevTools console. Make sure to
include a `type` key in the action that you dispatch.

```js
> store.dispatch({ type: 'hello' })
```

> **Note:** The context for the DevTools console is the `window`, so
> `store.dispatch({ type: 'hello' })` is equivalent to `window.store.dispatch({
> type: 'hello' })`.

![test-redux-store-image]

If you cannot dispatch an action or if you cannot see the action in the Redux
DevTools, check the syntax in your __frontend/src/store/index.js__ and in your
__frontend/src/index.js__.

**Now is a good time to commit your initial set up!**

## Wrapping `fetch` requests with CSRF

Your Rails backend server is configured to be CSRF protected and will only
accept requests that have the right CSRF token in the `X-CSRF-Token` header.

First, you need to add a `"proxy"` in your __frontend/package.json__. Add a
`"proxy"` key with the value of `http://localhost:5000` (or whichever port is
serving your backend Rails application). This proxy will force the frontend
server to act like it's being served from the backend server. So if you do a
`fetch` request in the React frontend like `fetch('/api/session)`, then the `GET
/api/session` request will be made to the backend server instead of the frontend
server.

Your __frontend/package.json__'s `"proxy"` key should like this:

```json
  "proxy": "http://localhost:5000"
```

**Remember to restart the frontend server--run `npm start` in the __frontend__
folder--after you make any edits to the __package.json__ file.**

Next, to make `fetch` requests with any HTTP verb other than `GET`, you need to
set an `X-CSRF-Token` header in the request, which must point to a valid CSRF
token. Recall that your backend provides a valid token in each response under a
header of the same name, `X-CSRF-Token`. To include this token in all your
requests, you are going to wrap your calls to `fetch` in a new function that
builds a CSRF-appropriate header and passes it to `fetch`. You will then call
this new function instead of `fetch`.

Add a __csrf.js__ file in the __frontend/src/store__ folder. Define an `async`
function called `csrfFetch` that will take in a `url` parameter and an `options`
parameter that defaults to an empty object.

If `options.headers` is not set, default it to an empty object. If
`options.method` is not set, set it to the `GET` method. If it is any method
other than a `GET` method, you will need to set some default headers. First, you
will need to set the `X-CSRF-Token` header. You'll be storing this token in
[`sessionStorage`] under the key of `X-CSRF-Token`. (Unlike a session cookie,
`sessionStorage` is unique for each browser **tab**.) You can retrieve the
currently stored value, then, by calling
`sessionStorage.getItem("X-CSRF-Token")`. Second, you'll need to set the
`Content-Type` header to a default value of `application/json` if it has not
already been set.

Call and `await` `fetch` with the `url` and the `options` object to get the
response.

If the response status code is 400 or above, `throw` the response as the error.
Otherwise, return the response.

```js
// frontend/src/store/csrf.js

async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there are no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the "Content-Type" header to
  // "application/json" and the "X-CSRF-Token" header to the value of the 
  // "X-CSRF-Token" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
  }

  // call fetch with the url and the updated options hash
  const res = await fetch(url, options);

  // if the response status code is 400 or above, then throw an error with the
  // error being the response
  if (res.status >= 400) throw res;

  // if the response status code is under 400, then return the response to the
  // next promise chain
  return res;
}
```

At the end of the file, designate `csrfFetch` as the default export.

### Restore the CSRF token

In `csrfFetch`, you assume a token has been stored in `sessionStorage`. If a
token has not been set, you will need to set one before loading your
application.

Define and export an `async` function called `restoreCSRF` in
__frontend/src/store/csrf.js__ that will call and `await` the custom `csrfFetch`
function with `/api/session` as the `url` parameter, storing the response in a
`response` variable. (Technically, any `GET` route would work to retrieve a
token; you'll see why this particular route shortly!)

The response should contain a CSRF token in its headers. Define and export a
helper method, `storeCSRFToken`, which takes in a `Response` object, retrieves
its `X-CSRF-Token` header, and stores the retrieved value in `sessionStorage` at
the key of `X-CSRF-Token`.

> **Tip:** Don't try to store a CSRF token that doesn't exist, i.e., a token
> whose value is `null`. `sessionStorage.setItem` will coerce whatever value it
> is asked to store into a String. Setting an item to `null` will accordingly
> store the value as the String `"null"`, which resolves to a different boolean
> value (true) than `null` (false). If you need to set a value in
> `sessionStorage` to `null`, just remove the key instead, e.g.,
> `sessionStorage.removeItem("X-CSRF-Token")`.

Back in `restoreCSRF`, call `storeCSRFToken` with `response`. Finally, return
`response`.

```js
export function storeCSRFToken(response) {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export async function restoreCSRF() {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  return response;
}
```

In the frontend entry file (__frontend/src/index.js__), you'll want to render
your application immediately if a value for `X-CSRF-Token` has been set within
`sessionStorage`. If it is not set (i.e., if the return value of `getItem` is
`'null'`), you'll want to first call `restoreCSRF` and then render your
application within a `.then` callback. You may want to extract your call to
`ReactDOM.render` into a `renderApplication` helper method.

In addition, you should attach the custom `csrfFetch` function onto the `window`
when in development as `window.csrfFetch`.

```js
// frontend/src/index.js

// ... other imports
import csrfFetch, { restoreCSRF } from './store/csrf';

// ... 
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
}

// ...

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (sessionStorage.getItem("X-CSRF-Token") === null) {
  restoreCSRF().then(renderApplication);
} else {
  renderApplication();
}
```

### Test your custom `csrfFetch` with CSRF

It's time to test `csrfFetch`! If your servers are not already running, start up
your Rails server (`rails s`) in one terminal and run `npm start` from inside
the __frontend__ directory in another. In a new tab, navigate to the root route
of the React application, [http://localhost:3000]. In the browser's DevTools
console, first make and `await` a request to `POST /api/test?login` using the
native `fetch`:

```js
> await fetch('/api/test?login', { method: 'POST' }).then(res => res.json())
```

This request should fail with status 422 and the message `Invalid authenticity
token`. Now try the same request using `csrfFetch` instead:

```js
> await csrfFetch('/api/test?login', { method: 'POST' }).then(res => res.json())
```

This request should succeed and return the information for the user that was
logged in. If you don't see this result, check your syntax in the
__frontend/src/store/csrf.js__ and the __frontend/src/index.js__.

At this point, you have finished the frontend auth setup. You can now remove the
`test` action in your backend's __application_controller.rb__ and the
accompanying route as you won't be needing them anymore.

This is also an excellent time to **commit your code!**

Next up: Rendering some React components!

[test-redux-store-image]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-redux-auth/authenticate-me/assets/test-redux-store-setup.png
[`sessionStorage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[http://localhost:3000]: http://localhost:3000