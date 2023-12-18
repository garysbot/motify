import { useSelector } from "react-redux";

export const useAlbumsByArtist = (artistId) => {
  return useSelector( state => {
    const allAlbumsArray = Object.values(state.albums)
    const albumsByArtist = allAlbumsArray.filter(album => album.artistId === artistId)
    return albumsByArtist
  })
}