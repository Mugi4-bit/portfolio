import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const filters = ['All Projects', 'Branding', 'Motion', 'Design', 'Development', 'Activation'];

const projects = [
  {
    title: 'Restaurant',
    client: 'Odun Collectives',
    category: 'website',
    image:
      '',
  },
  {
    title: 'gym page',
    client: 'Odun Collectives',
    category: 'website',
    image:
      '',
  },
  {
    title: 'video editing',
    client: 'gremix',
    category: 'video editing',
    image:
      '',
  },
  {
    title: 'thumbnail',
    client: 'opononi',
    category: 'Development',
    image:
      '',
  },
  {
    title: 'cafe',
    client: 'lolita',
    category: 'website',
    image:
      '',
  },
  {
    title: 'eregtei strip',
    client: 'love',
    category: 'Motion',
    image:
      '',
  },
];

const starShapePoints = '372 4 417 183 700 191 466 307 373 660 310 356 0 470 174 278 108 143 291 166';
const innerStarPoints = '371 110 394 236 555 232 401 300 421 397 344 328 219 407 302 283 249 209 342 218';

const starPieces = [
  {
    d: 'M372 4 L417 183 L394 236 L371 110 L342 218 L291 166 Z',
    fill: '#000000',
    tx: '24px',
    ty: '-138px',
    rz: '36deg',
  },
  {
    d: 'M417 183 L700 191 L466 307 L401 300 L555 232 L394 236 Z',
    fill: '#000000',
    tx: '160px',
    ty: '-42px',
    rz: '82deg',
  },
  {
    d: 'M466 307 L373 660 L344 328 L421 397 L401 300 Z',
    fill: '#000000',
    tx: '94px',
    ty: '158px',
    rz: '118deg',
  },
  {
    d: 'M373 660 L310 356 L0 470 L219 407 L344 328 Z',
    fill: '#000000',
    tx: '-98px',
    ty: '142px',
    rz: '-84deg',
  },
  {
    d: 'M0 470 L174 278 L108 143 L249 209 L302 283 L219 407 Z',
    fill: '#000000',
    tx: '-170px',
    ty: '34px',
    rz: '-112deg',
  },
  {
    d: 'M108 143 L291 166 L342 218 L249 209 Z',
    fill: '#000000',
    tx: '-82px',
    ty: '-122px',
    rz: '58deg',
  },
  {
    d: `M${innerStarPoints} Z`,
    fill: '#ffffff',
    tx: '18px',
    ty: '-16px',
    rz: '26deg',
  },
];

const shardPieces = [
  ['42%', '18%', '88px', '154px', '-18deg', '0ms'],
  ['54%', '22%', '46px', '92px', '34deg', '80ms'],
  ['36%', '30%', '38px', '86px', '-42deg', '130ms'],
  ['62%', '36%', '34px', '126px', '-22deg', '20ms'],
  ['39%', '44%', '82px', '112px', '18deg', '180ms'],
  ['51%', '47%', '54px', '134px', '-7deg', '100ms'],
  ['60%', '53%', '74px', '104px', '42deg', '240ms'],
  ['31%', '56%', '40px', '112px', '25deg', '310ms'],
  ['47%', '64%', '96px', '42px', '-13deg', '260ms'],
  ['58%', '69%', '58px', '88px', '19deg', '360ms'],
  ['36%', '71%', '62px', '92px', '-32deg', '430ms'],
  ['67%', '64%', '34px', '68px', '52deg', '480ms'],
  ['44%', '35%', '26px', '54px', '10deg', '520ms'],
  ['52%', '15%', '24px', '42px', '-38deg', '580ms'],
];

function ShardReveal({ active }) {
  return (
    <div className={`shard-reveal ${active ? 'is-active' : ''}`} aria-hidden="true">
      <div className="shard-core" />
      {shardPieces.map(([x, y, width, height, rotate, delay], index) => (
        <span
          className="shard-piece"
          key={`${x}-${y}-${index}`}
          style={{
            '--x': x,
            '--y': y,
            '--w': width,
            '--h': height,
            '--r': rotate,
            '--delay': delay,
          }}
        />
      ))}
    </div>
  );
}

function StarMark({ interactive = false, playing = false, onClick, onHoverChange }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, followX: 0, followY: 0 });

  function handlePointerMove(event) {
    if (!interactive) {
      return;
    }

    onHoverChange?.(true);

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({
      x: x * 26,
      y: y * -22,
      followX: x * 18,
      followY: y * 14,
    });
  }

  return (
    <button
      className={`star-stage ${interactive ? 'is-interactive' : ''} ${playing ? 'is-playing' : ''}`}
      type="button"
      onClick={onClick}
      onPointerEnter={() => onHoverChange?.(true)}
      onPointerLeave={() => onHoverChange?.(false)}
      onPointerMove={handlePointerMove}
      style={{
        '--tilt-x': `${tilt.y}deg`,
        '--tilt-y': `${tilt.x}deg`,
        '--follow-x': `${tilt.followX}px`,
        '--follow-y': `${tilt.followY}px`,
      }}
      aria-label="Play Odun Collectives star animation"
    >
      <span className="star-orbit star-orbit-one" />
      <span className="star-orbit star-orbit-two" />
      <span className="star-orbit star-orbit-three" />
      <svg className="star-svg" viewBox="0 0 700 660" role="img" aria-hidden="true">
        <g className="star-logo">
          <polygon className="star-static star-static-outer" points={starShapePoints} />
          <polygon className="star-static star-static-inner" points={innerStarPoints} />
          {starPieces.map((piece, index) => (
            <path
              className="star-piece"
              fill={piece.fill}
              key={piece.d}
              d={piece.d}
              style={{
                '--piece-delay': `${index * 34}ms`,
                '--tx': piece.tx,
                '--ty': piece.ty,
                '--rz': piece.rz,
              }}
            />
          ))}
        </g>
      </svg>
      <span className="star-flare" />
    </button>
  );
}

