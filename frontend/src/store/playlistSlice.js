import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import csrfFetch from './csrf';

// ! Thunk Action Creators
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

    // Need to update this so it stores newly created playlist similarly as above
    createPlaylist: (state, action) => {
      const newPlaylist = action.payload;
      state[newPlaylist.id] = newPlaylist;
    },

    // updatePlaylist: (state, action) => {
    //   const { id, title, createdAt, updatedAt, song } = action.payload;

    //   if (song) {
    //     const updatedSongs = state.songs ? [...state.songs, song.id] : [song.id];
    //     return {
    //       ...state,
    //       id: id || state.id,
    //       title: title || state.title,
    //       songs: updatedSongs,
    //       created_at: createdAt || state.created_at,
    //       updated_at: updatedAt || state.updated_at
    //     };
    //   }
    //   return state;
    // },
    // & Testing a version of updatePlaylist that accepts optional any action payload
    updatePlaylist: (state, action) => {
      // & Check if action.payload is undefined or null
      if (!action.payload) {
        console.error('Payload is missing in updatePlaylist action');
        return;
      }

      // & Destructure id and changes from the payload
      const { id, ...changes } = action.payload;

      // & Check if the playlist with the given id exists
      const playlist = state[id];
      if (!playlist) {
        console.error(`Playlist with ID ${id} not found`);
        return;
      }

      // & Update the playlist with the changes
      Object.assign(playlist, changes);
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

// * Actions
export const { receivePlaylists, createPlaylist, addSong, removeSong, updatePlaylist, deletePlaylist } = playlistSlice.actions

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
        console.log("Received new playlist data: ", newPlaylist);
        dispatch(createPlaylist(newPlaylist));
      })
      .catch(error => {
        console.error(`Error creating the playlist`, error)
      })
  }
}


export const updatePlaylistAsync = updatedPlaylistData => {
  return (dispatch, getState) => {
    const currentState = getState().playlist;
    const { id: playlistId, song, title } = updatedPlaylistData

    if (!playlistId) {
      console.error(`Playlist ID is having issues, current value is: ${playlistId}`);
      return;
    }

    if (!song) {
      console.error("Song object is undefined");
    }

    if (!title) {
      console.error("Title is undefined or not provided");
    }

    const updatedSongs = currentState.songs ? [...currentState.songs, song] : [song];

    csrfFetch(`/playlists/${playlistId}`, {
      method: 'PATCH',
      body: JSON.stringify({ title, playlist: { title, songs: updatedSongs.map(song => song.id) } })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response failed, playlist not updated`)
        }
        return response.json()
      })
      .then(updatedPlaylist => {
        dispatch(updatePlaylist({ ...updatedPlaylist, song }))
      })
      .catch(error => {
        console.error(`Error updating the playlist`, error)
      })
  }
}

export default playlistSlice.reducer;


if (process.env.NODE_ENV !== 'production') {
  window.createPlaylistAsync = createPlaylistAsync;
}