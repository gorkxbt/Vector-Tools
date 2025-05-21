'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'

interface VectorLogoProps {
  className?: string;
  size?: number;
  position?: { x: number; y: number };
  animated?: boolean;
}

const VectorLogo: React.FC<VectorLogoProps> = ({ 
  className, 
  size = 120, 
  position = { x: 0, y: 0 },
  animated = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number>(0);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Set up camera with perspective
    const camera = new THREE.PerspectiveCamera(50, size / size, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create WebGL renderer with transparency
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create a group for the logo elements
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);
    modelRef.current = logoGroup;

    // Create "V" shape with red glowing material
    const createGlowingMaterial = () => {
      return new THREE.MeshStandardMaterial({
        color: 0xff2020,
        emissive: 0xff2020,
        emissiveIntensity: 0.6,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.95
      });
    };

    // Create the "V" from Vector Tools
    const createVShape = () => {
      const leftBar = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 1.8, 0.2),
        createGlowingMaterial()
      );
      leftBar.position.set(-0.5, 0, 0);
      leftBar.rotation.z = Math.PI / 12; // Slight tilt
      
      const rightBar = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 1.8, 0.2),
        createGlowingMaterial()
      );
      rightBar.position.set(0.5, 0, 0);
      rightBar.rotation.z = -Math.PI / 12; // Slight tilt

      return [leftBar, rightBar];
    };

    // Create orbiting particles
    const createParticles = () => {
      const particleCount = 25;
      const particles = new THREE.Group();
      
      for (let i = 0; i < particleCount; i++) {
        const size = 0.03 + Math.random() * 0.05;
        const geometry = new THREE.SphereGeometry(size, 8, 8);
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(1, 0.3 + Math.random() * 0.7, 0.3 + Math.random() * 0.2),
          transparent: true,
          opacity: 0.7
        });
        
        const particle = new THREE.Mesh(geometry, material);
        
        // Position in a ring around the logo
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 1.2 + Math.random() * 0.3;
        particle.position.x = Math.cos(angle) * radius;
        particle.position.y = Math.sin(angle) * radius;
        particle.position.z = (Math.random() - 0.5) * 0.5;
        
        // Store particle data for animation
        particle.userData = {
          angle,
          radius,
          speed: 0.2 + Math.random() * 0.3,
          pulseSpeed: 0.5 + Math.random() * 0.5
        };
        
        particles.add(particle);
      }
      
      return particles;
    };

    // Create energy beam in the center
    const createEnergyBeam = () => {
      const geometry = new THREE.CylinderGeometry(0.02, 0.02, 2.5, 8, 1, true);
      const material = new THREE.MeshBasicMaterial({
        color: 0xff3333,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      
      const cylinder = new THREE.Mesh(geometry, material);
      cylinder.rotation.x = Math.PI / 2;
      cylinder.position.z = -0.5;
      
      return cylinder;
    };

    // Add V shape parts
    const vParts = createVShape();
    vParts.forEach(part => logoGroup.add(part));
    
    // Add particles
    const particles = createParticles();
    logoGroup.add(particles);
    
    // Add energy beam
    const beam = createEnergyBeam();
    logoGroup.add(beam);

    // Add subtle ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add point light for highlights
    const pointLight = new THREE.PointLight(0xff3030, 1, 10);
    pointLight.position.set(3, 3, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !modelRef.current) return;
      
      const delta = clockRef.current.getDelta();
      const elapsedTime = clockRef.current.getElapsedTime();
      
      // Only animate if required
      if (animated) {
        // Rotate the entire logo subtly
        modelRef.current.rotation.y = Math.sin(elapsedTime * 0.3) * 0.2;
        modelRef.current.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
        
        // Animate particles
        particles.children.forEach((particle: THREE.Mesh, i) => {
          const data = particle.userData;
          
          // Update particle position - orbit around the logo
          data.angle += data.speed * delta;
          particle.position.x = Math.cos(data.angle) * data.radius;
          particle.position.y = Math.sin(data.angle) * data.radius;
          
          // Pulse the particles
          const scale = 0.8 + Math.sin(elapsedTime * data.pulseSpeed) * 0.2;
          particle.scale.set(scale, scale, scale);
          
          // Random z movement
          particle.position.z = Math.sin(elapsedTime * 0.5 + i) * 0.2;
          
          // Pulse opacity
          if (particle.material instanceof THREE.MeshBasicMaterial) {
            particle.material.opacity = 0.4 + Math.sin(elapsedTime * data.pulseSpeed) * 0.3;
          }
        });
        
        // Pulse the beam
        if (beam.material instanceof THREE.MeshBasicMaterial) {
          beam.material.opacity = 0.5 + Math.sin(elapsedTime * 2) * 0.3;
        }
        
        // Animate the V bars
        vParts.forEach((part, i) => {
          const direction = i === 0 ? 1 : -1;
          part.position.y = Math.sin(elapsedTime * 0.8) * 0.05;
          part.rotation.z = (Math.PI / 12) * direction + Math.sin(elapsedTime) * 0.03 * direction;
        });
      }
      
      // Render the scene
      rendererRef.current.render(scene, camera);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Initial animation using GSAP
    gsap.from(logoGroup.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      onComplete: () => {
        gsap.to(logoGroup.rotation, {
          y: Math.PI * 2,
          duration: 2,
          ease: "power2.inOut"
        });
      }
    });
    
    // Start the animation loop
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      const renderer = rendererRef.current;
      renderer.setSize(size, size);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [size, animated]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
};

export default VectorLogo; 