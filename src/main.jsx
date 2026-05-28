import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import thumbnailSrc from './data/opop.jpg';
import videoSrc from './data/food.mp4';
import gymSrc from './data/gym.mp4';

const projects = [
  {
    title: 'Вэб сайт',
    client: 'Odun Collectives',
    category: 'website',
    description: 'Орчин үеийн дизайнтай үйлчилгээний газрын вэб сайт (кафе , ресторан г.м... ).',
    year: '2026',
    accent: '#b66f43',
    media: {
      type: 'video',
      src: videoSrc,
      poster: '',
      alt: 'Project video preview',
    },
  },
  {
    title: 'Фитнес page',
    client: 'Odun Collectives',
    category: 'website',
    description: 'A high-contrast fitness page built around motion, discipline, and conversion.',
    year: '2026',
    accent: '#6f8f62',
    media: {
      type: 'video',
      src: gymSrc,
      poster: thumbnailSrc,
      alt: 'Project video preview',
    },
  },
  
    
  {
    title: 'Video editing',
    client: 'gremix',
    category: 'video editing',
    description: 'A fast visual system for edits, reels, and campaign cuts that keep rhythm first.',
    year: '2025',
    accent: '#485c8f',
    media: { type: 'video', src: '', poster: '', alt: 'Video editing reel preview' },
  },
  {
    title: 'Thumbnail зураг',
    client: 'Opononi',
    category: 'Development',
    description: 'Үзэгчдийг татахуйц, видео агуулгын гол сэдвийг тод харуулсан, сонирхолтой thumbnail зураг.',
    year: '2025',
    accent: '#7b4e73',
    media: { type: 'image', src: thumbnailSrc, alt: 'Thumbnail design preview' },
  },
  
  {
    title: 'Худалдаа',
    client: 'love',
    category: 'Motion',
    description: 'A motion-led identity piece with stripped-back typography and sharp pacing.',
    year: '2024',
    accent: '#8e3540',
    media: { type: 'video', src: '', poster: '', alt: 'Motion project preview' },
  },
];

const projectScrollHold = 0.46;
const projectScrollTransition = 0.72;
const projectScrollStep = 1.45;
const projectScrollTail = 0.7;

const infoScreens = {
  about: {
    eyebrow: 'About us',
    title: 'Odun Collectives',
    lead: 'A creative studio shaping visual systems, websites, motion, and digital experiences with atmosphere and intent.',
    details: ['Brand', 'Content', 'Experience', 'Digital'],
    footerLabel: 'Selected focus',
    footerText: 'Identity - Web - Motion - Campaigns',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Let us build together',
    lead: 'Tell us what you want to make, launch, polish, or turn into something people remember.',
    details: ['oduncollectives@example.com', '+976 0000 0000', 'Ulaanbaatar'],
    footerLabel: 'Available for',
    footerText: 'Websites - Visual direction - Video editing - Launch assets',
  },
};

