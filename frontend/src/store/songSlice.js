import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import csrfFetch from "./csrf";

export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async () => {
    const response = await csrfFetch(`/songs`)
    const songs = await response.json()
    return songs
  }
)

export const songSlice = createSlice({
  name: 'songs',
  initialState: {},
  reducers: {
    receiveSongs: (state, action) => {
      const songs = action.payload

      songs.forEach(song => {
        state[song.id] = song
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      songSlice.caseReducers.receiveSongs(state, action)
    })
  }
})

export const { receiveSongs } = songSlice.actions


export default songSlice.reducer