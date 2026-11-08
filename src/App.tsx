import { lazy, Suspense, useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { AnimatePresence, motion, type TargetAndTransition } from 'framer-motion'
import { EMAIL, LEADERSHIP, NAV, PROJECTS, SKILLS, SOCIALS } from './data'
import Stars from './Stars'

const Logo = lazy(() => import('./Logo')) // heavy 3D code loads after first paint

type RProps = { i?: number; className?: string; style?: CSSProperties; children: ReactNode; onMouseEnter?: () => void; hover?: TargetAndTransition }

// Reveal once: fade + slide + scale, staggered by index
function R({ i = 0, children, hover, ...rest }: RProps) {
  return (
    <motion.div {...rest} whileHover={hover} initial={{ opacity: 0, y: 34, scale: .98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: .15 }} transition={{ duration: .9, delay: i * .09, ease: [.2, .8, .2, 1] }}>
      {children}
    </motion.div>
  )
}

function Sec({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return <section id={id}><R><h2><small>{label}</small>{title}</h2></R>{children}</section>
}

function Nav() {
  const [on, setOn] = useState('hero'), [solid, setSolid] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setOn(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    document.querySelectorAll('section').forEach(s => io.observe(s))
    const f = () => setSolid(scrollY > 40)
    addEventListener('scroll', f, { passive: true })
    return () => { io.disconnect(); removeEventListener('scroll', f) }
  }, [])
  return <nav className={solid ? 's' : ''}>{NAV.map(([id, l]) => <a key={id} href={'#' + id} className={on === id ? 'on' : ''}>{l}</a>)}</nav>
}

function Capsule({ label, i }: { label: string; i: number }) {
  const [dots, setDots] = useState<{ id: number; x: number; y: number; l: number }[]>([])
  const burst = () => {
    const d = Array.from({ length: 7 }, (_, k) => { const a = Math.random() * 6.28, r = 24 + Math.random() * 22; return { id: Date.now() + k, x: Math.cos(a) * r, y: Math.sin(a) * r, l: 20 + Math.random() * 60 } })
    setDots(p => [...p, ...d]); setTimeout(() => setDots(p => p.filter(q => !d.includes(q))), 800)
  }
  return (
    <R i={i} className="glass cap" onMouseEnter={burst} hover={{ scale: 1.07 }}>
      {label}
      {dots.map(q => <span key={q.id} className="dot" style={{ left: q.l + '%', top: '50%', '--x': q.x + 'px', '--y': q.y + 'px' } as CSSProperties} />)}
    </R>
  )
}

function Projects() {
  const [sel, setSel] = useState<number | null>(null)
  useEffect(() => {
    if (sel === null) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setSel(null)
    addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [sel])
  const p = sel === null ? null : PROJECTS[sel]
  return (
    <Sec id="projects" label="Projects" title="Selected work">
      <div className="grid">
        {PROJECTS.map((q, i) => (
          <motion.article key={q.t} layoutId={'p' + i} className="glass card" tabIndex={0} role="button"
            onClick={() => setSel(i)} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSel(i))}
            initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8, rotate: -.6 }}
            viewport={{ once: true, amount: .15 }} transition={{ duration: .9, delay: i * .09, ease: [.2, .8, .2, 1] }}>
            <div className="thumb"><i className="im" style={{ backgroundImage: `url(${q.img})` }} /></div>
            <div className="in">
              <h3>{q.t}</h3><div className="meta">{q.r}</div><p>{q.s}</p>
              <div>{q.tech.slice(0, 4).map(x => <span className="bd" key={x}>{x}</span>)}</div>
              <button className="pbtn" tabIndex={-1}>View Details →</button>
            </div>
          </motion.article>
        ))}
      </div>
      <AnimatePresence>
        {p && sel !== null && (
          <motion.div id="ov" className="o" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)}>
            <motion.div id="pnl" className="glass" layoutId={'p' + sel} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
              <div className="ph"><i /><i /><i /><span>Project / 0{sel + 1}</span><button onClick={() => setSel(null)}>Close</button></div>
              <div className="pb">
                <h3>{p.t}</h3><div className="meta">{p.r}</div>
                <img className="shot" src={p.img} alt={p.t + ' screenshot'} />
                <h4>Overview</h4><p>{p.o}</p>
                <h4>My role</h4><p>{p.role}</p>
                <h4>Problem solved</h4><p>{p.prob}</p>
                <h4>Key features</h4><ul>{p.f.map(x => <li key={x}>{x}</li>)}</ul>
                <h4>Technical implementation</h4><p>{p.impl}</p>
                <h4>Technology stack</h4><div>{p.tech.map(x => <span className="bd" key={x}>{x}</span>)}</div>
                <h4>Repository</h4>
                <a className="gh" style={{ marginTop: 0 }} href={p.repo} target="_blank" rel="noopener noreferrer">View on GitHub →</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Sec>
  )
}

