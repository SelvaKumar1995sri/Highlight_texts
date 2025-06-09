import React, { useState, useRef, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Button, Typography, IconButton } from '@mui/material';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Poster_teacher from '../../../assets/poster_teacher.jpg';

const TeacherInterviewSection = ({selectedSidebarTab}) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showScript, setShowScript] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const dragRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [isCaptionVisible, setIsCaptionVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeout = useRef(null);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  
  const toggleScript = () => setShowScript((prev) => !prev);
    
  const handleMouseMove = () => {
  if (!showControls) setShowControls(true);
  clearTimeout(hideControlsTimeout.current);
  hideControlsTimeout.current = setTimeout(() => {
    setShowControls(false);
  }, 2000); // Hide after 2 seconds
};

  useEffect(() => {
    return () => clearTimeout(hideControlsTimeout.current);
  }, []);

  useEffect(() => {
      const video = videoRef.current;
      if (video) {
        video.volume = volume;
        video.muted = volume === 0;
        setIsMuted(video.muted);
      }
    }, [volume]);
  
  // useEffect(() => {
  //     const video = videoRef.current;
  //     if (!video) return;
  
  //     const updateProgress = () => {
  //       const value = (video.currentTime / video.duration) * 100;
  //       setProgress(isNaN(value) ? 0 : value);
  //     };
  
  //     video.addEventListener('timeupdate', updateProgress);
  //     return () => video.removeEventListener('timeupdate', updateProgress);
  //   }, []);

   const questions = [
    {
      id: 1,
      text: 'How is Dana settling in to her new school?',
      videoUrl:
        'https://wowzahttp.cengage.com/digital-production/psychology/teacher_video_1.mp4',
      script: (
      <><p><strong>Q. How is Dana settling in to her new school?</strong></p>
      <p>A. <em>(Tentatively)</em> She’s doing ok. It can be daunting for any child to integrate into a new school and Dana has found it challenging at times. She tends to prefer her own company and will happily get on with activities on her own, but when it comes to working in a group she can become quite introverted and shy. She’s pretty quiet and can often find it hard to talk to the other children.</p>
      </>
      ),
    },
    {
      id: 2,
      text: 'How is Dana coping academically?',
      videoUrl:
        'https://wowzahttp.cengage.com/digital-production/psychology/teacher_video_2_academically.mp4',
      script: (
      <><p><strong>Q. How is Dana coping academically?</strong></p>
      <p>A. I’m pleased to say that academically Dana is doing well. A child’s ability to focus in class can easily be affected when they move school or there is some instability at home so this is something we try to look out for, but so far there has not been anything that would cause us concern from an academic standpoint. In fact Dana is near the top of her class in most subjects.</p>
      </>
      ),
    },
    {
      id: 3,
      text: 'Do you notice any difference in Dana as the week goes on?',
      videoUrl:
        'https://wowzahttp.cengage.com/digital-production/psychology/teacher_video_3_tired.mp4',
      script: (
      <><p><strong>Q. Do you notice any difference in Dana as the week goes on?</strong></p>
      <p>A. Dana seems more cheerful when her father drops her off at school, and this is about every other weekend. The weeks that she has stayed with her dad she seems more receptive to the other children and more willing to play with them and join in group activities, although there is generally a noticeable decline in this attitude over the course of the week.</p>
      <p style={{lineHeight: 1.5,marginBottom: '1rem',}}>Sometimes she seems tired, she will put her head on the desk - this isn’t an everyday occurrence, but I have noticed it more in Dana than the other children. I think mom is under a lot of pressure and kids pick up on that.</p>
      </>
      ),
    },
  ];
  

  const videoContainerRef = useRef(null);

   const toggleCaptions = () => {
    const video = videoRef.current;
    const track = video?.textTracks?.[0];
    if (track) {
      track.mode = track.mode === 'showing' ? 'hidden' : 'showing';
      setIsCaptionVisible(track.mode === 'showing');
    }
  };

  const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    // Enter fullscreen
    if (videoContainerRef.current) {
      videoContainerRef.current.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen', err);
      });
      setIsFullscreen(true);
    }
  } else {
    // Exit fullscreen
    document.exitFullscreen().then(() => setIsFullscreen(false));
  }
};

  useEffect(() => {
  const onFullScreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };
  document.addEventListener('fullscreenchange', onFullScreenChange);
  return () => {
    document.removeEventListener('fullscreenchange', onFullScreenChange);
  };
}, []);

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const handleLoaded = () => {
    const updateProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    };

    video.addEventListener('timeupdate', updateProgress);

    // Clean up when video changes or unmounts
    return () => {
      video.removeEventListener('timeupdate', updateProgress);
    };
  };

  video.addEventListener('loadedmetadata', handleLoaded);

  // Cleanup for loadedmetadata
  return () => {
    video.removeEventListener('loadedmetadata', handleLoaded);
  };
}, [selectedQuestion]);
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

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Reset when question changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
      setIsPlaying(false);
      setProgress(0);
      setShowScript(false); // hide script on question change
    }
  }, [selectedQuestion]);

  return (
    <div>
      <Box sx={{
        my: 0.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
        {/* Hide title and instructions when script is shown */}
        {!showScript && (
          <>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 18,
                mb: 2,
                color: '#22242C',
                fontFamily: 'Work Sans, sans-serif',
              }}
            >
              {selectedSidebarTab}
            </Typography>

            <Typography id="interview-instructions" sx={{ fontFamily: 'Work Sans, sans-serif',fontSize: 16, mb: 0.5,letterSpacing: 0, color: '#22242C' }}>
              Click one of the Questions below to view the video response.
            </Typography>

            <Box sx={{ my: 0, width: '100%', maxWidth: 700,pl:0 }}>
              {questions.map((q) => (
                <Button
                  key={q.id}
                  variant="outlined"
                  fullWidth
                  sx={{
                    mb: 1,
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    color: '#22242C',
                    borderColor: '#D4D4D4',
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: 18,
                    textTransform: 'none',
                    height: 35,
                    p:0
                    // pl: 1.5, // add some left padding
                  }}
                  onClick={() => setSelectedQuestion(q)}
                  aria-label={`Watch response: ${q.text}`}
                >
                  <Box
                    sx={{
                      backgroundColor: '#E0E0E0',
                      borderRadius: '4px',
                      px: 1,
                      py: 0.7,
                      mr: 1,
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Q:
                  </Box>
                  {q.text}
                </Button>
              ))}
            </Box>
          </>
        )}

        {/* Video Container */}
        {selectedQuestion && (
          <>
            <Box
            ref={videoContainerRef}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
              sx={{
                width: '47%',
                maxWidth: 510,
                minHeight: 188,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',
                mt: 0,
                border: '1px solid #888888',
                borderRadius: 2,
                visibility: selectedQuestion ? 'visible' : 'hidden',
                mx: 'auto',
                // when script shown, move video box up by reducing bottom margin 
                mb: 0.5,
                transition: 'margin-bottom 0.3s ease',
              }}
              role="region"
              aria-labelledby={`video-question-${selectedQuestion.id}`}
            >
              <video
                ref={videoRef}
                src={selectedQuestion.videoUrl}
                poster={Poster_teacher}
                onEnded={handleEnded}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  width: '100%',
                  height: isFullscreen ? 'auto' : '200px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  display: 'block',
                }}
                onClick={togglePlayPause}
                aria-label={`Video response to: ${selectedQuestion.text}`}
                tabIndex={0}
              >
                Your browser does not support the video tag.
              </video>

              {/* <Draggable disabled={showVolumePopup} nodeRef={dragRef} bounds="parent"> */}
              {showControls && (
                        <div
                          ref={dragRef}
                          style={{
                            position: 'absolute',
                            top: isFullscreen ? 'unset' : 130,
                            bottom: isFullscreen ? 16 : 'unset',
                            left: isFullscreen ? '50%' : 30,
                            transform: isFullscreen ? 'translateX(-50%)' : 'none',
                            height: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: 5,
                            backgroundColor: '#3E3E40',
                            borderRadius: 8,
                            padding: '0 16px',
                            // cursor: 'grab',
                            userSelect: 'none',
                            width: isFullscreen ? '60%' : 250,
                            maxWidth: isFullscreen ? 250 : 'unset',
                            zIndex: 10,
                            opacity: showControls ? 1 : 0,
                            transition: 'opacity 0.3s ease-in-out',
                            pointerEvents: showControls ? 'auto' : 'none',
                          }}
                        >
                          <button onClick={togglePlay} style={buttonStyle}>
                            {isPlaying ? '⏸' : '▶'}
                          </button>
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
                                onMouseUpCapture={(e) => {
                                  e.stopPropagation();
                                }}
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
              )}
                      {/* </Draggable> */}
            </Box>

            {/* SCRIPT ACCORDION BELOW VIDEO CONTAINER */}
            <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', mt: 0, mb: 0, p:0}}>
              <Accordion
                expanded={showScript}
                onChange={toggleScript}
                sx={{
                  boxShadow: 'none',
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  '&:before': { display: 'none' },
                  p:0
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="script-content"
                  id="script-header"
                  sx={{
                    minHeight: 24, // reduce overall minimum height
                    px: 1, // optional: reduce horizontal padding
                    '&.Mui-expanded': {
                      minHeight: 24, // also reduce height when expanded
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: 0,
                      fontFamily: 'Work Sans, sans-serif',
                      fontSize: 16,
                      fontWeight: 500,
                      color: '#22242C',
                      justifyContent: 'center',
                    },
                  }}
                >
                  {showScript ? 'Hide Video Script' : 'Show Video Script'}
                </AccordionSummary>
                <AccordionDetails
                  id="script-content"
                  sx={{
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: 16,
                    color: '#22242C',
                    maxHeight: 170,
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                    padding: 1,
                    paddingTop:0,
                    transformOrigin: 'top',
                    transform: showScript ? 'scaleY(1)' : 'scaleY(0)',
                    transition: 'transform 0.25s ease',
                    display: showScript ? 'block' : 'none',
                  }}
                >
                  {selectedQuestion.script}
                </AccordionDetails>
              </Accordion>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};

export default TeacherInterviewSection;



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