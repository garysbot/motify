import './ShowPage.css'
import { useAlbum } from './ShowHooks/useAlbum';
import kendrickAlbumCover from '../../static/albums/covers/kendrick.png'

const ShowPage = () => {
  const album = useAlbum(129)

  if (!album) {
    return <div>Loading...</div>;
  }

  // console.log(album);
  return (
    <>
      <div className='show-banner'>
        {/* Add BG to this Div? */}
        <img src={kendrickAlbumCover} className='album-cover-img'></img>
        <div className='banner-details'>
          <p>Album</p>
          <h1>{album.title}</h1>
          <p>{album.artistName} {album.releaseDate}</p>
          {
            album.songs.map((song)=>
              <>
              <p>hi?</p>
              <p>Title:{song.title}</p>
              </>
            )
          }

          <p>Kendrick Lamar - 2022 - 19 songs, 1hr 18 mins</p>
          {/* Artist Name */}
          {/* Release Year */}
          {/* Num Songs */}
          {/* Total Length */}
        </div>
      </div>
      <div className='show-play-bar'>
        {/* Play Button */}
        {/* Like || Follow Button */}
        {/* Menu Dots */}
      </div>
      <div className='show-content'>
        <div className='show-songs-header'>
          {/* Album/Playlist Table Header */}
          <p>#</p>
          <p>Title</p>
          {/* Time Button */}
        </div>
        <div className='show-songs-table'>
          <div className='show-songs-row'>
            {/* Track Num */}
            <p>1</p>
            {/* Song Title & Artist Name */}
            <div className='song-title-artist'>
              <p>United in Grief</p>
              {/* explicit or not */}
              <p>Kendrick Lamar</p>
            </div>
            {/* Liked/NotLiked */}
            {/* Duration */}
            <p>4:15</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default ShowPage;