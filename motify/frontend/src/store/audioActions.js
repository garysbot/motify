
// audioActions.js

// Action Types
export const PLAY_TRACK = 'PLAY_TRACK';
export const PAUSE_TRACK = 'PAUSE_TRACK';
export const SET_VOLUME = 'SET_VOLUME';
export const SET_TRACK_POSITION = 'SET_TRACK_POSITION';
export const TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE';
export const SET_QUEUE = 'SET_QUEUE';
export const NEXT_TRACK = 'NEXT_TRACK';
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK';

// Action Creators
export const playTrack = () => ({
  type: PLAY_TRACK
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
