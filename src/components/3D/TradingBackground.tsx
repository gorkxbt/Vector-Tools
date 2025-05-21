'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import gsap from 'gsap'

// Custom shader for the glow effect
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

interface TradingBackgroundProps {
  className?: string;
}

const TradingBackground: React.FC<TradingBackgroundProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number>(0);
  const linePointsRef = useRef<THREE.Points[]>([]);
  const floatingCubesRef = useRef<THREE.Mesh[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    cameraRef.current = camera;

    // Create WebGL renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Set up post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Add bloom effect
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.4,  // bloom strength
      0.4,  // bloom radius
      0.85  // bloom threshold
    );
    composer.addPass(bloomPass);

    // Add custom glow shader
    const glowPass = new ShaderPass(glowShader);
    composer.addPass(glowPass);
    composerRef.current = composer;

    // ---------- Create Trading Grid ----------
    const gridHelper = new THREE.GridHelper(80, 80, 0x444444, 0x333333);
    gridHelper.position.y = -4;
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    // ---------- Create Floating Price Lines ----------
    const createPriceLine = (offset: number, amplitude: number, speed: number, particleCount: number) => {
      const points = [];
      const colors = [];
      const sizes = [];
      
      for (let i = 0; i < particleCount; i++) {
        const x = (i / particleCount) * 40 - 20;
        const y = Math.sin((i / particleCount) * Math.PI * 4 + offset) * amplitude;
        const z = (Math.random() - 0.5) * 3;
        
        points.push(x, y, z);
        
        // Color gradient from red to white
        const intensity = i / particleCount;
        colors.push(1, intensity * 0.2 + 0.1, intensity * 0.2 + 0.1);
        
        // Varying sizes with some randomness
        sizes.push(Math.random() * 0.08 + 0.03);
      }
      
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
      
      const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      
      const line = new THREE.Points(geometry, material);
      scene.add(line);
      
      // Store animation properties
      line.userData = { offset, amplitude, speed };
      
      return line;
    };
    
    // Create multiple price lines
    for (let i = 0; i < 6; i++) {
      const line = createPriceLine(
        i * 1.1,
        0.5 + Math.random() * 0.8,
        0.2 + Math.random() * 0.3,
        200
      );
      linePointsRef.current.push(line);
    }

    // ---------- Create Trading Volume Cubes ----------
    const createCube = (x: number, y: number, z: number, scale: number, color: THREE.Color) => {
      const geometry = new THREE.BoxGeometry(scale, scale, scale);
      const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.7,
        roughness: 0.2,
        emissive: color,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.9,
      });
      
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(cube);
      
      // Store original position for animation
      cube.userData = {
        originalPosition: new THREE.Vector3(x, y, z),
        rotationSpeed: new THREE.Vector3(
          Math.random() * 0.01 - 0.005,
          Math.random() * 0.01 - 0.005,
          Math.random() * 0.01 - 0.005
        ),
        floatSpeed: 0.2 + Math.random() * 0.3,
        floatOffset: Math.random() * Math.PI * 2,
      };
      
      return cube;
    };
    
    // Create trading volume cubes
    const redColor = new THREE.Color(0xff2020);
    const gradientColor = new THREE.Color(0xff4040);
    
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10 - 5;
      const scale = 0.1 + Math.random() * 0.3;
      
      // Mix between the main red and a lighter gradient
      const color = redColor.clone().lerp(gradientColor, Math.random() * 0.5);
      
      const cube = createCube(x, y, z, scale, color);
      floatingCubesRef.current.push(cube);
      
      // Initial animation with GSAP
      gsap.to(cube.scale, {
        x: scale * 1.2,
        y: scale * 1.2,
        z: scale * 1.2,
        duration: 1 + Math.random() * 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: Math.random()
      });
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add point light in red color
    const pointLight = new THREE.PointLight(0xff3030, 1, 15);
    pointLight.position.set(0, 2, 5);
    scene.add(pointLight);

    // Mouse move handler for interactive effects
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !composerRef.current) return;
      
      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      const composer = composerRef.current;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !composerRef.current) return;
      
      const delta = clockRef.current.getDelta();
      const elapsedTime = clockRef.current.getElapsedTime();
      
      // Animate the price lines
      linePointsRef.current.forEach((line, index) => {
        if (!line.geometry.attributes.position) return;
        
        const positions = line.geometry.attributes.position.array;
        const { offset, amplitude, speed } = line.userData;
        
        for (let i = 0; i < positions.length; i += 3) {
          const idx = i / 3;
          const x = positions[i];
          const normalizedX = (x + 20) / 40; // normalize to 0-1 range
          
          // Create realistic price movements with some randomness
          // Use different sine waves combined to create a more realistic pattern
          const y = Math.sin(normalizedX * Math.PI * 4 + offset + elapsedTime * speed) * amplitude;
          // Add a second frequency
          const y2 = Math.sin(normalizedX * Math.PI * 8 + offset * 1.5 + elapsedTime * speed * 1.3) * (amplitude * 0.3);
          // Add a third frequency with less impact
          const y3 = Math.sin(normalizedX * Math.PI * 16 + offset * 3 + elapsedTime * speed * 0.7) * (amplitude * 0.1);
          
          positions[i + 1] = y + y2 + y3;
        }
        
        line.geometry.attributes.position.needsUpdate = true;
        
        // Slowly rotate the line
        line.rotation.z = Math.sin(elapsedTime * 0.1 + index) * 0.1;
      });
      
      // Animate the floating cubes
      floatingCubesRef.current.forEach((cube) => {
        const { originalPosition, rotationSpeed, floatSpeed, floatOffset } = cube.userData;
        
        // Rotate the cube
        cube.rotation.x += rotationSpeed.x;
        cube.rotation.y += rotationSpeed.y;
        cube.rotation.z += rotationSpeed.z;
        
        // Make it float up and down
        cube.position.y = originalPosition.y + Math.sin(elapsedTime * floatSpeed + floatOffset) * 0.3;
        
        // React to mouse movement slightly
        cube.position.x = originalPosition.x + mousePosition.x * 0.1;
        cube.position.z = originalPosition.z - mousePosition.y * 0.1;
      });
      
      // Make camera slightly respond to mouse movement
      if (cameraRef.current) {
        gsap.to(cameraRef.current.position, {
          x: mousePosition.x * 0.7,
          y: mousePosition.y * 0.5,
          duration: 1.5,
          ease: "power2.out"
        });
        
        cameraRef.current.lookAt(scene.position);
      }
      
      // Render the scene with post-processing
      composerRef.current.render();
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start the animation loop
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    };
    
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    />
  );
};

export default TradingBackground; 