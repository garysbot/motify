import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { receiveSong, togglePlay } from '../../store/audioActions'; // Import relevant actions
import { ReactSVG } from 'react-svg';
import lilPlayButton from '../../static/icons/noun-play-1009801.svg'

const SongsTable = () => {
  const dispatch = useDispatch();
  const currentAlbum = useSelector(state => state.audio.currentAlbum);
  const [hoveredTrack, setHoveredTrack] = useState(null);
  // Function to handle play button click
  const handlePlaySong = (song) => {
    dispatch(receiveSong(song));
    dispatch(togglePlay());
  };
  return (
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
  )
}

export default SongsTable