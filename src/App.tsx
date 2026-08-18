const projects = [
  { title: 'Project One', status: 'In development', role: 'Gameplay Programmer', text: 'A brief description of the game, its hook, and the contribution you made.', tags: ['Unity', 'C#', 'Gameplay'] },
  { title: 'Project Two', status: 'Prototype', role: 'Solo Developer', text: 'Use this space to communicate the genre, core loop, and what you learned building it.', tags: ['Unreal', 'Blueprints', 'Systems'] },
  { title: 'Project Three', status: 'Released', role: 'Technical Designer', text: 'A concise overview that gives visitors a reason to explore the project further.', tags: ['Godot', 'GDScript', 'Tools'] },
]

export default function App() {
  return <main>
    <nav className="nav container"><a className="brand" href="#top">YOUR NAME<span>.</span></a><div><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div></nav>
    <section className="hero container" id="top"><p className="eyebrow">Game developer / designer</p><h1>I build playable worlds and memorable systems.</h1><p className="lead">A flexible introduction to your specialty, experience, and the kind of games you want to make.</p><div className="actions"><a className="button" href="#work">View selected work</a><a href="#contact">Get in touch →</a></div><p className="meta">Based in [City] · Available for opportunities</p></section>
    <section className="section container" id="work"><p className="eyebrow">Selected work</p><h2>Games, prototypes, and experiments.</h2><p className="intro">Feature projects that show how you think and what you can ship.</p><div className="projects">{projects.map((project, i) => <article className="card" key={project.title}><div className={`art art-${i + 1}`}>Project visual</div><div className="card-body"><div className="topline"><span>{project.status}</span><span>{project.role}</span></div><h3>{project.title}</h3><p>{project.text}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href="#">View project ↗</a></div></article>)}</div></section>
    <section className="section about container" id="about"><div><p className="eyebrow">About me</p><h2>Developer first. Player always.</h2><p className="intro">Write a brief, personal story here: what draws you to game development, the problems you enjoy solving, and the teams you want to join.</p></div><div className="skills">{['Gameplay systems', 'Level design', 'Prototyping', 'Technical design', 'Tools', 'Optimization'].map((skill, i) => <p key={skill}><span>0{i + 1}</span>{skill}</p>)}</div></section>
    <section className="contact container" id="contact"><p className="eyebrow">Contact</p><h2>Have a game in mind?</h2><a href="mailto:hello@example.com">hello@example.com ↗</a></section>
    <footer className="container"><span>© {new Date().getFullYear()} YOUR NAME</span><div><a href="#">LinkedIn</a><a href="#">itch.io</a><a href="#">GitHub</a></div></footer>
  </main>
}
