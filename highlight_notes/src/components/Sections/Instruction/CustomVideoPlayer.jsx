import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';

import video_vtt from '../../../assets/psych_post_divorce_adjustment.vtt';

const CustomVideoPlayer = ({ psy_video, poster_video, setIsVideoCompleted }) => {
  const videoRef = useRef(null);
  const dragRef = useRef(null); // <--- ADD THIS

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCaptionVisible, setIsCaptionVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const [volume, setVolume] = useState(1);
  const [showVolumePopup, setShowVolumePopup] = useState(false);

  const changeVolume = (amount) => {
    const video = videoRef.current;
    if (!video) return;

    let newVolume = volume + amount;
    newVolume = Math.min(Math.max(newVolume, 0), 1);

    video.volume = newVolume;
    setVolume(newVolume);
    video.muted = newVolume === 0;
    setIsMuted(video.muted);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const value = (video.currentTime / video.duration) * 100;
      setProgress(isNaN(value) ? 0 : value);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setIsVideoCompleted(true);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !video.muted;
    video.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted) setVolume(video.volume);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleCaptions = () => {
    const video = videoRef.current;
    const track = video?.textTracks?.[0];
    if (track) {
      track.mode = track.mode === 'showing' ? 'hidden' : 'showing';
      setIsCaptionVisible(track.mode === 'showing');
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.volume = volume;
      video.muted = volume === 0;
      setIsMuted(video.muted);
    }
  }, [volume]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFullscreen && e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const PlayerUI = (
    <>
      <video
        tabIndex={0}
        aria-label="Video on psychological adjustment after divorce"
        ref={videoRef}
        poster={poster_video}
        onEnded={handleEnded}
        onContextMenu={(e) => e.preventDefault()}
        style={{
          width: isFullscreen ? '100%' : '472px',
          height: isFullscreen ? '100%' : '271px',
          objectFit: isFullscreen ? 'cover' : 'none',
          borderRadius: 0,
        }}
      >
        <source src={psy_video} type="video/mp4" />
        <track label="English" kind="subtitles" srcLang="en" src={video_vtt} default />
        Your browser does not support the video tag.
      </video>

      {/* <Draggable disabled={showVolumePopup} nodeRef={dragRef} bounds="parent"> */}
      {/* <Draggable disabled={!showControls || showVolumePopup} nodeRef={dragRef} bounds="parent"> */}
  <div
    ref={dragRef}
    style={{
      position: 'absolute',
      top: isFullscreen ? 'unset' : 220,
      bottom: isFullscreen ? 16 : 'unset',
      left: isFullscreen ? '50%' : 70,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 5,
      backgroundColor: '#3E3E40',
      borderRadius: 8,
      padding: '0 16px',
      width: isFullscreen ? '60%' : 320,
      maxWidth: isFullscreen ? 350 : 'unset',
      // cursor: 'grab',
      userSelect: 'none',
      zIndex: 10,
      opacity: showControls ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out',
       pointerEvents: showControls ? 'auto' : 'none',
    }}
  >
    <button onClick={togglePlay} style={buttonStyle}>
      {isPlaying ? '⏸' : '▶'}
    </button>

    {/* Volume Control */}
    <div style={{ position: 'relative' }}>
      <button onClick={() => setShowVolumePopup(!showVolumePopup)} style={buttonStyle}>
        {isMuted || volume === 0 ? '🔇' : '🔊'}
      </button>

      {showVolumePopup && (
        <div
          style={{
            position: 'absolute',
            bottom: '150%',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '6px 10px',
            borderRadius: 8,
            zIndex: 20,
            userSelect: 'none',
            width: 60,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
        >
          <style>{`
                input.volume-slider {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 50px;
                  height: 4px;
                  cursor: pointer;
                  transform: rotate(-90deg);
                  border-radius: 10px;
                  background-repeat: no-repeat;
                  /* background set dynamically inline */
                }
                input.volume-slider::-webkit-slider-runnable-track {
                  height: 8px;
                  border-radius: 10px;
                  background: transparent;
                }
                input.volume-slider::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 16px;
                  height: 16px;
                  background: #CD0000;
                  border-radius: 50%;
                  border: none;
                  cursor: pointer;
                  margin-top: -4px;
                  position: relative;
                  z-index: 2;
                  box-shadow: 0 0 4px rgba(0,0,0,0.5);
                }
                input.volume-slider::-moz-range-track {
                  height: 8px;
                  border-radius: 10px;
                  background: transparent;
                }
                input.volume-slider::-moz-range-thumb {
                  width: 16px;
                  height: 16px;
                  background: #CD0000;
                  border-radius: 50%;
                  border: none;
                  cursor: pointer;
                  position: relative;
                  z-index: 2;
                  box-shadow: 0 0 4px rgba(0,0,0,0.5);
                }
              `}</style>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            onMouseDownCapture={(e) => {
              e.stopPropagation();
              setDragging(false);
            }}
            onMouseUpCapture={(e) => e.stopPropagation()}
            style={{
              background: `linear-gradient(to right, #CD0000 0%, #CD0000 ${volume * 100}%, black ${volume * 100}%, black 100%)`,
            }}
          />
        </div>
      )}
    </div>

    <button onClick={toggleCaptions} style={buttonStyle}>
      {isCaptionVisible ? '💬' : '🚫'}
    </button>

    <div style={getScrubberContainerStyle()}>
      <div style={{ ...progressBarStyle, width: `${progress}%` }} />
      <div style={{ ...dotStyle, left: `${progress}%` }} />
    </div>

    <button onClick={toggleFullscreen} style={buttonStyle}>
      {isFullscreen ? '🗕' : '⛶'}
    </button>
  </div>
{/* </Draggable> */}

    </>
  );

  

  return (
    <>
      {!isFullscreen ? (
        <div
          style={{
            position: isFullscreen ? 'fixed' : 'relative',
            top: isFullscreen ? 0 : undefined,
            left: isFullscreen ? 0 : undefined,
            width: isFullscreen ? '100vw' : 472,
            height: isFullscreen ? '100vh' : 271,
            backgroundColor: isFullscreen ? 'black' : undefined,
            borderRadius: isFullscreen ? 0 : 4,
            border: isFullscreen ? 'none' : '1px solid #CDCDCD',
            overflow: 'hidden',
            zIndex: isFullscreen ? 9999 : undefined,
          }}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {PlayerUI}
        </div>
      ) : (
        <div
          style={{
            position: isFullscreen ? 'fixed' : 'relative',
            top: isFullscreen ? 0 : undefined,
            left: isFullscreen ? 0 : undefined,
            width: isFullscreen ? '100vw' : 472,
            height: isFullscreen ? '100vh' : 271,
            backgroundColor: isFullscreen ? 'black' : undefined,
            borderRadius: isFullscreen ? 0 : 4,
            border: isFullscreen ? 'none' : '1px solid #CDCDCD',
            overflow: 'hidden',
            zIndex: isFullscreen ? 9999 : undefined,
          }}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {PlayerUI}
        </div>
      )}
    </>
  );
};

export default CustomVideoPlayer;



const buttonStyle = {
    backgroundColor: '#3E3E40',
    border: 'none',
    color: '#D9D9D9',
    fontSize: 13,
    cursor: 'pointer',
  };

  const getScrubberContainerStyle = () => ({
    flex: 1,
    height: 10,
    background: '#0F0F13',
    borderRadius: 10,
    overflow: 'visible',
    position: 'relative',
    maxWidth: 200,
  });

  const progressBarStyle = {
    height: '100%',
    background: '#CD0000',
    transition: 'width 0.2s',
    position: 'absolute',
    borderRadius: 10,
    top: 0,
    left: 0,
    zIndex: 1,
  };

  const dotStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 16,
    height: 16,
    background: '#CD0000',
    borderRadius: '50%',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  };