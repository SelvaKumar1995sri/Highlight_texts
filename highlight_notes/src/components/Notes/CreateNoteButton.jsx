import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CreateNoteButton = ({ handleOpenPopup }) => {
  return (
    <Button
      startIcon={<AddIcon />}
      variant="outlined"
      fullWidth
      sx={{
        my: 2,
        width: 212,
        height: 40,
        textTransform: 'none',
        fontFamily: 'Work Sans, sans-serif',
        fontSize: 16,
        borderColor: '#D4D4D4',
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
        color: '#454545',
        '&:hover': {
          backgroundColor: '#F0F0F0',
          borderColor: '#D4D4D4',
        },
        p: 0,
      }}
      onClick={handleOpenPopup}
    >
      Create New Note
    </Button>
  );
};

export default CreateNoteButton;
