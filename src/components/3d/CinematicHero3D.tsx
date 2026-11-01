"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  Sparkles,
  ShoppingBag,
  Rotate3d,
  Layers,
  Flame,
  ChevronRight,
  ShieldCheck,
  Truck,
  Eye,
} from "lucide-react";
import Link from "next/link";
import {
  createTShirtModel,
  createShirtModel,
  createHoodieModel,
  createCargoPantsModel,
  createSneakerModel,
  createAccessoriesFleet,
  createGrandShowcaseGroup,
  TShirtObject,
  CargoPantsObject,
  SneakerObject,
  AccessoriesFleetObject,
} from "./models/luxuryGarments";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Scene Metadata for the Cinematic UI Overlay
const SCENES = [
  {
    index: 0,
    number: "01",
    tagline: "ORGANIC HEAVYWEIGHT COTTON • 240 GSM",
    title: "The Oversized",
    highlight: "Silhouette.",
    description:
      "Engineered drape with dropped shoulders and micro-ribbed crew collar. Direct wholesale from Tirupur textile mills with zero retailer markup.",
    categoryLink: "/shop?category=Men",
    badge: "Bio-Washed Cotton",
    stats: { gsm: "240 GSM", fabric: "100% Combed", fit: "Boxy Oversized" },
    accent: "#c084fc",
  },
  {
    index: 1,
    number: "02",
    tagline: "450 GSM FRENCH TERRY • DUAL-PLY HOOD",
    title: "Structural Comfort,",
    highlight: "Architectural Hoodie.",
    description:
      "Plush French terry with heavy-gauge ribbed cuffs, deep kangaroo pouch, and gold-tipped cotton drawstrings. Tailored for all-day streetwear presence.",
    categoryLink: "/shop?category=Men",
    badge: "Heavy French Terry",
    stats: { gsm: "450 GSM", fleece: "Brushed Interior", aglets: "18K Gold Finish" },
    accent: "#ec4899",
  },
  {
    index: 2,
    number: "03",
    tagline: "MODULAR RIPSTOP UTILITY • 8 PIECE ASSEMBLY",
    title: "Tactical Elegance,",
    highlight: "Modular Cargo.",
    description:
      "High-density cotton ripstop with expandable 3D bellows pockets, reinforced knee articulation, and gathered adjustable ankle cuffs.",
    categoryLink: "/shop?category=Men",
    badge: "Tactical Ripstop",
    stats: { pockets: "6 Modular", finish: "Water-Repellent", fit: "Tapered Relaxed" },
    accent: "#34d399",
  },
  {
    index: 3,
    number: "04",
    tagline: "KINETIC AIR-CUSHION CHASSIS • EXPLODED RUNNER",
    title: "Kinetic Sole,",
    highlight: "Aero-Chunky Sneaker.",
    description:
      "Multi-layered construction featuring sculptured shock-absorption midsole, high-traction gum rubber outsole, and reflective laced TPU cage.",
    categoryLink: "/shop?category=Footwear",
    badge: "Kinetic Cushion",
    stats: { sole: "Sculpted EVA", outsole: "Gum Rubber", upper: "Full-Grain Leather" },
    accent: "#f59e0b",
  },
  {
    index: 4,
    number: "05",
    tagline: "CELESTIAL ORBIT • CURATED ACCENTS",
    title: "Curated Statement,",
    highlight: "Luxury Accessories.",
    description:
      "18K gold-finished timepiece with sapphire crystal, structured twill cap, aerodynamic titanium sunglasses, and Tuscan cognac duffel bag.",
    categoryLink: "/shop?category=Accessories",
    badge: "Handcrafted Luxury",
    stats: { watch: "Sapphire Crystal", sunglasses: "UV400 Polarized", bag: "Tuscan Leather" },
    accent: "#38bdf8",
  },
  {
    index: 5,
    number: "06",
    tagline: "THE COMPLETE 2026 ARCHIVE • WHOLESALE DIRECT",
    title: "The Grand",
    highlight: "Fashion Runway.",
    description:
      "Experience all 6 curated categories in unified 3D space. Direct from India's verified textile hubs at genuine wholesale pricing.",
    categoryLink: "/shop",
    badge: "Velora Archive 2026",
    stats: { catalog: "48+ Products", delivery: "Free Pan-India", payment: "COD Available" },
    accent: "#a855f7",
  },
];

