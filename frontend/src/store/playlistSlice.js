import { createSlice } from '@reduxjs/toolkit';

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    user_id: null,
    title: '',
    songs: [],
    created_at: null,
    updated_at: null
  },

  reducers: {
    addSong: (state, action) => {
      state.songs.push(action.payload);
    },
    removeSong: (state, action) => {
      state.songs = state.songs.filter(song => song.id !== action.payload)
    },
    setPlaylistDetails: (state, action) => {
      const { title, created_at, updated_at } = action.payload;
      state.title = title
      state.created_at = created_at
      state.updated_at = updated_at
    },
    setUserID: (state, action) => {
      state.user_id = action.payload;
    },
    deletePlaylist: state => {
      state.user_id = null;
      state.title = '';
      state.songs = [];
      state.created_at = null;
      state.updated_at = null;
    }
  }
})

// * Actions
export const { addSong, removeSong, setPlaylistDetails, setUserID, deletePlaylist } = playlistSlice.actions

// * Reducer
export default playlistSlice.reducer;