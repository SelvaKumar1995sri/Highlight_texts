import React from 'react';
import { Tabs, Tab } from '@mui/material';

const NoteTabs = ({ tabValue, setTabValue }) => {
  return (
    <Tabs
      value={tabValue}
      onChange={(_, newValue) => setTabValue(newValue)}
      variant="fullWidth"
      aria-label="Notes navigation tabs"
      TabIndicatorProps={{
        sx: {
          backgroundColor: '#3942B0',
          height: '4px',
        },
      }}
      sx={{
        minHeight: 48,
        '& .MuiTabs-flexContainer': {
          justifyContent: 'space-between',
          fontFamily: 'Work Sans, sans-serif',
        },
      }}
    >
      <Tab
        label="All"
        id="notes-All-tab"
        aria-selected={tabValue === 0}
        aria-controls="tabpanel-All"
        tabIndex={0}
        sx={{
          p: 0,
          minWidth: 43,
          minHeight: 44,
          fontFamily: 'Work Sans, sans-serif',
          fontSize: '0.875rem',
          textTransform: 'none',
          fontWeight: 400,
          color: '#707070',
          '&.Mui-selected': {
            color: '#3942B0',
          },
          '& .MuiTab-wrapper': {
            pb: '4px',
          },
        }}
      />
      <Tab
        label="Notes"
        id="notes-Notes-tab"
        aria-selected={tabValue === 1}
        aria-controls="tabpanel-Notes"
        tabIndex={0}
        sx={{
          p: 0,
          minWidth: 64,
          minHeight: 44,
          fontSize: '0.875rem',
          fontFamily: 'Work Sans, sans-serif',
          fontWeight: 400,
          textTransform: 'none',
          color: '#707070',
          '&.Mui-selected': {
            color: '#3942B0',
          },
        }}
      />
      <Tab
        label="Highlights"
        id="notes-Highlights-tab"
        aria-selected={tabValue === 2}
        aria-controls="tabpanel-Highlights"
        tabIndex={0}
        sx={{
          p: 0,
          minWidth: 93,
          minHeight: 44,
          fontSize: '0.875rem',
          textTransform: 'none',
          fontFamily: 'Work Sans, sans-serif',
          fontWeight: 400,
          color: '#707070',
          '&.Mui-selected': {
            color: '#3942B0',
          },
        }}
      />
    </Tabs>
  );
};

export default NoteTabs;
