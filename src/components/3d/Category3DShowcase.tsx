"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  Rotate3d,
  ShoppingBag,
  Flame,
  Star,
  CheckCircle2,
} from "lucide-react";
import {
  createTShirtModel,
  createShirtModel,
  createHoodieModel,
  createCargoPantsModel,
  createSneakerModel,
  createAccessoriesFleet,
} from "./models/luxuryGarments";

interface CategoryScene {
  id: string;
  name: string;
  subtitle: string;
  itemCount: string;
  startingPrice: string;
  slug: string;
  accent: string;
  lightColor: number;
  highlightText: string;
  description: string;
}

const CATEGORY_SCENES: CategoryScene[] = [
  {
    id: "mens-wear",
    name: "Men's Wear",
    subtitle: "Tirupur 240 GSM Heavy Knits & Streetwear",
    itemCount: "420+ Styles",
    startingPrice: "₹189",
    slug: "/shop?category=Men",
    accent: "#38bdf8",
    lightColor: 0x38bdf8,
    highlightText: "Heavyweight Combed Cotton & Structured Fits",
    description: "Bio-washed boxy tees, relaxed cargo pants, and formal poplin shirts direct from Tirupur textile clusters.",
  },
  {
    id: "womens-wear",
    name: "Women's Wear",
    subtitle: "Surat Jacquard Sarees & Mumbai Western Fits",
    itemCount: "850+ Styles",
    startingPrice: "₹149",
    slug: "/shop?category=Women%20Ethnic",
    accent: "#f43f5e",
    lightColor: 0xf43f5e,
    highlightText: "Banarasi Silks & Fast-Fashion Korean Fits",
    description: "Zari brocade sarees, designer festive kurtis, flared denim, and chic co-ord sets at wholesale mill pricing.",
  },
  {
    id: "shoes",
    name: "Footwear & Shoes",
    subtitle: "Agra Leather Hub & Kinetic Runners",
    itemCount: "260+ Styles",
    startingPrice: "₹349",
    slug: "/shop?category=Footwear",
    accent: "#f59e0b",
    lightColor: 0xf59e0b,
    highlightText: "Shock-Absorbing Chunky Soles & Pure Leather",
    description: "Architectural chunky sneakers, breathable knit runners, and handcrafted genuine leather formals.",
  },
  {
    id: "accessories",
    name: "Luxury Accessories",
    subtitle: "Curated Statement Pieces & Timepieces",
    itemCount: "190+ Styles",
    startingPrice: "₹99",
    slug: "/shop?category=Accessories",
    accent: "#c084fc",
    lightColor: 0xc084fc,
    highlightText: "Sapphire Crystal Watches & Titanium Eyewear",
    description: "Gold-finish analogue chronographs, UV400 polarized shades, structured twill caps, and duffel bags.",
  },
  {
    id: "new-arrivals",
    name: "New Arrivals",
    subtitle: "Weekly Factory Direct Factory Drops",
    itemCount: "120+ Fresh",
    startingPrice: "₹199",
    slug: "/shop?sort=newest",
    accent: "#34d399",
    lightColor: 0x34d399,
    highlightText: "Latest 2026 Streetwear & Festive Trends",
    description: "Fresh off the production lines with zero middleman markups. Updated daily with verified supplier stocks.",
  },
  {
    id: "best-sellers",
    name: "Best Sellers",
    subtitle: "Most Loved by 50,000+ Customers",
    itemCount: "Top 50 Rated",
    startingPrice: "₹149",
    slug: "/shop?rating=4",
    accent: "#e11d48",
    lightColor: 0xe11d48,
    highlightText: "4.8+ Star Rated High Repeat Value Staples",
    description: "Customer verified best-sellers with 7-day hassle-free returns and free Pan-India Cash on Delivery.",
  },
];

