import { useCallback, useEffect, useState, useRef } from 'react';
import Footer from './components/Layout/footer';
import TeacherInterviewSection from './components/Sections/Evidence/TeacherInterview';
import AdviceSection from './components/Layout/AdviceBox';
import {
  Box,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import Sidebar from './components/Layout/Sidebar';
import ParentingTime from './components/Sections/Research/ParentingTime';
import ParentalConflict from './components/Sections/Research/ParentalConflict';
import SocioeconomicStatus from './components/Sections/Research/SocioeconomicStatus';
import CustodyForm from './components/Sections/Evidence/CustodyForm';
import VoicemailMessages from './components/Sections/Evidence/VoicemailMessages';
import CrayonDrawing from './components/Sections/Evidence/CrayonDrawing';
import Summary from './components/Sections/Decision/Summary';
import Instruction from './components/Sections/Instruction/Instruction';
import TakeExam from './components/Sections/Decision/TakeExam';
import NavigationControls from './components/NavigationControls/NavigationControls';

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
    color: '#F89B1B',
    tabs: ['Child Custody Form', 'Teacher Interview', "Child's Crayon Drawing", 'Voicemail Messages'],
  },
  decision: {
    color: '#009FDA',
    tabs: ['Summary', 'Make a Decision'],
  },
};

