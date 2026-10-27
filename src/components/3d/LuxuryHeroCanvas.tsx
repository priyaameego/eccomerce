"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LuxuryHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return; // Fallback if WebGL fails
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for mouse interaction
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Centerpiece: Faceted Icosahedron Gem (Haute Horlogerie / Titanium Core)
    const geometry = new THREE.IcosahedronGeometry(1.7, 0);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x12131a,
      emissive: 0x1a1508,
      roughness: 0.15,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(geometry, material);
    mainGroup.add(coreMesh);

    // Wireframe Cage around Core (Gold Atelier Lines)
    const wireGeo = new THREE.IcosahedronGeometry(1.74, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // Orbital Ring 1: Champagne Gold Torus
    const ring1Geo = new THREE.TorusGeometry(2.6, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    // Orbital Ring 2: Platinum Torus
    const ring2Geo = new THREE.TorusGeometry(3.1, 0.018, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xe5e4e2,
      metalness: 0.95,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    mainGroup.add(ring2);

    // Floating Gold Dust Particle Constellation
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.2 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      scales[i] = Math.random() * 2 + 1;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf5e7b2,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xd4af37, 3, 20);
    goldPointLight.position.set(4, 5, 4);
    scene.add(goldPointLight);

    const cyanRimLight = new THREE.PointLight(0x38bdf8, 2, 20);
    cyanRimLight.position.set(-5, -3, -3);
    scene.add(cyanRimLight);

    const followLight = new THREE.PointLight(0xffffff, 2, 15);
    followLight.position.set(0, 0, 5);
    scene.add(followLight);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;

      followLight.position.x = x * 6;
      followLight.position.y = -y * 6;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate groups
      mainGroup.rotation.y = elapsedTime * 0.2 + mouseX;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.2 + mouseY;

      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.y = -elapsedTime * 0.2;

      // Gentle floating oscillation
      mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.12;

      // Slow particle rotation
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[420px] md:min-h-[560px] pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center"
      title="Interactive 3D Atelier Sculpture - Move cursor to orbit"
    >
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-panel text-[11px] font-mono tracking-widest text-[#d4af37] uppercase pointer-events-none flex items-center gap-2 border border-[#d4af37]/30 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
        Interactive WebGL 3D • Move Mouse To Orbit
      </div>
    </div>
  );
}
