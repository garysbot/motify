import csrfFetch from "./csrf"

// ! Actions
export const RECEIVE_PLAYLIST = 'playlists/RECEIVE_PLAYLIST'
export const RECEIVE_PLAYLISTS = 'playlists/RECEIVE_PLAYLISTS'
export const REMOVE_PLAYLIST = 'playlists/REMOVE_PLAYLIST'
export const CREATE_PLAYLIST = 'playlists/CREATE_PLAYLIST'
export const UPDATE_PLAYLIST = 'playlists/UPDATE_PLAYLIST';


export const receivePlaylist = (playlist) => ({
  type: RECEIVE_PLAYLIST,
  payload: playlist
})

export const receivePlaylists = (playlists) => ({
  type: RECEIVE_PLAYLISTS,
  payload: playlists
})

export const removePlaylist = (playlistId) => ({
  type: REMOVE_PLAYLIST,
  payload: playlistId
})

export const createPlaylist = (playlist) => ({
  type: CREATE_PLAYLIST,
  payload: playlist
})

export const updatePlaylist = (playlist) => ({
  type: UPDATE_PLAYLIST,
  payload: playlist
});

// ! Selector Helpers
export const getPlaylist = (playlistId) => (state) => {
  return state?.playlists ? state.playlists[playlistId] : null;
}

export const getPlaylists = (state) => {
  return state?.playlists ? Object.values(state.playlists) : [];
}

// ! Thunks
const fetchFromApi = async (endpoint) => {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error('API request failed');
  return response.json();
};

export const fetchPlaylist = (playlistId) => async (dispatch) => {
  try {
    const playlist = await fetchFromApi(`/playlists/${playlistId}`);
    dispatch(receivePlaylist(playlist));
  } catch (error) {
    console.error(`Fetch playlist failed:`, error);
  }
};

export const fetchPlaylists = () => async (dispatch) => {
  try {
    const playlists = await fetchFromApi('/playlists');
    dispatch(receivePlaylists(playlists));
  } catch (error) {
    console.error(`Fetch playlists failed:`, error);
  }
};

export const createPlaylistAsync = (playlistData) => async (dispatch) => {
  try {
    const response = await csrfFetch('/playlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playlistData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Playlist creation error:', errorData);
      throw new Error('API request failed');
    }

    const playlist = await response.json();
    console.log('Server response:', playlist);
    dispatch(receivePlaylist(playlist));
  } catch (error) {
    console.error(`Create playlist failed:`, error);
  }
};


export const removePlaylistAsync = (playlistId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/playlists/${playlistId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('API request failed');

    dispatch({ type: REMOVE_PLAYLIST, payload: playlistId });
  } catch (error) {
    console.error(`Remove playlist failed:`, error);
  }
};

export const updatePlaylistAsync = (playlistData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/playlists/${playlistData.id}`, {
      method: 'PUT', // Use PUT method to update the playlist
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playlistData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Playlist update error:', errorData);
      throw new Error('API request failed');
    }

    const updatedPlaylist = await response.json();
    console.log('Server response:', updatedPlaylist);
    dispatch(updatePlaylist(updatedPlaylist));
  } catch (error) {
    console.error(`Update playlist failed:`, error);
  }
};


const initialState = {};

const playlistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PLAYLIST: {
      const { payload } = action;
      return {
        ...state,
        [payload.id]: payload
      };
    }
    case RECEIVE_PLAYLISTS: {
      const { payload } = action;
      const newState = { ...state };
      payload.forEach(playlist => {
        newState[playlist.id] = playlist;
      });
      return newState;
    }
    case REMOVE_PLAYLIST: {
      const { payload: playlistId } = action;
      const newState = { ...state };
      delete newState[playlistId];
      return newState;
    }
    case CREATE_PLAYLIST: {
      const { payload } = action;
      return {
        ...state,
        [payload.id]: payload
      };
    }
    case UPDATE_PLAYLIST: {
      const { payload } = action;
      return {
        ...state,
        [payload.id]: payload
      };
    }    
    default:
      return state;
  }
};

export default playlistsReducer;
