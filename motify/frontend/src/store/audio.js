// Action Constants

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

// getSong selector helper with songId
export const getSong = (songId) => (state) => {
  return state?.songs ? state.songs[songId] : null;
}

// getSongs selector that returns all songs
export const getSongs = (state) => {
  return state?.songs ? Object.values(state.songs) : [];
}


// Action Thunks

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

