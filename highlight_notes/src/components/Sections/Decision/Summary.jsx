import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Summary({ selectedSidebarTab }) {
  return (
    <Box component="main" role="main" aria-labelledby="Summary" tabIndex={0}>
     {/* <Typography sx={{
        textTransform: 'capitalize', fontWeight: '600', fontSize: '1.125rem', fontFamily: 'Work Sans, sans-serif', letterSpacing: 0,
        marginBottom: 2,
      }}>
        {selectedSidebarTab}
      </Typography> */}
      <Typography component="h3" sx={{ 
            fontWeight: 600,
            letterSpacing: 0,
            fontFamily: 'Work Sans, sans-serif',
            marginBottom: 1 ,
            fontSize: '18px',
            color:'#22242C'
          }}>
            {selectedSidebarTab}
          </Typography>
            <p style={{marginTop: 0,marginBottom: '10px', fontWeight: 400,fontFamily: 'Work Sans, sans-serif',}}>It&#8217;s time for you to make a decision about what you think would be best for Dana in these circumstances. When you are ready to answer, continue to the Make a Decision activity. If you'd like to go back and review the research and evidence in the case, you may go back and review those tabs.</p>
            <p style={{marginTop: 0, fontWeight: 400, fontFamily: 'Work Sans, sans-serif',}}>Which area is most important for Dana&#8217;s parents to address to promote her adjustment?</p>
      {/* <Typography component="h3" sx={{ 
            fontWeight: 600,
            letterSpacing: 0,
            fontFamily: 'Work Sans, sans-serif', 
            marginBottom: 1 
          }}>
            Make a Decision
          </Typography>
<p style={{marginTop: 0, fontWeight: 400}}>Ready to Make a Decision? Take a look at the questions below. When you are ready, answer them in the field provided.</p> */}
      {/* <Box sx={{ minHeight: 400, height: 400, width: 725, overflowY: 'auto', borderRadius: 1 }}>
        <Typography aria-labelledby="Summary content yet to Receive" variant="subtitle1" component="div" sx={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: 0, lineHeight:'150%' }}>[Summary content Yet to Receive.]</Typography>
      </Box> */}
    </Box>
  );
}
