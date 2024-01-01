import { useRef, useEffect } from "react";
import "./PlayBar.css";
import Icon from "../../Icons/Icons.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  togglePlay,
  setVolume,
  receiveSong,
  setSongPosition,
} from "../../../store/audioActions.js";

// Custom Hooks
import { useAudioPlayer } from "./useAudioPlayer.jsx";

const PlayBar = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(new Audio());
  const currentAlbum = useSelector((state) => state.audio.currentAlbum);
  const currentArtist = useSelector((state) => state.audio.currentArtist);
  const currentSong = useSelector((state) => state.audio.currentSong);
  const volume = useSelector((state) => state.audio.volume);
  const songPosition = useSelector((state) => state.audio.songPosition);

  // Play/Pause Custom Hook
  const { handlePlayPause, isPlaying } = useAudioPlayer(audioRef);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.songUrl;
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          // Handle the error for play() promise rejection here
          console.error(`Damn what happened with the PlayBar?!`);
        });
      }
    }
  }, [currentSong, isPlaying]);

  // Song Progress Bar
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      dispatch(setSongPosition(audio.currentTime));
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [dispatch]);

  const handleProgressBarChange = (event) => {
    const newTime = Number(event.target.value);
    audioRef.current.currentTime = newTime;
    dispatch(setSongPosition(newTime));
  };

  // Next track
  const handleNextTrack = () => {
    const currentSongIndex = currentAlbum.songs.findIndex(
      (song) => song.id === currentSong.id
    );
    const nextSongIndex = (currentSongIndex + 1) % currentAlbum.songs.length; // Loop back to the start
    const nextSong = currentAlbum.songs[nextSongIndex];
    dispatch(receiveSong(nextSong));

    if (!isPlaying) {
      dispatch(togglePlay());
    }
  };

  const handlePrevTrack = () => {
    const currentSongIndex = currentAlbum.songs.findIndex(
      (song) => song.id === currentSong.id
    );
    const prevSongIndex =
      (currentSongIndex - 1 + currentAlbum.songs.length) %
      currentAlbum.songs.length; // Loop to the end
    const prevSong = currentAlbum.songs[prevSongIndex];
    dispatch(receiveSong(prevSong));

    if (!isPlaying) {
      dispatch(togglePlay());
    }
  };

  // Volume control (this is just a placeholder, you need a method to set the volume)
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value / 100; // Convert to a value between 0 and 1
    audioRef.current.volume = newVolume; // Set the volume of the audio element
    dispatch(setVolume(newVolume)); // Update the volume in Redux state
  };

  return (
    <>
      <div className="play-bar-container">
        {/* // ^  Song Details -- bottom left w/ img */}
        <div className="song-details-container">
          <img
            src={currentAlbum.coverImg}
            alt=""
            className="song-details-cover"
          ></img>
          <div className="song-details">
            <h3>{currentSong.title}</h3>
            <p>{currentArtist.artistName}</p>
          </div>
        </div>

        {/* // ^  Center portion w/ prev + next +play/pause */}
        <div className="controls-duration-container">
          <div className="controls-container">
            <Icon iconType="PrevButton" onClick={handlePrevTrack} />

            {/* // ^  Play/Pause */}
            <div className="play-pause-button" onClick={handlePlayPause}>
              <div className="play-button-content">
                <Icon
                  iconType={isPlaying ? "PauseButton" : "PlayButton"}
                  currentSong={currentSong}
                  className="play-button-content"
                />
              </div>
              <div className="play-button-circle-content">
                <Icon iconType="PlayButtonCircle" />
              </div>
            </div>

            <Icon iconType="NextButton" onClick={handleNextTrack} />
          </div>

          {/* // ^ Progress Bar */}
          <input
            type="range"
            min="0"
            max={currentSong.duration || 100}
            value={songPosition}
            className="duration-container"
            onChange={handleProgressBarChange}
          />
        </div>

        {/* // ^  Volume Controls */}
        <div className="queue-volume-container">
          <div className="volume-container">
            <Icon iconType="VolumeButton" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              className="volume-line"
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayBar;
