import { useState, useEffect, useRef } from 'react'
import { playClickSound, playAdvancementSound, isSoundEnabled, setSoundEnabled } from './sound'
import { Panorama } from './components/Panorama'
import { VignetteLevel, VIGNETTE_OPACITIES } from './panoramaConfig'

type Screen = 'title' | 'singleplayer' | 'multiplayer' | 'skills' | 'options' | 'contact'

interface Advancement {
  title: string
  desc: string
  icon: string
}

interface SkillItem {
  id: string
  name: string
  icon: string
  count: number
  tier: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary'
  type: string
  lore: string
  stat: string
}

const SPLASHES = [
  'Now with Godot!!',
  'Find on itch.io!',
  'Look ma, no bugs!',
  'Pro Gamer and Dev B)',
  'C++ & C# certified!',
  'May contain endermites',
  'Open to Work!',
  '100% Organic Code!',
  'Press F to Respect!',
  "Diggy diggy",
  'Crafting games',
  'Click for more!',
]

const TECHNICAL_SKILLS: SkillItem[] = [
  {
    id: 'godot',
    name: 'Godot Engine',
    icon: 'GD',
    count: 4,
    tier: 'Legendary',
    type: 'Primary Game Engine',
    lore: 'Specialized in 3D & 2D game loops, scene tree architectures, and rapid mechanics prototyping.',
    stat: '+100 Prototyping Speed, 3D Physics Mastery',
  },
  {
    id: 'gdscript',
    name: 'GDScript',
    icon: 'GS',
    count: 64,
    tier: 'Epic',
    type: 'Scripting Language',
    lore: 'Fluent in event-driven systems, custom node logic, state machines, and shader integration.',
    stat: '+95 Execution Fluidity, Signal Mastery',
  },
  {
    id: 'unity',
    name: 'Unity 3D',
    icon: 'UN',
    count: 20,
    tier: 'Rare',
    type: 'Secondary Game Engine',
    lore: 'Extensive experience with component-based architecture, physics, Animator controllers, and UI Toolkit.',
    stat: '+85 Cross-Platform Deployment',
  },
  {
    id: 'csharp',
    name: 'C# & C++',
    icon: 'C#',
    count: 32,
    tier: 'Uncommon',
    type: 'Systems Programming',
    lore: 'Strong foundational memory management, algorithmic problem solving, and object-oriented architectures.',
    stat: '+90 Performance Optimization & Math',
  },
  {
    id: 'blender',
    name: 'Blender 3D',
    icon: '3D',
    count: 16,
    tier: 'Rare',
    type: '3D Modeling Tool',
    lore: 'Capable of creating low-poly game assets, environmental props, UV mapping, and rigging animations.',
    stat: '+75 Asset Creation & Spatial Design',
  },
  {
    id: 'vfx',
    name: 'Sound & VFX',
    icon: 'FX',
    count: 8,
    tier: 'Uncommon',
    type: 'Audio & Particle Craft',
    lore: 'Designing impactful feedback loops, screen shakes, spatial audio, and dynamic particle systems.',
    stat: '+80 Player Immersion & Juice',
  },
]

