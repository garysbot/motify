import { receiveSongs, receiveSong, receiveAlbum, receiveArtist } from './audioActions';

// Abstracted API call
const fetchFromApi = async (endpoint) => {
  const response = await fetch(endpoint);
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

export const fetchArtist = (artistId) => async (dispatch) => {
  try {
    const artist = await fetchFromApi(`/artists/${artistId}`);
    dispatch(receiveArtist(artist));
  } catch (error) {
    console.error(`Fetch artist failed:`, error);
  }
}