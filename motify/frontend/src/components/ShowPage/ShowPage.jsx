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
          <p className='details-artist'>
            {album.artistName} ◦ 
            {album.releaseDate} ◦ 
            {`${Object.values(album.songs).length} songs, 1 hr 18 min`}
          </p>
        </div>
      </div>

      <div className='show-play-bar'>
        
        <div className='show-play-button-container'>
          <svg className='svg-image play-svg' width="24"  height="24" >
            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
          </svg>
          <svg className='svg-image circle-svg' width="60" height="60">
            <circle cx="30" cy="30" r="30" fill="#1DB954" />
          </svg>
        </div>


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
              {
                album.songs.map((song)=>
                  <>
                  <p>{song.title}</p>
                  {/* <p>{song.explicit && <p>Curses</p>}</p> */}
                  <p>{album.artistName}</p>
                  </>
                )
              }
            </div>
            <p>4:15</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default ShowPage;