import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import uiReducer from './uiReducer';
import audioReducer from './audioReducer';
import playlistReducer from './playlists'
import searchReducer from './search'

export const rootReducer = combineReducers({
  session,
  ui: uiReducer,
  audio: audioReducer,
  playlist: playlistReducer,
  search: searchReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;