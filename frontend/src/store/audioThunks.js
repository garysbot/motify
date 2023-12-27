import { receiveSongs, receiveSong, receiveAlbums, receiveAlbum, receiveArtist, receivePlaylist } from './audioActions';
import csrfFetch from './csrf';

// Abstracted API call
const fetchFromApi = async (endpoint) => {
  const response = await csrfFetch(endpoint);
  if (!response.ok) throw new Error('API request failed');
  return response.json();
};

export const fetchSongs = () => async (dispatch) => {
  try {
    const songs = await fetchFromApi('/songs');
    dispatch(receiveSongs(songs));
  } catch (error) {
    console.error('Fetch songs failed:', error);
    // Dispatch error action if needed
  }
};

export const fetchPlaylist = (playlistId) => async (dispatch) => {
  try {
    const playlist = await fetchFromApi(`/playlists/${playlistId}`);
    dispatch(receivePlaylist(playlist));
  } catch (error) {
    console.error('Fetch playlists failed:', error);
  }
};

export const fetchSong = (songId) => async (dispatch) => {
  try {
    const song = await fetchFromApi(`/songs/${songId}`);
    dispatch(receiveSong(song));
  } catch (error) {
    console.error('Fetch song failed:', error);
    // Dispatch error action if needed
  }
};

export const fetchAlbum = (albumId) => async (dispatch) => {
  try {
    const album = await fetchFromApi(`/albums/${albumId}`);
    dispatch(receiveAlbum(album));
  } catch (error) {
    console.error(`Fetch album failed:`, error);
  }
}

export const fetchAlbums = () => async (dispatch) => {
  try {
    const albums = await fetchFromApi(`/albums`);
    dispatch(receiveAlbums(albums));
  } catch (error) {
    console.error(`Fetch albums failed:`, error);
  }
}

export const fetchArtist = (artistId) => async (dispatch) => {
  try {
    const artist = await fetchFromApi(`/artists/${artistId}`);
    dispatch(receiveArtist(artist));
  } catch (error) {
    console.error(`Fetch artist failed:`, error);
  }
}