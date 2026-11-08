import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const A = '#8CC4E8', P = '#6FAFD9'
const glow = { transparent: true, blending: THREE.AdditiveBlending, depthWrite: false } as const
const RINGS = [[2.35, 0, 0], [2.35, 1.05, 0], [2.35, -1.05, .6], [2.2, .5, 1.3], [2.2, -.5, -1.2]]

function Scene() {
  const root = useRef<THREE.Group>(null!), ico = useRef<THREE.Mesh>(null!), oct = useRef<THREE.LineSegments>(null!)
  const beams = useRef<THREE.LineSegments>(null!), pts = useRef<THREE.Points>(null!), cur = useRef<THREE.Sprite>(null!)
  const rings = useRef<(THREE.Mesh | null)[]>([])
  const mouse = useRef({ x: 0, y: 0 }), eased = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: PointerEvent) => { mouse.current = { x: e.clientX / innerWidth * 2 - 1, y: -(e.clientY / innerHeight * 2 - 1) } }
    addEventListener('pointermove', move)
    return () => removeEventListener('pointermove', move)
  }, [])

  const o = useMemo(() => {
    const shader = new THREE.ShaderMaterial({
      ...glow,
      uniforms: { c: { value: new THREE.Color(A) }, m: { value: new THREE.Vector3(0, 0, 1) } },
      vertexShader: 'varying vec3 n;varying vec3 w;void main(){n=normalize(normalMatrix*normal);w=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: 'uniform vec3 c;uniform vec3 m;varying vec3 n;varying vec3 w;void main(){float f=pow(1.-abs(n.z),2.6);float g=pow(max(dot(w,normalize(m)),0.),14.);gl_FragColor=vec4(c,f*.55+g*.35+.03);}',
    })
    const cv = document.createElement('canvas'); cv.width = cv.height = 128
    const cx = cv.getContext('2d')!, gr = cx.createRadialGradient(64, 64, 0, 64, 64, 64)
    gr.addColorStop(0, 'rgba(190,225,250,.85)'); gr.addColorStop(.35, 'rgba(143,205,255,.22)'); gr.addColorStop(1, 'rgba(143,205,255,0)')
    cx.fillStyle = gr; cx.fillRect(0, 0, 128, 128)
    const N = 420, pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const r = 2.4 + Math.random() * 2.4, t = Math.random() * 6.28, p = Math.acos(2 * Math.random() - 1)
      pos.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p)], i * 3)
    }
    const lines: THREE.Vector3[] = []
    for (let i = 0; i < 6; i++) {
      const d = new THREE.Vector3(Math.random() - .5, Math.random() - .5, Math.random() - .5).normalize().multiplyScalar(1.95)
      lines.push(d, d.clone().negate())
    }
    return {
      shader, pos, tex: new THREE.CanvasTexture(cv), target: new THREE.Vector3(),
      beams: new THREE.BufferGeometry().setFromPoints(lines),
      edges: new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1.9)),
    }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime, e = eased.current, m = mouse.current, g = root.current
    e.x += (m.x - e.x) * .04; e.y += (m.y - e.y) * .04            // eased cursor, never snaps
    g.position.set(e.x * .3, Math.sin(t * .8) * .18 + e.y * .25, 0)  // float + parallax
    g.rotation.y += ((e.x * .5 + t * .12) - g.rotation.y) * .05
    g.rotation.x += (-e.y * .35 - g.rotation.x) * .05
    g.rotation.z = -e.x * .08
    rings.current.forEach((r, i) => r && (r.rotation.z += (.05 + i * .02) * (i % 2 ? -1 : 1) * .01))
    ico.current.rotation.set(t * .1, -t * .14, 0)
    oct.current.rotation.set(0, t * .07, t * .05)
    beams.current.rotation.set(t * .03, t * .06, 0)
    pts.current.rotation.set(Math.sin(t * .1) * .1, t * .02, 0)
    cur.current.position.lerp(o.target.set(e.x * 1.6, e.y * 1.6, 1.7), .1)
    const sm = cur.current.material as THREE.SpriteMaterial
    sm.opacity += ((Math.hypot(e.x, e.y) > .01 ? .35 : 0) - sm.opacity) * .05
    o.shader.uniforms.m.value.set(e.x, e.y, 1.2)                   // glow follows the cursor
  })

  return (
    <group ref={root}>
      <mesh><sphereGeometry args={[2, 64, 64]} /><primitive object={o.shader} attach="material" /></mesh>
      {RINGS.map(([r, x, y], i) => (
        <mesh key={i} ref={el => { rings.current[i] = el }} rotation={[x + 1.2, y, i]}>
          <torusGeometry args={[r, .012 + .006 * (i % 2), 8, 160]} />
          <meshBasicMaterial color={i % 2 ? P : A} opacity={.7} {...glow} />
        </mesh>
      ))}
      <mesh ref={ico}><icosahedronGeometry args={[1.25, 1]} /><meshBasicMaterial color={A} wireframe opacity={.35} {...glow} /></mesh>
      <lineSegments ref={oct} geometry={o.edges}><lineBasicMaterial color={P} opacity={.45} {...glow} /></lineSegments>
      <lineSegments ref={beams} geometry={o.beams}><lineBasicMaterial color={A} opacity={.28} {...glow} /></lineSegments>
      <sprite scale={[5.4, 5.4, 1]}><spriteMaterial map={o.tex} {...glow} /></sprite>
      <sprite ref={cur} scale={[2.2, 2.2, 1]}><spriteMaterial map={o.tex} opacity={0} {...glow} /></sprite>
      <points ref={pts}>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[o.pos, 3]} /></bufferGeometry>
        <pointsMaterial color="#BFD9EE" size={.03} opacity={.7} {...glow} />
      </points>
    </group>
  )
}

export default function Logo() {
  return (
    <div id="canvas">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 40 }} gl={{ alpha: true, antialias: true }}><Scene /></Canvas>
    </div>
  )
}