export default function CinematicHero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active scene state for HTML HUD overlays
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // References for WebGL objects to animate across RAF & Scroll
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);

  // 3D Model references
  const tShirtRef = useRef<TShirtObject | null>(null);
  const shirtRef = useRef<THREE.Group | null>(null);
  const hoodieRef = useRef<THREE.Group | null>(null);
  const cargoRef = useRef<CargoPantsObject | null>(null);
  const sneakerRef = useRef<SneakerObject | null>(null);
  const accessoriesRef = useRef<AccessoriesFleetObject | null>(null);
  const showcaseRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Normalized mouse coords (-1 to 1)
  const mouseNorm = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Initialize Three.js Scene, Camera, Lighting, Models, and GSAP Timeline
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Soft atmospheric studio fog
    scene.fog = new THREE.FogExp2(0x07090e, 0.038);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    // 4. Studio Lighting System
    // Ambient soft fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    // Key Light (Warm Champagne Studio Light)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.4);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Rim Backlight (Cool Electric Violet/Cyan Rim)
    const rimLight = new THREE.DirectionalLight(0xc084fc, 2.2);
    rimLight.position.set(-6, -2, -5);
    scene.add(rimLight);

    // Dynamic Cursor Tracking Point Light
    const cursorPointLight = new THREE.PointLight(0xf43f5e, 3.5, 12, 1.8);
    cursorPointLight.position.set(0, 0, 4);
    scene.add(cursorPointLight);
    pointLightRef.current = cursorPointLight;

    // 5. Floating Shimmering Dust Particles
    const particleCount = 850;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 32;
      positions[i + 1] = (Math.random() - 0.5) * 26;
      positions[i + 2] = (Math.random() - 0.5) * 28;
      scales[i / 3] = Math.random() * 0.08 + 0.03;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xfacc15, // Golden stardust
      size: 0.055,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // 6. Build and Add All 3D Garments and Showcase Models
    // Scene 1: Oversized T-shirt
    const tshirt = createTShirtModel();
    tshirt.position.set(0, 0, 0);
    scene.add(tshirt);
    tShirtRef.current = tshirt;

    // Scene 2: Shirt (transitional) & Hoodie
    const shirt = createShirtModel();
    shirt.position.set(-8, 3, -4);
    shirt.scale.setScalar(0.85);
    scene.add(shirt);
    shirtRef.current = shirt;

    const hoodie = createHoodieModel();
    hoodie.position.set(8, 0, -2);
    hoodie.scale.setScalar(0.9);
    scene.add(hoodie);
    hoodieRef.current = hoodie;

    // Scene 3: Modular Cargo Pants
    const cargo = createCargoPantsModel();
    cargo.position.set(0, -9, -2);
    cargo.setAssembleProgress(0); // Starts exploded
    scene.add(cargo);
    cargoRef.current = cargo;

    // Scene 4: Kinetic Sneaker
    const sneaker = createSneakerModel();
    sneaker.position.set(0, -9, 0);
    sneaker.scale.setScalar(0.95);
    sneaker.setExplodeProgress(0);
    scene.add(sneaker);
    sneakerRef.current = sneaker;

    // Scene 5: Accessories Fleet
    const accessories = createAccessoriesFleet();
    accessories.position.set(0, 10, -3);
    scene.add(accessories);
    accessoriesRef.current = accessories;

    // Scene 6: Grand Runway Showcase
    const showcase = createGrandShowcaseGroup();
    showcase.position.set(0, -14, 0);
    scene.add(showcase);
    showcaseRef.current = showcase;

    // Initial Camera Load Animation (Slow cinematic glide forward)
    gsap.fromTo(
      camera.position,
      { z: 10.5, y: 1.2 },
      { z: 6.2, y: 0.1, duration: 2.2, ease: "power3.out" }
    );

    // 7. GSAP ScrollTrigger Master Timeline
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // Calculate active scene index (0 through 5)
        const sceneIndex = Math.min(5, Math.floor(p * 6));
        setActiveSceneIdx(sceneIndex);

        // Dynamic light color based on current scene
        if (pointLightRef.current) {
          const colors = [0xc084fc, 0xec4899, 0x34d399, 0xf59e0b, 0x38bdf8, 0xa855f7];
          pointLightRef.current.color.setHex(colors[sceneIndex] || 0xc084fc);
        }

        // ==========================================
        // SCROLL SCENE CHOREOGRAPHY
        // ==========================================

        // --- SCENE 1 (0.00 -> 0.18): Oversized T-Shirt ---
        if (p < 0.2) {
          const localP = p / 0.18; // 0 to 1
          if (tshirt) {
            tshirt.position.set(0, 0, 0);
            tshirt.rotation.y = -0.3 + localP * 0.8;
            tshirt.rotation.x = Math.sin(localP * Math.PI) * 0.12;
            tshirt.scale.setScalar(1.0 + localP * 0.1);
          }
          if (camera) {
            camera.position.z = THREE.MathUtils.lerp(6.2, 5.0, localP);
            camera.position.y = THREE.MathUtils.lerp(0.1, -0.1, localP);
          }
        } else {
          // Fly shirt away upwards & backwards
          const exitP = Math.min(1, (p - 0.18) / 0.1);
          if (tshirt) {
            tshirt.position.y = exitP * 7.0;
            tshirt.position.z = -exitP * 6.0;
            tshirt.rotation.x = -exitP * 1.2;
          }
        }

        // --- SCENE 2 (0.18 -> 0.36): Shirt Swoop & Hoodie Entrance ---
        if (p >= 0.15 && p < 0.38) {
          const localP = (p - 0.18) / 0.18; // 0 to 1
          // Shirt swoops across
          if (shirt) {
            shirt.position.x = THREE.MathUtils.lerp(-8, 8, localP);
            shirt.position.y = Math.sin(localP * Math.PI) * 1.5;
            shirt.rotation.y = localP * Math.PI * 1.5;
          }
          // Hoodie enters from right to center
          if (hoodie) {
            const enterP = Math.min(1, Math.max(0, (p - 0.18) / 0.12));
            hoodie.position.x = THREE.MathUtils.lerp(8, 0, enterP);
            hoodie.position.y = THREE.MathUtils.lerp(1, 0, enterP);
            hoodie.position.z = THREE.MathUtils.lerp(-2, 0.4, enterP);
            hoodie.rotation.y = THREE.MathUtils.lerp(Math.PI, 0.2, enterP) + localP * 0.6;
          }
          if (camera) {
            camera.position.z = THREE.MathUtils.lerp(5.0, 5.4, Math.min(1, localP));
            camera.rotation.y = Math.sin(localP * Math.PI) * 0.15;
          }
        } else if (p >= 0.38) {
          if (hoodie) {
            const exitP = Math.min(1, (p - 0.38) / 0.08);
            hoodie.position.x = -exitP * 8.5;
            hoodie.position.z = -exitP * 5.0;
          }
        }

        // --- SCENE 3 (0.36 -> 0.54): Cargo Pants Assembly & Fabric Waves ---
        if (p >= 0.34 && p < 0.55) {
          const localP = Math.min(1, Math.max(0, (p - 0.36) / 0.16));
          if (cargo) {
            cargo.position.y = THREE.MathUtils.lerp(-7, -0.2, Math.min(1, localP * 1.5));
            cargo.position.z = 0;
            // Assemble pieces from exploded state to finished trousers
            cargo.setAssembleProgress(localP);
            cargo.rotation.y = Math.sin(localP * Math.PI * 0.8) * 0.4;
          }
          if (camera) {
            camera.position.z = THREE.MathUtils.lerp(5.4, 5.8, localP);
            camera.position.y = THREE.MathUtils.lerp(-0.1, -0.4, localP);
          }
        } else if (p >= 0.55) {
          if (cargo) {
            const exitP = Math.min(1, (p - 0.55) / 0.08);
            cargo.position.y = -0.2 - exitP * 8.0;
          }
        }

        // --- SCENE 4 (0.54 -> 0.72): Sneaker Enters, Explodes & Reassembles ---
        if (p >= 0.52 && p < 0.73) {
          const localP = (p - 0.54) / 0.18; // 0 to 1
          if (sneaker) {
            sneaker.position.y = THREE.MathUtils.lerp(-8, 0, Math.min(1, localP * 2.2));
            sneaker.rotation.y = localP * Math.PI * 2.0;

            // Explode bell curve: 0 at start, 1.0 at middle (localP=0.5), 0 at end (reassembled)
            const explodeP = Math.sin(Math.min(1, Math.max(0, localP)) * Math.PI);
            sneaker.setExplodeProgress(explodeP * 1.15);
          }
          if (camera) {
            camera.position.z = THREE.MathUtils.lerp(5.8, 5.0, localP);
            camera.position.y = THREE.MathUtils.lerp(-0.4, 0.1, localP);
          }
        } else if (p >= 0.73) {
          if (sneaker) {
            const exitP = Math.min(1, (p - 0.73) / 0.08);
            sneaker.position.z = -exitP * 9;
            sneaker.position.y = exitP * 5;
          }
        }

        // --- SCENE 5 (0.72 -> 0.86): Accessories Orbiting Fleet ---
        if (p >= 0.71 && p < 0.87) {
          const localP = (p - 0.72) / 0.14; // 0 to 1
          if (accessories) {
            accessories.position.y = THREE.MathUtils.lerp(10, 0, Math.min(1, localP * 1.8));
            accessories.position.z = THREE.MathUtils.lerp(-4, 0.5, Math.min(1, localP * 1.5));
            accessories.rotation.y = localP * Math.PI * 1.4;
          }
          if (camera) {
            camera.position.z = THREE.MathUtils.lerp(5.0, 6.2, localP);
            camera.position.y = 0;
          }
        } else if (p >= 0.87) {
          if (accessories) {
            const exitP = Math.min(1, (p - 0.87) / 0.07);
            accessories.position.y = -exitP * 8;
          }
        }

        // --- SCENE 6 (0.86 -> 1.00): Grand Runway Showcase & Luxury CTA ---
        if (p >= 0.85) {
          const localP = (p - 0.86) / 0.14; // 0 to 1
          if (showcase) {
            showcase.position.y = THREE.MathUtils.lerp(-12, 0.2, Math.min(1, localP * 1.6));
            showcase.rotation.y = localP * Math.PI * 0.75;
          }
          if (camera) {
            camera.position.z = THREE.MathUtils.lerp(6.2, 9.2, localP);
            camera.position.y = THREE.MathUtils.lerp(0, 1.2, localP);
          }
        }
      },
    });

    // 8. Responsive Window Resize Handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      // Adjust camera distance for mobile portrait aspect
      if (width < 768) {
        camera.fov = 52;
      } else {
        camera.fov = 42;
      }
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // 9. Mouse Tracking & Magnetic Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseNorm.current.targetX = x;
      mouseNorm.current.targetY = y;
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 10. Animation Render Loop (60 FPS with Damping & Cloth Wave)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse coordinates
      mouseNorm.current.x += (mouseNorm.current.targetX - mouseNorm.current.x) * 0.05;
      mouseNorm.current.y += (mouseNorm.current.targetY - mouseNorm.current.y) * 0.05;

      const { x: mx, y: my } = mouseNorm.current;

      // Dynamic cursor point light tracking in 3D space
      if (pointLightRef.current) {
        pointLightRef.current.position.x = mx * 4.5;
        pointLightRef.current.position.y = my * 3.5;
        pointLightRef.current.position.z = 3.8 + Math.sin(elapsedTime * 2.0) * 0.4;
      }

      // Parallax camera tilt
      if (cameraRef.current) {
        cameraRef.current.position.x = mx * 0.4;
        cameraRef.current.rotation.z = -mx * 0.015;
      }

      // Cloth wave vertex displacement
      if (tShirtRef.current?.updateClothWave) {
        tShirtRef.current.updateClothWave(elapsedTime);
      }

      // Accessories individual floating bobbing
      if (accessoriesRef.current?.updateFloating) {
        accessoriesRef.current.updateFloating(elapsedTime);
      }

      // Drift floating particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.025;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.015) * 0.08;
      }

      // Gentle zero-gravity idle float on active model
      if (tShirtRef.current && scrollProgress < 0.18) {
        tShirtRef.current.position.y = Math.sin(elapsedTime * 1.6) * 0.08;
        tShirtRef.current.rotation.z = Math.cos(elapsedTime * 1.2) * 0.03 + mx * 0.25;
      }

      if (hoodieRef.current && scrollProgress >= 0.18 && scrollProgress < 0.36) {
        hoodieRef.current.rotation.x = my * 0.25;
        hoodieRef.current.rotation.z = -mx * 0.15;
      }

      if (sneakerRef.current && scrollProgress >= 0.54 && scrollProgress < 0.72) {
        sneakerRef.current.rotation.x = 0.2 + my * 0.35;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      st.kill();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Jump to specific scene when clicking navigation dots
  const jumpToScene = useCallback((sceneIndex: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (sceneIndex / 5) * containerHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  const currentScene = SCENES[activeSceneIdx] || SCENES[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[540vh] bg-[#07090e] text-white selection:bg-[#a855f7] selection:text-white"
    >
      {/* Dynamic Cursor Specular Glow (Follows Mouse) */}
      <div
        className="pointer-events-none fixed z-30 w-72 h-72 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[80px] opacity-25 transition-opacity duration-300"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: `radial-gradient(circle, ${currentScene.accent} 0%, transparent 70%)`,
        }}
      />

      {/* Sticky 3D Canvas Viewport (100vh pinned) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Dynamic Studio Gradient Background */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-1000 ease-out"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, rgba(26, 16, 48, 0.45) 0%, rgba(7, 9, 14, 0.95) 70%, #07090e 100%)`,
          }}
        />

        {/* Ambient Subtle Grid Overlay for Luxury Tech Feel */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        {/* The Three.js WebGL Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-10 touch-none"
        />

        {/* ======================================================== */}
        {/* TOP HUD BAR: BRAND IDENTITY & SCENE PROGRESS METERS */}
        {/* ======================================================== */}
        <header className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-8 pt-5 sm:pt-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
              <Rotate3d className="w-4 h-4 text-[#c084fc] animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#c084fc] uppercase">
                  VELORA 3D ARCHIVE
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 text-[9px] px-2 py-0.5 rounded-full border border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  60 FPS WebGL
                </span>
              </div>
              <h1 className="text-xs sm:text-sm font-semibold text-gray-300">
                Interactive Cinematic Lookbook
              </h1>
            </div>
          </div>

          {/* Quick Scene Selector Pills */}
          <nav aria-label="Scene navigation" className="hidden md:flex items-center gap-1.5 bg-black/40 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/15 shadow-2xl">
            {SCENES.map((scene, idx) => (
              <button
                key={scene.number}
                onClick={() => jumpToScene(idx)}
                className={`text-[11px] font-mono px-3 py-1 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${activeSceneIdx === idx
                    ? "bg-white text-black font-bold shadow-md scale-105"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
              >
                <span>{scene.number}</span>
                {activeSceneIdx === idx && (
                  <span className="text-[10px] font-sans font-medium text-black">
                    {scene.badge.split(" ")[0]}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Scroll Progress Dial */}
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/15">
            <span className="text-[11px] font-mono text-gray-300">
              {Math.round(scrollProgress * 100)}%
            </span>
            <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#c084fc] to-[#f43f5e] transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </header>

        {/* ======================================================== */}
        {/* CENTER STAGE: DYNAMIC LUXURY HIGH-FASHION HEADLINES */}
        {/* ======================================================== */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 pointer-events-none flex-1 flex flex-col justify-center">
          <div className="max-w-xl transition-all duration-700 transform">
            {/* Scene Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 mb-3 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
              <span className="text-[11px] font-mono tracking-wider text-gray-200 uppercase font-semibold">
                {currentScene.tagline}
              </span>
            </div>

            {/* Main Headline with Highlight */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white drop-shadow-lg">
              {currentScene.title}{" "}
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-[#c084fc] via-[#f43f5e] to-[#facc15]"
                style={{ textShadow: "0 0 40px rgba(192, 132, 252, 0.4)" }}
              >
                {currentScene.highlight}
              </span>
            </h2>

            {/* Description */}
            <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md drop-shadow">
              {currentScene.description}
            </p>

            {/* Product Tech Spec Chips */}
            <div className="mt-4 flex flex-wrap gap-2 pointer-events-auto">
              {Object.entries(currentScene.stats).map(([k, v]) => (
                <div
                  key={k}
                  className="bg-black/50 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono text-gray-300 flex items-center gap-1.5"
                >
                  <span className="text-gray-500 uppercase">{k}:</span>
                  <span className="font-bold text-white">{v}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons for Active Product */}
            <div className="mt-6 flex items-center gap-3 pointer-events-auto">
              <Link
                href={currentScene.categoryLink}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-black bg-white hover:bg-gradient-to-r hover:from-[#c084fc] hover:to-[#f43f5e] hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_30px_rgba(192,132,252,0.4)] active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop This Category</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => jumpToScene((activeSceneIdx + 1) % 6)}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-xs font-semibold text-gray-300 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all cursor-pointer"
              >
                <span>Next Scene</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM DOCK: INTERACTION HINT & WHOLESALE BADGES */}
        {/* ======================================================== */}
        <footer className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-8 pb-5 sm:pb-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Mouse & Scroll interaction guide */}
          <div className="flex items-center gap-3 text-[11px] text-gray-400 font-mono bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            <span>DRAG / MOVE MOUSE TO ROTATE 3D MODELS</span>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <span className="hidden sm:inline">SCROLL DOWN TO PROGRESS SCENES</span>
          </div>

          {/* Wholesale Trust Indicators */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] text-gray-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>0% Middleman Commission</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-sky-400" />
              <span>Free Pan-India Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Verified Surat & Tirupur Hubs</span>
            </div>
          </div>

          {/* Next Section Indicator */}
          <button
            onClick={() => {
              const el = document.getElementById("home-categories-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 transition-all cursor-pointer"
          >
            <span>Browse Catalog Grid</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </footer>
      </div>
    </div>
  );
}