const floatingLetters = [
  ['O', '7%', '13%', '112px', '-24deg', '0ms'],
  ['D', '22%', '-4%', '148px', '19deg', '220ms'],
  ['U', '53%', '9%', '118px', '-12deg', '90ms'],
  ['N', '77%', '-2%', '162px', '31deg', '310ms'],
  ['C', '84%', '20%', '94px', '-38deg', '140ms'],
  ['O', '10%', '48%', '132px', '42deg', '410ms'],
  ['L', '31%', '68%', '90px', '-19deg', '180ms'],
  ['L', '62%', '61%', '130px', '16deg', '500ms'],
  ['E', '81%', '72%', '108px', '-8deg', '260ms'],
  ['C', '92%', '49%', '76px', '27deg', '620ms'],
  ['T', '46%', '35%', '88px', '-31deg', '340ms'],
  ['S', '16%', '78%', '96px', '13deg', '720ms'],
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

function ProjectMedia({ project }) {
  const media = project.media;

  if (media?.src && media.type === 'video') {
    return (
      <video
        className="project-media"
        src={media.src}
        poster={media.poster || undefined}
        autoPlay
        loop
        muted
        playsInline
        aria-label={media.alt || project.title}
      />
    );
  }

  if (media?.src) {
    return <img className="project-media" src={media.src} alt={media.alt || project.title} />;
  }

  return (
    <div className="project-preview-art">
      <span className="preview-orbit" />
      <span className="preview-light preview-light-one" />
      <span className="preview-light preview-light-two" />
      <span className="preview-block" />
    </div>
  );
}

function FloatingLetterBackground({ onPointerMove }) {
  return (
    <div className="letter-field" aria-hidden="true" onPointerMove={onPointerMove}>
      {floatingLetters.map(([letter, x, y, size, rotate, delay], index) => (
        <span
          className="letter-shard"
          key={`${letter}-${index}`}
          style={{
            '--x': x,
            '--y': y,
            '--size': size,
            '--rotate': rotate,
            '--delay': delay,
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}

function InfoScreen({ kind, isClosing, onClose }) {
  const content = infoScreens[kind];
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  function handlePointerMove(event) {
    const x = (event.clientX / window.innerWidth - 0.5) * 32;
    const y = (event.clientY / window.innerHeight - 0.5) * 28;
    setCursor({ x, y });
  }

  if (!content) {
    return null;
  }

  return (
    <section
      className={`info-screen ${isClosing ? 'is-closing' : ''}`}
      style={{
        '--cursor-x': `${cursor.x}px`,
        '--cursor-y': `${cursor.y}px`,
      }}
      onPointerMove={handlePointerMove}
      aria-label={content.eyebrow}
    >
      <FloatingLetterBackground onPointerMove={handlePointerMove} />
      <button className="info-back close-projects" type="button" onClick={onClose}>
        Ð‘ÑƒÑ†Ð°Ñ…
      </button>

      <div className="info-content">
        <p className="info-eyebrow info-type">{content.eyebrow}</p>
        <h2 className="info-title info-type">{content.title}</h2>
        <div className="info-rule" />
        <p className="info-lead info-type">{content.lead}</p>
        <p className="info-details">{content.details.join(' - ')}</p>
        <div className="info-rule" />
        <div className="info-footer">
          <span>{content.footerLabel}</span>
          <p>{content.footerText}</p>
        </div>
      </div>
    </section>
  );
}

function MenuOverlay({ isOpen, isClosing, onClose, onWork, onAbout, onContact }) {
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
  const storyRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!isOpen || !storyRef.current) {
      return;
    }

    storyRef.current.scrollTop = 0;
    setScrollProgress(0);
  }, [isOpen]);

  function handleStoryScroll(event) {
    const viewportHeight = event.currentTarget.clientHeight || window.innerHeight;
    const maxProgress = projects.length - 1;
    const rawProgress = event.currentTarget.scrollTop / viewportHeight;
    const segmentIndex = Math.min(maxProgress, Math.floor(rawProgress / projectScrollStep));
    const segmentPhase = rawProgress - segmentIndex * projectScrollStep;
    const transitionProgress = Math.min(
      1,
      Math.max(0, (segmentPhase - projectScrollHold) / projectScrollTransition),
    );
    const nextProgress =
      segmentIndex >= maxProgress ? maxProgress : segmentIndex + transitionProgress;

    setScrollProgress(Math.min(maxProgress, Math.max(0, nextProgress)));
  }

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

      <div className="projects-story" ref={storyRef} onScroll={handleStoryScroll}>
        <div className="projects-scene">
          <div className="project-copy-stack">
            {projects.map((project, index) => {
              const offset = index - scrollProgress;
              const distance = Math.abs(offset);
              const opacity = Math.max(0, 1 - distance * 1.1);
              const translateY = offset > 0 ? offset * 82 : offset * 56;

              return (
                <article
                  className="project-copy"
                  key={project.title}
                  style={{
                    '--copy-y': `${translateY}px`,
                    opacity,
                    filter: `blur(${Math.min(distance * 10, 10)}px)`,
                  }}
                >
                  <p className="project-kicker">All Projects</p>
                  <h2>{project.title}</h2>
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span>Client: {project.client}</span>
                    <span>{project.year}</span>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <a className="project-case-link" href="#project-case" onClick={(event) => event.preventDefault()}>
                    Explore case study
                    <span aria-hidden="true">-&gt;</span>
                  </a>
                </article>
              );
            })}
          </div>

          <div className="project-preview-stack" aria-hidden="true">
            {projects.map((project, index) => {
              const offset = index - scrollProgress;
              const isVisible = offset > -1.02 && offset < 1.06;
              const slideY = offset > 0 ? offset * 100 : 0;

              return (
                <div
                  className="project-preview-layer"
                  key={project.title}
                  style={{
                    '--accent': project.accent || '#6f8f8a',
                    opacity: isVisible ? 1 : 0,
                    transform: `translateY(${slideY}%)`,
                    zIndex: index + 1,
                  }}
                >
                  <div className="project-browser-bar">
                    <span>odun</span>
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <ProjectMedia project={project} />
                  <div className="project-preview-caption">
                    <strong>{project.title}</strong>
                    <span>{project.client}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="projects-progress" aria-hidden="true">
            <span>{String(Math.min(projects.length, Math.floor(scrollProgress) + 1)).padStart(2, '0')}</span>
            <i />
            <span>{String(projects.length).padStart(2, '0')}</span>
          </div>
        </div>
        <div
          className="projects-scroll-space"
          style={{
            height: `${
              ((projects.length - 1) * projectScrollStep +
                projectScrollHold +
                projectScrollTransition +
                projectScrollTail) *
              100
            }dvh`,
          }}
        />
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
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicReady, setMusicReady] = useState(false);
  const audioRef = useRef(null);
  const animationTimer = useRef(null);
  const closeTimer = useRef(null);
  const returnTimer = useRef(null);
  const menuTimer = useRef(null);

  useEffect(() => {
    function startMusic() {
      if (!audioRef.current || musicReady) {
        return;
      }

      audioRef.current.volume = 0.42;
      audioRef.current
        .play()
        .then(() => {
          setMusicReady(true);
          setMusicPlaying(true);
        })
        .catch(() => {
          setMusicPlaying(false);
        });
    }

    window.addEventListener('pointerdown', startMusic, { once: true });
    window.addEventListener('keydown', startMusic, { once: true });

    return () => {
      window.removeEventListener('pointerdown', startMusic);
      window.removeEventListener('keydown', startMusic);
    };
  }, [musicReady]);

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

  function toggleMusic() {
    if (!audioRef.current) {
      return;
    }

    if (audioRef.current.paused) {
      audioRef.current.volume = 0.42;
      audioRef.current
        .play()
        .then(() => {
          setMusicReady(true);
          setMusicPlaying(true);
        })
        .catch(() => setMusicPlaying(false));
      return;
    }

    audioRef.current.pause();
    setMusicPlaying(false);
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/lalar.mp3" loop preload="auto" />
      <button
        className={`music-toggle ${musicPlaying ? 'is-playing' : ''}`}
        type="button"
        onClick={toggleMusic}
        aria-label={musicPlaying ? 'Pause background music' : 'Play background music'}
      >
        <span />
        <span />
        <span />
      </button>
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
