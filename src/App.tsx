import { useEffect, useState } from 'react'

// Edit this data to add portfolio pieces; each item is rendered by the reusable card below.
const projects = [
  { title: 'ManneKill', status: 'Released', role: 'Solo Developer', text: 'Its a wave based 3D FPS game made in Godot. The waves get harder and harder as time passes by. It only ends when your character dies.', tags: ['Godot', 'GDScript', 'FPS', 'Web-based'], image: '/projects/Mannekill.png', url: 'https://therealoxygenenjoyer.itch.io/mannekill' },
  { title: 'Project Two', status: 'Prototype', role: 'Solo Developer', text: 'Use this space to communicate the genre, core loop, and what you learned building it.', tags: ['Unreal', 'Blueprints', 'Systems'] },
  { title: 'Project Three', status: 'Released', role: 'Technical Designer', text: 'A concise overview that gives visitors a reason to explore the project further.', tags: ['Godot', 'GDScript', 'Tools'] },
]

// Keep these addresses separate: the header is for business enquiries, while the contact section is personal.
const businessEmail = 'realoxygenenjoyer@gmail.com'
const contactEmail = 'c.kingshuksarkar@gmail.com'

// Portfolio section order and the placeholder copy live here; replace them as your work evolves.
export default function App() {
  // Add new options here and matching .theme-* variables in github-light.css.
  const [theme, setTheme] = useState<'light' | 'dark' | 'midnight'>('light')
  const [emailCopied, setEmailCopied] = useState(false)

  // Mailto opens the visitor's configured mail app; copying provides a useful fallback when none is set.
  async function copyEmail(email: string) {
    try {
      await navigator.clipboard?.writeText(email)
      setEmailCopied(true)
    } catch {
      // The mailto link remains available if a browser blocks clipboard access.
    }
  }

  // Direct page sections reveal on load or once they enter the viewport.
  useEffect(() => {
    const page = document.querySelector<HTMLElement>('.world')
    if (!page) return

    const sections = Array.from(page.children) as HTMLElement[]
    page.classList.add('is-animated')
    sections.forEach((section, index) => section.style.setProperty('--reveal-delay', `${Math.min(index * 45, 180)}ms`))

    if (!('IntersectionObserver' in window)) {
      sections.forEach(section => section.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return <main className={`world theme-${theme}`}>
    <nav className="nav container"><a className="brand" href={`mailto:${businessEmail}?subject=Portfolio%20enquiry`} onClick={() => void copyEmail(businessEmail)}>Click for business email<span>.</span></a><div className="nav-tools"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a><label className="theme-picker">Theme<select value={theme} onChange={event => setTheme(event.target.value as typeof theme)} aria-label="Select portfolio theme"><option value="light">Light</option><option value="dark">Dark</option><option value="midnight">Midnight</option></select></label></div></nav>
    {/* Edit these compact profile labels to match your role, focus, and availability. */}
    <div className="world-hud container"><span>PROFILE: Chhatrapati Kingshuk Sarkar</span><span>FOCUS: GAME DEVELOPMENT</span><span>STATUS: OPEN TO WORK</span></div>
    <section className="hero container" id="top"><p className="eyebrow">Game developer / designer</p><h1>I build games with my passion and to give a smile upon the player's face.</h1><p className="lead">Hey there checking out my portfolio?</p><div className="actions"><a className="button" href="#work">View selected work</a><a href="#contact">Get in touch →</a></div><p className="meta">Based in India · Available for opportunities</p></section>
    <section className="section container" id="work"><p className="eyebrow">Selected work</p><h2>Games, prototypes, and experiments.</h2><p className="intro">These are my top projects i.e. It's either successfull or it's something I am proud of or it is both.</p><div className="projects">{projects.map((project, i) => <article className="card" key={project.title}><div className={`art art-${i + 1}`}>Project visual</div><div className="card-body"><div className="topline"><span>{project.status}</span><span>{project.role}</span></div><h3>{project.title}</h3><p>{project.text}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href={project.url ?? '#'} target={project.url ? '_blank' : undefined} rel={project.url ? 'noreferrer' : undefined}>View project ↗</a></div></article>)}</div></section>
    {/* Keep technical and general strengths separate here so the Skills box is easy to update. */}
    <section className="section about container" id="about"><div><p className="eyebrow">About me</p><h2>Developer first. Player always.</h2><p className="intro">I am a huge gamer and I always play games that I like but one thing that always bothered me was the working behind it all. How this thing works? How was this made? This curiosity and the instatiable urge to create something amazing made me pursue game development. To create a world where I can edit and make things to my liking in infinite possibilities is what drives me crazy for game development. Yes I am passionate about this field and I love it :)</p></div><aside className="skills-box" aria-labelledby="skills-title"><h3 id="skills-title">Skills</h3><div className="skills-groups"><div className="skills"><h4>Technical</h4>{['Godot', 'GDScript', 'Unity', 'C#', 'C++', 'Blender', 'Sound and VFX', 'UI'].map((skill, i) => <p key={skill}><span>0{i + 1}</span>{skill}</p>)}</div><div className="skills"><h4>General</h4>{['Game design', 'Level design', 'Leadership', 'Team communication', 'Reliability'].map((skill, i) => <p key={skill}><span>0{i + 1}</span>{skill}</p>)}</div></div></aside></section>
    <section className="contact container" id="contact"><p className="eyebrow">Contact</p><h2>Have a game in mind?</h2><a href={`mailto:${contactEmail}?subject=Portfolio%20enquiry`} onClick={() => void copyEmail(contactEmail)}>{contactEmail}↗</a><p className="email-status" role="status">{emailCopied ? 'Email address copied to your clipboard.' : 'Click the email address.'}</p></section>
    <footer className="container"><span>© {new Date().getFullYear()} CKS</span><div className="social-links"><a href="https://www.linkedin.com/in/c-kingshuk-sarkar-91a312327/" target="_blank" rel="noreferrer"><svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.23 8.08h4.54V23H.23V8.08ZM7.67 8.08h4.35v2.04h.06c.61-1.15 2.09-2.36 4.3-2.36 4.6 0 5.45 3.02 5.45 6.95V23h-4.53v-7.19c0-1.71-.03-3.91-2.38-3.91-2.38 0-2.75 1.86-2.75 3.79V23H7.67V8.08Z" /></svg>LinkedIn</a><a href="https://therealoxygenenjoyer.itch.io/" target="_blank" rel="noreferrer"><svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h10l3 5v7a2 2 0 0 1-2 2h-1.5l-2-3h-5l-2 3H6a2 2 0 0 1-2-2v-7l3-5Zm1.2 5.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm7.1-.8v1.4h-1.4v1.4h1.4v1.4h1.4v-1.4h1.4v-1.4h-1.4V10h-1.4Z" /></svg>itch.io</a><a href="https://github.com/oxyenjoyer" target="_blank" rel="noreferrer"><svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.23.71-1.51-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.75 10.75 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.63 5.28-5.14 5.56.4.35.76 1.04.76 2.1v3.12c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .7Z" /></svg>GitHub</a></div></footer>
  </main>
}
