import { useSelector, useDispatch } from 'react-redux';
import { togglePlay } from '../../../store/audioActions.js';

export const useAudioPlayer = (audioRef) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector(state => state.audio.isPlaying);
  
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        // Handle the error for play() promise rejection here
      });
    }
    dispatch(togglePlay());
  }

  return { handlePlayPause, isPlaying }

};