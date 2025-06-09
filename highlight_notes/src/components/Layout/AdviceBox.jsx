import React, { useRef, useEffect, useState } from 'react';
import { Button, Paper, Typography, IconButton, Box } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';

const AdviceBox = ({ currentRegion, tabAdviceMap, selectedSidebarTab,sectionKey }) => {
  const [showAdviceBox, setShowAdviceBox] = useState(false);
  const [adviceBoxPosition, setAdviceBoxPosition] = useState({ top: 0, right: 0 });

  const adviceButtonRef = useRef(null);
  const advicePaperRef = useRef(null);

  const handleToggleAdviceBox = () => {
    if (adviceButtonRef.current) {
      const rect = adviceButtonRef.current.getBoundingClientRect();
      setAdviceBoxPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setShowAdviceBox(prev => !prev);
  };



  
  useEffect(() => {
    const updatePopupPosition = () => {
      if (adviceButtonRef.current && showAdviceBox) {
        const rect = adviceButtonRef.current.getBoundingClientRect();
        setAdviceBoxPosition({
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right,
        });
      }
    };

    if (showAdviceBox) {
      updatePopupPosition(); // Initial on open
      window.addEventListener('resize', updatePopupPosition);
    }

    return () => {
      window.removeEventListener('resize', updatePopupPosition);
    };
  }, [showAdviceBox]);

  return (
    <>
    {sectionKey !== 'decision' && (
      console.log('AdviceBox: selectedSection', sectionKey), 
      <Button
        onClick={handleToggleAdviceBox}
        ref={adviceButtonRef}
        sx={{
          mr: 2,
          px: 3,
          py: 1.2,
          minWidth: '7.6875rem',
          width: 97,
          height: 40,
          border: `1px solid ${currentRegion.borderColor}`,
          backgroundColor: currentRegion.backgroundColor,
          color: currentRegion.textColor,
          '& .MuiButton-startIcon': { color: currentRegion.textColor },
          fontWeight: 500,
          fontFamily: 'Work Sans, sans-serif',
          fontSize: '1rem',
          boxShadow: 'none',
          textTransform: 'none',
          letterSpacing: 0,
        }}
        tabIndex={0}
        aria-label="Advice"
        variant="outlined"
        startIcon={<HelpOutlineIcon sx={{ fontSize: '1.5rem', width: '1.5rem', height: '1.5rem' }} />}
      >
        ADVICE
      </Button>
    )}
      {showAdviceBox && sectionKey !== 'decision' &&(
        <Paper
          elevation={4}
          sx={{
            position: 'absolute',
            top: 65,
            right: 14,
            minWidth: 320,
            maxWidth: 600,
            width: 'auto',
            height: 'auto',
            maxHeight: '248px',
            borderRadius: 2,
            zIndex: 1301,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
          ref={advicePaperRef}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" role="region" aria-labelledby="advice-title">
            <Typography sx={{fontFamily: 'Work Sans, sans-serif', fontSize:20, fontWeight:600, color:'#252525', letterSpacing:0}}>Advice</Typography>
            <IconButton onClick={handleToggleAdviceBox} size="small">
              <CloseIcon aria-label="Close advice box" sx={{ color: currentRegion.textColor }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              mt: 2,
              mb: 0,
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              display: 'flex',
              alignItems: 'flex-start',
              color: "#454545"
            }}
          >
            <Typography sx={{ fontSize: 16, fontFamily: 'Work Sans, sans-serif' , fontWeight: 400, color: '#454545' }}>
              {tabAdviceMap[selectedSidebarTab] || 'No advice available for this section.'}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{
              mt: 2,
              mb: 0,
              background: 'white',
              position: 'sticky',
              bottom: 0,
              zIndex: 2,
            }}
          >
            <Button
              onClick={handleToggleAdviceBox}
              variant="contained"
              disableRipple
              sx={{
                backgroundColor: currentRegion.textColor,
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: currentRegion.borderColor,
                  boxShadow: 'none',
                },
                width: 97,
                height: 40,
                fontFamily: 'Work Sans, sans-serif',
                fontWeight: 500,
                fontSize: '1rem',
                boxShadow: 'none',
                textTransform: 'none',
                borderRadius: 2,
                padding: '8px 16px',
                textTransform: 'none',
              }}
            >
              OK
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default AdviceBox;