const tabAdviceMap = {
  'Parent Conflict': 'These are the factors you will consider when you Investigate the Evidence about the areas that are important for parents to address post divorce.',
  'Parenting Time': 'These are the factors you will consider when you Investigate the Evidence about the areas that are important for parents to address post divorce.',
  'Socioeconomic Status': 'These are the factors you will consider when you Investigate the Evidence about the areas that are important for parents to address post divorce.',
  'Child Custody Form': 'Look for evidence around the amount of time Dana spends with each parent.',
  'Teacher Interview': 'Look for evidence about how Dana is settling into her new school.',
  "Child's Crayon Drawing": 'Look for evidence around how Dana perceives her family.',
  'Voicemail Messages': 'Look for evidence around how each parent feels Dana is adjusting.',
  'Make a Decision': 'Yet to get advice content.',
  'Instructions': 'Yet to get advice content.',
};

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSection, setSelectedSection] = useState('instruction');
  const [showAdviceBox, setShowAdviceBox] = useState(false);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [selectedSidebarTab, setSelectedSidebarTab] = useState(regionConfig['instruction'].tabs[0]);
  const adviceButtonRef = useRef(null);
  const [adviceBoxPosition, setAdviceBoxPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
  if (selectedSection) {
    // const url = new URL(window.location);
    // url.searchParams.set('section', selectedSection);
    // window.history.pushState({}, '', url);

    const sectionTitleMap = {
      instruction: 'Instruction',
      research: 'Research',
      evidence: 'Evidence',
      decision: 'Decision',
    };

    const prettyTitle = sectionTitleMap[selectedSection] || 'Investigate Development';

    if (selectedSection === 'instruction') {
      document.title = 'Instruction - Child Post Divorce Adjustment';
    } else {
      document.title = `${prettyTitle} - Child Post Divorce Adjustment`;
    }
  }
}, []);

  const handleSectionSidebarTabSelect = (section) => {
    setSidebarTabState(prev => {
      const prevSection = selectedSection;
      if (prevSection && prevSection !== section) {
        const prevTabs = regionConfig[prevSection].tabs;
        const prevActiveTab = selectedSidebarTab;
        if (prevTabs.includes(prevActiveTab)) {
          return {
            ...prev,
            [prevSection]: { ...prev[prevSection], [prevActiveTab]: true },
          };
        }
      }
      return prev;
    });
    setSelectedSidebarTab(regionConfig[section].tabs[0]);
  };

  const { color, tabs } = regionConfig[selectedSection];
  const [resetTrigger, setResetTrigger] = useState(0);
  const [viewedSections, setViewedSections] = useState({});


  // Memoized function to update the selected section
  const onSectionSelect = useCallback((section) => {
    setSelectedSection(section);
  }, []);

  const [visitedSidebars, setVisitedSidebars] = useState({
    instruction: false,
    research: false,
    evidence: false,
    decision: false,
  });

  const [sidebarTabState, setSidebarTabState] = useState({
    instruction: { Instructions: true },
    research: { 'Parent Conflict': false, 'Parenting Time': false, 'Socioeconomic Status': false },
    evidence: { 'Child Custody Form': false, 'Teacher Interview': false, "Child's Crayon Drawing": false, 'Voicemail Messages': false },
    decision: { Notes: false },
  });

  const currentViewedTabs = sidebarTabState[selectedSection] || {};

  const handleScriptClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleScriptClose = () => {
    setAnchorEl(null);
  };

  const handleToggleAdviceBox = () => {
    if (!showAdviceBox && adviceButtonRef.current) {
      const rect = adviceButtonRef.current.getBoundingClientRect();
      setAdviceBoxPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setShowAdviceBox((prev) => !prev);
  };

  const handleSidebarVisited = useCallback((sectionKey) => {
    setVisitedSidebars(prev => ({
      ...prev,
      [sectionKey]: true
    }));
  }, []);

  const resetVideoCompleted = () => {
    setIsVideoCompleted(false);
  };

  const markSectionVisited = (section) => {
    setVisitedSidebars(prev => ({
      ...prev,
      [section]: true,
    }));
  };

  const regionColorMap = {
    instruction: {
      borderColor: '#BD6697',
      backgroundColor: '#f8eef4',
      textColor: '#BD6697',
    },
    research: {
      borderColor: '#67BC46',
      backgroundColor: '#e7f4e7',
      textColor: '#67BC46',
    },
    evidence: {
      borderColor: '#F89B1B',
      backgroundColor: '#f9efe6',
      textColor: '#F89B1B',
    },
    decision: {
      borderColor: '#009FDA',
      backgroundColor: '#0071DB',
      textColor: '#009FDA',
    },
  };

  const sectionOrder = ['instruction', 'research', 'evidence', 'decision'];
  const currentRegion = regionColorMap[selectedSection || 'instruction'];

  const resetViewedSectionsAfter = (key) => {
    const index = sectionOrder.indexOf(key);
    const resetSections = sectionOrder.slice(index + 1);

    setViewedSections(prev => {
      const updated = { ...prev };
      resetSections.forEach(section => {
        updated[section] = false;
      });
      return updated;
    });
  };

  const handleSidebarTabSelect = (tab) => {
    setSelectedSidebarTab(tab);
    setSidebarTabState(prev => {
      const sectionTabs = prev[selectedSection] || {};
      return {
        ...prev,
        [selectedSection]: { ...sectionTabs, [tab]: true },
      };
    });
  };

  const resetSidebarTabs = (section) => {
    const sectionTabs = regionConfig[section].tabs; // Get all tabs for the section
    const resetTabs = {};
    sectionTabs.forEach((tab) => {
      resetTabs[tab] = false; // Reset all tabs to unchecked
    });
    setSidebarTabState((prev) => ({
      ...prev,
      [section]: resetTabs, // Update the state for the given section
    }));
  };

  const resetSidebarTabsAfterSection = (sectionKey) => {
    const index = sectionOrder.indexOf(sectionKey);
    const resetSections = sectionOrder.slice(index + 1);
    resetSections.forEach(resetSidebarTabs);
  };

  const handleSectionChange = (newSection) => {
  // Reset sidebar tabs for sections after the new section
  // resetSidebarTabsAfterSection(newSection);

  // Update the selected section
  setSelectedSection(newSection);

  // Reset the sidebar tab for the new section to its default
  setSelectedSidebarTab(regionConfig[newSection].tabs[0]);
};


// const handleNavigation = (direction) => {
//   const currentSectionIdx = sectionOrder.indexOf(selectedSection);
//   const currentTabIdx = tabs.indexOf(selectedSidebarTab);

//   if (direction === 'back') {
//     if (currentTabIdx > 0) {
//       // Navigate to the previous tab in the current section
//       const prevTab = tabs[currentTabIdx - 1];
//       setSelectedSidebarTab(prevTab);
//       setSidebarTabState((prev) => ({
//         ...prev,
//         [selectedSection]: { ...prev[selectedSection], [prevTab]: true },
//       }));
//     } else if (currentTabIdx === 0 && currentSectionIdx > 0) {
//       // Reset the current section's sidebar tabs
//       resetSidebarTabs(selectedSection);

//       // Reset the current section's viewed status
//       setViewedSections((prev) => ({
//         ...prev,
//         [selectedSection]: false,
//       }));

//       // Navigate to the previous section and select its last tab
//       const prevSection = sectionOrder[currentSectionIdx - 1];
//       const prevTabs = regionConfig[prevSection].tabs;
//       // const lastTab = prevTabs[prevTabs.length - 1];
//       const firstTab = prevTabs[0];

//       // Reset the previous section's sidebar tabs
//       resetSidebarTabs(prevSection);

//       setSelectedSection(prevSection);
//       setSelectedSidebarTab(firstTab);
//       setSidebarTabState((prev) => ({
//         ...prev,
//         [prevSection]: { ...prev[prevSection], [firstTab]: true },
//       }));
//     }
//   } else if (direction === 'next') {
//     if (currentTabIdx < tabs.length - 1) {
//       // Navigate to the next tab in the current section
//       const nextTab = tabs[currentTabIdx + 1];
//       setSelectedSidebarTab(nextTab);
//       setSidebarTabState((prev) => ({
//         ...prev,
//         [selectedSection]: { ...prev[selectedSection], [nextTab]: true },
//       }));
//     } else if (currentTabIdx === tabs.length - 1 && currentSectionIdx < sectionOrder.length - 1) {
//       // Reset the current section's sidebar tabs
//       resetSidebarTabs(selectedSection);

//       // Mark the current section as viewed
//       setViewedSections((prev) => ({
//         ...prev,
//         [selectedSection]: true,
//       }));

//       // Navigate to the next section and select its first tab
//       const nextSection = sectionOrder[currentSectionIdx + 1];
//       const firstTab = regionConfig[nextSection].tabs[0];

//       setSelectedSection(nextSection);
//       setSelectedSidebarTab(firstTab);
//       setSidebarTabState((prev) => ({
//         ...prev,
//         [nextSection]: { ...prev[nextSection], [firstTab]: true },
//       }));
//     }
//   }
// };

  return (
    <div className="flex flex-col h-screen w-full" style={{ minWidth: 1024, minHeight: 703, maxWidth: 1024, maxHeight: 703, width: 1024, height: 703, margin: '0 auto', position: 'relative' }}>
      <Box sx={{ p: 2, fontFamily: 'Work Sans, sans-serif', height: 703, minHeight: 703, minWidth: 1024, maxWidth: 1024, width: 1024, boxSizing: 'border-box', pb: '84px' }}>
        <Box position="relative" display="flex" alignItems="center" sx={{ borderBottom: '1px solid #D4D4D4', width: 1024, maxWidth: 1024, minWidth: 1024, height: 72 }}>
          <Typography variant="h1" sx={{ fontSize:  '1.125rem',fontWeight:500 ,fontFamily: 'Work Sans, sans-serif', 
            pl: 2, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',color: '#22242C',
            letterSpacing: 0 }}
            tabIndex={0}
            aria-label="Page title"
          >

            Investigate Development: Post Divorce Adjustment
          </Typography>
          <AdviceSection
            selectedSidebarTab={selectedSidebarTab}
            currentRegion={currentRegion}
            tabAdviceMap={tabAdviceMap}
            adviceBoxPosition={adviceBoxPosition}
            showAdviceBox={showAdviceBox}
            handleToggleAdviceBox={handleToggleAdviceBox}
            adviceButtonRef={adviceButtonRef}
            sectionKey = {selectedSection}
          /> 
        </Box>

        <Grid container spacing={1} mt={2} ml={1} sx={{ height: 531, minHeight: 400, maxWidth: 1024, width: 1024 }}>
          <Sidebar
            tabs={tabs}
            color={color}
            sectionKey={selectedSection}
            onSidebarVisited={handleSidebarVisited}
            onTabSelect={handleSidebarTabSelect}
            activeTab={selectedSidebarTab}
            viewedTabs={currentViewedTabs}
            setViewedTabs={tabsObj => setSidebarTabState(prev => ({ ...prev, [selectedSection]: tabsObj }))}
          />

          <Grid item xs={0} sx={{ width: 740, height: 480, minHeight: 400 }}>
            <Paper
              elevation={2}
              sx={{
                width: 740,
                minWidth: 320,
                maxWidth: 754,
                height: selectedSection === 'instruction' ? 521 : 458,
                minHeight: 400,
                boxShadow: 'none',
                border: `1px solid #D4D4D4`,
              }}
            >
              <Box id="main-content" sx={{ p: 2, minHeight: 458, 
                height: 420, width: 740, maxWidth: 754, 
                boxSizing: 'border-box' }}>
                {selectedSection === 'instruction' && (
                      <Instruction 
                        selectedSidebarTab={selectedSidebarTab}
                        anchorEl={anchorEl}
                        handleScriptClick={handleScriptClick}
                        handleScriptClose={handleScriptClose}
                        isVideoCompleted={isVideoCompleted}
                        setIsVideoCompleted={setIsVideoCompleted}
                        setSelectedSection={setSelectedSection}
                        setSelectedSidebarTab={setSelectedSidebarTab}
                        regionConfig={regionConfig}
                      />
                      
                    )}
              </Box>
            </Paper>
            <NavigationControls 
              // onNavigate={handleNavigation}
              onSectionSelect={onSectionSelect}
              selectedSection={selectedSection}
              selectedSidebarTab={selectedSidebarTab}
              sectionOrder={sectionOrder}
              regionConfig={regionConfig}
              setSelectedSection={setSelectedSection}
              setSelectedSidebarTab={setSelectedSidebarTab}
              setSidebarTabState={setSidebarTabState}
              setViewedSections={setViewedSections}
              resetViewedSectionsAfter={resetViewedSectionsAfter}
              markSectionVisited={markSectionVisited}
              sidebarCompletionStatus={visitedSidebars}
            />
          </Grid>
        </Grid>

        <Footer
          style={{ position: 'absolute', left: 0, bottom: 0, width: '1024px', padding: 0, margin: 0 }}
          onSectionSelect={handleSectionChange}
          selectedSection={selectedSection}
          resetTrigger={resetTrigger}
          sidebarCompletionStatus={visitedSidebars}
          isVideoCompleted={isVideoCompleted}
          resetVideoCompleted={resetVideoCompleted}
          viewedSections={viewedSections}
          setViewedSections={setViewedSections}
          onSectionSidebarTabSelect={handleSectionSidebarTabSelect}
          onResetSidebarTabsAfterSection={resetSidebarTabsAfterSection}
        />
      </Box>
    </div>  
  );
}

export default App;
