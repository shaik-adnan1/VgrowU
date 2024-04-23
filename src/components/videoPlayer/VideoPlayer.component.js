import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../App";
import "./videoplayer.css"; // Ensure your CSS is linked correctly

import testVideo from "../../assets/funnelVideo/funnel.mp4";
const VideoPlayer = () => {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const videoTimelineRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);

  // context
  const { detailsFilled, detailsPopup } = useContext(GlobalContext);

  // Play or pause the video
  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Update the video current time based on the progress bar
  const handleProgressBarClick = (e) => {
    const timelineWidth = e.target.clientWidth;
    const clickPosition = e.nativeEvent.offsetX;
    const time = (clickPosition / timelineWidth) * duration;
    videoRef.current.currentTime = time;
  };

  // Update video current time and duration
  useEffect(() => {
    if (videoRef.current) {
      const updateProgress = () => {
        const progress =
          (videoRef.current.currentTime / videoRef.current.duration) * 100;
        // progressBarRef.current.style.width = `${progress}%`;
        setCurrentTime(videoRef.current.currentTime);
      };

      const setVideoDuration = () => {
        setDuration(videoRef.current.duration);
      };

      videoRef.current.addEventListener("timeupdate", updateProgress);
      videoRef.current.addEventListener("loadedmetadata", setVideoDuration);

      return () => {
        videoRef.current.removeEventListener("timeupdate", updateProgress);
        videoRef.current.removeEventListener(
          "loadedmetadata",
          setVideoDuration
        );
      };
    }
  }, [videoRef.current]);

  // Format time from seconds to HH:MM:SS
  const formatTime = (time) => {
    const result = new Date(time * 1000).toISOString().substr(11, 8);
    return result.startsWith("00:") ? result.substr(3) : result;
  };

  // Change volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.parentNode
        .requestFullscreen()
        .catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // const updateProgress = () => {
  //   const progress =
  //     (videoRef.current.currentTime / videoRef.current.duration) * 100;
  //   progressBarRef.current.style.width = `${progress}%`;
  //   setCurrentTime(videoRef.current.currentTime);
  // };

  // Toggle Picture-in-Picture
  const togglePip = async () => {
    if (!document.pictureInPictureElement) {
      await videoRef.current.requestPictureInPicture();
    } else {
      await document.exitPictureInPicture();
    }
  };

  // useEffect(() => {
  //   videoRef.current.addEventListener("timeupdate", updateProgress);
  //   return () => {
  //     videoRef.current.removeEventListener("timeupdate", updateProgress);
  //   };
  // }, []);

  const handleSpeedOptionClick = (rate) => {
    setPlaybackRate(rate);
    setShowSpeedOptions(false); // Optionally, hide speed options after selection
  };

  const handleLoadedData = () => {
    setDuration(videoRef.current.duration);
  };

  return (
    <div
      className={`container ${showControls ? "show-controls" : ""}`}
      onMouseMove={() => setShowControls(true)}
    >
      {detailsFilled ? (
        <div className="wrapper">
          <ul className="video-controls">
            <li className="options left">
              <button
                className="volume"
                onClick={() =>
                  setVolume((prevVolume) => (prevVolume > 0 ? 0 : 0.5))
                }
              >
                <i
                  className={`fa-solid ${
                    volume > 0 ? "fa-volume-high" : "fa-volume-xmark"
                  }`}
                ></i>
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="any"
                value={volume}
                onChange={handleVolumeChange}
              />
              <div className="video-timer">
                <p className="current-time">{formatTime(currentTime)}</p>
                <p className="separator"> / </p>
                <p className="video-duration">{formatTime(duration)}</p>
              </div>
            </li>
            <li className="options center">
              <button className="play-pause" onClick={togglePlayPause}>
                <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
              </button>
            </li>
            <li className="options right">
              <div className="playback-content">
                <button
                  className="playback-speed"
                  onClick={() => setShowSpeedOptions(!showSpeedOptions)}
                >
                  <span className="material-symbols-rounded multi_margin_icon multi_margin_icon_playback">
                    <ion-icon name="play-forward-circle-outline"></ion-icon>
                  </span>
                </button>
                {showSpeedOptions && (
                  <ul className="speed-options show">
                    {[0.5, 0.75, 1, 1.5, 2].map((speed) => (
                      <li
                        key={speed}
                        className={playbackRate === speed ? "active" : ""}
                        onClick={() => handleSpeedOptionClick(speed)}
                      >
                        {speed}x
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button className="pic-in-pic" onClick={togglePip}>
                <span className="material-icons multi_margin_icon">
                  {" "}
                  <ion-icon name="push-outline"></ion-icon>
                </span>{" "}
              </button>
              <button className="fullscreen" onClick={toggleFullScreen}>
                <i
                  className={`fa-solid ${
                    isFullscreen ? "fa-compress" : "fa-expand"
                  }`}
                ></i>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="wrapper_logo" onClick={detailsPopup}>
          <ion-icon name="logo-youtube"></ion-icon>
        </div>
      )}

      <video
        ref={videoRef}
        src={testVideo}
        onLoadedData={handleLoadedData}
      ></video>
    </div>
  );
};

export default VideoPlayer;
