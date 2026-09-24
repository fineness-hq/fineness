'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Bullion3DProps {
  className?: string;
  size?: number;
}

/**
 * Interactive Realtime 3D Bullion Ingot (WebGL / Three.js):
 * Continuously loops in 3D space with metallic reflections and specular sheen.
 * Supports click & drag interactive orbiting and subtle cursor-following tilt.
 */
export default function Bullion3D({ className = '', size = 260 }: Bullion3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);

    // Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting setup for luxury metallic sheen
    const ambientLight = new THREE.AmbientLight(0xfff6e5, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.5);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const topLight = new THREE.PointLight(0xfff0aa, 2.8, 10);
    topLight.position.set(0, 3, 2);
    scene.add(topLight);

    // Create Ingot Shape (Tapered trapezoidal bullion bar with bevels)
    const shape = new THREE.Shape();
    const w = 1.35;
    const h = 0.72;
    const r = 0.08;

    shape.moveTo(-w + r, -h);
    shape.lineTo(w - r, -h);
    shape.quadraticCurveTo(w, -h, w, -h + r);
    shape.lineTo(w, h - r);
    shape.quadraticCurveTo(w, h, w - r, h);
    shape.lineTo(-w + r, h);
    shape.quadraticCurveTo(-w, h, -w, h - r);
    shape.lineTo(-w, -h + r);
    shape.quadraticCurveTo(-w, -h, -w + r, -h);

    const extrudeSettings = {
      depth: 0.44,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    // Procedural Hallmarked Engraving Texture for the top face
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#c48b0f';
      ctx.fillRect(0, 0, 512, 256);

      // Engraved stamps
      ctx.strokeStyle = '#936306';
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 16, 480, 224);

      ctx.fillStyle = '#6b4803';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('FINENESS', 256, 75);

      ctx.font = 'bold 24px monospace';
      ctx.fillText('• 999.9 FINE GOLD •', 256, 125);

      ctx.font = 'bold 18px monospace';
      ctx.fillText('HALLMARK ASSAY REGISTER', 256, 175);
      ctx.fillText('NET WT 1000g', 256, 210);
    }

    const stampTexture = new THREE.CanvasTexture(canvas);

    // Physically Based Metallic Material (24K Bullion Gold)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xd4a017,
      metalness: 0.88,
      roughness: 0.24,
      clearcoat: 0.4,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });

    const ingot = new THREE.Mesh(geometry, material);
    scene.add(ingot);

    // Interaction states
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotX = 0.35;
    let targetRotY = -0.55;
    let curRotX = targetRotX;
    let curRotY = targetRotY;
    const autoRotateSpeed = 0.012;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      targetRotY += deltaX * 0.012;
      targetRotX += deltaY * 0.012;
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 1200);
    };

    const domElement = renderer.domElement;
    domElement.style.cursor = 'grab';
    domElement.addEventListener('mousedown', onPointerDown);
    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    // Render loop
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Continuous ambient rotation when not manually dragging
      if (!isDragging) {
        targetRotY += autoRotateSpeed;
      }

      // Smooth dampening towards target rotation
      curRotX += (targetRotX - curRotX) * 0.08;
      curRotY += (targetRotY - curRotY) * 0.08;

      ingot.rotation.x = curRotX;
      ingot.rotation.y = curRotY;

      // Gentle floating sine wave bobbing
      ingot.position.y = Math.sin(elapsedTime * 1.8) * 0.08;

      // Slight dynamic light tracking
      topLight.position.x = Math.sin(elapsedTime * 1.5) * 1.5;
      topLight.position.z = Math.cos(elapsedTime * 1.5) * 1.5 + 2;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth || size;
      const newH = container.clientHeight || size;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      domElement.removeEventListener('mousedown', onPointerDown);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);

      geometry.dispose();
      material.dispose();
      stampTexture.dispose();
      renderer.dispose();
      if (domElement.parentElement) {
        domElement.parentElement.removeChild(domElement);
      }
    };
  }, [size]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div
        ref={mountRef}
        className="h-full w-full select-none"
        title="Interactive 3D 999.9 Gold Bullion — Drag to inspect"
      />
      {/* Subtle interaction cue */}
      <span className="mono pointer-events-none absolute bottom-1 text-[9px] uppercase tracking-widest text-[var(--ink-3)] opacity-70">
        {isInteracting ? 'ORBITING • RELEASE TO RESUME LOOP' : 'DRAG TO ROTATE 3D • 60 FPS'}
      </span>
    </div>
  );
}
