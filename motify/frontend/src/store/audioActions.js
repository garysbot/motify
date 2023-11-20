// Action Types
export const RECEIVE_ARTIST = 'songs/RECEIVE_ARTIST';
export const RECEIVE_SONG = 'songs/RECEIVE_SONG';
export const RECEIVE_SONGS = 'songs/RECEIVE_SONGS';
export const RECEIVE_ALBUM = 'songs/RECEIVE_ALBUM';
export const RECEIVE_ALBUMS = 'songs/RECEIVE_ALBUMS';
export const TOGGLE_PLAY = 'songs/TOGGLE_PLAY';
export const SET_VOLUME = 'songs/SET_VOLUME';
export const SET_SONG_POSITION = 'songs/SET_SONG_POSITION';
export const TOGGLE_SHUFFLE = 'songs/TOGGLE_SHUFFLE';
export const SET_QUEUE = 'songs/SET_QUEUE';
export const CHANGE_TRACK = 'songs/CHANGE_TRACK';

// Action Creators
export const receiveArtist = (artist) => ({
  type: RECEIVE_ARTIST,
  payload: artist
});


export const receiveSong = (song) => ({
  type: RECEIVE_SONG,
  payload: song
});

export const receiveSongs = (songs) => ({
  type: RECEIVE_SONGS,
  payload: songs
});


export const receiveAlbum = (album) => ({
  type: RECEIVE_ALBUM,
  payload: album
})

export const receiveAlbums = (albums) => ({
  type: RECEIVE_ALBUMS,
  payload: albums
})

export const togglePlay = () => ({
  type: TOGGLE_PLAY
});

export const setVolume = (volume) => ({
  type: SET_VOLUME,
  payload: volume
});

export const setSongPosition = (position) => ({
  type: SET_SONG_POSITION,
  payload: position
});

export const toggleShuffle = () => ({
  type: TOGGLE_SHUFFLE
});

export const setQueue = (queue) => ({
  type: SET_QUEUE,
  payload: queue
});

export const changeTrack = (direction) => ({
  type: CHANGE_TRACK,
  payload: direction // 'next' or 'previous'
});
