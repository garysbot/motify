// Assuming using Reselect for memoization
import { createSelector } from 'reselect';

const selectSongsState = (state) => state.songs;

export const getSong = createSelector(
  [selectSongsState, (state, songId) => songId],
  (songs, songId) => songs[songId]
);

export const getSongs = createSelector(
  selectSongsState,
  (songs) => Object.values(songs)
);
