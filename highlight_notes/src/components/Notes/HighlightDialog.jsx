import React, {useState} from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  IconButton,
  Button,
  ClickAwayListener
} from '@mui/material';
import Draggable from 'react-draggable';
import TakeNoteDialog from './TakeNoteDialog';

const HighlightDialog = ({
  isSelectionDialogOpen,
  draggableRef,
  popupTabValue,
  setPopupTabValue,
  highlights,
  selectedSection,
  selectedSidebarTab,
  sectionColor,
  selectedColor,
  setSelectedColor,
  selectionNoteContent,
  setSelectionNoteContent,
  setNotes,
  setIsSelectionDialogOpen,
  setIsExpanded,
  isExpanded,
  noteContent,
  setNoteContent,
  handleSaveNote,
  Tiptap,
  expandIcon,
  collapseIcon,
  highlight_img,
  selectedhilight_alt,
  vector_img,
  selectedvector,
  hexToRgba,
  onNewNote
}) => {
  if (!isSelectionDialogOpen) return null;

  const [selectedRange, setSelectedRange] = useState(null);

  const regionConfig = {
  instruction: {
    color: '#b84d84',
    tabs: ['Instructions'],
  },
  research: {
    color: '#67BC46',
    tabs: ['Parent Conflict', 'Parenting Time', 'Socioeconomic Status'],
  },
  evidence: {
    color: '#F89B1B ',
    tabs: ['Child Custody Form', 'Teacher Interview', 'Childs Crayon Drawing', 'Voicemail Messages'],
  },
  decision: {
    color: '#009FDA',
    tabs: ['Notes'],
  },
};

  function getFirstTextNode(node) {
    if (!node) return null;
    if (node.nodeType === 3) return node;
    for (let child of node.childNodes) {
      const found = getFirstTextNode(child);
      if (found) return found;
    }
    return null;
  }

  function getXPathForNode(node, root = document.body) {
    if (node.nodeType === 3) {
      const parent = node.parentNode;
      const textNodes = Array.from(parent.childNodes).filter(n => n.nodeType === 3);
      const idx = textNodes.indexOf(node) + 1;
      return getXPathForNode(parent, root) + '/text()[' + idx + ']';
    }
    const idx = (sib, name) => sib
      ? idx(sib.previousElementSibling, name || sib.localName) + (sib.localName === name)
      : 1;
    const segs = [];
    for (; node && node !== root; node = node.parentNode) {
      if (node.nodeType === 1) {
        let s = node.localName.toLowerCase();
        if (node.id) {
          s += '[@id="' + node.id + '"]';
          segs.unshift(s);
          break;
        } else {
          const i = idx(node);
          if (i > 1) s += '[' + i + ']';
        }
        segs.unshift(s);
      }
    }
    return segs.length ? '/' + segs.join('/') : null;
  }

  const handleExistingHighlight = (existingNote, color, text, selectedRange, parsed) => {
    try {
        // Find the index of the note that matches the current selection
        const noteIndex = parsed.findIndex(note => {
            // Match based on content and position
            return note.content === existingNote.content && 
                   note.section === selectedSection && 
                   note.tab === selectedSidebarTab;
        });

        // Create the updated note with new color
        const updatedNote = {
            ...existingNote,
            highlightColor: color,
            section: selectedSection,
            tab: selectedSidebarTab,
            updatedAt: new Date().toISOString()
        };

        let updatedNotes;
        
        if (noteIndex !== -1) {
            // If note exists, update it
            updatedNotes = [...parsed];
            updatedNotes[noteIndex] = updatedNote;
        } else {
            // If note doesn't exist, add it
            updatedNotes = [...parsed, updatedNote];
        }

        // Update localStorage
        localStorage.setItem('highlightedNotes', JSON.stringify(updatedNotes));
        
        // Update React state
        setNotes(updatedNotes);

        // Update the DOM
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            // Find and update the specific highlight in the DOM
            const highlightSpans = mainContent.querySelectorAll('span[data-highlighted="true"]');
            highlightSpans.forEach(span => {
                if (span.textContent === existingNote.content) {
                    // Update the highlight color
                    span.style.backgroundColor = color;
                }
            });
        }

        // Update UI state
        setSelectedColor(color);
        setIsSelectionDialogOpen(false);
        setSelectionNoteContent('');
        setSelectedRange(null);

    } catch (error) {
        console.error('Error updating highlight:', error);
    }
};

  const handleSelectionColor = (color) => {
    setSelectedColor(color);
    let text = selectionNoteContent;
    if (!text) {
      setIsSelectionDialogOpen(false);
      setSelectionNoteContent('');
      return;
    }
    if (color === null) {
      setIsSelectionDialogOpen(false);
      setSelectionNoteContent('');
      setSelectedColor(null);
      return;
    }
    const range = selectedRange;
    if (!range) return;
    let startNode = range.startContainer.nodeType === 3 ? range.startContainer : getFirstTextNode(range.startContainer);
    let endNode = range.endContainer.nodeType === 3 ? range.endContainer : getFirstTextNode(range.endContainer);
    if (!startNode || !endNode || (range.startOffset === 0 && range.endOffset === 0)) {
      setIsSelectionDialogOpen(false);
      setSelectionNoteContent('');
      setSelectedColor(null);
      return;
    }
    
    let highlightSegments = [];
    const stored = localStorage.getItem('highlightedNotes') || '[]';
    let parsed = [];
    
    try {
      parsed = JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing highlighted notes:', e);
      parsed = [];
    }

     // Check if the text is already highlighted or overlaps with existing highlights
    const existingHighlightIndex = parsed.findIndex(note => {
      // Check for exact match or overlap
      return note.content.includes(text) || text.includes(note.content);
    });

    if (existingHighlightIndex !== -1) {
      const existingNote = parsed[existingHighlightIndex];
      handleExistingHighlight(existingNote, color, text, selectedRange, parsed);
      return;
    }
    if (startNode === endNode) {
      const mainContent = document.getElementById('main-content');
      function getTextNodesInOrder(node) {
        let textNodes = [];
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
        let n;
        while ((n = walker.nextNode())) textNodes.push(n);
        return textNodes;
      }
      const allTextNodes = getTextNodesInOrder(mainContent);
      const nodeIdx = allTextNodes.indexOf(startNode);
      highlightSegments.push({
        content: startNode.nodeValue.substring(range.startOffset, range.endOffset),
        startXPath: getXPathForNode(startNode),
        startOffset: range.startOffset,
        endXPath: getXPathForNode(endNode),
        endOffset: range.endOffset,
        textNodeIndex: nodeIdx
      });
    } else {
      const mainContent = document.getElementById('main-content');
      function getTextNodesInOrder(node) {
        let textNodes = [];
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
        let n;
        while ((n = walker.nextNode())) textNodes.push(n);
        return textNodes;
      }
      const allTextNodes = getTextNodesInOrder(mainContent);
      let inRange = false;
      for (let nIdx = 0; nIdx < allTextNodes.length; nIdx++) {
        const n = allTextNodes[nIdx];
        if (n === startNode) inRange = true;
        if (inRange) {
          let s = 0, e = n.length;
          if (n === startNode) s = range.startOffset;
          if (n === endNode) e = range.endOffset;
          if (s < e) {
            const nodeText = n.nodeValue.substring(s, e);
            if (nodeText.trim()) {
              highlightSegments.push({
                content: nodeText,
                startXPath: getXPathForNode(n),
                startOffset: s,
                endXPath: getXPathForNode(n),
                endOffset: e,
                textNodeIndex: nIdx
              });
            }
          }
        }
        if (n === endNode) break;
      }
    }
    // console.log('Highlight segments to save:', highlightSegments);
    if (highlightSegments.length) {
      setNotes((prevNotes) => {
        const updated = [
          ...prevNotes,
          {
            content: text,
            highlightColor: color,
            sectionColor: regionConfig[selectedSection].color,
            section: selectedSection,
            tab: selectedSidebarTab,
            timestamp: new Date(),
            note_section: 2,
            note_type: 'Highlight',
            highlightSegments,
          },
        ];
        localStorage.setItem('highlightedNotes', JSON.stringify(updated));
        return updated;
      });
    }
    if (typeof onNewNote === 'function') onNewNote();
    setSelectedColor(null);
    setIsSelectionDialogOpen(false);
    setSelectionNoteContent('');
    setSelectedRange(null);
  };

  return (
    // <ClickAwayListener onClickAway={handleClickAway}>
    //   <Draggable nodeRef={draggableRef}>
    //     <Paper
    //       ref={draggableRef}
    //       sx={{
    //         position: 'fixed',
    //         top: '2%',
    //         left: '25%',
    //         width: 312,
    //         height: 130,
    //         transform: 'translate(-50%, -50%)',
    //         zIndex: 1500,
    //         pointerEvents: 'auto',
    //         borderRadius: '8px',
    //         backgroundColor: 'transparent',
    //         display: 'flex',
    //         flexDirection: 'column',
    //         boxShadow: 'none',
    //         p: 0,
    //       }}
    //     >
    //       <Paper
    //         sx={{
    //           width: 312,
    //           height: 68,
    //           p: 2,
    //           gap: 1.5,
    //           backgroundColor: '#FFFFFF',
    //           border: '1px solid #DCDCDC',
    //           boxShadow: 3,
    //           borderRadius: '8px',
    //           boxSizing: 'border-box',
    //           display: 'flex',
    //           flexDirection: 'column',
    //           justifyContent: 'center',
    //         }}
    //       >
    //         <Tabs
    //           className="take-note-dialog-interaction-zone"
    //           value={popupTabValue}
    //           onChange={(_, newValue) => setPopupTabValue(newValue)}
    //           variant="fullWidth"
    //           TabIndicatorProps={{
    //             sx: {
    //               bottom: 0,
    //               height: '3px',
    //               backgroundColor: '#3942B0',
    //             },
    //           }}
    //           sx={{ minHeight: '44px' }}
    //         >
    //           <Tab
    //             className="take-note-dialog-interaction-zone"
    //             label="Highlight"
    //             icon={<span style={{ width: 20, height: 20, display: 'inline-flex', alignItems: 'center' }}>{popupTabValue === 0 ? selectedhilight_alt : highlight_img}</span>}
    //             iconPosition="start"
    //             sx={{
    //               minHeight: '44px',
    //               minWidth: '50%',
    //               textTransform: 'none',
    //               color: '#707070',
    //               '&.Mui-selected': { color: '#3942B0' },
    //               fontFamily: 'Work Sans, sans-serif',
    //             }}
    //           />
    //           <Tab
    //             className="take-note-dialog-interaction-zone"
    //             label="Take Notes"
    //             icon={<span style={{ width: 20, height: 20, display: 'inline-flex', alignItems: 'center', marginRight: '8px' }}>{popupTabValue === 0 ? vector_img : selectedvector}</span>}
    //             iconPosition="start"
    //             sx={{
    //               minHeight: '44px',
    //               minWidth: '50%',
    //               textTransform: 'none',
    //               color: '#707070',
    //               '&.Mui-selected': { color: '#3942B0' },
    //               fontFamily: 'Work Sans, sans-serif',
    //               whiteSpace: 'nowrap',
    //               display: 'flex',
    //               flexDirection: 'row',
    //               alignItems: 'center',
    //               padding: '6px 16px',
    //             }}
    //           />
    //         </Tabs>
    //       </Paper>

    //       <Paper
    //         sx={{
    //           width: 312,
    //           height: popupTabValue === 0 ? 52 : 276,
    //           px: 1.5,
    //           py: 1.5,
    //           boxShadow: 3,
    //           borderRadius: '8px',
    //           border: '1px solid #DCDCDC',
    //           backgroundColor: '#FFFFFF',
    //           boxSizing: 'border-box',
    //           display: 'flex',
    //           flexDirection: 'column',
    //           justifyContent: 'center',
    //           mt: 1.1,
    //         }}
    //       >
    //         <Box mt={2}>
    //           {popupTabValue === 0 && (
    //             <Box
    //               display="flex"
    //               flexDirection="row"
    //               alignItems="start"
    //               justifyContent="flex-start"
    //               gap="29px"
    //               sx={{ mb: 2 }}
    //             >
    //               <Box
    //                 sx={{
    //                   width: '52px',
    //                   height: '28px',
    //                   borderRadius: '8px',
    //                   backgroundColor: '#FFFFFF',
    //                   border: '1px solid #D4D4D4',
    //                   padding: '6px 8px',
    //                   gap: '4px',
    //                   cursor: 'pointer',
    //                   display: 'flex',
    //                   justifyContent: 'center',
    //                   alignItems: 'center',
    //                   fontFamily: 'Work Sans, sans-serif',
    //                   boxSizing: 'border-box',
    //                   color: '#454545'
    //                 }}
    //                 onClick={() => {
    //                   setSelectedColor(null);
    //                   if (selectionNoteContent) {
    //                     setNotes((prevNotes) => {
    //                       const updated = prevNotes.filter(
    //                         (note) => !(note.content === selectionNoteContent && note.section === selectedSection && note.tab === selectedSidebarTab)
    //                       );
    //                       localStorage.setItem('highlightedNotes', JSON.stringify(updated));
    //                       return updated;
    //                     });
    //                     const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false);
    //                     let node;
    //                     while ((node = walker.nextNode())) {
    //                       if (node.tagName === 'SPAN' && node.textContent === selectionNoteContent) {
    //                         const textNode = document.createTextNode(selectionNoteContent);
    //                         node.parentNode.replaceChild(textNode, node);
    //                         break;
    //                       }
    //                     }
    //                   }
    //                   setIsSelectionDialogOpen(false);
    //                   setSelectionNoteContent('');
    //                 }}
    //               >
    //                 <Typography fontSize={12}>NONE</Typography>
    //               </Box>

    //               {["#b84d84", "#67BC46", "#F89B1B", "#009FDA"].map((colorOption) => {
    //                 const normalizedColorOption = colorOption.toLowerCase().trim();
    //                 const normalizedSectionColor = sectionColor.toLowerCase().trim();
    //                 const isSectionColor = normalizedColorOption === normalizedSectionColor;
    //                 const isSelected = selectedColor && selectedColor.toLowerCase().trim() === normalizedColorOption;

    //                 return (
    //                   <Box
    //                     key={colorOption}
    //                     sx={{
    //                       width: 27,
    //                       height: 27,
    //                       borderRadius: '6px',
    //                       border: isSelected ? '3px solid black' : isSectionColor ? `3px solid ${sectionColor}` : 'none',
    //                       cursor: 'pointer',
    //                       boxSizing: 'border-box',
    //                       backgroundColor: 'white',
    //                       display: 'flex',
    //                       justifyContent: 'center',
    //                       alignItems: 'center',
    //                       padding: (isSelected || isSectionColor) ? '2px' : 0,
    //                     }}
    //                     onClick={() => setSelectedColor(colorOption)}
    //                   >
    //                     <Box
    //                       sx={{
    //                         width: (isSelected || isSectionColor) ? 17 : 27,
    //                         height: (isSelected || isSectionColor) ? 17 : 27,
    //                         borderRadius: '2px',
    //                         backgroundColor: colorOption,
    //                       }}
    //                     />
    //                   </Box>
    //                 );
    //               })}
    //             </Box>
    //           )}

    //           {popupTabValue === 1 && (
    //             <TakeNoteDialog
    //               isDialogOpen={isSelectionDialogOpen}
    //               isExpanded={isExpanded}
    //               draggableRef={draggableRef}
    //               setIsDialogOpen={setIsSelectionDialogOpen}
    //               setIsExpanded={setIsExpanded}
    //               highlights={highlights}
    //               selectedSection={selectedSection}
    //               selectedSidebarTab={selectedSidebarTab}
    //               noteContent={noteContent}
    //               setNoteContent={setNoteContent}
    //               handleSaveNote={handleSaveNote}
    //               expandIcon={expandIcon}
    //               collapseIcon={collapseIcon}
    //               Tiptap={Tiptap}
    //               hexToRgba={hexToRgba}
    //             />
    //           )}

    //           {highlights.length > 0 && (
    //             <Box mt={2}>
    //               {highlights
    //                 .filter(h => h.section === selectedSection && h.tab === selectedSidebarTab)
    //                 .map((highlight, index) => (
    //                   <Typography
    //                     key={index}
    //                     sx={{
    //                       backgroundColor: hexToRgba(highlight.color, 0.24),
    //                       borderRadius: '4px',
    //                       padding: '2px 4px',
    //                       display: 'inline-block',
    //                       marginBottom: '4px',
    //                     }}
    //                   >
    //                     {highlight.text}
    //                   </Typography>
    //                 ))}
    //             </Box>
    //           )}
    //         </Box>
    //       </Paper>
    //     </Paper>
    //   </Draggable>
    // </ClickAwayListener>
    <ClickAwayListener  
           onClickAway={(event) => {
            // Don't close if clicking on elements with our custom class
            const isClickInside = event.target.closest('.take-note-dialog-interaction-zone');
            
            if (!isClickInside) {
              setIsSelectionDialogOpen(false);
              setIsExpanded(false);
            }
          }}
        >
            <Draggable nodeRef={draggableRef}>
              <Paper
                  ref={draggableRef}
                  sx={{
                    position: 'fixed',
                    top: '2%',
                    left: '25%',
                    width: 312,
                    height: 130,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1500,
                    pointerEvents: 'auto',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'none',
                    p: 0,
                  }}
                >
                <Paper
                  sx={{
                    width: 312, // increased width
                    height: 68, // increased height
                    p: 2, // 16px padding for better internal spacing
                    gap: 1.5, // 12px gap between children
                    backgroundColor: '#FFFFFF', // fill
                    border: '1px solid #DCDCDC', // stroke
                    boxShadow: 3,
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Tabs
                    className="take-note-dialog-interaction-zone"
                    value={popupTabValue}
                    onChange={(_, newValue) => setPopupTabValue(newValue)}
                    variant="fullWidth"
                    TabIndicatorProps={{
                      sx: {
                        bottom: 0, // adjust indicator closer to text
                        height: '3px',
                        backgroundColor: '#3942B0',
                      },
                    }}
                    sx={{
                      minHeight: '44px',
                    }}
                  >
                    <Tab
                      className="take-note-dialog-interaction-zone"
                      label="Highlight"
                      icon={
                        <span
                          style={{
                            width: 20,
                            height: 20,
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                        >
                          {popupTabValue === 0 ? selectedhilight_alt : highlight_img}
                        </span>
                      }
                      iconPosition="start"
                      sx={{
                        minHeight: '44px',
                        minWidth: '50%',
                        textTransform: 'none',
                        color: '#707070',
                        '&.Mui-selected': { color: '#3942B0' },
                        fontFamily: 'Work Sans, sans-serif',
                      }}
                    />
                    <Tab
                      className="take-note-dialog-interaction-zone"
                      label="Take Notes"
                      icon={
                        <span
                          style={{
                            width: 20,
                            height: 20,
                            display: 'inline-flex',
                            alignItems: 'center',
                            marginRight: '8px',
                          }}
                        >
                          {popupTabValue === 0 ? vector_img : selectedvector}
                        </span>
                      }
                      iconPosition="start"
                      sx={{
                        minHeight: '44px',
                        minWidth: '50%',
                        textTransform: 'none',
                        color: '#707070',
                        '&.Mui-selected': { color: '#3942B0' },
                        fontFamily: 'Work Sans, sans-serif',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '6px 16px',
                      }}
                    />
                  </Tabs>
                </Paper>
                <Paper
                  sx={{
                    width: 312,
                    height: popupTabValue === 0 ? 52 : 276,
                    px: 1.5, // horizontal padding (left & right)
                    py: 1.5, // vertical padding (top & bottom)
                    boxShadow: 3,
                    borderRadius: '8px',
                    border: '1px solid #DCDCDC',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box',  
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // Center content vertically
                    mt: 1.1,
                  }}
                >
                  <Box mt={2}>
                    {popupTabValue === 0 && (
                      <Box 
                        display="flex"
                        flexDirection="row"
                        alignItems="start"
                        justifyContent="flex-start"
                        gap="29px" 
                        sx={{ mb: 2 }}
                      >
                        <Box
                          sx={{
                              width: '52px',
                              height: '28px',
                              borderRadius: '8px', // 12*12 corner radius
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #D4D4D4',
                              padding: '6px 8px', // 6px vertical, 8px horizontal
                              gap: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontFamily: 'Work Sans, sans-serif',
                              boxSizing: 'border-box', // ensures padding is included in total size
                              color: '#454545'
                            }}
                          onClick={() => {
                            setSelectedColor(null);
                            if (selectionNoteContent) {
                              setNotes((prevNotes) => {
                                const updated = prevNotes.filter(
                                  (note) => !(note.content === selectionNoteContent && note.section === selectedSection && note.tab === selectedSidebarTab)
                                );
                                localStorage.setItem('highlightedNotes', JSON.stringify(updated));
                                return updated;
                              });
                              const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false);
                              let node;
                              while ((node = walker.nextNode())) {
                                if (
                                  node.tagName === 'SPAN' &&
                                  node.textContent === selectionNoteContent
                                ) {
                                  const textNode = document.createTextNode(selectionNoteContent);
                                  node.parentNode.replaceChild(textNode, node);
                                  break;
                                }
                              }
                            }
                            setIsSelectionDialogOpen(false);
                            setSelectionNoteContent('');
                          }}
                        >
                          <Typography fontSize={12} color="#454545" borderColor={'#D4D4D4'} fontFamily={ 'Work Sans, sans-serif'}>
                            NONE
                          </Typography>
                        </Box>
    
                        {['#b84d84', '#67BC46', '#F89B1B', '#009FDA'].map((colorOption) => {
                          const normalizedColorOption = colorOption.toLowerCase().trim();
                          const normalizedSectionColor = sectionColor.toLowerCase().trim();
    
                          const isSectionColor = normalizedColorOption === normalizedSectionColor;
                          const isSelected = selectedColor && selectedColor.toLowerCase().trim() === normalizedColorOption;
    
                          console.log('Rendering color option:', colorOption, sectionColor, 'isSelected:', isSelected, 'isSectionColor:', isSectionColor);
    
                          return (
                            <Box
                          key={colorOption}
                          sx={{
                            width: 27,
                            height: 27,
                            borderRadius: '6px',
                            border: isSelected
                              ? '3px solid black'
                              : isSectionColor
                              ? `3px solid ${sectionColor}`
                              : 'none',
                            cursor: 'pointer',
                            boxSizing: 'border-box',
                            backgroundColor: 'white', // white gap between border and inner box
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: (isSelected || isSectionColor) ? '2px' : 0, // gap only if border exists
                          }}
                          onClick={() => handleSelectionColor(colorOption)}
                        >
                            <Box
                            sx={{
                              width: (isSelected || isSectionColor) ? 17 : 27,
                              height: (isSelected || isSectionColor) ? 17 : 27,
                              borderRadius: '2px',
                              backgroundColor: colorOption,
                            }}
                          />
                            </Box>
                          );
                        })}
                      </Box>
                      
                    )}
                    
                    {highlights.length > 0 && (
                      <Box mt={2}>
                        {highlights
                          .filter(h => h.section === selectedSection && h.tab === selectedSidebarTab)
                          .map((highlight, index) => (
                            <Typography
                              key={index}
                              sx={{
                                backgroundColor: hexToRgba(highlight.color, 0.24),
                                borderRadius: '4px',
                                padding: '2px 4px',
                                display: 'inline-block',
                                marginBottom: '4px',
                              }}
                            >
                              {highlight.text}
                            </Typography>
                          ))}
                      </Box>
                    )}
                    {popupTabValue === 1 && (
                      
                      <TakeNoteDialog
                  isDialogOpen={isSelectionDialogOpen}
                  isExpanded={isExpanded}
                  draggableRef={draggableRef}
                  setIsDialogOpen={setIsSelectionDialogOpen}
                  setIsExpanded={setIsExpanded}
                  highlights={highlights}
                  selectedSection={selectedSection}
                  selectedSidebarTab={selectedSidebarTab}
                  noteContent={noteContent}
                  setNoteContent={setNoteContent}
                  handleSaveNote={handleSaveNote}
                  expandIcon={expandIcon}
                  collapseIcon={collapseIcon}
                  Tiptap={Tiptap}
                  hexToRgba={hexToRgba}
                />
                    )}
                  </Box>
                  
                </Paper>
              </Paper>
            </Draggable>
            </ClickAwayListener>
  );
};

export default HighlightDialog;
