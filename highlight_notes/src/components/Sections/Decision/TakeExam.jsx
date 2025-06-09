import { useState, useEffect } from 'react'; 
import { Box, Typography, Button, boxClasses } from '@mui/material';
import OpenInNew from '@mui/icons-material/OpenInNew';
import * as XLSX from 'xlsx';

export default function TakeExam({selectedSidebarTab}) {
  const [hasNotesToExport, setHasNotesToExport] = useState(false);
  useEffect(() => {
    try {
      const allNotes = JSON.parse(localStorage.getItem('highlightedNotes') || '[]');
      const filteredNotes = allNotes.filter(note => note.note_type !== 'Highlight');
      setHasNotesToExport(filteredNotes.length > 0);
    } catch (error) {
      console.error('Error checking notes:', error);
      setHasNotesToExport(false);
    }
  }, []);
  // Helper function to extract text from HTML and handle images
  const processNoteContent = (html) => {
    if (!html) return '';
    
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Replace images with [Image] placeholder
    const images = tempDiv.getElementsByTagName('img');
    while (images[0]) {
      const img = images[0];
      const altText = img.alt ? ` [Image: ${img.alt}] ` : ' [Image] ';
      const textNode = document.createTextNode(altText);
      img.parentNode.replaceChild(textNode, img);
    }
    
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const exportLocalStorageToExcel = () => {
    try {
      // Get all notes from localStorage
      const allNotes = JSON.parse(localStorage.getItem('highlightedNotes') || '[]');
      
      // Filter out notes with note_type 'Highlight'
      const filteredNotes = allNotes.filter(note => note.note_type !== 'Highlight');
      setHasNotesToExport(filteredNotes.length > 0);
      
      if (filteredNotes.length === 0) {
        alert('No valid notes found to export. Notes with type "Highlight" are excluded.');
        return;
      }
      
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      
      // Helper function to format notes for Excel
      const formatNotes = (notes) => {
        return notes.map((note, index) => ({
          'Note ID': index + 1,
          'Type': note.note_type || 'Note',
          'Content': processNoteContent(note.content) || '',
          'Section': note.section || 'N/A',
          'Tab': note.tab || 'N/A',
          'Created At': note.timestamp 
            ? new Date(note.timestamp).toLocaleString()
            : 'N/A',
          'Highlighted Text': note.highlightedText ? `"${note.highlightedText.replace(/"/g, '""')}"` : 'N/A'
        }));
      };
      
      // Create a single sheet with filtered notes
      const formattedNotes = formatNotes(filteredNotes);
      const ws = XLSX.utils.json_to_sheet(formattedNotes);
      
      // Set column widths and enable text wrapping
      const colWidths = [
        { wch: 8 },   // Note ID
        { wch: 15 },  // Type
        { wch: 60 },  // Content (wider for better readability)
        { wch: 20 },  // Section
        { wch: 20 },  // Tab
        { wch: 25 },  // Created At
        { wch: 60 }   // Highlighted Text (wider for better readability)
      ];
      
      // Enable text wrapping for content and highlighted text columns
      const wrapStyle = { alignment: { wrapText: true } };
      const range = XLSX.utils.decode_range(ws['!ref']);
      
      // Apply wrap style to content and highlighted text columns (C and G)
      for (let R = range.s.r; R <= range.e.r; ++R) {
        const contentCell = ws[XLSX.utils.encode_cell({r: R, c: 2})]; // Column C (Content)
        const highlightCell = ws[XLSX.utils.encode_cell({r: R, c: 6})]; // Column G (Highlighted Text)
        
        if (contentCell) contentCell.s = { ...contentCell.s, ...wrapStyle };
        if (highlightCell) highlightCell.s = { ...highlightCell.s, ...wrapStyle };
      }
      
      ws['!cols'] = colWidths;
      
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Notes');
      
      // Generate Excel file and trigger download
      const fileName = `Notes_Export_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(wb, fileName);
      
    } catch (error) {
      console.error('Error exporting notes:', error);
      alert('An error occurred while exporting notes. Please try again.');
    }
  };


  return (
    <Box component="main" role="main" aria-labelledby="take exam heading" tabIndex={0}>
      <Typography component="h2" variant="body1" sx={{
        letterSpacing: 0, 
        fontWeight: '600', 
        fontFamily: 'Work Sans, sans-serif', 
        mb: 1, 
        mt: 0,
        fontSize: '1.125rem', 
        color: '#22242C'  
      }}>
        {selectedSidebarTab}
      </Typography>
      <Box sx={{
        minHeight: 400,
        height: 400,
        width: 725,
        overflowY: 'auto',
        borderRadius: 1,
      }}
      aria-label="Instructions for the exam decision activity"
      >
        <Typography variant="subtitle1" component="div" sx={{
          letterSpacing: 0, 
          fontFamily: 'Work Sans, sans-serif',
          marginTop: 1, 
          marginBottom: 0,
          fontWeight:400,
          color: '#22242C', 
          fontSize: '1rem',lineHeight: '24px',
          paddingRight: 10,
        }}>
          {/* <Typography component="h3" sx={{ 
            fontWeight: 600,
            letterSpacing: 0,
            fontFamily: 'Work Sans, sans-serif',
            marginBottom: 1 
          }}>
            Decision Prompt
          </Typography> */}
          <p style={{marginTop: 0, fontWeight: 400}}>
            Now that you&#8217;ve consulted the research and reviewed the evidence, you will complete an assessment that will help you synthesize what you&#8217;ve learned and make a decision [insert content-specific information here].</p>

<p style={{marginTop: '43px', marginBottom:0,fontWeight: 400}}>Remember, you can export a copy of the notes you&#8217;ve taken and refer to them at any time during the assessment.
          </p>
          
          {/* Add Export Button */}
          <Box sx={{ mt: 2, mb: 3,width:206,
                      height:40,boxSizing:'border-box'
                    }}>
            <Button 
              variant="contained" 
              onClick={exportLocalStorageToExcel}
              sx={{
                backgroundColor: '#009FDA',
                '&:hover': {
                  backgroundColor: '#0088c1' 
                },
                fontFamily: 'Work Sans, sans-serif',
                textTransform: 'none',
                '&:active': {
                  backgroundColor: hasNotesToExport ? '#0073a3' : '#cccccc'
                },
                fontSize:'16px',
                p:0.5,
                width:206,
                height:40
              }}
            >
              EXPORT MY NOTES 
              <Box component="span" sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                  transform="scale(1.2) translate(1 1)"
                  d="M15 16H3C2.45 16 2 15.55 2 15V3C2 2.45 2.45 2 3 2H8C8.55 2 9 1.55 9 1C9 0.45 8.55 0 8 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V10C18 9.45 17.55 9 17 9C16.45 9 16 9.45 16 10V15C16 15.55 15.55 16 15 16ZM11 1C11 1.55 11.45 2 12 2H14.59L5.46 11.13C5.07 11.52 5.07 12.15 5.46 12.54C5.85 12.93 6.48 12.93 6.87 12.54L16 3.41V6C16 6.55 16.45 7 17 7C17.55 7 18 6.55 18 6V1C18 0.45 17.55 0 17 0H12C11.45 0 11 0.45 11 1Z" fill="white"/>
                </svg>
              </Box>
            </Button>
          </Box>

          {/* <Typography component="h3" sx={{ 
            fontWeight: 600,
            letterSpacing: 0,
            fontFamily: 'Work Sans, sans-serif', 
            marginBottom: 1 
          }}>
            Make a Decision
          </Typography> */}
        </Typography>
      </Box>
    </Box>
  );
}