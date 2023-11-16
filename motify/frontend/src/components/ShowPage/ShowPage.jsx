import './ShowPage.css'
import { useAlbum } from './ShowHooks/useAlbum';

const ShowPage = () => {
  const album = useAlbum(45)

  if (!album) {
    return <div>Loading...</div>;
  }

  // console.log(album);
  return (
    <>
      <div className='show-banner'>
        {/* Image Here */}
        <p>Album</p>
        <h1>Mr. Morale & The Big Steppers</h1>
        <p>Kendrick Lamar - 2022 - 19 songs, 1hr 18 mins</p>

        {/* Add BG to this Div? */}
        <div className='banner-details'>
          {/* Album/Playlist/Song Image */}
          {/* Resource Type */}
          {/* Album Title */}
          {/* Artist Name */}
          {/* Release Year */}
          {/* Num Songs */}
          {/* Total Length */}
        </div>
        <div className='show-play-bar'>
          {/* Play Button */}
          {/* Like || Follow Button */}
          {/* Menu Dots */}
        </div>
        <div className='show-content'>
          {/* Album Table Header */}
          {/* Playlist Table Header */}
          {/* Artist Popular Table */}
        </div>
      </div>
    </>
  );
}

export default ShowPage;