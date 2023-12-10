import { createSlice } from '@reduxjs/toolkit';
import csrfFetch from './csrf';

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
    createPlaylist: (state, action) => {
      const { user_id, title, songs, created_at, updated_at } = action.payload
      state.user_id = user_id
      state.title = title
      state.songs = songs || []
      state.created_at = created_at
      state.updated_at = updated_at
    },

    addSong: (state, action) => {
      state.songs.push(action.payload);
    },

    removeSong: (state, action) => {
      state.songs = state.songs.filter(song => song.id !== action.payload)
    },

    updatePlaylist: (state, action) => {
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
export const { createPlaylist, addSong, removeSong, updatePlaylist, setUserID, deletePlaylist } = playlistSlice.actions

// * Thunk action creators

export const createPlaylistAsync = newPlaylistData => {
  return (dispatch) => {
    csrfFetch(`/playlists`, {
      method: 'POST',
      body: JSON.stringify({ playlist: newPlaylistData })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network respone failed, playlist not created`)
      }
      return response.json()
    })
    .then(newPlaylist => {
      dispatch(createPlaylist(newPlaylist))
    })
    .catch(error => {
      console.error(`Error creating the playlist`, error)
    })
  }
}

export const updatePlaylistAsync = updatedPlaylistData => {

  return (dispatch) => {
    // Establish playlistId for use with fetch
    const playlistId = updatedPlaylistData.id

    csrfFetch(`/playlists/${playlistId}`, {
      method: 'PATCH',
      body: JSON.stringify({ playlist: updatedPlaylistData })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response failed, playlist not updated`)
      }
      return response.json()
    })
    .then(updatedPlaylist => {
      dispatch(updatePlaylist(updatedPlaylist))
    })
    .catch(error => {
      console.error(`Error updating the playlist`, error)
    })
  }
}

// * Reducer
export default playlistSlice.reducer;