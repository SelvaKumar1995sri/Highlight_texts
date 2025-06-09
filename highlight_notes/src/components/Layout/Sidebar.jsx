// Sidebar.js
import React, { useEffect, useRef, useState } from 'react';
import { Button, Box, Typography, IconButton } from '@mui/material';
import Notes from '../Notes/MainNotes';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';

const Sidebar = ({
  tabs = [],
  color = '#b84d84',
  onTabSelect,
  sectionKey,
  onSidebarVisited,
  activeTab: controlledActiveTab,
  viewedTabs: controlledViewedTabs,
  setViewedTabs: setControlledViewedTabs,
  isSelectionDialogOpen,
  setIsSelectionDialogOpen,
  selectedSection,
}) => {
  
  const [internalActiveTab, setInternalActiveTab] = useState('');
  const [notesOpen, setNotesOpen] = useState(false);
  const notesBtnRef = useRef(null);
  const [internalViewedTabs, setInternalViewedTabs] = useState({});
  const [notesNotification, setNotesNotification] = useState(0);

  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const viewedTabs = controlledViewedTabs !== undefined ? controlledViewedTabs : internalViewedTabs;
  const setActiveTab = controlledActiveTab !== undefined ? onTabSelect : setInternalActiveTab;
  const setViewedTabs = controlledViewedTabs !== undefined ? setControlledViewedTabs : setInternalViewedTabs;

  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && tabs.length > 0) {
      setActiveTab(tabs[0]);
      setViewedTabs({ [tabs[0]]: true });
      initializedRef.current = true;
    }
  }, [tabs, setActiveTab, setViewedTabs]);

  useEffect(() => {
    const allVisited = tabs.every((tab) => viewedTabs[tab]);
    if (allVisited) {
      onSidebarVisited(sectionKey);
    }
  }, [viewedTabs, tabs, onSidebarVisited, sectionKey]);

