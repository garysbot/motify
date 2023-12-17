import './ShowPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import lilPlayButton from '../../static/icons/noun-play-1009801.svg'
import lilDot from '../../static/icons/dot.svg'
import { useEffect, useState } from 'react';
import { receiveSong, togglePlay } from '../../store/audioActions'; // Import relevant actions
import { fetchAlbum, fetchArtist } from '../../store/audioThunks.js';
import { useParams } from 'react-router-dom';
import ShowBanner from './ShowBanner.jsx';

const ShowAlbumPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const dispatch = useDispatch();
  const { albumId, artistId, playlistId } = useParams();
  const currentAlbum = useSelector(state => state.audio.currentAlbum);
  const currentArtist = useSelector(state => state.audio.currentArtist);


  useEffect(() => {
    const fetchAlbumData = async () => {
      if (albumId) {
        setIsLoading(true);
        await dispatch(fetchAlbum(albumId));
        setIsLoading(false);
      }
    };

    fetchAlbumData();
  }, [dispatch, albumId]);

  // New useEffect to set the first song after the album is loaded
  useEffect(() => {
    if (currentAlbum && currentAlbum.songs && currentAlbum.songs.length > 0) {
      dispatch(receiveSong(currentAlbum.songs[0]));
    }
  }, [dispatch, currentAlbum]);

  useEffect(() => {
    const fetchArtistData = async () => {
      if (currentAlbum && currentAlbum.artistId) {
        dispatch(fetchArtist(currentAlbum.artistId));
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
    dispatch(receiveSong(song));
    dispatch(togglePlay());
  };

  const artistAboutImg = {
    backgroundImage: `url(${currentArtist.aboutImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '300px',
    width: '100%'
  }


  return (
    <>
      <ShowBanner currentAlbum={currentAlbum} currentArtist={currentArtist} />

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

export default ShowAlbumPage;