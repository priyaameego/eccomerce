export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface ProductVariant {
  name: string;
  sku: string;
  priceModifier?: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Horology" | "Acoustics" | "Apparel" | "Mobility" | "Living";
  subcategory: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  badge?: "Awwwards Winner" | "Masterpiece" | "Exclusive" | "Flash Sale" | "New Arrival" | "Trending";
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  editionText?: string;
  images: string[];
  turntableImages: string[];
  colors: { name: string; hex: string }[];
  sizes?: string[];
  description: string;
  craftsmanship: string;
  specs: Record<string, string>;
  features: string[];
  frequentlyBoughtWith?: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isDeal?: boolean;
  reviews: ProductReview[];
}

export const PRODUCTS: Product[] = [
  {
    id: "prod-horo-01",
    slug: "celestial-orbit-tourbillon",
    title: "AURELIA Celestial Tourbillon",
    subtitle: "Triple-Axis Flying Tourbillon in Forged Grade 5 Titanium",
    category: "Horology",
    subcategory: "Haute Horlogerie",
    brand: "AURELIA Atelier",
    price: 4850,
    originalPrice: 5600,
    discountBadge: "Save 15%",
    badge: "Masterpiece",
    rating: 4.98,
    reviewsCount: 42,
    inStock: true,
    stockCount: 7,
    editionText: "Limited Run of 50 Individually Numbered Pieces",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85",
    ],
    turntableImages: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Obsidian Black", hex: "#121214" },
      { name: "Champagne Titanium", hex: "#D4AF37" },
      { name: "Polar Platinum", hex: "#E5E4E2" },
    ],
    sizes: ["40mm Case", "43mm Case"],
    description: "Designed at the confluence of quantum mechanics and Swiss watchmaking heritage. The Celestial Tourbillon utilizes a gyroscopic triple-axis escapement defying earth gravity with 72 hours of power reserve.",
    craftsmanship: "Milled from a single billet of aeronautical Grade 5 titanium, hand-beveled with black polish anglage, and paired with an aerospace FKM fluoroelastomer strap.",
    specs: {
      "Caliber": "Atelier Calibre 9012 In-House Manual",
      "Power Reserve": "72 Hours via Twin Coaxial Barrels",
      "Case Material": "Grade 5 Aeronautical Titanium / DLC",
      "Crystal": "Curved Double-AR Sapphire Crystal",
      "Water Resistance": "100m / 10 ATM",
      "Strap": "Integrated Fluorocarbon & Alligator Deployant",
    },
    features: [
      "Triple-axis anti-gravity cage oscillating at 21,600 vph",
      "Luminescent Super-LumiNova Grade X1 phosphorescence",
      "Exhibition caseback showing Geneva striping and blued screws",
      "Micro-rotor charging auxiliary capacitive kinetic reserve",
    ],
    frequentlyBoughtWith: ["prod-sound-01", "prod-app-01"],
    isFeatured: true,
    isTrending: true,
    isDeal: false,
    reviews: [
      {
        id: "rev-1",
        userName: "Julian Von Berg",
        rating: 5,
        date: "2 days ago",
        title: "Transcends Traditional Horology",
        comment: "The hand-finishing rivals independent Geneva ateliers. The weight distribution on the wrist is absolute perfection.",
        verified: true,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "rev-2",
        userName: "Alistair Sterling",
        rating: 5,
        date: "1 week ago",
        title: "A mechanical sculpture",
        comment: "The 3D depth of the dial under direct sunlight is spellbinding. Worth every dollar.",
        verified: true,
      },
    ],
  },
  {
    id: "prod-sound-01",
    slug: "aether-spatial-anc-headphones",
    title: "AETHER Spatial Pro Headphones",
    subtitle: "Planar Magnetic Drivers with Real-Time Acoustic Raytracing",
    category: "Acoustics",
    subcategory: "Headphones",
    brand: "AETHER Sound",
    price: 890,
    originalPrice: 1050,
    discountBadge: "Save $160",
    badge: "Awwwards Winner",
    rating: 4.96,
    reviewsCount: 128,
    inStock: true,
    stockCount: 14,
    editionText: "Studio Edition With CNC Aluminum Carrying Vault",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1520523839898-5071219b7a42?auto=format&fit=crop&w=1200&q=85",
    ],
    turntableImages: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Space Graphite", hex: "#1C1C1E" },
      { name: "Silver Lunar", hex: "#E1E1E6" },
      { name: "Midnight Cognac", hex: "#634735" },
    ],
    description: "Spatial audio engineered with custom 50mm beryllium-coated planar magnetic drivers. Experience the concert hall acoustic reverberation calibrated directly to your ear canal geometry.",
    craftsmanship: "Memory foam ear cushions clad in organic lambskin leather and CNC machined anodized aluminum arms with zero friction magnetic ball bearings.",
    specs: {
      "Transducer": "50mm Planar Magnetic Beryllium Diaphragm",
      "Frequency Response": "4Hz - 54,000Hz Ultra-Hi-Res",
      "Battery Life": "48 Hours with Hybrid ANC active",
      "Connectivity": "Lossless Bluetooth 5.4, aptX Lossless, USB-C DAC",
      "Weight": "345 grams",
      "Microphones": "8 Beamforming MEMS arrays with wind cancellation",
    },
    features: [
      "Adaptive Active Noise Cancellation canceling 98.4% of ambient spectrum",
      "True 32-bit/384kHz internal audiophile digital-to-analog converter",
      "Haptic rotary crown inspired by luxury camera lens apertures",
      "Multi-point instant pairing between 4 devices simultaneously",
    ],
    frequentlyBoughtWith: ["prod-horo-01", "prod-liv-01"],
    isFeatured: true,
    isTrending: true,
    isDeal: true,
    reviews: [
      {
        id: "rev-s1",
        userName: "Elena Rostova",
        rating: 5,
        date: "Yesterday",
        title: "Pure acoustic euphoria",
        comment: "The soundstage is wider than my open-back reference monitors. ANC produces zero cabin pressure sensation.",
        verified: true,
      },
    ],
  },
  {
    id: "prod-app-01",
    slug: "carbon-aeroflex-kinetic-sneakers",
    title: "VÉLURE Aeroflex Cyber Runner",
    subtitle: "Generative 3D Lattice Midsole with Carbon Fiber Propulsion",
    category: "Apparel",
    subcategory: "Footwear",
    brand: "VÉLURE Lab",
    price: 640,
    originalPrice: 750,
    discountBadge: "Save 15%",
    badge: "Trending",
    rating: 4.91,
    reviewsCount: 89,
    inStock: true,
    stockCount: 18,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
    ],
    turntableImages: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Crimson Volt", hex: "#EF4444" },
      { name: "Matte Cyber Black", hex: "#0F172A" },
      { name: "Chalk Alabaster", hex: "#F8FAFC" },
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    description: "Born from computational fluid dynamics and kinetic anatomy. The Aeroflex Cyber Runner utilizes a generative 3D printed elastomeric lattice that returns 91% of strike energy with every stride.",
    craftsmanship: "Constructed with single-thread bio-engineered Vectran woven upper, Kevlar abrasion shields, and an articulated full-length carbon composite torsion shank.",
    specs: {
      "Midsole": "Carbon 3D Generative Photopolymer Lattice",
      "Upper": "Vectran High-Tenacity Monofilament Mesh",
      "Plating": "Dual-curved Toray T1000 Carbon Fiber Plate",
      "Drop": "8mm Heel-to-toe differential",
      "Weight": "218 grams (Size 10)",
    },
    features: [
      "91.2% measured kinetic energy return coefficient",
      "Dynamic adaptive tension lacing system with micro-adjust dials",
      "Laser-siped Continental rubber traction compound",
      "Water-repellent nanotech hydrophobic plasma treatment",
    ],
    frequentlyBoughtWith: ["prod-app-02", "prod-sound-01"],
    isFeatured: true,
    isTrending: true,
    isDeal: false,
    reviews: [
      {
        id: "rev-c1",
        userName: "Marcus Vance",
        rating: 5,
        date: "3 days ago",
        title: "Walking on future clouds",
        comment: "Unbelievable energy return. The look turns heads everywhere from Tokyo to Milan.",
        verified: true,
      },
    ],
  },
  {
    id: "prod-mob-01",
    slug: "tesla-vision-cyber-transporter",
    title: "VÉLURE Horizon Hyper-Scooter",
    subtitle: "Dual Mag-Drive Electric Commuter with Carbon Monocoque",
    category: "Mobility",
    subcategory: "Urban Mobility",
    brand: "VÉLURE Mobility",
    price: 3200,
    originalPrice: 3800,
    discountBadge: "Save $600",
    badge: "Exclusive",
    rating: 4.97,
    reviewsCount: 37,
    inStock: true,
    stockCount: 5,
    editionText: "Signature Founders Edition with Titanium Serial Plate",
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=85",
    ],
    turntableImages: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558981803-3e0e7a56114b?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Stealth Satin Carbon", hex: "#1A1A1A" },
      { name: "Hyper Titanium", hex: "#A8A8A8" },
      { name: "Electrum Gold", hex: "#E0B034" },
    ],
    description: "Aerodynamic electric personal transporter conceived for the urban hyper-grid. Accelerates from 0 to 45 km/h with silent magnetic levitation flux motors.",
    craftsmanship: "One-piece molded aerospace carbon fiber unibody with integrated laser headlamps and smart biometric fingerprint ignition on the handlebar.",
    specs: {
      "Motor": "Dual 1,800W Brushless Flux Vector Motors (3.6kW Peak)",
      "Top Speed": "65 km/h (Electronically governed to 45 km/h)",
      "Range": "95 km per charge",
      "Charging": "Supercharge 80% in 35 Minutes via GaN Charger",
      "Frame": "T800 Monocoque Carbon Fiber",
      "Suspension": "Dual Hydropneumatic Adjustable Dampers",
    },
    features: [
      "GPS anti-theft tracking with satellite cellular telemetry",
      "Regenerative electromagnetic braking recovering 22% battery",
      "Integrated 5-inch OLED instrument cluster with Apple CarPlay",
      "Foldable with patented one-click aerospace titanium hinge",
    ],
    frequentlyBoughtWith: ["prod-horo-01", "prod-sound-01"],
    isFeatured: true,
    isTrending: false,
    isDeal: false,
    reviews: [
      {
        id: "rev-m1",
        userName: "Dmitri Kazakov",
        rating: 5,
        date: "5 days ago",
        title: "The McLaren of Urban Travel",
        comment: "Silent, blistering torque, and the carbon fiber weave finish is automotive showroom quality.",
        verified: true,
      },
    ],
  },
  {
    id: "prod-liv-01",
    slug: "eclipse-ambient-luminaire-monolith",
    title: "ECLIPSE Kinetic Light Monolith",
    subtitle: "Autonomous Circadian Ambient Sculpture with Hand-Blown Borosilicate",
    category: "Living",
    subcategory: "Sensory & Lighting",
    brand: "AURELIA Living",
    price: 1850,
    originalPrice: 2200,
    discountBadge: "Save $350",
    badge: "Flash Sale",
    rating: 4.95,
    reviewsCount: 54,
    inStock: true,
    stockCount: 9,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85",
    ],
    turntableImages: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Brushed Brass Champagne", hex: "#C5A059" },
      { name: "Anodized Black Slate", hex: "#18181B" },
      { name: "Polished Mirror Chrome", hex: "#D1D5DB" },
    ],
    description: "An optical marvel designed to mimic the natural solar spectrum from dawn golden hour to deep lunar blue. Features a silent magnetic floating lunar disk that slowly orbits along the monolith.",
    craftsmanship: "Machined from solid brass and volcanic basalt stone base. The optical lenses are precision hand-polished borosilicate crystal.",
    specs: {
      "Light Source": "Full-Spectrum 99 CRI SunLike LED Engine",
      "Color Temperature": "1800K Candlelight to 6500K Solar Noon",
      "Luminance": "Up to 3,200 Lumens (Stepless PWM Dimmable)",
      "Control": "Capacitive brass touch surface & Matter/Thread IoT",
      "Dimensions": "120cm Height x 18cm Diameter",
      "Base": "Solid Italian Nero Marquina Marble (9.5 kg)",
    },
    features: [
      "Autonomous circadian rhythm tracking matching your local sunrise/sunset",
      "Floating magnetic core levitating with zero mechanical noise",
      "Integrated ultrasonic subtle aroma diffuser chamber",
      "Compatible with Apple HomeKit, Google Home, and Alexa",
    ],
    frequentlyBoughtWith: ["prod-sound-01", "prod-horo-01"],
    isFeatured: true,
    isTrending: true,
    isDeal: true,
    reviews: [
      {
        id: "rev-l1",
        userName: "Camille Dupont",
        rating: 5,
        date: "4 days ago",
        title: "Atmosphere redefined",
        comment: "The lighting transforms our penthouse every evening into a sanctuary. Guests are mesmerized.",
        verified: true,
      },
    ],
  },
  {
    id: "prod-app-02",
    slug: "aurelia-graphene-thermal-trench",
    title: "AURELIA Obsidian Graphene Trench",
    subtitle: "Adaptive Climate Membrane with Liquid-Repellent Nanostructure",
    category: "Apparel",
    subcategory: "Outerwear",
    brand: "AURELIA Atelier",
    price: 1450,
    originalPrice: 1680,
    discountBadge: "Save 14%",
    badge: "Exclusive",
    rating: 4.93,
    reviewsCount: 31,
    inStock: true,
    stockCount: 11,
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
    ],
    turntableImages: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Void Black", hex: "#0A0A0A" },
      { name: "Storm Taupe", hex: "#4B4844" },
    ],
    sizes: ["S (46)", "M (48)", "L (50)", "XL (52)"],
    description: "Sculpted sartorial elegance meets quantum nanomaterials. Graphene atomic lattice distributes body warmth evenly across sub-zero conditions while breathing effortlessly in mild climates.",
    craftsmanship: "Tailored in Biella, Italy using custom 12-micron Australian Merino wool reinforced with atomic graphene mono-layers and matte titanium Fidlock magnetic closures.",
    specs: {
      "Fabric": "Super 180s Wool with Graphene Nanoplatelet Grid",
      "Waterproofing": "20,000mm Hydrostatic Head Rating",
      "Breathability": "25,000 g/m²/24h RET < 4",
      "Hardware": "CNC Anodized Aircraft Titanium & Magnetic Snaps",
    },
    features: [
      "Concealed Faraday cage pocket blocking RFID & wireless skimming",
      "Thermal regulation keeps core temperature constant between -10°C to +20°C",
      "Laser-welded sonic seam taping for zero water entry",
    ],
    frequentlyBoughtWith: ["prod-app-01", "prod-horo-01"],
    isFeatured: false,
    isTrending: true,
    isDeal: false,
    reviews: [
      {
        id: "rev-t1",
        userName: "Kenji Sato",
        rating: 5,
        date: "2 weeks ago",
        title: "A masterclass in modern luxury",
        comment: "Flawless silhouette, drape is phenomenal, and it shrugs off torrential rain like liquid glass.",
        verified: true,
      },
    ],
  },
  {
    id: "prod-sound-02",
    slug: "resonance-sphere-spatial-sound-sculpture",
    title: "RESONANCE Floating Audio Sphere",
    subtitle: "Acoustically Transparent Ceramic with 360 Omnidirectional Array",
    category: "Acoustics",
    subcategory: "Speakers",
    brand: "AETHER Sound",
    price: 2400,
    originalPrice: 2800,
    discountBadge: "Save $400",
    badge: "Masterpiece",
    rating: 4.99,
    reviewsCount: 63,
    inStock: true,
    stockCount: 6,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85",
    ],
    turntableImages: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Glazed Carrara Porcelain", hex: "#F3F4F6" },
      { name: "Volcanic Basalt Black", hex: "#18181B" },
      { name: "Mirror Emerald", hex: "#064E3B" },
    ],
    description: "An acoustic sculpture cast in inert resonant ceramic. Eight precision silk-dome tweeters and an opposing dual-force subwoofer deliver 360-degree immersive sonic fidelity.",
    craftsmanship: "Fired three times in Kyoto kilns, then hand-polished with diamond slurry for 48 hours to achieve an uninterrupted gloss surface.",
    specs: {
      "Amplification": "500W RMS Class-D PurePath Ultra-HD",
      "SPL": "108 dB Peak with Zero Harmonic Distortion (<0.001%)",
      "Frequency Response": "24Hz - 38,000Hz",
      "Streaming": "Apple AirPlay 2, Spotify Connect, Roon Ready, Bluetooth 5.4 LE Audio",
      "Weight": "14.2 kg",
    },
    features: [
      "Room acoustic auto-calibration in 3 seconds using ultrasonic spatial pulses",
      "Cast porcelain prevents cabinet resonance and standing waves",
      "Stereo pair linkable with zero latency wireless sync",
    ],
    frequentlyBoughtWith: ["prod-liv-01", "prod-sound-01"],
    isFeatured: true,
    isTrending: false,
    isDeal: true,
    reviews: [
      {
        id: "rev-r1",
        userName: "Oliver Sterling",
        rating: 5,
        date: "3 weeks ago",
        title: "Pure acoustic and visual art",
        comment: "Basses are seismic yet tight as a drum. It anchors our living room like an art gallery piece.",
        verified: true,
      },
    ],
  },
  {
    id: "prod-horo-02",
    slug: "aurelia-chrono-quantum-sapphire",
    title: "AURELIA Chrono Quantum Sapphire",
    subtitle: "Monolithic Transparent Blue Sapphire Case Chronograph",
    category: "Horology",
    subcategory: "Haute Horlogerie",
    brand: "AURELIA Atelier",
    price: 9200,
    originalPrice: 11000,
    discountBadge: "Save $1,800",
    badge: "Masterpiece",
    rating: 5.0,
    reviewsCount: 19,
    inStock: true,
    stockCount: 3,
    editionText: "Ultra-Rare Collection Piece - 10 Worldwide",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
    ],
    turntableImages: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Cyan Blue Sapphire", hex: "#0284C7" },
      { name: "Smoky Crystal", hex: "#52525B" },
    ],
    sizes: ["42mm Bespoke"],
    description: "Carved from a single synthetic corundum sapphire crystal block requiring 900 hours of diamond CNC milling. Every gear train, column wheel, and gold balance spring floats suspended in light.",
    craftsmanship: "Mohs hardness 9 (scratchable only by diamond). Skeletonized movement coated in ruthenium and hand-engraved with celestial constellations.",
    specs: {
      "Case": "Solid Synthetic Blue Corundum Sapphire Crystal",
      "Caliber": "Atelier High-Beat 36,000 vph Flyback Chronograph",
      "Jewels": "41 Rubies",
      "Water Resistance": "50 meters",
    },
    features: [
      "Completely scratchproof sapphire monobloc case",
      "Column wheel flyback chronograph with vertical clutch",
      "Hand-stitched translucent rubber alligator strap",
    ],
    frequentlyBoughtWith: ["prod-horo-01", "prod-sound-02"],
    isFeatured: true,
    isTrending: false,
    isDeal: false,
    reviews: [
      {
        id: "rev-q1",
        userName: "Baron Henri De Valois",
        rating: 5,
        date: "1 month ago",
        title: "A horological milestone",
        comment: "Looking through the sapphire case into the beating heart of the column wheel is transcendental.",
        verified: true,
      },
    ],
  },
];

