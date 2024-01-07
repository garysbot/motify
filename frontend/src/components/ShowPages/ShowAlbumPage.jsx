import './ShowPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import lilPlayButton from '../../static/icons/noun-play-1009801.svg'
import { ReactComponent as TimeIcon } from '../../static/icons/time.svg'
import { useEffect, useState } from 'react';
import { receiveSong, togglePlay } from '../../store/audioActions'; // Import relevant actions
import { fetchAlbum, fetchArtist } from '../../store/audioThunks.js';
import { useParams } from 'react-router-dom';
import ShowBanner from './ShowBanner.jsx';
import BannerPlaybar from './BannerPlaybar.jsx';

import SongsTable from '../SongsTable/SongsTable.jsx';

const ShowAlbumPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const currentAlbum = useSelector(state => state.audio.currentAlbum);
  const currentArtist = useSelector(state => state.audio.currentArtist);

  useEffect(() => {
    const fetchAlbumData = async () => {
      if (albumId) {
        setIsLoading(true);
        dispatch(fetchAlbum(albumId));
        setIsLoading(false);
      }
    };

    fetchAlbumData();
  }, [dispatch, albumId]);

  // New useEffect to set the first song after the album is loaded
  // useEffect(() => {
  //   if (currentAlbum && currentAlbum.songs && currentAlbum.songs.length > 0) {
  //     dispatch(receiveSong(currentAlbum.songs[0]));
  //   }
  // }, [dispatch, currentAlbum]);

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

  // Format the dateString
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  function formatYear(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric'};
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <>
      {/* // TODO Remove props and replace with useSelector in ShowBanner */}
      <ShowBanner currentAlbum={currentAlbum} currentArtist={currentArtist} />

      <div className='show-menu-container'>
        <BannerPlaybar/>
      </div>

      <div className='show-content'>
        <div className='tracks-header'>
          <div className='row-start'>
            <p className='header-text'>#</p>
            <p className='header-text'>Title</p>
          </div>
          <div className='row-end'>
            <TimeIcon className='header-time'/>
          </div>
        </div>
          <hr></hr>
        <SongsTable/>
        <div className='show-songs-table'>
          {
            currentAlbum.songs?.map((song, trackNum) =>
              <>
                <div
                  className='show-songs-row-container'
                  onMouseEnter={() => setHoveredTrack(trackNum)}
                  onMouseLeave={() => setHoveredTrack(null)}
                  onClick={() => handlePlaySong(song)} // ! This is what changes the Redux State
                >
                  <div className='row-start'
                    // onClick={}
                  >
                    <div className='track-num'>
                      {hoveredTrack === trackNum 
                        ?
                        (<ReactSVG src={lilPlayButton} className='anim-play-button' />)
                        :
                        (<p style={{'width':'12px', 'height':'12px'}}>{trackNum + 1}</p>)
                      }
                    </div>
                    <div className='song-title-artist-container'>
                      <p className='song-title'>{song.title}</p>
                      <p className='song-title-artist-name'>{currentAlbum.artistName}</p>
                    </div>
                    <div className='song-title-artist-container'>
                      <p className='song-title'>{song.album?.title}</p>
                    </div>
                  </div>

                  <div className='row-end'>
                    <div className='like-button-duration'>
                      <p className='duration-text header-time'>{`${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}`}</p>
                    </div>
                  </div>

                </div>
              </>
            )
          }
        </div>
        <hr
          style={{
            'margin-top':'3rem'
          }}
        ></hr>
        <div className='album-footer'
          style={{
            'margin-top': '0.75rem',
            'margin-left': '0.25rem',
            'margin-bottom': '2rem',
            'opacity': '70%'
          }}
        >
          <p
            style={{
              'font-size':'0.85rem'
            }}
          >{formatDate(currentAlbum?.releaseDate)}</p>
          <p
            style={{
              'font-size':'0.75rem'
            }}
            >{currentAlbum?.recordCompany}</p>
          <p
            style={{
              'font-size':'0.75rem'
            }}
          >{`© ${formatYear(currentAlbum?.releaseDate)} ${currentAlbum?.recordCompany}`}</p>
        </div>
      </div>
    </>
  );
}

export default ShowAlbumPage;