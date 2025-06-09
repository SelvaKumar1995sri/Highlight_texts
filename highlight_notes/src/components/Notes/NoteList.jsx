import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const NoteList = ({ notes, tabValue }) => {
  if (!notes.length) return null;

  const filteredNotes = notes
    .filter((note) => {
      if (tabValue === 0) return true;
      if (tabValue === 1) return note.note_section === 1;
      if (tabValue === 2) return note.note_section === 2;
      return false;
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // newest first

  return (
    <Box sx={{ width: 212, maxHeight: 254, overflowY: 'auto', mt: tabValue !== 2 ? 0 : '16px' }}>
      {filteredNotes.map((note, index) => {
        const prefix = note.note_section === 2 ? 'HIGHLIGHT' : 'YOUR NOTES';

        return (
          <Paper
            key={index}
            sx={{
              p: 1,
              mb: 1,
              borderRadius: 2,
              borderLeft: `4px solid ${note.highlightColor || note.sectionColor}`,
              borderRight: '1px solid #D4D4D4',
              borderTop: '1px solid #D4D4D4',
              borderBottom: '1px solid #D4D4D4',
              cursor: 'default',
              fontFamily: 'Work Sans, sans-serif',
              boxShadow: 'none',
            }}
          >
            <Box mb={1}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Work Sans, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  letterSpacing: 0,
                  lineHeight: '20px',
                  color: '#454545',
                }}
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
            </Box>

            <Typography
              variant="caption"
              sx={{
                color: note.highlightColor || note.sectionColor,
                fontFamily: 'DM Sans',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {prefix}
            </Typography>
            <br />
          </Paper>
        );
      })}
    </Box>
  );
};

export default NoteList;
