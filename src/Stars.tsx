import { useEffect, useRef } from 'react'

export default function Stars() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!, x = c.getContext('2d')!
    let w = 0, h = 0, raf = 0
    let S: { x: number; y: number; r: number; z: number; p: number }[] = []
    const resize = () => {
      w = c.width = innerWidth; h = c.height = innerHeight
      S = Array.from({ length: 110 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.2 + .2, z: Math.random() * .4 + .1, p: Math.random() * 6 }))
    }
    const frame = (t: number) => {
      x.clearRect(0, 0, w, h)
      S.forEach(s => {
        s.y -= s.z * .12; if (s.y < 0) s.y = h
        x.globalAlpha = .25 + .25 * Math.sin(t / 1600 + s.p)
        x.fillStyle = '#BFD9EE'; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.28); x.fill()
      })
      raf = requestAnimationFrame(frame)
    }
    resize(); addEventListener('resize', resize); raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [])
  return <canvas id="stars" ref={ref} />
}
