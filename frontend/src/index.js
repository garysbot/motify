import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';

// testing playlists Redux
import * as playlistActions from './store/playlists';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.playlistActions = playlistActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

// Updated to use createRoot
const container = document.getElementById('root');
const root = createRoot(container); // Create a root

const renderApplication = () => {
  root.render( // Render using the root
    <React.StrictMode>
      <Root />
    </React.StrictMode>
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
