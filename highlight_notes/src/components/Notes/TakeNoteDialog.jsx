import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
  ClickAwayListener
} from '@mui/material';
import Draggable from 'react-draggable';

const TakeNoteDialog = ({
  isDialogOpen,
  isExpanded,
  draggableRef,
  setIsDialogOpen,
  setIsExpanded,
  highlights = [],
  selectedSection,
  selectedSidebarTab,
  noteContent,
  setNoteContent,
  handleSaveNote,
  expandIcon,
  collapseIcon,
  Tiptap,
  hexToRgba
}) => {
  if (!isDialogOpen) return null;

  return (
    <ClickAwayListener
      onClickAway={(event) => {
        const isClickInside = event.target.closest('.take-note-dialog-interaction-zone');
        if (!isClickInside) {
          setIsDialogOpen(false);
          setIsExpanded(false);
        }
      }}
    >
      <Draggable nodeRef={draggableRef}>
        <div
          className="take-note-dialog-interaction-zone"
          ref={draggableRef}
          style={{
            position: 'fixed',
            top: isExpanded ? '5%' : '20%',
            left: isExpanded ? '25%' : '40%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1500,
            pointerEvents: 'auto',
            width: isExpanded ? '1000px' : '284px',
            height: isExpanded ? '650px' : '276px',
            boxSizing: 'border-box',
          }}
        >
          <Paper
            className="take-note-dialog-interaction-zone"
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: 3,
              p: 1,
              overflow: 'auto',
              fontFamily: 'Work Sans, sans-serif',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
            }}
          >
            <Box
              className="take-note-dialog-interaction-zone"
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{ cursor: 'move', paddingBottom: 1 }}
            >
              <Typography sx={{ fontFamily: 'Work Sans, sans-serif', color: '#22242C', fontSize: 14, fontWeight: 500 }}>
                New Notes
              </Typography>
              <IconButton onClick={() => setIsExpanded(prev => !prev)} sx={{ p: 0 }}>
                <span style={{ width: 24, height: 24, display: 'inline-flex', alignItems: 'center' }}>
                  {isExpanded ? collapseIcon : expandIcon}
                </span>
              </IconButton>
            </Box>

            {highlights.length > 0 && (
              <Box mt={1}>
                {highlights
                  .filter(h => h.section === selectedSection && h.tab === selectedSidebarTab)
                  .map((highlight, index) => (
                    <Typography
                      key={index}
                      sx={{
                        backgroundColor: hexToRgba(highlight.color, 0.24),
                        borderRadius: '4px',
                        padding: '2px 2px',
                        display: 'inline-block',
                        marginBottom: '2px',
                      }}
                    >
                      {highlight.text}
                    </Typography>
                  ))}
              </Box>
            )}

            <Box
              className="take-note-dialog-interaction-zone"
              sx={{
                width: isExpanded ? '100%' : '267px',
                height: isExpanded ? '500px' : '180px',
                flexGrow: 1,
                border: '1px solid #DCDCDC',
                borderRadius: '4px',
                padding: '1px',
                overflow: 'auto',
                boxSizing: 'border-box',
                '.tiptap-editor': {
                  div: {
                    minHeight: '100px !important',
                    marginTop: '-10px !important'
                  }
                },
                '& .ProseMirror': {
                  minHeight: '100px !important',
                  outline: 'none',
                },
                '& .ProseMirror p.is-editor-empty:first-child::before': {
                  color: '#000000',
                  content: 'attr(data-placeholder)',
                  float: 'left',
                  height: 0,
                  pointerEvents: 'none',
                  fontFamily: 'Work Sans, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                },
              }}
            >
              <Tiptap
                value={noteContent}
                onChange={setNoteContent}
                placeholder="Write your notes here."
                className="take-note-dialog-interaction-zone"
                editorProps={{
                  attributes: {
                    class: 'tiptap-editor take-note-dialog-interaction-zone',
                    'data-placeholder': 'Write your notes here',
                  },
                }}
              />
            </Box>

            <Box className="take-note-dialog-interaction-zone" display="flex" justifyContent="flex-start" mt={1}>
              <Button
                onClick={() => handleSaveNote(false)}
                variant="contained"
                sx={{
                  width: '91px',
                  height: '28px',
                  background: 'white',
                  border: '1px solid #D4D4D4',
                  color: '#454545',
                  fontFamily: 'Work Sans, sans-serif',
                  boxShadow: 'none',
                  '&:hover': {
                    background: '#f0f0f0',
                    boxShadow: 'none',
                  },
                }}
              >
                Save
              </Button>
            </Box>
          </Paper>
        </div>
      </Draggable>
    </ClickAwayListener>
  );
};

export default TakeNoteDialog;