const GENERAL_SKILLS: SkillItem[] = [
  {
    id: 'gamedesign',
    name: 'Game Design',
    icon: 'DES',
    count: 1,
    tier: 'Legendary',
    type: 'Core Discipline',
    lore: 'Crafting addictive game loops, pacing, progression curves, and rewarding risk-reward mechanics.',
    stat: '+100 Player Engagement',
  },
  {
    id: 'leveldesign',
    name: 'Level Design',
    icon: 'LVL',
    count: 3,
    tier: 'Epic',
    type: 'Spatial Flow',
    lore: 'Guiding player attention through lighting, geometry, choke points, and visual landmarks.',
    stat: '+90 Spatial Navigation & Flow',
  },
  {
    id: 'leadership',
    name: 'Leadership',
    icon: 'LEAD',
    count: 1,
    tier: 'Rare',
    type: 'Team Dynamic',
    lore: 'Organizing sprint targets, inspiring fellow developers, and maintaining clear project visions.',
    stat: '+85 Team Morale & Vision',
  },
  {
    id: 'comm',
    name: 'Communication',
    icon: 'COM',
    count: 64,
    tier: 'Common',
    type: 'Collaboration',
    lore: 'Articulate cross-disciplinary dialogue between artists, coders, and sound designers.',
    stat: '+95 Clarity & Fast Turnaround',
  },
  {
    id: 'reliability',
    name: 'Reliability',
    icon: 'REL',
    count: 100,
    tier: 'Legendary',
    type: 'Character Trait',
    lore: 'Committed to bug-free releases, clean git version control, and dependable milestone delivery.',
    stat: '+100 Trust & Punctuality',
  },
]

