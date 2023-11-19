// ! ACTION CONSTANTS
export const RECEIVE_SONG = 'songs/RECEIVE_SONG';
export const RECEIVE_SONGS = 'songs/RECEIVE_SONGS';
export const PLAY_SONG = 'songs/PLAY_SONG';
export const PAUSE_SONG = 'songs/PAUSE_SONG';
export const SET_VOLUME = 'songs/SET_VOLUME';
export const SET_TRACK_POSITION = 'songs/SET_TRACK_POSITION';
export const TOGGLE_SHUFFLE = 'songs/TOGGLE_SHUFFLE';
export const SET_QUEUE = 'songs/SET_QUEUE';
export const NEXT_SONG = 'songs/NEXT_SONG';
export const PREVIOUS_SONG = 'songs/PREVIOUS_SONG';


// ! SELECTOR HELPERS
// getSong selector helper with songId
export const getSong = (songId) => (state) => {
  return state?.songs ? state.songs[songId] : null;
}

// getSongs selector that returns all songs
export const getSongs = (state) => {
  return state?.songs ? Object.values(state.songs) : [];
}

// ! ACTION HELPERS
export const receiveSong = (song) => {
  return {
    type: RECEIVE_SONG,
    payload: song
  }
}

export const playTrack = () => ({
  type: PLAY_SONG
});

export const pauseTrack = () => ({
  type: PAUSE_TRACK
});

export const setVolume = (volume) => ({
  type: SET_VOLUME,
  payload: volume
});

export const setTrackPosition = (position) => ({
  type: SET_TRACK_POSITION,
  payload: position
});

export const toggleShuffle = () => ({
  type: TOGGLE_SHUFFLE
});

export const setQueue = (queue) => ({
  type: SET_QUEUE,
  payload: queue
});

export const nextTrack = () => ({
  type: NEXT_TRACK
});

export const previousTrack = () => ({
  type: PREVIOUS_TRACK
});

// ! THUNK ACTIONS

export const fetchSongs = () => async (dispatch) => {
  const response = await fetch ('/songs')
  if (response.ok) {
    const songs = await response.json()
    dispatch({ type: RECEIVE_SONGS, songs })
  }
}

export const fetchPost = (songId) => async (dispatch) => {
  const response = await fetch (`/songs/${songId}`)
  if (response.ok) {
    const song = await response.json()
    dispatch({ type: RECEIVE_SONG, song })
  }
}





// Initial state
const initialState = {
  currentSong: {},
  isPlaying: false,
  volume: 1, // Assuming volume range is 0-1
  trackPosition: 0, // Track position in seconds
  shuffle: false,
  queue: [], // Queue of track IDs
  currentTrackIndex: 0, // Index of the current track in the queue
  trackHistory: [] // History of played tracks
};

// Reducer
const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_SONG':
      return {
        ...state,
        currentSong: action.payload
      };
    case PLAY_SONG:
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
