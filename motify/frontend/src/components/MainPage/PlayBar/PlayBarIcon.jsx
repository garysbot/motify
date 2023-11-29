// Function
import { useRef, useState, useEffect } from 'react'

// Temp
import kendrickAlbumCover from '../../static/albums/covers/kendrick.png'

// Icons
import { ReactComponent as PlayButton } from '../../static/playbar/show/show-play-bar-play-button.svg'
import { ReactComponent as PlayButtonCircle } from '../../static/playbar/show/show-play-bar-play-circle.svg'
import { ReactComponent as PauseButton } from '../../static/playbar/show/show-play-bar-pause-button.svg'
import { ReactComponent as ShuffleButton } from '../../static/icons/shuffle.svg'
import { ReactComponent as PrevButton } from '../../static/icons/prev.svg'
import { ReactComponent as NextButton } from '../../static/icons/next.svg'
import { ReactComponent as RepeatButtonInactive } from '../../static/icons/repeat-inactive.svg'
import { ReactComponent as RepeatButtonActive } from '../../static/icons/repeat-active.svg'
import { ReactComponent as QueueButtonInactive } from '../../static/icons/queue-inactive.svg'
import { ReactComponent as VolumeButton } from '../../static/icons/volume.svg'


const PlayBarIcon = ({ icon, currentSong }) => {

  // Song Functionality
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong;
    }
  }, [currentSong])

  useEffect(() => {
    audioRef.current.onplay = () => setIsPlaying(true);
    audioRef.current.onpause = () => setIsPlaying(false);
    audioRef.current.onerror = () => {
        // Handle audio playback errors
    };
  }, []);

  const playAudio = () => {
    if (currentSong) {
      // console.log(`Play Clicked`)
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    // console.log(`Pause Clicked`)
    audioRef.current.pause();
  };

  const handleClick = () => {
    if (isPlaying) {
      pauseAudio()
    } else {
      playAudio()
    }
  }


  const content = {
    kendrickAlbumCover,
    PlayButton,
    PlayButtonCircle,
    PauseButton,
    ShuffleButton,
    PrevButton,
    NextButton,
    RepeatButtonActive,
    RepeatButtonInactive,
    QueueButtonInactive,
    VolumeButton
  }

  const ContentComponent = content[icon]

  if (icon === 'PlayButton') {
    return (
      <>
        <button
          onClick={handleClick}
        >
          <ContentComponent />
        </button>
      </>
    
    )
  } else {
    return (
      <>
        <ContentComponent/>
      </>
    )
  }

  
};

export default PlayBarIcon;