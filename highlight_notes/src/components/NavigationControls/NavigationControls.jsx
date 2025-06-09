import React from 'react';
import { Box, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NavigationControls = ({
  // onNavigate,
  selectedSection,
  selectedSidebarTab,
  sectionOrder,
  regionConfig,
  setSelectedSection,
  setSelectedSidebarTab,
  setSidebarTabState,
  setViewedSections,
  resetViewedSectionsAfter,
  markSectionVisited,
  sidebarCompletionStatus
}) => {
  const tabs = regionConfig[selectedSection].tabs;
  const currentTabIdx = tabs.indexOf(selectedSidebarTab);
  const isFirstSection = sectionOrder.indexOf(selectedSection) === 0;
  const isLastSection = sectionOrder.indexOf(selectedSection) === sectionOrder.length - 1;
  const isFirstTab = currentTabIdx === 0;
  const isLastTab = currentTabIdx === tabs.length - 1;
  const showBack = !(isFirstTab && isFirstSection);
  const showNext = !(isLastTab && isLastSection);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
      {showBack && (
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon sx={{width:24, height:24, color: '#454545'}}/>}
          sx={{
            width: '107px',
            height: '40px',
            fontSize: '16px',
            backgroundColor: 'white',
            color: '#454545',
            fontFamily: 'Work Sans, sans-serif',
            border: '1px solid #D4D4D4',
            boxShadow: 'none',
            '&:hover': {
            backgroundColor: '#FFFFFF',
            boxShadow: 'none',
          },
          }}
          // onClick={() => onNavigate('back')}
          onClick={() => {
            if (currentTabIdx > 0) {
              const prevTab = tabs[currentTabIdx - 1];
              setSelectedSidebarTab(prevTab);
              setSidebarTabState(prev => ({
                ...prev,
                [selectedSection]: { ...prev[selectedSection], [prevTab]: true }
              }));
            } else {
              const currentSectionIdx = sectionOrder.indexOf(selectedSection);
              if (currentSectionIdx > 0) {
                const prevSection = sectionOrder[currentSectionIdx - 1];
                const prevTabs = regionConfig[prevSection].tabs;
                const lastTab = prevTabs[prevTabs.length - 1];
                setSidebarTabState(prev => {
                const newState = { ...prev };

                // 👇 Reset the current section (B) checkmarks before moving to A
                // if (newState[selectedSection]) {
                //   newState[selectedSection] = Object.fromEntries(
                //     Object.keys(newState[selectedSection]).map(key => [key, false])
                //   );
                // }

                // 👇 Enable the last tab in the previous section (A)
                newState[prevSection] = {
                  ...newState[prevSection],
                  [lastTab]: true
                };

                return newState;
              });

              setSelectedSection(prevSection);
              setSelectedSidebarTab(lastTab);
              // resetViewedSectionsAfter(prevSection);
              }
            }
          }}
          tabIndex={0}
          aria-label="Go to previous tab"
        >
          Back
        </Button>
      )}

      {showNext && (
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon sx={{width:24, height:24, color: '#454545'}}/>}
          sx={{
            width: '107px',
            height: '40px',
            fontSize: '16px',
            backgroundColor: 'white',
            color: '#454545',
            fontFamily: 'Work Sans, sans-serif',
            border: '1px solid #D4D4D4',
            boxShadow: 'none',
            '&:hover': {
            backgroundColor: '#FFFFFF',
            boxShadow: 'none',
          },
          }}
          onClick={() => {
            if (currentTabIdx < tabs.length - 1) {
              const nextTab = tabs[currentTabIdx + 1];
              setSidebarTabState(prev => ({
                ...prev,
                [selectedSection]: {
                  ...prev[selectedSection],
                  [selectedSidebarTab]: true,
                  [nextTab]: true
                }
              }));
              setSelectedSidebarTab(nextTab);
            } else {
              const currentSectionIdx = sectionOrder.indexOf(selectedSection);
              if (currentSectionIdx < sectionOrder.length - 1) {
                const nextSection = sectionOrder[currentSectionIdx + 1];
                const firstTab = regionConfig[nextSection].tabs[0];
                setSidebarTabState(prev => {
                  const updated = { ...prev };
                  updated[selectedSection] = {
                    ...updated[selectedSection],
                    [selectedSidebarTab]: true
                  };
                  return updated;
                });
                setViewedSections(prev => ({
                  ...prev,
                  [selectedSection]: true
                }));
                setSelectedSection(nextSection);
                setSelectedSidebarTab(firstTab);
                setSidebarTabState(prev => ({
                  ...prev,
                  [nextSection]: {
                    ...prev[nextSection],
                    [firstTab]: true
                  }
                }));
                if (sidebarCompletionStatus[nextSection]) {
                  markSectionVisited(nextSection);
                }
              }
            }
          }}
          tabIndex={0}
          aria-label="Go to next tab"
        >
          Next
        </Button>
      )}
    </Box>
  );
};

export default NavigationControls;
