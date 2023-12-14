import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import csrfFetch from "./csrf";

// * Thunk Actions
export const fetchArtists = createAsyncThunk(
  'artists/fetchArtists',
  async () => {
    const response = await csrfFetch(`/artists`)
    const artists = await response.json()
    return artists
  }
)

export const artistSlice = createSlice({
  name: 'artists',
  initialState: {},
  reducers: {
    receiveArtists: (state, action) => {
      const artists = action.payload

      artists.forEach(artist => {
        state[artist.id] = artist
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      artistSlice.caseReducers.receiveArtists(state, action)
    })
  }
})

// * Actions
export const { receiveArtists } = artistSlice.actions

export default artistSlice.reducer