export const CATEGORIES = [
  {
    name: "Horology",
    slug: "horology",
    tagline: "Mechanical Poetry & Precision Chronometry",
    itemCount: 14,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    subcategories: ["Tourbillons", "Chronographs", "Grand Complications", "Sapphire Monoblocs"],
  },
  {
    name: "Acoustics",
    slug: "acoustics",
    tagline: "Raytraced Spatial Sound & Planar Magnetics",
    itemCount: 22,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    subcategories: ["Planar Headphones", "Ceramic Speakers", "IEM Reference", "Analog DACs"],
  },
  {
    name: "Apparel",
    slug: "apparel",
    tagline: "Kinetic Tailoring & Generative Nanofibers",
    itemCount: 38,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    subcategories: ["3D Lattice Footwear", "Graphene Outerwear", "Sartorial Suits", "Accessories"],
  },
  {
    name: "Mobility",
    slug: "mobility",
    tagline: "Aerodynamic Electric Velocity & Carbon Monocoques",
    itemCount: 9,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    subcategories: ["Hyper Scooters", "Carbon E-Bikes", "Hydrofoil Craft", "Aero Helmets"],
  },
  {
    name: "Living",
    slug: "living",
    tagline: "Sculptural Illumination & Sensory Architecture",
    itemCount: 19,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    subcategories: ["Kinetic Luminaires", "Acoustic Furniture", "Basalt Sculptures", "Aroma Vessels"],
  },
];