function ShootingStars() {
  return (
    <div className="shooting-stars" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function MenuOverlay({ isOpen, isClosing, onClose, onWork }) {
  if (!isOpen) {
    return null;
  }

  return (
    <section className={`menu-overlay ${isClosing ? 'is-closing' : ''}`} aria-label="Site menu">
      <ShardReveal active={!isClosing} />
      <button className="menu-close" type="button" onClick={onClose} aria-label="Close navigation">
        <span />
        <span />
      </button>

      <nav className="menu-links" aria-label="Menu links">
        <button type="button">Бидний тухай</button>
        <button type="button" onClick={onWork}>
          Бид юу хийдэг вэ?
        </button>
        <button type="button">Холбогдох</button>
      </nav>
    </section>
  );
}

function ProjectsOverlay({ isOpen, isClosing, onClose, onMenu }) {
  const [filter, setFilter] = useState('All Projects');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const visibleProjects = useMemo(() => {
    if (filter === 'All Projects') {
      return projects;
    }

    return projects.filter((project) => project.category === filter);
  }, [filter]);

  if (!isOpen) {
    return null;
  }

  return (
    <section className={`projects-overlay ${isClosing ? 'is-closing' : ''}`} aria-label="All projects">
      <StarMark />
      <button className="close-projects" type="button" onClick={onClose}>
        Буцах
      </button>
      <button className="menu-button" type="button" onClick={onMenu} aria-label="Open navigation">
        <span />
        <span />
        <span />
      </button>

      <div className="side-arrow side-arrow-left" aria-hidden="true">
        &uarr;
      </div>
      <div className="side-arrow side-arrow-right" aria-hidden="true">
        &darr;
      </div>

      <div className="projects-inner">
        <div className="filter-block">
          <span>Filter</span>
          <button
            className="filter-current"
            type="button"
            onClick={() => setFiltersOpen((value) => !value)}
            aria-expanded={filtersOpen}
          >
            {filter}
            <span aria-hidden="true">v</span>
          </button>
          {filtersOpen && (
            <div className="filter-menu">
              {filters.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    setFilter(item);
                    setFiltersOpen(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-image">
                <img src={project.image} alt="" />
              </div>
              <h4>{project.title}</h4>
              <p>{project.client}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [projectsClosing, setProjectsClosing] = useState(false);
  const [mainReturning, setMainReturning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const animationTimer = useRef(null);
  const closeTimer = useRef(null);
  const returnTimer = useRef(null);
  const menuTimer = useRef(null);

  function openProjects() {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(returnTimer.current);
    setMainReturning(false);
    setProjectsClosing(false);
    setProjectsOpen(true);
  }

  function closeProjects() {
    if (projectsClosing) {
      return;
    }

    setProjectsClosing(true);
    setMainReturning(true);
    closeTimer.current = window.setTimeout(() => {
      setProjectsOpen(false);
      setProjectsClosing(false);
    }, 820);
    returnTimer.current = window.setTimeout(() => setMainReturning(false), 1180);
  }

  function openMenu() {
    window.clearTimeout(menuTimer.current);
    setMenuClosing(false);
    setMenuOpen(true);
  }

  function closeMenu() {
    if (menuClosing) {
      return;
    }

    setMenuClosing(true);
    menuTimer.current = window.setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 760);
  }

  function openWorkFromMenu() {
    closeMenu();
    window.setTimeout(openProjects, 520);
  }

  function playAnimation() {
    window.clearTimeout(animationTimer.current);
    setPlaying(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setPlaying(true);
        animationTimer.current = window.setTimeout(() => setPlaying(false), 5600);
      });
    });
  }

  return (
    <>
      <main
        className={`site-shell ${playing ? 'animation-playing' : ''} ${mainReturning ? 'is-returning' : ''} ${
          titleVisible ? 'is-title-visible' : ''
        }`}
      >
        <div className="grain" aria-hidden="true" />
        <ShootingStars />
        <nav className="top-nav" aria-label="Primary">
          <button className="view-projects" type="button" onClick={openProjects}>
            Бидний бүтээл
          </button>
          <button className="menu-button" type="button" onClick={openMenu} aria-label="Open navigation">
            <span />
            <span />
            <span />
          </button>
        </nav>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              <span className="title-line">Odun {'\u00b7'} Collectives</span>
              <span className="title-subline">Creative Studio</span>
            </h1>
          </div>

          <div className="star-wrap">
            <StarMark
              interactive
              playing={playing}
              onClick={playAnimation}
              onHoverChange={setTitleVisible}
            />
          </div>

          <p className="interaction-label">{playing ? '...' : 'Од дээр дар'}</p>
        </section>
      </main>

      <ProjectsOverlay
        isOpen={projectsOpen}
        isClosing={projectsClosing}
        onClose={closeProjects}
        onMenu={openMenu}
      />
      <MenuOverlay
        isOpen={menuOpen}
        isClosing={menuClosing}
        onClose={closeMenu}
        onWork={openWorkFromMenu}
      />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
