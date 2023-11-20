import './ShowAlbumPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import playButton from '../../../static/playbar/show/show-play-bar-play-button.svg';
import lilPlayButton from '../../../static/icons/noun-play-1009801.svg'
import lilDot from '../../../static/icons/dot.svg'
import { useAlbum } from './ShowHooks/useAlbum';
import { useState } from 'react';
import { useArtist } from './ShowHooks/useArtist.jsx'
import { receiveSong, togglePlay } from '../../../store/audioActions'; // Import relevant actions


const ShowPage = () => {
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const dispatch = useDispatch();
  const artist = useArtist(1);
  const album = useAlbum(1)
  const currentSong = useSelector(state => state.audio.currentSong); // Accessing current song

  // Function to handle play button click
  const handlePlaySong = (song) => {
    dispatch(receiveSong(song)); // Dispatch receiveSong action
    dispatch(togglePlay()); // Dispatch togglePlay action to play the song
  };

  if (!album) {
    return <div>Loading...</div>;
  }

  const artistAboutImg = {
    backgroundImage: `url(${artist.aboutImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '300px',
    width: '100%'
  }


  return (
    <>
      <div className='show-banner' style={artistAboutImg}>
        {/* Add BG to this Div? */}
        <img src={album.coverImg} alt='' className='album-cover-img'></img>
        <div className='banner-details'>
          <p>Album</p>
          <h1 key={album.id}>{album.title}</h1>
          <p className='details-artist'>
            {album.artistName}
            <ReactSVG src={lilDot} className='lilDot'/>
            {album.releaseDate}
            <ReactSVG src={lilDot} className='lilDot'/>
            {`${Object.values(album.songs).length} songs, 1 hr 18 min`}
          </p>
        </div>
      </div>

      <div className='show-play-bar'>
        
        <div className='show-play-button-container'>
          <ReactSVG src={playButton} className='svg-image play-svg'/>
          <svg className='svg-image circle-svg' width="60" height="60">
            <circle cx="30" cy="30" r="30" fill="#1DB954" />
          </svg>
        </div>
      </div>
      
      <div className='show-content'>
        <div className='show-songs-header'>
          {/* Album/Playlist Table Header */}
          <p className='header-text'>#</p>
          <p className='header-text'>Title</p>
          {/* Time Button */}
        </div>
        <hr></hr>
        <div className='show-songs-table'>
          {
            album.songs.map((song, trackNum) => 
              <>
                <div
                  className='show-songs-row-container'
                  onMouseEnter={() => setHoveredTrack(trackNum)}
                  onMouseLeave={() => setHoveredTrack(null)}
                  onClick={() => handlePlaySong(song)}
                >
                  <div className='row-start'>
                    <div className='track-num'>
                      {
                        hoveredTrack === trackNum ? (
                          <ReactSVG src={lilPlayButton} className='anim-play-button' />
                        ) : (
                        <p>{trackNum}</p>
                      )}
                    </div>
                    <div className='song-title-artist-container'>
                      <p className='song-title'>
                        {song.title}
                      </p>
                      {/* Explicit */}
                      <p className='song-title-artist-name'>
                        {album.artistName}  
                      </p>
                    </div>
                  </div>
                  
                  <div className='row-end'>
                    <div className='like-button-duration'>
                      {/* <ReactSVG src={lilLikeButton} className='lil-like-button'/> */}
                      <p className='duration-text'>
                        {
                          `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}`
                        }
                      </p>
                    </div>
                  </div>

                </div>
              </>
            )
          }


        </div>
      </div>
    </>
  );
}

export default ShowPage;