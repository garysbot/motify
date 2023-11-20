import {
  RECEIVE_ARTIST,
  RECEIVE_SONG,
  RECEIVE_SONGS,
  RECEIVE_ALBUM,
  RECEIVE_ALBUMS,
  TOGGLE_PLAY,
  SET_VOLUME,
  SET_TRACK_POSITION,
  TOGGLE_SHUFFLE,
  SET_QUEUE,
  CHANGE_TRACK
} from './audioActions';

const initialState = {
  currentArtist: {},
  currentAlbum: {},
  currentSong: {},
  isPlaying: false,
  volume: 1,
  trackPosition: 0,
  shuffle: false,
  queue: [],
  currentTrackIndex: 0,
  trackHistory: []
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ARTIST:
      return { ...state, currentArtist: action.payload };
    case RECEIVE_SONG:
      return { ...state, currentSong: action.payload, isPlaying: true };
    case RECEIVE_SONGS:
      return { ...state, songs: action.payload };
    case RECEIVE_ALBUM:
      return { ...state, currentAlbum: action.payload }
    case RECEIVE_ALBUMS:
      return { ...state, albums: action.payload }
    case TOGGLE_PLAY:
      return { ...state, isPlaying: !state.isPlaying };
    case SET_VOLUME:
      return { ...state, volume: action.payload };
    case SET_TRACK_POSITION:
      return { ...state, trackPosition: action.payload };
    case TOGGLE_SHUFFLE:
      return { ...state, shuffle: !state.shuffle };
    case SET_QUEUE:
      return { ...state, queue: action.payload };
    case CHANGE_TRACK:
      const indexChange = action.payload === 'next' ? 1 : -1;
      const newIndex = (state.currentTrackIndex + indexChange + state.queue.length) % state.queue.length;
      return { ...state, currentTrackIndex: newIndex };
    default:
      return state;
  }
};

export default audioReducer;
