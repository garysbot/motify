import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import session from './session';
import uiReducer from './uiReducer';
import audioReducer from './audioReducer';
import playlistReducer from './playlistSlice'
import searchReducer from './search'

import artistReducer from './artistSlice'
import albumReducer from './albumSlice';
import songReducer from './songSlice'



export const rootReducer = combineReducers({
  session,
  ui: uiReducer,
  audio: audioReducer,
    // includes
      // currentArtist
      // currentAlbum
      // currentPlaylist
      // currentSong
  search: searchReducer,
  
  // playlistSlice
  playlists: playlistReducer,

  albums: albumReducer,
  songs: songReducer,
  artists: artistReducer
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

// ! Production Version
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

// & DevTools backend api testing version
// const configureStore = (preloadedState) => {
//   const store = createStore(rootReducer, preloadedState, enhancer)

//   // Expose store to window obj in dev env
//   if (process.env.NODE_ENV !== 'production') {
//     window.store = store
//   }

//   return store
// }


export default configureStore;