export default function Category3DShowcase() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageGroupRef = useRef<THREE.Group | null>(null);
  const spotlightRef = useRef<THREE.SpotLight | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Keep references to loaded category models
  const modelsRef = useRef<Record<string, THREE.Object3D>>({});

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e17, 0.045);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 50);
    camera.position.set(0, 0.4, 5.8);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc084fc, 2.0);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    const spotlight = new THREE.SpotLight(0x38bdf8, 4.0, 15, Math.PI / 4, 0.3);
    spotlight.position.set(0, 5, 2);
    spotlight.target.position.set(0, 0, 0);
    scene.add(spotlight);
    scene.add(spotlight.target);
    spotlightRef.current = spotlight;

    const pointLight = new THREE.PointLight(0x38bdf8, 3.0, 8);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // 5. Stage Platform & Floating Ring
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);
    stageGroupRef.current = stageGroup;

    const ringGeom = new THREE.RingGeometry(2.2, 2.5, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -1.6;
    stageGroup.add(ringMesh);

    // Shimmering particle dust
    const dustCount = 300;
    const dustGeom = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 12;
      dustPos[i + 1] = (Math.random() - 0.5) * 10;
      dustPos[i + 2] = (Math.random() - 0.5) * 10;
    }
    dustGeom.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeom, dustMat);
    scene.add(dust);

    // 6. Pre-generate Category 3D Models
    const m1 = createTShirtModel();
    m1.scale.setScalar(0.9);
    const m2 = createShirtModel();
    m2.scale.setScalar(0.85);
    const m3 = createSneakerModel();
    m3.scale.setScalar(0.95);
    const m4 = createAccessoriesFleet();
    m4.scale.setScalar(0.75);
    const m5 = createHoodieModel();
    m5.scale.setScalar(0.88);
    const m6 = createCargoPantsModel();
    m6.scale.setScalar(0.82);

    const modelArray = [m1, m2, m3, m4, m5, m6];
    modelArray.forEach((m, idx) => {
      m.position.set(0, 0, 0);
      m.visible = idx === 0;
      stageGroup.add(m);
    });

    modelsRef.current = {
      "mens-wear": m1,
      "womens-wear": m2,
      shoes: m3,
      accessories: m4,
      "new-arrivals": m5,
      "best-sellers": m6,
    };

    // 7. RAF Loop
    let animId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      const t = clock.getElapsedTime();

      // Slow majestic rotation of stage platform
      stageGroup.rotation.y = t * 0.35;

      // Soft breathing hover
      stageGroup.position.y = Math.sin(t * 1.5) * 0.08;

      dust.rotation.y = t * 0.02;

      renderer.render(scene, camera);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Smooth Movie-Like Transition when selecting category
  const handleCategorySelect = (idx: number) => {
    setSelectedIdx(idx);
    const targetCategory = CATEGORY_SCENES[idx];
    if (!targetCategory) return;

    // Smoothly morph camera and lighting
    if (spotlightRef.current) {
      gsap.to(spotlightRef.current.color, {
        r: ((targetCategory.lightColor >> 16) & 255) / 255,
        g: ((targetCategory.lightColor >> 8) & 255) / 255,
        b: (targetCategory.lightColor & 255) / 255,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    if (pointLightRef.current) {
      gsap.to(pointLightRef.current.color, {
        r: ((targetCategory.lightColor >> 16) & 255) / 255,
        g: ((targetCategory.lightColor >> 8) & 255) / 255,
        b: (targetCategory.lightColor & 255) / 255,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    // Camera dynamic swoop
    if (cameraRef.current) {
      gsap.fromTo(
        cameraRef.current.position,
        { z: 6.6, y: 0.8 },
        { z: 5.8, y: 0.4, duration: 1.0, ease: "power3.out" }
      );
    }

    // Smooth model morph: fade out old model, rotate stage, fade in new model
    const catKeys = [
      "mens-wear",
      "womens-wear",
      "shoes",
      "accessories",
      "new-arrivals",
      "best-sellers",
    ];

    catKeys.forEach((key, kIdx) => {
      const model = modelsRef.current[key];
      if (model) {
        if (kIdx === idx) {
          model.visible = true;
          gsap.fromTo(
            model.scale,
            { x: 0.5, y: 0.5, z: 0.5 },
            { x: 0.9, y: 0.9, z: 0.9, duration: 0.7, ease: "back.out(1.5)" }
          );
        } else {
          model.visible = false;
        }
      }
    });
  };

  const current = CATEGORY_SCENES[selectedIdx];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#681a72]/10 dark:bg-purple-900/30 text-[#681a72] dark:text-[#c084fc] px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Stages</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Cinematic Category Studios
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-xl">
            Each category is an independent 3D stage. Switch seamlessly like a fashion showcase to preview textures and silhouettes.
          </p>
        </div>

        {/* Category Pill Switcher */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_SCENES.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${
                selectedIdx === idx
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent shadow-lg scale-105"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-[#681a72]"
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] opacity-70">({cat.startingPrice})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Stage Card */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c101b] via-[#090d16] to-[#05070c] border border-gray-800/80 shadow-2xl min-h-[460px] sm:min-h-[520px] flex flex-col lg:flex-row">
        {/* Left Side: 3D Canvas */}
        <div className="relative flex-1 min-h-[320px] sm:min-h-[420px] flex items-center justify-center overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-colors duration-700 opacity-30 blur-3xl"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${current.accent} 0%, transparent 60%)`,
            }}
          />

          <canvas
            ref={canvasRef}
            className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
          />

          {/* Interactive Hint Pill */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-gray-300">
            <Rotate3d className="w-3.5 h-3.5 text-[#38bdf8] animate-spin-slow" />
            <span>Interactive 3D Preview (Auto Orbiting)</span>
          </div>
        </div>

        {/* Right Side: High-Fashion Details & Direct Action */}
        <div className="w-full lg:w-[420px] p-6 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-800/80 bg-black/30 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                style={{
                  color: current.accent,
                  borderColor: `${current.accent}40`,
                  backgroundColor: `${current.accent}15`,
                }}
              >
                {current.subtitle}
              </span>
              <span className="text-xs font-mono text-gray-400">{current.itemCount}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {current.name}
            </h3>

            <p className="mt-2 text-xs sm:text-sm font-semibold text-gray-300">
              {current.highlightText}
            </p>

            <p className="mt-3 text-xs text-gray-400 leading-relaxed">
              {current.description}
            </p>

            {/* Value checklist */}
            <div className="mt-6 space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Middleman Markup (Factory Direct)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Cash on Delivery across 28,000+ Pin Codes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>7-Day Return Guarantee & Quality Assured</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800/80 mt-6 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono text-gray-500">Starting From</span>
              <div className="text-2xl font-black text-white">{current.startingPrice}</div>
            </div>

            <Link
              href={current.slug}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-black bg-white hover:bg-[#c084fc] hover:text-white transition-all shadow-xl hover:shadow-[#c084fc]/30 group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