// to close Highlights dialog when section is changed
  useEffect(() => {
    if (setIsSelectionDialogOpen) {
      setIsSelectionDialogOpen(false);
    }
  }, [sectionKey, setIsSelectionDialogOpen]);

  const handleToggle = (tab) => {
    if (tab !== activeTab) {
      const isInternal = setViewedTabs === setInternalViewedTabs;
      if (isInternal) {
        setViewedTabs((prev) => {
          const updated = { ...prev };
          if (activeTab && activeTab !== tab) {
            updated[activeTab] = true;
          }
          return updated;
        });
      } else {
        const updated = { ...viewedTabs };
        if (activeTab && activeTab !== tab) {
          updated[activeTab] = true;
        }
        setViewedTabs(updated);
      }
      setActiveTab(tab);
      onTabSelect(tab);
    }
  };

  const handleNewNote = () => setNotesNotification((n) => n + 1);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: 236,
        gap: 1,
        bgcolor: '#fff',
        boxSizing: 'border-box',
        minWidth: 236,
        maxWidth: 236,
        ml: 1,
        mr: 1,
      }}
    >
      <Box
        sx={{
          p: 0.5,
          border: '1px solid #D4D4D4',
          borderRadius: '4px',
          boxSizing: 'border-box',
          width: 236,
          maxWidth: 236,
          minWidth:80
        }}
      >
        {tabs.map((tab, idx) => (
          <Box
            key={tab}
            onClick={() => handleToggle(tab)}
            role="button"
            aria-pressed={activeTab === tab}
            aria-label={`Go to ${tab}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleToggle(tab);
              }
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 2,
              cursor: 'pointer',
              width: 236,
              minWidth: 236,
              maxWidth: 236,
              height: 80,
              minHeight: 80,
              maxHeight: 80,
              boxSizing: 'border-box',
              outline: 'none',
              outlineOffset: 2,
              marginTop: idx !== 0 ? '-1px' : 0,
              '&:focus': {
                outline: 'none',
              },
              position: 'relative',
              // border: '1px solid #D4D4D4',
            }}
          >
            {activeTab === tab && (
              <Box
                sx={{
                  position: 'absolute',
                  left: 10,
                  top: 15,
                  bottom: 15,
                  width: 5,
                  borderRadius: 5,
                  backgroundColor: color,
                  zIndex: 1,
                }}
              />
            )}
            {/* <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}> */}
              <Box
                sx={{
                  width: 5,
                  height: 50,
                  bgcolor: 'transparent',
                  borderRadius: 5,
                  mr: 0,
                }}
              />
              <Typography
                variant="subtitle1"
                component="div"
                fontWeight={activeTab === tab ? 'bold' : 500}
                sx={{
                  fontSize: '1rem',
                  fontFamily: 'Work Sans, sans-serif',
                  flex: 1,
                  ml: 0.5,
                  // whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textAlign: 'left',
                  color: activeTab === tab ? '#252525' : '#454545', // Set color based on active state
                  fontWeight: activeTab === tab ? 600 : 400,
                }}
                tabIndex={0}
                aria-label={`${tab}`}
                
              >
                {tab}
              </Typography>
            {/* </Box> */}
            <IconButton 
              aria-label={`${tab}`}
            size="small" disableRipple sx={{ 
                                    p: 1,             
                                    minWidth: 44,
                                    minHeight: 44,
                                    width: 44,
                                    height: 44,
                                    ml: 'auto',       
                                    mr: -1,           
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
              {activeTab === tab ? (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 22 22">
                    <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="5" fill="#fff" />
                  </svg>
                </span>
              ) : viewedTabs[tab] ? (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 22 22">
                    <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="5" fill="#fff" />
                  </svg>
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 22 22">
                    <circle cx="11" cy="11" r="10" stroke="#BDBDBD" strokeWidth="2" fill="#fff" />
                  </svg>
                </span>
              )}
            </IconButton>
          </Box>
        ))}
      </Box>

      <Button
        ref={notesBtnRef}
        variant="contained"
        // disabled={sectionKey === 'instruction'}
        startIcon={<EditNoteIcon  sx={{pl:2, width:24, height:24,fontSize: '24px', color:'#454545' }}/>}
        onClick={() => {
          if (sectionKey ) { // Only execute if sectionKey is "instruction" !== 'instruction'
              setNotesOpen((prev) => !prev);
              setNotesNotification(0);
            }
        }}
        sx={{
          position: 'absolute',
          bottom: 18,
          left: 0.5,
          right: 24,
          width: notesNotification > 0 ? 178 : 146, 
          height: '40px',
          fontSize: '16px',
          backgroundColor: '#FFFFFF',
          color: '#454545',
          justifyContent: 'flex-start',
          minWidth: 0,
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontFamily: 'Work Sans, sans-serif',
          padding: 0,
          boxShadow: 'none',
          border: '1px solid #D4D4D4',
          borderRadius: '8px',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#F0F0F0',
            borderColor: '#D4D4D4',
          }
        }}
      >
        <span
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            color: '#454545',
            boxShadow: 'none',
            fontWeight: 500,
            fontFamily: 'Work Sans, sans-serif',
          }}
        >
          MY NOTES
          {notesNotification > 0 && (
            <span
              style={{
                position: 'absolute',
                right: 13,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                background: '#E64E4E',
                borderRadius: '50%',
                color: '#FFFFFF',
                fontSize: 13,
                // fontWeight: 'bold',
                // zIndex: 2,
                // boxShadow: '0 0 0 2px white',
              }}
            >
              {notesNotification}
            </span>
          )}
        </span>
      </Button>

      <Notes
        anchorEl={notesBtnRef.current}
        open={notesOpen}
        onClose={() => setNotesOpen(false)}
        selectedSection={sectionKey}
        selectedSidebarTab={activeTab}
        onNewNote={handleNewNote}
       
        isSelectionDialogOpen={isSelectionDialogOpen}
        setIsSelectionDialogOpen={setIsSelectionDialogOpen}
      />
    </Box>
  );
};

export default Sidebar;
