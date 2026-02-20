import React, { useRef, useEffect, useState } from 'react';

function ChecklistIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="14" height="14" rx="2" />
      <path d="M5 8l2 2 4-4" />
    </svg>
  );
}

export default function Sidebar({ sections, activeId, isOpen, onClose, scrollPercent }) {
  const navRef = useRef(null);
  const [trackHeight, setTrackHeight] = useState(0);

  useEffect(() => {
    if (navRef.current) {
      setTrackHeight(navRef.current.offsetHeight);
    }
  }, [sections]);

  const handleClick = (e, section) => {
    e.preventDefault();
    if (section.locked) return;
    const el = document.getElementById(section.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (onClose) onClose();
  };

  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const activeFraction = sections.length > 1
    ? Math.max(0, activeIndex) / (sections.length - 1)
    : 0;
  const dotTop = activeFraction * Math.max(0, trackHeight - 10);
  const fillHeight = (scrollPercent / 100) * trackHeight;

  return (
    <>
      <div
        className={`sidebar-overlay${isOpen ? ' open' : ''}`}
        onClick={onClose}
      />
      <nav className={`sidebar${isOpen ? ' open' : ''}`}>
        <div className="sidebar-label">Design Team</div>
        <ul className="sidebar-nav" ref={navRef}>
          {sections.map((section) => {
            const isActive = activeId === section.id;
            let cls = 'sidebar-nav-item';
            if (isActive && !section.locked) cls += ' active';
            if (section.locked) cls += ' locked';

            return (
              <li key={section.id}>
                <a
                  href={`#${section.locked ? '' : section.id}`}
                  className={cls}
                  onClick={(e) => handleClick(e, section)}
                  tabIndex={section.locked ? -1 : 0}
                >
                  {section.isPrerequisites ? (
                    <span className="sidebar-nav-icon">
                      <ChecklistIcon />
                    </span>
                  ) : (
                    <span className="sidebar-nav-number">{section.number}</span>
                  )}
                  <span className="sidebar-nav-item-content">
                    <span className="sidebar-nav-item-row">
                      <span className="sidebar-nav-text">{section.title}</span>
                      {section.locked && (
                        <span className="sidebar-lock-icon" aria-label="Locked">🔒</span>
                      )}
                    </span>
                    {section.isPrerequisites && (
                      <span className="sidebar-start-label">Start here →</span>
                    )}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-progress">
          <div className="sidebar-progress-track" style={{ height: trackHeight || 0 }}>
            <div className="sidebar-progress-fill" style={{ height: fillHeight }} />
            {activeIndex >= 0 && (
              <div
                className={`sidebar-progress-dot${activeIndex >= 0 ? ' pulsing' : ''}`}
                style={{ top: dotTop }}
              />
            )}
          </div>
          <div className="sidebar-progress-label">
            {Math.round(scrollPercent)}% through
          </div>
        </div>
      </nav>
    </>
  );
}
