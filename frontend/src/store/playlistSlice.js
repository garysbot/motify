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
      const { id, title, createdAt, updatedAt, song } = action.payload;

      if (song) {
        const updatedSongs = state.songs ? [...state.songs, song.id] : [song.id];
        return {
          ...state,
          id: id || state.id,
          title: title || state.title,
          songs: updatedSongs,
          created_at: createdAt || state.created_at,
          updated_at: updatedAt || state.updated_at
        };
      }
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

    updateTitle: (state, action) => {
      state.title = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
      playlistSlice.caseReducers.receivePlaylists(state, action)
    })
  }
})

// * Actions
export const { receivePlaylists, createPlaylist, addSong, removeSong, updatePlaylist, setUserID, deletePlaylist, updateTitle } = playlistSlice.actions

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
      console.error("Playlist ID is undefined");
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