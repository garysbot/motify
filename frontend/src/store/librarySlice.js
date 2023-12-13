import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import csrfFetch from "./csrf";

export const albumSlice = createSlice({
  name: 'album',
  initialState: {
    id: {
      
    }
  }
})

export default albumSlice.reducer