export default function App() {
  return (
    <>
      <div id="bg" /><Stars />
      <div className="orb" style={{ width: 380, height: 380, left: -100, top: '20%' }} />
      <div className="orb" style={{ width: 300, height: 300, right: -60, top: '60%', animationDelay: '-8s' }} />
      <Nav />

      <section id="hero">
        <Suspense fallback={null}><Logo /></Suspense>
        <div className="txt">
          <R><p className="eyebrow">Hello, I’m</p></R>
          <R i={1}><h1><span>Sherrie May Borbon</span></h1></R>
          <R i={2}><p className="role">Aspiring Software Engineer</p></R>
          <R i={3}><p className="intro">A fourth-year Computer Science student at National University Laguna building full-stack web and desktop applications for real campus needs.</p></R>
          <R i={4}><a className="btn pri" href="#projects">View projects</a><a className="btn" href="#contact">Get in touch</a></R>
          <R i={5} className="soc">{SOCIALS.map(s => <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>)}</R>
        </div>
      </section>

      <Sec id="about" label="About" title="Designing systems. Building with purpose.">
        <R i={1} className="glass about">
          <p>I’m a fourth-year Computer Science student at <b>National University Laguna</b> with a passion for creating software solutions that are practical, reliable, and user-centered.</p>
          <p style={{ marginTop: 14 }}>I enjoy exploring how systems work, translating real-world needs into digital solutions, and building applications that improve workflows. Through my projects, I’ve gained experience in full-stack development, database management, and designing software that supports people and organizations.</p>
        </R>
      </Sec>

      <Sec id="skills" label="Skills" title="Tools I work with">
        <div className="caps">{SKILLS.map((s, i) => <Capsule key={s} label={s} i={i} />)}</div>
      </Sec>

      <Projects />

      <Sec id="experience" label="Leadership" title="Leadership experience">
        <div className="tl">
          {LEADERSHIP.map((g, i) => (
            <R key={g.org} i={i} className="glass">
              <div className="when">{g.org}</div>
              {g.roles.map((r, k) => (
                <div key={r.t}>
                  <div className="rr" style={{ marginTop: k ? 22 : 6 }}><h3>{r.t}</h3><span>{r.d}</span></div>
                  <p style={{ color: 'var(--m)', marginTop: 4 }}>{r.p}</p>
                </div>
              ))}
            </R>
          ))}
        </div>
      </Sec>

      <Sec id="education" label="Education" title="Learning path">
        <div className="tl"><R className="glass">
          <div className="when">AUGUST 2023 – PRESENT</div><h3>BS Computer Science · NU Laguna</h3>
          <p style={{ color: 'var(--m)' }}>Coursework spanning automata theory, algorithms, and software systems.</p>
        </R></div>
      </Sec>

      <Sec id="contact" label="Contact" title="Let’s build something.">
        <R className="mail">Have an opportunity or a project in mind? Reach out at <a href={'mailto:' + EMAIL}>{EMAIL}</a></R>
        <R i={1}><a className="btn pri" href={'mailto:' + EMAIL}>Send me an email</a></R>
      </Sec>

      <footer>© 2026 Sherrie May Borbon · Designed to float in space.</footer>
    </>
  )
}
