import './ShowPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import lilPlayButton from '../../static/icons/noun-play-1009801.svg'
import { useEffect, useState } from 'react';
import { receiveSong, togglePlay } from '../../store/audioActions.js'; // Import relevant actions
import { useParams } from 'react-router-dom';
import { ReactComponent as TimeIcon } from '../../static/icons/time.svg'
import { fetchPlaylist } from '../../store/audioThunks.js';

const ShowPlaylistPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const dispatch = useDispatch();
  const { playlistId } = useParams();

  useEffect(() => {
    const fetchPlaylistData = async () => {
      if (playlistId) {
        dispatch(fetchPlaylist(playlistId))
      }
    }
    fetchPlaylistData()
  }, [dispatch, playlistId])

  // Render loading indicator
  // if (isLoading || !currentPlaylist) {
  //   return <div>Loading...</div>;
  // }
  
  // Function to handle play button click
  const handlePlaySong = (song) => {
    dispatch(receiveSong(song));
    dispatch(togglePlay());
  };

  // const renderPlaylistSongs = (playlistId) => {
  //   if (playlistId) {
  //     return (
  //       <>
  //         currentAlbum.songs.map((song, trackNum) => 
  //             <>
  //               <div
  //                 className='show-songs-row-container'
  //                 onMouseEnter={() => setHoveredTrack(trackNum)}
  //                 onMouseLeave={() => setHoveredTrack(null)}
  //                 onClick={() => handlePlaySong(song)} // ! This is what changes the Redux State
  //               >
  //                 <div className='row-start'>
  //                   <div className='track-num'>
  //                     {
  //                       hoveredTrack === trackNum ? (
  //                         <ReactSVG src={lilPlayButton} className='anim-play-button' />
  //                       ) : (
  //                       <p>{trackNum + 1}</p>
  //                     )}
  //                   </div>
  //                   <div className='song-title-artist-container'>
  //                     <p className='song-title'>
  //                       {song.title}
  //                     </p>
  //                     {/* Explicit */}
  //                     <p className='song-title-artist-name'>
  //                       {currentAlbum.artistName}  
  //                     </p>
  //                   </div>
  //                 </div>
                  
  //                 <div className='row-end'>
  //                   <div className='like-button-duration'>
  //                     {/* <ReactSVG src={lilLikeButton} className='lil-like-button'/> */}
  //                     <p className='duration-text'>
  //                       {
  //                         `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}`
  //                       }
  //                     </p>
  //                   </div>
  //                 </div>

  //               </div>
  //             </>
  //           )
  //       </>
  //     )
  //   } else {
  //     return (<><p>No songs available.</p></>)
  //   }
  // }

  return (
    <>
      {/* // & ShowBanner React component */}
      
      <div className='show-content'>
        {/* // & BannerPlaybar React component */}
        <div className='show-songs-header'>
          <div className='song-header-left'>
            <p className='header-text'>#</p>
            <p className='header-text'>Title</p>
          </div>
          <TimeIcon className='header-time'/>
        </div>
        <hr></hr>
        <div className='show-songs-table'>
          <h1>Wtf is wrong with this route?!</h1>
        </div>
      </div>
    </>
  );
}

export default ShowPlaylistPage;