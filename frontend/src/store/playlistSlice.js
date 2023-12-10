import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
      const { id, userId, title, songs, createdAt, updatedAt } = action.payload;

      return {
        id: id || state.id,
        user_id: userId || state.user_id,
        title: title || state.title,
        songs: songs || state.songs,
        created_at: createdAt || state.created_at,
        updated_at: updatedAt || state.updated_at
      }
    },

    updatePlaylist: (state, action) => {
      const { id, title, createdAt, updatedAt, songId } = action.payload;
    
      // Check if the action payload includes a new songId to add
      if (songId) {
        // If the songs array does not exist, create a new one
        const updatedSongs = state.songs ? [...state.songs, songId] : [songId];
    
        return {
          ...state, // Spread the existing state
          id: id || state.id,
          title: title || state.title,
          songs: updatedSongs, // Update the songs array
          created_at: createdAt || state.created_at,
          updated_at: updatedAt || state.updated_at
        };
      }
    
      // If no songId is provided, return the state as is
      return state;
    },

    addSong: (state, action) => {
      state.songs.push(action.payload);
    },

    removeSong: (state, action) => {
      state.songs = state.songs.filter(song => song.id !== action.payload)
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
      // dispatch(createPlaylist(newPlaylist))

      // & Log the response to see if it contains all the necessary fields
      console.log("Received new playlist data: ", newPlaylist);

      // & Ensure that newPlaylist contains all the necessary fields
      dispatch(createPlaylist(newPlaylist));
    })
    .catch(error => {
      console.error(`Error creating the playlist`, error)
    })
  }
}

// ! Temporary for dev console backend api testing
if (process.env.NODE_ENV !== 'production') {
  window.createPlaylistAsync = createPlaylistAsync;
}

export const updatePlaylistAsync = updatedPlaylistData => {
  return (dispatch, getState) => {
    // & Retrieve the current playlist state
    const currentState = getState().playlist;
    const { id: playlistId, songId } = updatedPlaylistData;

    if (!playlistId) {
      console.error("Playlist ID is undefined");
      return;
    }

    // & Create a new array of song IDs, including the new songId
    const updatedSongs = currentState.songs ? [...currentState.songs, songId] : [songId];

    csrfFetch(`/playlists/${playlistId}`, {
      method: 'PATCH',
      body: JSON.stringify({ playlist: { songs: updatedSongs } }) // Send the updated array of song IDs
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response failed, playlist not updated`)
      }
      return response.json()
    })
    .then(updatedPlaylist => {
      // & Dispatch the updated playlist information, including the new songId
      dispatch(updatePlaylist({ ...updatedPlaylist, songId }))
    })
    .catch(error => {
      console.error(`Error updating the playlist`, error)
    })
  }
}


// * Reducer
export default playlistSlice.reducer;