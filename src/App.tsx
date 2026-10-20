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
  'Now with Godot 4!',
  'Free on itch.io!',
  'Look ma, no bugs!',
  'Level 99 Game Dev!',
  'C++ & C# certified!',
  'May contain Creepers!',
  'Open to Work!',
  '100% Organic Code!',
  'Press F to Respect!',
  "Don't dig straight down!",
  'Also try Terraria!',
  'Crafting worlds!',
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
    tier: 'Legendary',
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
    tier: 'Epic',
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
              aria-label="Singleplayer - View Games and Projects"
            >
              Singleplayer (Games & Projects)
            </button>

            <button
              className="mc-button btn-wide"
              onClick={() => handleNavigate('multiplayer')}
              aria-label="Multiplayer - About the Developer"
            >
              Multiplayer (About Me & Bio)
            </button>

            <button
              className="mc-button btn-wide"
              onClick={() => handleNavigate('skills')}
              aria-label="Advancements and Skills Inventory"
            >
              Character Inventory (Skills)
            </button>

            <div className="mc-menu-row">
              <button
                className="mc-button btn-half"
                onClick={() => handleNavigate('options')}
                aria-label="Options and Settings"
              >
                Options...
              </button>
              <button
                className="mc-button btn-half"
                onClick={() => handleNavigate('contact')}
                aria-label="Direct Connect and Contact"
              >
                Direct Connect...
              </button>
            </div>

            <div className="mc-menu-row">
              <a
                className="mc-button btn-half btn-green"
                href={resumeUrl}
                download="Kingshuk-Sarkar-Resume.pdf"
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
            <h2 className="mc-screen-title">Select World (Games & Projects)</h2>
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
                          Play / View Project ↗
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
            {projects[selectedWorldIndex].url ? (
              <a
                className="mc-button btn-half btn-green"
                href={projects[selectedWorldIndex].url!}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  playClickSound()
                  triggerAdvancement('World Loaded', `Joined ${projects[selectedWorldIndex].title}!`, '*')
                }}
              >
                Play Selected World ↗
              </a>
            ) : (
              <button className="mc-button btn-half" disabled>
                Selected: Prototype (WIP)
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
            <h2 className="mc-screen-title">Play Multiplayer</h2>
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
                  <span className="mc-hud-label">HEALTH:</span>
                  <span className="mc-hud-val">20 / 20</span>
                </div>
                <div className="mc-hud-item">
                  <span className="mc-hud-label">HUNGER:</span>
                  <span className="mc-hud-val">20 / 20 (Max)</span>
                </div>
                <div className="mc-hud-item">
                  <span className="mc-hud-label">LEVEL:</span>
                  <span className="mc-hud-val">23 Game Dev</span>
                </div>
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
              Direct Connect...
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
            <h2 className="mc-screen-title">Character Inventory & Equipment</h2>
          </header>

          <div className="mc-screen-content">
            <div className="mc-inventory-window">
              <div>
                <h3 className="mc-inv-section-title">Hotbar Equipment (Technical Skills)</h3>
                <div className="mc-slots-grid">
                  {TECHNICAL_SKILLS.map(skill => (
                    <div
                      key={skill.id}
                      className="mc-slot"
                      onClick={() => {
                        playClickSound()
                        setHoveredSkill(skill)
                      }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                    >
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
                      className="mc-slot"
                      onClick={() => {
                        playClickSound()
                        setHoveredSkill(skill)
                      }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                    >
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
                  <div className="mc-tooltip-title">§b{hoveredSkill.name}</div>
                  <div className="mc-tooltip-rarity">
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
              download="Kingshuk-Sarkar-Resume.pdf"
              onClick={handleResumeDownload}
            >
              Download Resume (PDF)
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
                <p className="mc-chat-msg dev">&lt;Developer&gt; Hey! Looking for a game developer or want to collaborate?</p>
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
                    {copiedStatus === 'Business Email' ? 'Copied!' : 'Copy Email'}
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
                    {copiedStatus === 'Personal Email' ? 'Copied!' : 'Copy Email'}
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
                  LinkedIn ↗
                </a>

                <a
                  className="mc-button"
                  href="https://therealoxygenenjoyer.itch.io/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickSound}
                >
                  itch.io Profile ↗
                </a>

                <a
                  className="mc-button"
                  href="https://github.com/oxyenjoyer"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickSound}
                >
                  GitHub ↗
                </a>

                <a
                  className="mc-button"
                  href="https://discord.com/users/1292152472697307239"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClickSound}
                >
                  Discord Profile ↗
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
            <h2 className="mc-screen-title">Options...</h2>
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

              <div className="mc-options-full">
                <a
                  className="mc-button btn-wide btn-green"
                  href={resumeUrl}
                  download="Kingshuk-Sarkar-Resume.pdf"
                  onClick={handleResumeDownload}
                >
                  Download Resume (PDF)
                </a>
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
