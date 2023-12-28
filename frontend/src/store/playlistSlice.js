import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import csrfFetch from './csrf';

// Thunk Action Creators
export const fetchPlaylists = createAsyncThunk(
  'playlists/fetchPlaylists',
  async () => {
    const response = await csrfFetch(`/playlists`)
    const playlists = await response.json()
    return playlists
  }
)

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {},

  reducers: {
    receivePlaylists: (state, action) => {
      const playlists = action.payload
      playlists.forEach(playlist => {
        state[playlist.id] = playlist
      })
    },

    createPlaylist: (state, action) => {
      const newPlaylist = action.payload;
      state[newPlaylist.id] = newPlaylist;
    },

    updatePlaylist: (state, action) => {
      // Check if action.payload is undefined or null
      if (!action.payload) {
        console.error('Payload is missing in updatePlaylist action');
        return;
      }
      //  Destructure id and changes from the payload
      const { id, ...changes } = action.payload;
      //  Check if the playlist with the given id exists
      const playlist = state[id];

      if (!playlist) {
        console.error(`Playlist with ID ${id} not found`);
        return;
      }

      // & Update the playlist with the changes
      Object.assign(playlist, changes);
    },

    deletePlaylist: (state, action) => {
      const playlistId = action.payload
      if (!playlistId) {
        console.error(`deletePlaylist action payload is missing playlistId`)
        return
      }
      delete state[playlistId]
    },

    addSong: (state, action) => {
      // Adjusting so that it adds song to the corresponding playlist ID
      const { playlistId, song } = action.payload;
      if (state[playlistId]) {
        state[playlistId].songs.push(song)
      } else {
        console.error(`Playlist with ID ${playlistId} was not found`)
      }
    },

    removeSong: (state, action) => {
      state.songs = state.songs.filter(song => song.id !== action.payload)
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
      playlistSlice.caseReducers.receivePlaylists(state, action)
    })
  }
})

//  Actions
export const { 
  receivePlaylists, 
  createPlaylist, 
  addSong, 
  removeSong, 
  updatePlaylist, 
  deletePlaylist 
} = playlistSlice.actions

// Thunk action creators
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
        console.log("Received new playlist data: ", newPlaylist);
        dispatch(createPlaylist(newPlaylist));
      })
      .catch(error => {
        console.error(`Error creating the playlist`, error)
      })
  }
}

export const updatePlaylistAsync = updatedPlaylistData => {
  return (dispatch) => {
    const { id: playlistId, ...changes } = updatedPlaylistData;

    if (!playlistId) {
      console.error("Playlist ID is undefined");
      return;
    }
    // Make the PATCH request with the changes
    csrfFetch(`/playlists/${playlistId}`, {
      method: 'PATCH',
      body: JSON.stringify(changes)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response failed, playlist not updated`);
      }
      return response.json();
    })
    .then(updatedPlaylist => {
      // Dispatch the updatePlaylist action with the updated data from the backend
      dispatch(updatePlaylist({ id: playlistId, ...updatedPlaylist }));
    })
    .catch(error => {
      console.error(`Error updating the playlist`, error);
    });
  };
}

export const deletePlaylistAsync = playlistId => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      csrfFetch(`/playlists/${playlistId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response failed, playlist not deleted`);
        }
        dispatch(deletePlaylist(playlistId));
        resolve();
      })
      .catch(error => {
        console.error(`Error deleting the playlist`, error);
        reject(error);
      });
    });
  };
};




export default playlistSlice.reducer;