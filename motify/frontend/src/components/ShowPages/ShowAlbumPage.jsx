import './ShowAlbumPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import playButton from '../../static/playbar/show/show-play-bar-play-button.svg';
import lilPlayButton from '../../static/icons/noun-play-1009801.svg'
import lilDot from '../../static/icons/dot.svg'
import { useAlbum } from '../MainPage/ContentCard/Hooks/useAlbum.jsx';
import { useEffect, useState } from 'react';
import { receiveSong, togglePlay } from '../../store/audioActions'; // Import relevant actions
import { fetchAlbum, fetchArtist } from '../../store/audioThunks.js';
import { useArtist } from '../MainPage/ContentCard/Hooks/useArtist.jsx';
import { useParams } from 'react-router-dom';

const ShowPage = () => {
  // Redux Setup
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const currentSong = useSelector(state => state.audio.currentSong); // Accessing current song
  const currentAlbum = useSelector(state => state.audio.currentAlbum);
  
  // Temporary React State + Hooks Approach
  const artist = useArtist(1);
  const album = useAlbum(albumId)


  useEffect(() => {
    const fetchAlbumData = async () => {
      if (albumId) {
        setIsLoading(true);
        await dispatch(fetchAlbum(albumId));
        // No need to call fetchArtist here
        setIsLoading(false);
      }
    };
  
    fetchAlbumData();
  }, [dispatch, albumId]);
  
  useEffect(() => {
    const fetchArtistData = async () => {
      if (currentAlbum && currentAlbum.artistId) {
        await dispatch(fetchArtist(currentAlbum.artistId));
      }
    };
  
    fetchArtistData();
  }, [dispatch, currentAlbum]);
  
  // Render loading indicator
  if (isLoading || !currentAlbum) {
    return <div>Loading...</div>;
  }
  

  // Function to handle play button click
  const handlePlaySong = (song) => {
    dispatch(receiveSong(song)); // Dispatch receiveSong action
    dispatch(togglePlay()); // Dispatch togglePlay action to play the song
  };

  if (!album) {
    return <div>Loading...</div>;
  }

  // const artistAboutImg = {
  //   backgroundImage: `url(${artist.aboutImg})`,
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundPosition: 'center',
  //   height: '300px',
  //   width: '100%'
  // }


  return (
    <>
      {/* <div className='show-banner' style={artistAboutImg}> */}
      <div className='show-banner'>
        <img src={currentAlbum.coverImg} alt='' className='album-cover-img'></img>
        <div className='banner-details'>
          <p>Album</p>
          <h1 key={currentAlbum.id}>{currentAlbum.title}</h1>
          <p className='details-artist'>
            {currentAlbum.artistName}
            <ReactSVG src={lilDot} className='lilDot'/>
            {currentAlbum.releaseDate}
            <ReactSVG src={lilDot} className='lilDot'/>
            {`${Object.values(currentAlbum.songs).length} songs, 1 hr 18 min`}
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
            currentAlbum.songs.map((song, trackNum) => 
              <>
                <div
                  className='show-songs-row-container'
                  onMouseEnter={() => setHoveredTrack(trackNum)}
                  onMouseLeave={() => setHoveredTrack(null)}
                  onClick={() => handlePlaySong(song)} // ! This is what changes the Redux State
                >
                  <div className='row-start'>
                    <div className='track-num'>
                      {
                        hoveredTrack === trackNum ? (
                          <ReactSVG src={lilPlayButton} className='anim-play-button' />
                        ) : (
                        <p>{trackNum + 1}</p>
                      )}
                    </div>
                    <div className='song-title-artist-container'>
                      <p className='song-title'>
                        {song.title}
                      </p>
                      {/* Explicit */}
                      <p className='song-title-artist-name'>
                        {currentAlbum.artistName}  
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