export default function App() {
  const [screen, setScreen] = useState<Screen>('title')
  const [splashIndex, setSplashIndex] = useState(() => Math.floor(Math.random() * SPLASHES.length))
  const [soundOn, setSoundOn] = useState(true)
  const [particlesOn, setParticlesOn] = useState(true)
  const [quakePro, setQuakePro] = useState(false)
  const [vignetteLevel, setVignetteLevel] = useState<VignetteLevel>('low')
  const [panoramaDrift, setPanoramaDrift] = useState(false)
  const [selectedWorldIndex, setSelectedWorldIndex] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(TECHNICAL_SKILLS[0])
  const [advancement, setAdvancement] = useState<Advancement | null>(null)
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const baseUrl = import.meta.env.BASE_URL
  const resumeUrl = `${baseUrl}files/resume.pdf`
  const panoramaUrl = `${baseUrl}panorama.jpg`
  const dirtUrl = `${baseUrl}dirt.png`

  const businessEmail = 'realoxygenenjoyer@gmail.com'
  const personalEmail = 'c.kingshuksarkar@gmail.com'

  const projects = [
    {
      title: 'ManneKill',
      status: 'Released',
      engine: 'Godot / GDScript',
      role: 'Solo Developer',
      image: `${baseUrl}projects/Mannekill.png`,
      url: 'https://therealoxygenenjoyer.itch.io/mannekill',
      githubUrl: 'https://github.com/oxyenjoyer/FPS_Wave_Based',
      desc: 'Its a wave based 3D FPS game made in Godot. The waves get harder and harder as time passes by. It only ends when your character dies.',
      tags: ['Godot', 'GDScript', 'FPS', 'Web-based'],
      date: 'Latest Release',
    },
    {
      title: 'Project Two',
      status: 'Prototype',
      engine: 'Unreal / Blueprints',
      role: 'Solo Developer',
      image: null,
      url: null,
      githubUrl: null,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      tags: ['Unreal', 'Blueprints', 'Systems'],
      date: 'Prototype',
    },
    {
      title: 'Project Three',
      status: 'Released',
      engine: 'Godot / GDScript',
      role: 'Solo Developer',
      image: null,
      url: null,
      githubUrl: null,
      desc: 'Lorem ipsum but I like to move it move it',
      tags: ['Godot', 'GDScript', 'Tools'],
      date: 'Prototype',
    },
  ]

  // Initialize sound preference
  useEffect(() => {
    setSoundOn(isSoundEnabled())
  }, [])

  // Show advancement toast
  function triggerAdvancement(title: string, desc: string, icon = '*') {
    playAdvancementSound()
    setAdvancement({ title, desc, icon })
    setTimeout(() => {
      setAdvancement(null)
    }, 4500)
  }

  // Button click handler with audio
  function handleNavigate(target: Screen) {
    playClickSound()
    setScreen(target)
  }

  function handleSplashClick() {
    playClickSound()
    setSplashIndex(prev => {
      let next: number
      do {
        next = Math.floor(Math.random() * SPLASHES.length)
      } while (next === prev && SPLASHES.length > 1)
      return next
    })
  }

  function toggleSoundOption() {
    playClickSound()
    const next = !soundOn
    setSoundOn(next)
    setSoundEnabled(next)
  }

  async function copyToClipboard(email: string, label: string) {
    playClickSound()
    try {
      await navigator.clipboard.writeText(email)
      setCopiedStatus(label)
      triggerAdvancement('Direct Whisper', `Copied ${label} to clipboard!`, '!')
      setTimeout(() => setCopiedStatus(null), 3500)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  function handleResumeDownload() {
    playClickSound()
    triggerAdvancement('Advancement Made!', 'The Real Game Dev - Resume Downloaded!', '*')
  }

  // Ambient floating particles canvas
  useEffect(() => {
    if (!particlesOn) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const w = (canvas.width = window.innerWidth)
    const h = (canvas.height = window.innerHeight)

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 4 + 2,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
    }))

    function render() {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        p.y -= p.speedY
        p.x += p.speedX
        if (p.y < -10) p.y = h + 10
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10

        ctx.fillStyle = `rgba(255, 230, 160, ${p.alpha})`
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), Math.floor(p.size), Math.floor(p.size))
      })
      animId = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [particlesOn])

  return (
    <div
      className={`mc-app ${quakePro ? 'quake-pro' : ''}`}
      style={{ '--mc-dirt-url': `url(${dirtUrl})` } as React.CSSProperties}
    >
      {/* Modular Background Panorama with Lowered Vignette */}
      <Panorama
        imageUrl={panoramaUrl}
        vignette={vignetteLevel}
        drift={panoramaDrift}
        blur={screen !== 'title'}
      >
        {/* Ambient Floating Particles */}
        {particlesOn && <canvas ref={canvasRef} className="mc-particles" />}
      </Panorama>

      {/* Global Viewport Vignette (Instant feedback on all screens including menus) */}
      {vignetteLevel !== 'off' && (
        <div
          className="mc-vignette"
          style={{ opacity: VIGNETTE_OPACITIES[vignetteLevel] }}
          aria-hidden="true"
        />
      )}

      {/* Advancement Made Toast Popup */}
      {advancement && (
        <div className="mc-advancement-toast" role="status" aria-live="polite">
          <div className="mc-advancement-icon">{advancement.icon}</div>
          <div className="mc-advancement-info">
            <span className="mc-advancement-title">{advancement.title}</span>
            <span className="mc-advancement-desc">{advancement.desc}</span>
          </div>
        </div>
      )}

      {/* ===================================================================
          1. TITLE SCREEN (MINECRAFT MAIN MENU)
         =================================================================== */}
      {screen === 'title' && (
        <main className="mc-title-screen">
          {/* Logo with Bouncing Yellow Splash */}
          <header className="mc-logo-wrapper">
            <div className="mc-logo-title-row">
              <h1 className="mc-logo-title" data-text="KINGSHUK">
                <span className="mc-logo-shadow" aria-hidden="true">KINGSHUK</span>
                <span className="mc-logo-front">KINGSHUK</span>
              </h1>
              <span
                className="mc-splash-text"
                onClick={handleSplashClick}
                title="Click for next splash!"
                role="button"
                tabIndex={0}
              >
                {SPLASHES[splashIndex]}
              </span>
            </div>
            <p className="mc-logo-subtitle">GAME DEVELOPER & DESIGNER</p>
          </header>

          {/* Main Menu Buttons */}
          <nav className="mc-menu-list" aria-label="Portfolio Main Menu">
            <button
              className="mc-button btn-wide"
              onClick={() => handleNavigate('singleplayer')}
              aria-label="Featured Games"
            >
              Featured Games
            </button>

            <button
              className="mc-button btn-wide"
              onClick={() => handleNavigate('multiplayer')}
              aria-label="About the Dev"
            >
              About the Dev
            </button>

            <button
              className="mc-button btn-wide"
              onClick={() => handleNavigate('skills')}
              aria-label="Skill Inventory"
            >
              Skill Inventory
            </button>

            <div className="mc-menu-row">
              <button
                className="mc-button btn-half"
                onClick={() => handleNavigate('options')}
                aria-label="Options"
              >
                Options
              </button>
              <button
                className="mc-button btn-half"
                onClick={() => handleNavigate('contact')}
                aria-label="Direct Connect"
              >
                Direct Connect
              </button>
            </div>

            <div className="mc-menu-row">
              <a
                className="mc-button btn-half btn-green"
                href={resumeUrl}
                download="Chhatrapati_Kingshuk_Sarkar_Resume.pdf"
                onClick={handleResumeDownload}
                title="Download PDF Resume"
              >
                Download Resume
              </a>
              <button
                className="mc-button btn-half"
                onClick={toggleSoundOption}
                title="Toggle Web Audio SFX"
              >
                {soundOn ? 'SFX: ON' : 'SFX: OFF'}
              </button>
            </div>
          </nav>

          {/* Title Screen Footer */}
          <footer className="mc-title-footer">
            <span>Alpha 1.0</span>
            <span>Copyright © CKSO2</span>
          </footer>
        </main>
      )}

      {/* ===================================================================
          2. SINGLEPLAYER SCREEN (SELECT WORLD / PROJECTS)
         =================================================================== */}
      {screen === 'singleplayer' && (
        <section className="mc-dirt-screen" aria-label="Select World Projects">
          <header className="mc-screen-header">
            <h2 className="mc-screen-title">Featured Games</h2>
          </header>

          <div className="mc-screen-content">
            <div className="mc-world-list">
              {projects.map((proj, idx) => (
                <article
                  key={proj.title}
                  className={`mc-world-card ${selectedWorldIndex === idx ? 'is-selected' : ''}`}
                  onClick={() => {
                    playClickSound()
                    setSelectedWorldIndex(idx)
                  }}
                >
                  <div
                    className="mc-world-thumbnail"
                    style={proj.image ? { backgroundImage: `url(${proj.image})` } : undefined}
                  >
                    {!proj.image && <span className="mc-world-placeholder-badge">PROTOTYPE</span>}
                  </div>
                  <div className="mc-world-details">
                    <div className="mc-world-header-row">
                      <h3 className="mc-world-name">{proj.title}</h3>
                      <span className={`mc-world-status ${proj.status.toLowerCase()}`}>
                        {proj.status}
                      </span>
                    </div>

                    <p className="mc-world-subline">
                      {proj.engine} · {proj.role} ({proj.date})
                    </p>

                    <p className="mc-world-desc">{proj.desc}</p>

                    <div className="mc-world-tags">
                      {proj.tags.map(tag => (
                        <span key={tag} className="mc-world-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mc-world-actions">
                      {proj.url ? (
                        <a
                          className="mc-button btn-green"
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={e => {
                            e.stopPropagation()
                            playClickSound()
                            triggerAdvancement('World Explored', `Launched ${proj.title}!`, '*')
                          }}
                        >
                          Play Game
                        </a>
                      ) : (
                        <button className="mc-button" disabled>
                          Prototype (WIP)
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <footer className="mc-screen-footer">
            {projects[selectedWorldIndex].githubUrl ? (
              <a
                className="mc-button btn-half btn-green"
                href={projects[selectedWorldIndex].githubUrl!}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  playClickSound()
                  triggerAdvancement('Source Inspected', `Opened GitHub repo for ${projects[selectedWorldIndex].title}!`, '*')
                }}
              >
                GitHub Repository
              </a>
            ) : (
              <button className="mc-button btn-half" disabled>
                GitHub Repository
              </button>
            )}
            <button
              className="mc-button btn-half"
              onClick={() => handleNavigate('title')}
            >
              Cancel
            </button>
          </footer>
        </section>
      )}

      {/* ===================================================================
          3. MULTIPLAYER SCREEN (SERVER BROWSER & ABOUT ME)
         =================================================================== */}
      {screen === 'multiplayer' && (
        <section className="mc-dirt-screen" aria-label="Multiplayer Server Browser">
          <header className="mc-screen-header">
            <h2 className="mc-screen-title">About the Dev</h2>
          </header>

          <div className="mc-screen-content">
            <div className="mc-server-card">
              <div className="mc-server-icon">DEV</div>
              <div className="mc-server-info">
                <div className="mc-server-title-row">
                  <h3 className="mc-server-name">Creative Dev Realm [Dedicated Server]</h3>
                  <div className="mc-server-ping">
                    <span>1/1 Online</span>
                    <div className="mc-ping-bars" title="Ping: 12ms (5 Bars)">
                      <div className="mc-ping-bar" />
                      <div className="mc-ping-bar" />
                      <div className="mc-ping-bar" />
                      <div className="mc-ping-bar" />
                      <div className="mc-ping-bar" />
                    </div>
                  </div>
                </div>
                <p className="mc-motd-1">Game Developer & Designer and a Gamer ofc</p>
                <p className="mc-motd-2">"daba dee daba doo lul"</p>
              </div>
            </div>

            <article className="mc-about-panel">
              <h3 className="mc-inv-section-title" style={{ color: '#ffffff' }}>
                Server Lore & Developer Bio
              </h3>

              <p className="mc-about-story">
                I am a huge gamer and I always play games that I like, but one thing that always bothered
                me was the working behind it all. <em>How does this thing work? How was this made?</em>
              </p>

              <p className="mc-about-story">
                This relentless curiosity and the insatiable urge to create something amazing made me
                pursue game development. To create an interactive world where I can edit, simulate, and
                sculpt things to my liking with infinite possibilities is what drives me crazy for game
                development.
              </p>

              <p className="mc-about-story" style={{ color: '#55ffff' }}>
                Yes, I am fiercely passionate about this field and I love every single pixel of it :D
              </p>

              <div className="mc-player-hud">
                <div className="mc-hud-item">
                  <span className="mc-hud-label">STATUS:</span>
                  <span className="mc-hud-val" style={{ color: '#55ff55' }}>
                    Open to Work (India / Remote)
                  </span>
                </div>
              </div>
            </article>
          </div>

          <footer className="mc-screen-footer">
            <button
              className="mc-button btn-half btn-green"
              onClick={() => handleNavigate('contact')}
            >
              Direct Connect
            </button>
            <button
              className="mc-button btn-half"
              onClick={() => handleNavigate('title')}
            >
              Back to Title
            </button>
          </footer>
        </section>
      )}

      {/* ===================================================================
          4. SKILLS & INVENTORY SCREEN
         =================================================================== */}
      {screen === 'skills' && (
        <section className="mc-dirt-screen" aria-label="Skills & Inventory">
          <header className="mc-screen-header">
            <h2 className="mc-screen-title">Skill Inventory</h2>
          </header>

          <div className="mc-screen-content">
            <div className="mc-inventory-window">
              <div>
                <h3 className="mc-inv-section-title">Hotbar Equipment (Technical Skills)</h3>
                <div className="mc-slots-grid">
                  {TECHNICAL_SKILLS.map(skill => (
                    <div
                      key={skill.id}
                      className={`mc-slot tier-${skill.tier.toLowerCase()} ${hoveredSkill?.id === skill.id ? 'is-selected' : ''}`}
                      onClick={() => {
                        playClickSound()
                        setHoveredSkill(skill)
                      }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                    >
                      {['Legendary', 'Epic', 'Rare'].includes(skill.tier) && (
                        <svg className={`mc-slot-tier-svg tier-${skill.tier.toLowerCase()}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                          <rect x="2.5" y="2.5" width="95" height="95" vectorEffect="non-scaling-stroke" />
                        </svg>
                      )}
                      <span className="mc-slot-icon">{skill.icon}</span>
                      <span className="mc-slot-name">{skill.name}</span>
                      <span className="mc-slot-count">{skill.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mc-inv-section-title">Chest Storage (General & Design Strengths)</h3>
                <div className="mc-slots-grid">
                  {GENERAL_SKILLS.map(skill => (
                    <div
                      key={skill.id}
                      className={`mc-slot tier-${skill.tier.toLowerCase()} ${hoveredSkill?.id === skill.id ? 'is-selected' : ''}`}
                      onClick={() => {
                        playClickSound()
                        setHoveredSkill(skill)
                      }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                    >
                      {['Legendary', 'Epic', 'Rare'].includes(skill.tier) && (
                        <svg className={`mc-slot-tier-svg tier-${skill.tier.toLowerCase()}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                          <rect x="2.5" y="2.5" width="95" height="95" vectorEffect="non-scaling-stroke" />
                        </svg>
                      )}
                      <span className="mc-slot-icon">{skill.icon}</span>
                      <span className="mc-slot-name">{skill.name}</span>
                      <span className="mc-slot-count">{skill.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minecraft Item Tooltip Display */}
              {hoveredSkill && (
                <div className="mc-tooltip-box" role="region" aria-label="Item Tooltip">
                  <div className={`mc-tooltip-title tier-${hoveredSkill.tier.toLowerCase()}`}>{hoveredSkill.name}</div>
                  <div className={`mc-tooltip-rarity tier-${hoveredSkill.tier.toLowerCase()}`}>
                    Tier: {hoveredSkill.tier} · {hoveredSkill.type}
                  </div>
                  <p className="mc-tooltip-desc">"{hoveredSkill.lore}"</p>
                  <p className="mc-tooltip-stat">▶ {hoveredSkill.stat}</p>
                </div>
              )}
            </div>
          </div>

          <footer className="mc-screen-footer">
            <a
              className="mc-button btn-half btn-green"
              href={resumeUrl}
              download="Chhatrapati_Kingshuk_Sarkar_Resume.pdf"
              onClick={handleResumeDownload}
            >
              Download Resume
            </a>
            <button
              className="mc-button btn-half"
              onClick={() => handleNavigate('title')}
            >
              Back to Title
            </button>
          </footer>
        </section>
      )}

      {/* ===================================================================
          5. CONTACT / DIRECT CONNECT SCREEN
         =================================================================== */}
      {screen === 'contact' && (
        <section className="mc-dirt-screen" aria-label="Direct Connect and Contact">
          <header className="mc-screen-header">
            <h2 className="mc-screen-title">Direct Connect (Contact & Socials)</h2>
          </header>

          <div className="mc-screen-content">
            <div className="mc-contact-box">
              <div className="mc-chat-history">
                <p className="mc-chat-msg server">&lt;Server&gt; Direct connection established.</p>
                <p className="mc-chat-msg dev">&lt;Developer&gt; Heyo Looking for a game developer or want to collaborate?</p>
                <p className="mc-chat-msg info">&lt;Server&gt; Click an email address below to copy it instantly:</p>
              </div>

              {/* Business Email */}
              <div className="mc-email-row">
                <span className="mc-email-label">BUSINESS INQUIRIES:</span>
                <div className="mc-email-value-wrap">
                  <span className="mc-email-value">{businessEmail}</span>
                  <button
                    className="mc-button btn-green"
                    onClick={() => copyToClipboard(businessEmail, 'Business Email')}
                  >
                    <svg className="mc-btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span>{copiedStatus === 'Business Email' ? 'Copied!' : 'Copy Email'}</span>
                  </button>
                </div>
              </div>

              {/* Personal Email */}
              <div className="mc-email-row">
                <span className="mc-email-label">PERSONAL / DIRECT:</span>
                <div className="mc-email-value-wrap">
                  <span className="mc-email-value">{personalEmail}</span>
                  <button
                    className="mc-button btn-green"
                    onClick={() => copyToClipboard(personalEmail, 'Personal Email')}
                  >
                    <svg className="mc-btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span>{copiedStatus === 'Personal Email' ? 'Copied!' : 'Copy Email'}</span>
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mc-socials-grid">
                <a
                  className="mc-button"
                  href="https://www.linkedin.com/in/c-kingshuk-sarkar-91a312327/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickSound}
                >
                  <svg className="mc-btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>LinkedIn ↗</span>
                </a>

                <a
                  className="mc-button"
                  href="https://therealoxygenenjoyer.itch.io/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickSound}
                >
                  <svg className="mc-btn-icon" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                    <path d="M 16 5 C 12.748 5 8.3121094 5.0508594 7.4121094 5.1308594 C 6.4021094 5.7368594 4.4028125 8.0309531 4.3828125 8.6269531 L 4.3828125 9.6269531 C 4.3828125 10.889953 5.5657188 12 6.6367188 12 C 7.9197187 12 8.9902344 10.929969 8.9902344 9.6679688 C 8.9902344 10.929969 10.0305 12 11.3125 12 C 12.6055 12 13.605469 10.930969 13.605469 9.6679688 C 13.605469 10.929969 14.695281 12 15.988281 12 L 16.009766 12 C 17.302766 12 18.392578 10.930969 18.392578 9.6679688 C 18.392578 10.929969 19.402547 12 20.685547 12 C 21.968547 12 23.009766 10.930969 23.009766 9.6679688 C 23.009766 10.929969 24.080281 12 25.363281 12 C 26.434281 12 27.615234 10.889953 27.615234 9.6269531 L 27.615234 8.6269531 C 27.595234 8.0309531 25.595938 5.7368594 24.585938 5.1308594 C 21.443938 5.0198594 19.252 5 16 5 z M 13.550781 11.742188 C 12.497781 13.552188 9.8523125 13.573906 8.8203125 11.753906 C 8.1903125 12.845906 6.7642969 13.267547 6.1542969 13.060547 C 5.9762969 14.959547 5.8534844 24.70875 7.1464844 26.34375 C 10.943484 27.22875 21.164516 27.20975 24.853516 26.34375 C 26.348516 24.81975 26.013703 14.821547 25.845703 13.060547 C 25.235703 13.267547 23.809453 12.845906 23.189453 11.753906 C 22.146453 13.573906 19.501219 13.552188 18.449219 11.742188 C 18.124219 12.332187 17.367 13.109375 16 13.109375 C 14.997 13.148375 14.051781 12.607187 13.550781 11.742188 z M 11.419922 14 C 12.219922 14 12.950078 14.000469 13.830078 14.980469 C 15.280078 14.830469 16.719922 14.830469 18.169922 14.980469 C 19.059922 14.010469 19.780078 14.009766 20.580078 14.009766 C 23.160078 14.009766 23.780937 17.819609 24.710938 21.099609 C 25.550938 24.149609 24.429062 24.230469 23.039062 24.230469 C 20.969062 24.150469 19.820313 22.650625 19.820312 21.140625 C 17.890313 21.460625 14.809688 21.580625 12.179688 21.140625 C 12.179688 22.650625 11.030938 24.150469 8.9609375 24.230469 C 7.5709375 24.230469 6.4490625 24.149609 7.2890625 21.099609 C 8.2190625 17.799609 8.8399219 14.009766 11.419922 14.009766 L 11.419922 14 z M 16 16.876953 C 16 16.876953 14.306 18.439375 14 18.984375 L 15.107422 18.943359 L 15.107422 19.910156 C 15.107422 19.968156 15.926 19.917969 16 19.917969 C 16.447 19.934969 16.892578 19.951156 16.892578 19.910156 L 16.892578 18.943359 L 18 18.984375 C 17.694 18.438375 16 16.876953 16 16.876953 z" />
                  </svg>
                  <span>itch.io Profile ↗</span>
                </a>

                <a
                  className="mc-button"
                  href="https://github.com/oxyenjoyer"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickSound}
                >
                  <svg className="mc-btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub ↗</span>
                </a>

                <a
                  className="mc-button"
                  href="https://discord.com/users/1292152472697307239"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickSound}
                >
                  <svg className="mc-btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  <span>Discord Profile ↗</span>
                </a>
              </div>
            </div>
          </div>

          <footer className="mc-screen-footer">
            <button
              className="mc-button btn-wide"
              onClick={() => handleNavigate('title')}
            >
              Back to Title
            </button>
          </footer>
        </section>
      )}

      {/* ===================================================================
          6. OPTIONS SCREEN
         =================================================================== */}
      {screen === 'options' && (
        <section className="mc-dirt-screen" aria-label="Game Options">
          <header className="mc-screen-header">
            <h2 className="mc-screen-title">Options</h2>
          </header>

          <div className="mc-screen-content">
            <div className="mc-options-grid">
              <button className="mc-button" onClick={toggleSoundOption}>
                Audio SFX: {soundOn ? 'ON' : 'OFF'}
              </button>

              <button
                className="mc-button"
                onClick={() => {
                  playClickSound()
                  setParticlesOn(!particlesOn)
                }}
              >
                Particles: {particlesOn ? 'ON' : 'OFF'}
              </button>

              <button
                className="mc-button"
                onClick={() => {
                  playClickSound()
                  setQuakePro(!quakePro)
                }}
              >
                FOV: {quakePro ? 'QUAKE PRO' : 'NORMAL'}
              </button>

              <button
                className="mc-button"
                onClick={() => {
                  playClickSound()
                  const levels: VignetteLevel[] = ['low', 'medium', 'high', 'off']
                  const nextIdx = (levels.indexOf(vignetteLevel) + 1) % levels.length
                  const nextLevel = levels[nextIdx]
                  setVignetteLevel(nextLevel)
                  triggerAdvancement('Vignette Setting', `Intensity: ${nextLevel.toUpperCase()}`, '⚙')
                }}
                title="Cycle vignette intensity (Low / Medium / High / Off)"
              >
                Vignette: {vignetteLevel.toUpperCase()}
              </button>

              <button
                className="mc-button"
                onClick={() => {
                  playClickSound()
                  const nextMotion = !panoramaDrift
                  setPanoramaDrift(nextMotion)
                  triggerAdvancement('Panorama Motion', nextMotion ? 'Slow Ambient Drift ON' : 'Static Camera ON', '⛰')
                }}
                title="Toggle subtle panorama camera drift"
              >
                Panorama Motion: {panoramaDrift ? 'SLOW DRIFT' : 'STATIC'}
              </button>

              <button
                className="mc-button"
                onClick={() => {
                  playClickSound()
                  triggerAdvancement('Testing Sound', 'Ding! All sound systems nominal.', '*')
                }}
              >
                Test Sound Chime
              </button>

              {/* Live Interactive Panorama & Vignette Preview Box */}
              <div className="mc-options-preview">
                <div className="mc-preview-box">
                  <div
                    className={`mc-preview-bg ${panoramaDrift ? 'panorama-drift' : ''}`}
                    style={{ backgroundImage: `url(${panoramaUrl})` }}
                  />
                  {vignetteLevel !== 'off' && (
                    <div
                      className="mc-vignette-mini"
                      style={{ opacity: VIGNETTE_OPACITIES[vignetteLevel] }}
                    />
                  )}
                  <div className="mc-preview-tag">
                    PREVIEW: {vignetteLevel.toUpperCase()} VIGNETTE ({Math.round(VIGNETTE_OPACITIES[vignetteLevel] * 100)}%) · {panoramaDrift ? 'DRIFT ON' : 'STATIC'}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <footer className="mc-screen-footer">
            <button
              className="mc-button btn-wide"
              onClick={() => handleNavigate('title')}
            >
              Done
            </button>
          </footer>
        </section>
      )}
    </div>
  )
}
