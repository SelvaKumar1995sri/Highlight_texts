import React, { useEffect } from 'react';
import './Footer.css';

const sectionOrder = ['instruction', 'research', 'evidence', 'decision'];

const stateStyles = {
  instruction: {
    initial: { background: '#454545', color: '#BD6697' },
    viewed: { background: '#BD6697', color: '#BD6697' },
    active: { background: '#BD6697', color: '#fff' },
    hover: { background: '#742451', color: '#fff' },
  },
  research: {
    initial: { background: '#454545', color: '#67BC46' },
    viewed: { background: '#67BC46', color: '#67BC46' },
    active: { background: '#67BC46', color: '#fff' },
    hover: { background: '#2B6B1B', color: '#fff' },
  },
  evidence: {
    initial: { background: '#454545', color: '#F89B1B' },
    viewed: { background: '#F89B1B', color: '#F89B1B' },
    active: { background: '#F89B1B', color: '#fff' },
    hover: { background: '#C25700', color: '#fff' },
  },
  decision: {
    initial: { background: '#454545', color: '#009FDA' },
    viewed: { background: '#009FDA', color: '#009FDA' },
    active: { background: '#009FDA', color: '#fff' },
    hover: { background: '#005B7F', color: '#fff' },
  },
};

const Footer = ({
  onSectionSelect,
  selectedSection,
  sidebarCompletionStatus,
  isVideoCompleted,
  viewedSections,
  setViewedSections,
}) => {
//   useEffect(() => {
//   // Only reset viewed sections and select the instruction section if resetTrigger changes
//   setViewedSections((prev) => {
//     if (Object.keys(prev).length === 0) {
//       return {}; // Avoid unnecessary updates
//     }
//     return prev;
//   });

//   if (selectedSection !== 'instruction') {
//     onSectionSelect('instruction');
//   }
// }, []); //resetTrigger  

  useEffect(() => {
    if (selectedSection) {
      setViewedSections((prev) => ({
        ...prev,
        [selectedSection]: true,
      }));
    }
  }, [selectedSection, setViewedSections]);

  useEffect(() => {
  // Auto mark previous section viewed if completed in sidebarCompletionStatus
  sectionOrder.forEach((key, idx) => {
    if (idx === 0) return; // skip first

    const prevKey = sectionOrder[idx - 1];
    if (
      sidebarCompletionStatus[prevKey] &&
      !viewedSections[prevKey]
    ) {
      setViewedSections((prev) => ({
        ...prev,
        [prevKey]: true,
      }));
    }
  });
}, [sidebarCompletionStatus, viewedSections, setViewedSections]);

  const isSectionEnabled = (key) => {
    if (key === 'instruction') return true;

    const index = sectionOrder.indexOf(key);
    const previousKey = sectionOrder[index - 1];
    console.log( "heloooo",sidebarCompletionStatus,sidebarCompletionStatus[key]);
    // Check if previous section is completed and viewed
    const prevViewed = viewedSections[previousKey];
    const prevCompleted = sidebarCompletionStatus[previousKey];

    // Special case: if previous section is 'instruction', also require video completion
    if (previousKey === 'instruction' && !isVideoCompleted) {
      return false;
    }

    // Return true only if previous section is both viewed and marked completed in sidebar
    return prevViewed && prevCompleted;
  };

  const handleImageClick = (key, isEnabled) => {
    console.log('Clicking', key, 'Enabled:', isEnabled);
    if (!isEnabled || key === selectedSection) return;

    // Sections after the clicked one (always reset them)
    // const afterSections = sectionOrder.slice(targetIndex + 1);

    // If going backward, reset from target to current
    // const backwardSections =
    //   targetIndex < currentIndex
    //     ? sectionOrder.slice(targetIndex, currentIndex + 1)
    //     : [];

    // Combine and dedupe
    // const resetSections = Array.from(new Set([...afterSections, ...backwardSections]));

    // 1. Reset viewed sections immediately
    // setViewedSections((prev) => {
    //   const updated = { ...prev };
      // resetSections.forEach((section) => {
      //   updated[section] = false;
      // });
    //   return updated;
    // });

    // 2. Reset sidebar state
    // if (onResetSidebarTabsAfterSection) {
    //   resetSections.forEach((section) => {
    //     onResetSidebarTabsAfterSection(section);
    //   });
    // }

    // 3. Reset video if needed
    // if (key === 'instruction') {
    //   resetVideoCompleted();
    // }

    // 4. Now switch to the section AFTER resets
    onSectionSelect(key);

    // if (onSectionSidebarTabSelect) {
    //   onSectionSidebarTabSelect(key);
    // }
    // onSectionSelect(key);
};

  const getSectionButton = (key, label, positionStyle) => {
    const isActive = selectedSection === key;
    const isViewed = viewedSections[key];
    const isEnabled = isSectionEnabled(key);
    let state = 'initial';
    if (isActive) state = 'active';
    else if (isViewed) state = 'viewed';

    let radioIcon = null;
    if (isActive) {
      radioIcon = (
        <span style={{ display: 'flex', alignItems: 'center', marginRight: 12 }}>
          <svg width="16" height="16" viewBox="0 0 22 22">
            <circle cx="11" cy="11" r="8" stroke={stateStyles[key].viewed.color}  strokeWidth="6" fill="#fff" />
          </svg>
        </span>
      );
    } else if (isViewed) {
      radioIcon = (
        <span style={{ display: 'flex', alignItems: 'center', marginRight: 12 }}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM6.4 12L2.4 8L3.528 6.872L6.4 9.736L12.472 3.664L13.6 4.8L6.4 12Z"
          fill="#34C759"
        />
      </svg>
    </span>
      );
    } else {
      radioIcon = (
        <span style={{ display: 'flex', alignItems: 'center', marginRight: 12 }}>
          <svg width="16" height="16" viewBox="0 0 22 22">
            <circle cx="11" cy="11" r="10" fill="#BDBDBD" />
          </svg>
        </span>
      );
    }

    let buttonBg = '#FFFFFF';
    if (isActive) {
      if (key === 'instruction') buttonBg = '#BD66971A';
      else if (key === 'research') buttonBg = '#67BC461A';
      else if (key === 'evidence') buttonBg = '#F89B1B1A';
      else if (key === 'decision') buttonBg = '#009FDA1A';
    } else if (isViewed) {
      buttonBg = '#FFFFFF';
    }

    const sectionIcons = {
      instruction: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 5V14H14V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H15L21 15V5C21 3.9 20.1 3 19 3ZM12 14H7V12H12V14ZM17 10H7V8H17V10Z"
            fill="#454545"
          />
        </svg>
      ),
      research: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.17 5L19 9.83V19H5V5H14.17ZM14.17 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9.83C21 9.3 20.79 8.79 20.41 8.42L15.58 3.59C15.21 3.21 14.7 3 14.17 3ZM7 15H17V17H7V15ZM7 11H17V13H7V11ZM7 7H14V9H7V7Z"
            fill="#454545"
          />
        </svg>
      ),
     evidence: (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      transform="scale(1.2) translate(1 1)"  // tweak this as needed
      d="M5 3.5H0V1.5H5V3.5ZM5 6.5H0V8.5H5V6.5ZM18.59 13.5L14.76 9.67C13.96 10.19 13.02 10.5 12 10.5C9.24 10.5 7 8.26 7 5.5C7 2.74 9.24 0.5 12 0.5C14.76 0.5 17 2.74 17 5.5C17 6.52 16.69 7.46 16.17 8.25L20 12.09L18.59 13.5ZM15 5.5C15 3.85 13.65 2.5 12 2.5C10.35 2.5 9 3.85 9 5.5C9 7.15 10.35 8.5 12 8.5C13.65 8.5 15 7.15 15 5.5ZM0 13.5H10V11.5H0V13.5Z"
      fill="#454545"
    />
  </svg>
),
      decision: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21ZM12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2ZM14.85 13.1L14 13.7V16H10V13.7L9.15 13.1C7.8 12.16 7 10.63 7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 10.63 16.2 12.16 14.85 13.1Z"
            fill="#454545"
          />
        </svg>
      ),
    };
    const viewedLabel =
      (key === 'instruction' && isVideoCompleted) ||
      (['research', 'evidence', 'decision'].includes(key) && sidebarCompletionStatus[key]) ? (
        <span style={{ fontStyle: 'italic', marginLeft: '5px', color: '#1E1E1E' }}>
          Viewed
        </span>
      ) : null;

    return (
      <button
        key={key}
        style={{
          ...positionStyle,
          background: buttonBg,
          border: 'none',
          outline: 'none',
          fontFamily: 'Work Sans, sans-serif',
          fontWeight: isActive ? 700 : 400,
          fontSize: '1rem',
          cursor: isEnabled ? 'pointer' : 'default',
          opacity: 1,
          transition: 'background 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          paddingLeft: 18,
        }}
        onClick={() => handleImageClick(key, isEnabled)}
        onMouseOver={(e) => {
          if (isEnabled) {
            e.currentTarget.style.background = '#F5F5F5';
          }
        }}
        onMouseOut={(e) => {
          if (isEnabled) {
            e.currentTarget.style.background = buttonBg;
          }
        }}
        disabled={!isEnabled}
        aria-label={`${label}`}
        tabIndex={isEnabled ? 0 : -1}
      >
        <span
          className="footer-top-bar"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 12,
            background: stateStyles[key].viewed.background,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            transition: 'background 0.2s',
          }}
        />
        {radioIcon}
        <span style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
          {sectionIcons[key]}
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginRight: 8,
            justifyContent: 'center',
            height: '84px',
          }}
        >
          {key === 'research' && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px', // Add gap between "Artifacts" and the main text
                fontSize: '12px', // Set font size to 14px
                width: '149px', // Set width to 149px
                height: '24px', // Set height to 24px
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: '#707070', // Default color
                fontWeight: 400,
              }}
            >
              {'Artifacts I'}
              {viewedLabel}
            </span>
          )}
          {key === 'evidence' && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px', // Add gap between "Artifacts" and the main text
                fontSize: '12px', // Set font size to 14px
                width: '149px', // Set width to 149px
                height: '24px', // Set height to 24px
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: '#707070', // Default color
                fontWeight: 400,
              }}
            >
              {'Artifacts II'}
              {viewedLabel}
            </span>
          )}
          {key === 'decision' && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px', // Add gap between "Artifacts" and the main text
                fontSize: '12px', // Set font size to 14px
                width: '149px', // Set width to 149px
                height: '24px', // Set height to 24px
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: '#707070', // Default color
                fontWeight: 400,
              }}
            >
              {'Last'}
              {viewedLabel}
            </span>
          )}
          {key === 'instruction' && (
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '12px',
                color: '#1E1E1E',
                marginBottom: 0,
                display: 'flex',
                alignItems: 'center',
                gap: viewedLabel ? '24px' : '0px',
                width: viewedLabel ? '149px' : 'auto',
                height: viewedLabel ? '24px' : 'auto',
              }}
            >
              {viewedLabel}
            </span>
          )}
          <span
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: 200,
              display: 'block',
              fontSize:  14,
              fontWeight: isActive ? 700 : 400,
              lineHeight: '24px',
              letterSpacing: 0.1,
              color: '#454545', 
            }}
          >
            {label}
          </span>
        </div>
      </button>
    );
  };

  return (
    <footer
      style={{
        left: 0,
        bottom: 0,
        width: '1024px',
        height: '84px',
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: '1024px',
          height: '84px',
          padding: 0,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {getSectionButton('instruction', 'Instructions', {
          width: '237px',
          height: '84px',
          borderRadius: 0,
        })}
        {getSectionButton('research', 'Consult the Research', {
          width: '275px',
          height: '84px',
          borderRadius: 0,
        })}
        {getSectionButton('evidence', 'Investigate the Evidence', {
          width: '275px',
          height: '84px',
          borderRadius: 0,
        })}
        {getSectionButton('decision', 'Make a Decision', {
          width: '237px',
          height: '84px',
          borderRadius: 0,
        })}
      </div>
    </footer>
  );
};

export default Footer;
