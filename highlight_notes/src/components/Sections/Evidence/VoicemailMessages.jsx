import React, { useState, useRef } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import voicemailIcon from '../../../assets/voicemail_icon.png';

const VoicemailMessages = () => {
  const [expanded, setExpanded] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const audioRefs = useRef({});

  // const audios = [
  //   {
  //     id: 1,
  //     text: '02-19-24 - Janet',
  //     audioUrl: "https://wowzahttp.cengage.com/digital-production/psychology/phone_call_1.mp3",
  //     script: "Janet: Hi, it’s me. I was just calling to see if Dana had settled down. I know it’s tough for her to go back and forth and I worry to think she might be unsettled all weekend. This isn’t easy for anyone. I know we’re happier now...but what about Dana? Anyway, if you could call me back and let me know if she’s ok, that would be great.",
  //   },
  //   {
  //     id: 2,
  //     text: '02-20-24 - Greg',
  //     audioUrl: "https://wowzahttp.cengage.com/digital-production/psychology/phone_call_2.mp3",
  //     script: "Greg: Hi, just putting Dana to bed and she’s fine….We do need to work out this school situation though. Dana just does not seem happy there and I don’t want her education to suffer because of us. We need to talk about her going back to her old school. Alright I’ll speak to you later....",
  //   },
  //   {
  //     id: 3,
  //     text: '02-20-24 - Janet',
  //     audioUrl: "https://wowzahttp.cengage.com/digital-production/psychology/phone_call_3.mp3",
  //     script: "Janet: Greg, I thought we’d been over this? I know the school is close to you but there’s just no way I can get her across town in time for school every day and get back to work. Does she know you’re trying to change her school again? We can’t put her in the middle of this. Bye.",
  //   },
  // ];

  const audios = [
  {
    id: 1,
    text: '02-19-24 - Janet',
    audioUrl: "https://wowzahttp.cengage.com/digital-production/psychology/phone_call_1.mp3",
    script: (
      <>
        <strong>Janet:</strong> Hi, it’s me. I was just calling to see if Dana had settled down. I know it’s tough for her to go back and forth and I worry to think she might be unsettled all weekend. This isn’t easy for anyone. I know we’re happier now...but what about Dana? Anyway, if you could call me back and let me know if she’s ok, that would be great.
      </>
    ),
  },
  {
    id: 2,
    text: '02-20-24 - Greg',
    audioUrl: "https://wowzahttp.cengage.com/digital-production/psychology/phone_call_2.mp3",
    script: (
      <>
        <strong>Greg:</strong> Hi, just putting Dana to bed and she’s fine….We do need to work out this school situation though. Dana just does not seem happy there and I don’t want her education to suffer because of us. We need to talk about her going back to her old school. Alright I’ll speak to you later....
      </>
    ),
  },
  {
    id: 3,
    text: '02-20-24 - Janet',
    audioUrl: "https://wowzahttp.cengage.com/digital-production/psychology/phone_call_3.mp3",
    script: (
      <>
        <strong>Janet:</strong> Greg, I thought we’d been over this? I know the school is close to you but there’s just no way I can get her across town in time for school every day and get back to work. Does she know you’re trying to change her school again? We can’t put her in the middle of this. Bye.
      </>
    ),
  },
];


  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePlay = (id) => {
    setPlayingId(id);
    Object.entries(audioRefs.current).forEach(([key, ref]) => {
      if (parseInt(key) !== id && ref && ref.pause) {
        ref.pause();
        ref.currentTime = 0;
      }
    });
  };

  const handleEnded = (id) => {
    if (playingId === id) setPlayingId(null);
  };

  return (
    <Box aria-labelledby="voicemail-section-title">
      <Typography 
      id="voicemail-section-title"
      sx={{ fontSize: '1rem', fontFamily: 'Work Sans, sans-serif', color: '#22242C',letterSpacing: 0, mb: 1, textAlign: 'center' }}>
        Listen to the voicemail messages between Dana's parents below. How do they each feel Dana is adjusting?
      </Typography>
      <Typography  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '1.125rem', fontFamily: 'Work Sans, sans-serif',letterSpacing: 0,color:'#22242C' }}>
        <img src={voicemailIcon} alt="Voicemail Icon" style={{ width: 25, height: 20, marginRight: 8, verticalAlign: 'middle' }} />
        Voicemail Messages (3)
      </Typography>
      <Box sx={{ my: 0.5, pb: 1, overflow: 'auto', maxHeight: '330px', fontFamily: 'Work Sans, sans-serif',letterSpacing: 0,color:'#22242C' }} role="list">
        {audios.map((audio) => (
          <Box
            key={audio.id}
            role="listitem"
            sx={{
              width: '95%',
              maxWidth: 708,
              my: 0.5,
              border: '1px solid #ccc',
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            aria-labelledby={`audio-title-${audio.id}`}
          >
            <Typography aria-labelledby={`audio-title-${audio.id}`} variant="body2" sx={{ mb: 1, fontSize: '16px', fontFamily: 'Work Sans, sans-serif', textAlign: 'left', width: '100%',letterSpacing: 0,color:'#22242C' }}>
              {audio.text}
            </Typography>
            <audio
              ref={el => (audioRefs.current[audio.id] = el)}
              controls
              style={{ width: '90%' }}
              onPlay={() => handlePlay(audio.id)}
              onEnded={() => handleEnded(audio.id)}
              aria-label={`Voicemail from ${audio.text}`}
            >
              <source src={audio.audioUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>

            <Accordion
              expanded={expanded === audio.id}
              onChange={handleAccordionChange(audio.id)}
              sx={{ width: '100%', mt: 0.5 }}
              aria-labelledby={`transcript-header-${audio.id}`}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${audio.id}-content`}
                id={`panel${audio.id}-header`}
                sx={{ height: '28px', minHeight: '28px', '& .MuiAccordionSummary-content': { my: 0, py: 0 } }}
              >
                <Typography sx={{ mb: 0, fontSize: 16, fontFamily: 'Work Sans, sans-serif', textAlign: 'center', width: '100%',color:'#22242C',letterSpacing: 0 }}> 
                  {expanded === audio.id ? 'Hide Transcript' : 'Show Transcript'}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                role="region"
                aria-labelledby={`transcript-header-${audio.id}`}
              >
                <Typography sx={{ textAlign: 'left', width: '100%', fontSize: '1rem', fontFamily: 'Work Sans, sans-serif',letterSpacing: 0,color:'#22242C' }}>{audio.script}</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default VoicemailMessages;