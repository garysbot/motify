import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import csrfFetch from "./csrf";

// * Thunk actions
export const fetchAlbums = createAsyncThunk(
  'albums/fetchAlbums',
  async () => {
    const response = await csrfFetch(`/albums`)
    const albums = await response.json();
    return albums;
  }
)


export const albumSlice = createSlice({
  name: 'albums',
  initialState: {},

  // & Controls the Redux state shape
  reducers: {
    // Update state with fetched albums payload
    receiveAlbums: (state, action) => {
      const albums = action.payload

      albums.forEach(album => {
        state[album.id] = album
      })
      // Unnecessary array of all album ID's -> only necessary if owned by the user
      // state.allAlbums = albums.map(album => album.id)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      albumSlice.caseReducers.receiveAlbums(state, action)
    })
  }
})

// * Actions
export const { receiveAlbums } = albumSlice.actions


export default albumSlice.reducer

// ! -------------------------------------------------

