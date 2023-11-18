
// audioReducer.js

// Initial state
const initialState = {
  isPlaying: false,
  volume: 1, // Assuming volume range is 0-1
  trackPosition: 0, // Track position in seconds
  shuffle: false,
  queue: [], // Queue of track IDs
  currentTrackIndex: 0, // Index of the current track in the queue
  trackHistory: [] // History of played tracks
};

// Action Types
const PLAY_TRACK = 'PLAY_TRACK';
const PAUSE_TRACK = 'PAUSE_TRACK';
const SET_VOLUME = 'SET_VOLUME';
const SET_TRACK_POSITION = 'SET_TRACK_POSITION';
const TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE';
const SET_QUEUE = 'SET_QUEUE';
const NEXT_TRACK = 'NEXT_TRACK';
const PREVIOUS_TRACK = 'PREVIOUS_TRACK';

// Reducer
const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_TRACK:
      return {
        ...state,
        isPlaying: true
      };
    case PAUSE_TRACK:
      return {
        ...state,
        isPlaying: false
      };
    case SET_VOLUME:
      return {
        ...state,
        volume: action.payload
      };
    case SET_TRACK_POSITION:
      return {
        ...state,
        trackPosition: action.payload
      };
    case TOGGLE_SHUFFLE:
      return {
        ...state,
        shuffle: !state.shuffle
      };
    case SET_QUEUE:
      return {
        ...state,
        queue: action.payload
      };
    case NEXT_TRACK:
      const nextIndex = state.currentTrackIndex + 1 < state.queue.length ? state.currentTrackIndex + 1 : 0;
      return {
        ...state,
        currentTrackIndex: nextIndex,
        trackHistory: [...state.trackHistory, state.queue[state.currentTrackIndex]]
      };
    case PREVIOUS_TRACK:
      const previousIndex = state.currentTrackIndex - 1 >= 0 ? state.currentTrackIndex - 1 : state.queue.length - 1;
      return {
        ...state,
        currentTrackIndex: previousIndex
      };
    default:
      return state;
  }
};

export default audioReducer;
