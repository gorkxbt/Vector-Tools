'use client'

import React, { useRef, useEffect, useState, useMemo } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { useFrame, useThree, Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment, AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei'

// Custom shader for optimized glow effect
const glowShader = {
  uniforms: {
    tDiffuse: { value: null },
    color: { value: new THREE.Color(1, 0.2, 0.2) }, // Red glow
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      float luminance = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
      gl_FragColor = vec4(texel.rgb + color * luminance * 0.5, texel.a);
    }
  `
};

// Trading graph component with floating animations and instanced rendering
function TradingGraphs({ count = 10 }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const [graphData] = useState(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        Math.random() * 10, 
        (Math.random() - 0.5) * 30 - 5
      ],
      scale: 0.3 + Math.random() * 0.5,
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      speed: 0.1 + Math.random() * 0.3
    }))
  })
  
  // Use instanced mesh for better performance
  useFrame(({ clock }) => {
    if (!mesh.current) return
    
    const time = clock.getElapsedTime()
    
    for (let i = 0; i < count; i++) {
      const idx = i * 16
      const { position, scale, rotation, speed } = graphData[i]
      
      // Create matrix for each instance
      const matrix = new THREE.Matrix4()
      
      // Apply floating animation
      const y = position[1] + Math.sin(time * speed) * 0.5
      
      // Position + scale + rotation
      matrix.compose(
        new THREE.Vector3(position[0], y, position[2]),
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            rotation[0] + time * 0.05,
            rotation[1] + time * 0.03,
            rotation[2]
          )
        ),
        new THREE.Vector3(scale, scale, scale)
      )
      
      mesh.current.setMatrixAt(i, matrix)
    }
    
    mesh.current.instanceMatrix.needsUpdate = true
  })
  
  // Create graph geometry
  const graphGeometry = useMemo(() => {
    // Create base shape for graph
    const shape = new THREE.Shape()
    const width = 6
    const height = 2
    
    shape.moveTo(-width/2, -height/2)
    shape.lineTo(width/2, -height/2)
    shape.lineTo(width/2, height/2)
    shape.lineTo(-width/2, height/2)
    shape.lineTo(-width/2, -height/2)
    
    // Create extruded geometry for the base
    const extrudeSettings = {
      steps: 1,
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 1
    }
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])
  
  // Material with slight transparency
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xff3333),
    metalness: 0.5,
    roughness: 0.2,
    transmission: 0.2,
    thickness: 0.5,
    transparent: true,
    opacity: 0.9,
    emissive: new THREE.Color(0xff2222),
    emissiveIntensity: 0.2,
  }), [])
  
  return (
    <instancedMesh ref={mesh} args={[graphGeometry, material, count]}>
      {/* Geometry and material provided via args */}
    </instancedMesh>
  )
}

// Optimized particle system
function ParticleField({ count = 2000 }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  // Generate particle data once
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      // Positions - spread particles in a large volume
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100 - 40
      
      // Colors - red theme with variations
      const brightness = Math.random()
      colors[i * 3] = 1 // Red
      colors[i * 3 + 1] = brightness * 0.3 // Some green
      colors[i * 3 + 2] = brightness * 0.3 // Some blue
      
      // Sizes - varying for depth effect
      sizes[i] = Math.random() * 1.5 + 0.5
    }
    
    return [positions, colors, sizes]
  }, [count])
  
  // Update particles each frame
  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    
    const time = clock.getElapsedTime()
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const sizes = pointsRef.current.geometry.attributes.size.array as Float32Array
    
    // Make particles move slowly
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Slow drift motion
      positions[i3] += Math.sin(time * 0.1 + i * 0.01) * 0.02
      positions[i3 + 1] += Math.cos(time * 0.1 + i * 0.01) * 0.02
      positions[i3 + 2] += Math.sin(time * 0.1 + i * 0.01) * 0.02
      
      // Occasional twinkle effect
      if (Math.random() > 0.99) {
        sizes[i] = sizes[i] * (0.8 + Math.random() * 0.4)
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.geometry.attributes.size.needsUpdate = true
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Price lines with dynamic movement
function PriceLines({ count = 5 }) {
  const linesRef = useRef<THREE.Group>(null)
  
  // Create multiple lines
  const lines = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      points: Array.from({ length: 100 }, (_, j) => {
        const x = (j / 100) * 40 - 20
        const y = Math.sin((j / 100) * Math.PI * 4 + i) * (1 + i * 0.2)
        const z = (Math.random() - 0.5) * 5 - i * 2
        return new THREE.Vector3(x, y, z)
      }),
      color: new THREE.Color(0xff2222).lerp(new THREE.Color(0xffffff), i / count),
      speed: 0.2 + Math.random() * 0.6
    }))
  , [count])
  
  // Update line positions
  useFrame(({ clock }) => {
    if (!linesRef.current) return
    
    const time = clock.getElapsedTime()
    
    lines.forEach((line, lineIndex) => {
      const lineObj = linesRef.current?.children[lineIndex] as THREE.Line
      
      if (lineObj && lineObj.geometry.attributes.position) {
        const positions = lineObj.geometry.attributes.position.array as Float32Array
        
        for (let i = 0; i < line.points.length; i++) {
          const i3 = i * 3
          const normalizedI = i / line.points.length
          
          // Create realistic price movements with some randomness
          const y = Math.sin(normalizedI * Math.PI * 4 + time * line.speed + lineIndex) * (1 + lineIndex * 0.2)
          const y2 = Math.sin(normalizedI * Math.PI * 8 + time * line.speed * 1.3 + lineIndex * 1.5) * (0.3 + lineIndex * 0.1)
          
          positions[i3 + 1] = y + y2
        }
        
        lineObj.geometry.attributes.position.needsUpdate = true
      }
    })
  })
  
  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={line.points.length}
              array={new Float32Array(line.points.flatMap(v => [v.x, v.y, v.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={line.color}
            linewidth={1}
            transparent
            opacity={0.8}
          />
        </line>
      ))}
    </group>
  )
}

// Scene component containing all 3D elements
function Scene() {
  const { camera } = useThree()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Handle mouse movement for camera interaction
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  // Update camera position based on mouse
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.x * 5, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2 + mousePosition.y * 2, 0.05)
    camera.lookAt(0, 0, 0)
  })
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <pointLight position={[0, 2, 5]} color={0xff3030} intensity={1} distance={20} />
      <pointLight position={[-10, -5, 5]} color={0x3333ff} intensity={0.7} distance={20} />
      
      {/* Grid */}
      <gridHelper args={[150, 60, 0x444444, 0x222222]} position={[0, -3.5, 0]} rotation={[Math.PI / 2, 0, 0]} />
      
      {/* 3D Elements */}
      <TradingGraphs count={12} />
      <ParticleField count={2000} />
      <PriceLines count={5} />
      
      {/* Environment */}
      <fog attach="fog" args={['#000000', 0.01, 80]} />
    </>
  )
}

interface OptimizedBackgroundProps {
  className?: string;
}

// Main background component using React Three Fiber for better performance
const OptimizedBackground: React.FC<OptimizedBackgroundProps> = ({ className }) => {
  const [dpr, setDpr] = useState(1.5)
  
  return (
    <div 
      className={className}
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: -1, 
        overflow: 'hidden' 
      }}
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 2, 15], fov: 75, near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          logarithmicDepthBuffer: true,
        }}
      >
        <Suspense fallback={null}>
          <Scene />
          <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(Math.min(2, window.devicePixelRatio))} />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default OptimizedBackground 