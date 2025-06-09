import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import custody_aggrement from '../../../assets/custody_agreement.jpg';

export default function CustodyForm({ selectedSidebarTab }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      role="region"
      aria-labelledby="custody-form-heading"
      sx={{
        minHeight: 400,
        height: 450,
        width: 700,
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        id="custody-form-heading"
        sx={{
          textTransform: 'capitalize',
          fontWeight: 600,
          fontSize: '1.125rem',
          fontFamily: 'Work Sans, sans-serif',
          color: '#22242C',
          letterSpacing: 0,
          marginBottom: 1,
        }}
      >
        {selectedSidebarTab}
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          width: '100%',
          maxHeight: 400,
          pr: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            
          }}
        >
          <img
            src={custody_aggrement}
            alt="Child Custody Form Preview"
            style={{
              maxWidth: '100%',
              height: 'auto',
              marginBottom: 8,
            }}
          />
          <Accordion sx={{ width: '99%' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                height: '28px',
                minHeight: '28px',
                '& .MuiAccordionSummary-content': { my: 0, py: 0 },
              }}
              onClick={() => setExpanded((prev) => !prev)}
            >
              <Typography
                sx={{
                  mb: 0,
                  fontSize: 16,
                  fontFamily: 'Work Sans, sans-serif',
                  textAlign: 'center',
                  width: '100%',
                  color: '#22242C',
                  letterSpacing: 0,
                }}
              >
                {expanded ? 'Hide Plain Text' : 'Show Plain Text'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              role="region"
              aria-labelledby={`transcript-header-Custody_form`}
            >
              <Typography
                sx={{
                  textAlign: 'left',
                  width: '100%',
                  fontSize: '1rem',
                  fontFamily: 'Work Sans, sans-serif',
                  letterSpacing: 0,
                  color: '#22242C',
                  '& p': {
                        margin: 0,            // Remove default p spacing
                        lineHeight: 1.5,      // Optional: control vertical rhythm
                      },
                      '& .spaced': {
                        marginBottom: '1rem', // Custom space between sections
                      },
                }}
              >
                <p>City of New Southborough</p>
                <p>Second District Court</p>
                <p className="spaced" >Parenting Plan and Joint Custody Agreement</p>
                <p>Case number: 64324</p>
                <p className="spaced">Parenting plan (☑) permanent (☐) temporary (☐)</p>
                <p>Child(ren)</p>
                <p>Name(s): Dana Mason</p>
                <p className="spaced">Date of Birth: March 12, 2019</p>
                <p>Mother</p>
                <p>Name(s): Janet Mason</p>
                <p className="spaced">Address: 124 West Street</p>
                <p>Father</p>
                <p>Name(s): Greg Mason</p>
                <p className="spaced">Address: 3762 Central Blvd.</p>
                <p className="spaced">JOINT CUSTODY</p>
                <p className="spaced">We will have joint custody. (☑) Mother or (☐) Father will have primary physical custody or (☐) we will have equally shared physical custody.We understand that joint custody does not necessarily mean equal parenting time.</p>
                <p className="spaced">PARENTING TIME:</p>
                <p>The children will be in the Mother’s care as follows:</p>
                <p className="spaced">Child will be residing with their mother at her apartment, with the exception of every other weekend.</p>
                <p>The children will be in the Father’s care as follows:</p>
                <p className="spaced">Every second weekend, the child will be in the care of the Father (picked up from the Mother’s house at 6 p.m. Friday and returned by 6 p.m. Sunday).</p>
                <p>Signed, Janet Mason and Greg Mason</p>
                <p className="spaced">Date: April 12, 2024</p>
                <p className="spaced">So ordered this 12 day of April, 2024.</p>
                <p>Signed,</p>
                <p>Judge's Signature</p>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
}
