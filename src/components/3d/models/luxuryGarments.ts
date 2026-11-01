import * as THREE from "three";

/**
 * Procedural Luxury 3D Garments and Accessories for Three.js WebGL Engine
 * Crafted with physical materials, specular highlights, and modular components
 * for smooth 60 FPS animation without asset loading lag.
 */

// Helper to create rounded cylinder/capsule parts
function createRoundedCylinder(
  radiusTop: number,
  radiusBottom: number,
  height: number,
  radialSegments = 32
): THREE.Mesh {
  const geom = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
  return new THREE.Mesh(geom);
}

// -------------------------------------------------------------
// 1. OVERSIZED T-SHIRT (240 GSM Heavyweight Cotton)
// -------------------------------------------------------------
export interface TShirtObject extends THREE.Group {
  updateClothWave?: (time: number) => void;
}

export function createTShirtModel(): TShirtObject {
  const group = new THREE.Group() as TShirtObject;
  group.name = "tshirt-root";

  // Luxury 240 GSM Matte Cotton Material
  const cottonMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#181b22"), // Deep charcoal onyx
    roughness: 0.85,
    metalness: 0.05,
    clearcoat: 0.12,
    clearcoatRoughness: 0.4,
    sheen: 0.8,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color("#c084fc"), // Subtle royal purple iridescent sheen
    side: THREE.DoubleSide,
  });

  // Torso (Relaxed boxy oversized silhouette)
  const torsoGeom = new THREE.CylinderGeometry(1.25, 1.35, 2.4, 32, 16);
  // Flatten torso slightly along Z axis for realistic chest depth
  torsoGeom.scale(1.0, 1.0, 0.55);
  const torsoMesh = new THREE.Mesh(torsoGeom, cottonMaterial);
  torsoMesh.castShadow = true;
  torsoMesh.receiveShadow = true;
  torsoMesh.position.y = 0;
  group.add(torsoMesh);

  // Ribbed Crewneck Collar
  const collarGeom = new THREE.TorusGeometry(0.55, 0.08, 16, 32);
  collarGeom.scale(1.1, 0.7, 1.0);
  const collarMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#12141a"),
    roughness: 0.9,
  });
  const collarMesh = new THREE.Mesh(collarGeom, collarMat);
  collarMesh.rotation.x = Math.PI / 2;
  collarMesh.position.set(0, 1.18, 0);
  group.add(collarMesh);

  // Dropped Left Sleeve
  const sleeveGeom = new THREE.CylinderGeometry(0.48, 0.44, 1.1, 24);
  sleeveGeom.scale(1.0, 1.0, 0.6);
  const leftSleeve = new THREE.Mesh(sleeveGeom, cottonMaterial);
  leftSleeve.position.set(-1.45, 0.65, 0);
  leftSleeve.rotation.z = Math.PI / 3.8;
  leftSleeve.castShadow = true;
  group.add(leftSleeve);

  // Dropped Right Sleeve
  const rightSleeve = leftSleeve.clone();
  rightSleeve.position.set(1.45, 0.65, 0);
  rightSleeve.rotation.z = -Math.PI / 3.8;
  group.add(rightSleeve);

  // Bottom Hem Rim
  const hemGeom = new THREE.TorusGeometry(1.35, 0.04, 12, 32);
  hemGeom.scale(1.0, 0.55, 1.0);
  const hemMesh = new THREE.Mesh(hemGeom, collarMat);
  hemMesh.rotation.x = Math.PI / 2;
  hemMesh.position.set(0, -1.2, 0);
  group.add(hemMesh);

  // Minimalist High-Density Chest Logo (Velora Studio Monogram)
  const logoGeom = new THREE.PlaneGeometry(0.35, 0.12);
  const logoMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#e2e8f0"),
    roughness: 0.2,
    metalness: 0.8,
  });
  const logoMesh = new THREE.Mesh(logoGeom, logoMat);
  logoMesh.position.set(0.45, 0.45, 0.38);
  group.add(logoMesh);

  // Cloth micro-wave wave simulation (Vertex oscillation)
  const posAttribute = torsoGeom.attributes.position;
  const originalPositions = new Float32Array(posAttribute.array);

  group.updateClothWave = (time: number) => {
    const array = posAttribute.array as Float32Array;
    for (let i = 0; i < array.length; i += 3) {
      const origX = originalPositions[i];
      const origY = originalPositions[i + 1];
      const origZ = originalPositions[i + 2];

      // Subtle breathing cloth wave displacement
      const wave = Math.sin(origY * 2.5 + time * 2.8) * 0.035 + Math.cos(origX * 2.0 + time * 1.5) * 0.02;
      array[i + 2] = origZ + wave;
    }
    posAttribute.needsUpdate = true;
  };

  return group;
}

// -------------------------------------------------------------
// 2. CRISP TAILORED SHIRT (Banarasi Silk / Fine Oxford Weave)
// -------------------------------------------------------------
export function createShirtModel(): THREE.Group {
  const group = new THREE.Group();
  group.name = "shirt-root";

  // Tailored Italian Oxford / Banarasi Weave Material
  const shirtMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#1e293b"), // Slate luxury navy
    roughness: 0.6,
    metalness: 0.1,
    clearcoat: 0.2,
    sheen: 0.7,
    sheenColor: new THREE.Color("#38bdf8"), // Cool blue glint
    side: THREE.DoubleSide,
  });

  // Body
  const bodyGeom = new THREE.CylinderGeometry(1.15, 1.25, 2.3, 32);
  bodyGeom.scale(1.0, 1.0, 0.52);
  const body = new THREE.Mesh(bodyGeom, shirtMaterial);
  body.castShadow = true;
  group.add(body);

  // Stiff Spread Collar
  const collarGroup = new THREE.Group();
  const leftCollarGeom = new THREE.ConeGeometry(0.42, 0.75, 4);
  leftCollarGeom.scale(0.8, 1.0, 0.15);
  const collarLapelLeft = new THREE.Mesh(leftCollarGeom, shirtMaterial);
  collarLapelLeft.position.set(-0.35, 1.15, 0.32);
  collarLapelLeft.rotation.set(-0.4, 0.2, -0.6);
  collarGroup.add(collarLapelLeft);

  const collarLapelRight = collarLapelLeft.clone();
  collarLapelRight.position.set(0.35, 1.15, 0.32);
  collarLapelRight.rotation.set(-0.4, -0.2, 0.6);
  collarGroup.add(collarLapelRight);
  group.add(collarGroup);

  // Front Button Placket
  const placketGeom = new THREE.BoxGeometry(0.18, 2.2, 0.05);
  const placketMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#0f172a"),
    roughness: 0.5,
  });
  const placket = new THREE.Mesh(placketGeom, placketMat);
  placket.position.set(0, 0.02, 0.35);
  group.add(placket);

  // Mother-of-Pearl Buttons (5 buttons)
  const buttonGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16);
  const buttonMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#f8fafc"),
    roughness: 0.1,
    metalness: 0.2,
    clearcoat: 0.9,
  });
  for (let i = 0; i < 5; i++) {
    const btn = new THREE.Mesh(buttonGeom, buttonMat);
    btn.rotation.x = Math.PI / 2;
    btn.position.set(0, 0.8 - i * 0.38, 0.39);
    group.add(btn);
  }

  // Sleeves & Cuffs
  const sleeveGeom = new THREE.CylinderGeometry(0.4, 0.32, 1.4, 24);
  sleeveGeom.scale(1.0, 1.0, 0.65);
  const leftSleeve = new THREE.Mesh(sleeveGeom, shirtMaterial);
  leftSleeve.position.set(-1.45, 0.45, 0);
  leftSleeve.rotation.z = Math.PI / 4.2;
  group.add(leftSleeve);

  const rightSleeve = leftSleeve.clone();
  rightSleeve.position.set(1.45, 0.45, 0);
  rightSleeve.rotation.z = -Math.PI / 4.2;
  group.add(rightSleeve);

  return group;
}

// -------------------------------------------------------------
// 3. ARCHITECTURAL HOODIE (450 GSM Heavy French Terry)
// -------------------------------------------------------------
export function createHoodieModel(): THREE.Group {
  const group = new THREE.Group();
  group.name = "hoodie-root";

  // Heavyweight Fleece Material
  const fleeceMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#2a1b3d"), // Midnight Royal Wine
    roughness: 0.9,
    metalness: 0.02,
    sheen: 0.9,
    sheenRoughness: 0.6,
    sheenColor: new THREE.Color("#e879f9"),
    side: THREE.DoubleSide,
  });

  // Boxy Heavy Torso
  const torsoGeom = new THREE.CylinderGeometry(1.3, 1.25, 2.4, 32);
  torsoGeom.scale(1.05, 1.0, 0.65);
  const torso = new THREE.Mesh(torsoGeom, fleeceMaterial);
  torso.castShadow = true;
  group.add(torso);

  // 3D Volumetric Hood
  const hoodGeom = new THREE.SphereGeometry(0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.7);
  hoodGeom.scale(0.95, 1.1, 0.95);
  const hood = new THREE.Mesh(hoodGeom, fleeceMaterial);
  hood.position.set(0, 1.35, -0.2);
  hood.rotation.x = 0.35;
  group.add(hood);

  // Kangaroo Pouch Pocket on Front
  const pouchGeom = new THREE.BoxGeometry(1.2, 0.75, 0.28);
  const pouch = new THREE.Mesh(pouchGeom, fleeceMaterial);
  pouch.position.set(0, -0.4, 0.45);
  pouch.rotation.x = 0.05;
  group.add(pouch);

  // Hanging Drawstrings with Metallic Aglets
  const stringGeom = new THREE.CylinderGeometry(0.02, 0.02, 1.0, 8);
  const stringMat = new THREE.MeshStandardMaterial({ color: "#f3f4f6", roughness: 0.7 });
  const agletGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.15, 12);
  const agletMat = new THREE.MeshStandardMaterial({ color: "#d4af37", metalness: 0.9, roughness: 0.2 }); // Gold

  const leftString = new THREE.Mesh(stringGeom, stringMat);
  leftString.position.set(-0.25, 0.6, 0.55);
  leftString.rotation.z = -0.1;
  const leftAglet = new THREE.Mesh(agletGeom, agletMat);
  leftAglet.position.set(0, -0.5, 0);
  leftString.add(leftAglet);
  group.add(leftString);

  const rightString = new THREE.Mesh(stringGeom, stringMat);
  rightString.position.set(0.25, 0.6, 0.55);
  rightString.rotation.z = 0.1;
  const rightAglet = new THREE.Mesh(agletGeom, agletMat);
  rightAglet.position.set(0, -0.5, 0);
  rightString.add(rightAglet);
  group.add(rightString);

  // Volumetric Sleeves
  const sleeveGeom = new THREE.CylinderGeometry(0.55, 0.38, 1.5, 24);
  sleeveGeom.scale(1.0, 1.0, 0.7);
  const leftSleeve = new THREE.Mesh(sleeveGeom, fleeceMaterial);
  leftSleeve.position.set(-1.6, 0.4, 0);
  leftSleeve.rotation.z = Math.PI / 3.6;
  group.add(leftSleeve);

  const rightSleeve = leftSleeve.clone();
  rightSleeve.position.set(1.6, 0.4, 0);
  rightSleeve.rotation.z = -Math.PI / 3.6;
  group.add(rightSleeve);

  return group;
}

// -------------------------------------------------------------
// 4. MODULAR CARGO PANTS (Assembles from 8 distinct pieces)
// -------------------------------------------------------------
export interface CargoPantsObject extends THREE.Group {
  modularPieces: {
    mesh: THREE.Object3D;
    assembledPos: THREE.Vector3;
    assembledRot: THREE.Euler;
    explodedPos: THREE.Vector3;
    explodedRot: THREE.Euler;
  }[];
  setAssembleProgress: (progress: number) => void;
}

export function createCargoPantsModel(): CargoPantsObject {
  const group = new THREE.Group() as CargoPantsObject;
  group.name = "cargo-pants-root";

  // Military Ripstop Tactical Cotton Material
  const cargoMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#16231d"), // Tactical deep forest olive
    roughness: 0.75,
    metalness: 0.1,
    clearcoat: 0.1,
    sheen: 0.6,
    sheenColor: new THREE.Color("#4ade80"),
    side: THREE.DoubleSide,
  });

  const buckleMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#111827"),
    metalness: 0.85,
    roughness: 0.3,
  });

  group.modularPieces = [];

  // Piece 1: Waistband & Belt
  const waistGeom = new THREE.CylinderGeometry(1.15, 1.12, 0.38, 32);
  waistGeom.scale(1.0, 1.0, 0.65);
  const waistMesh = new THREE.Mesh(waistGeom, cargoMaterial);
  group.add(waistMesh);
  group.modularPieces.push({
    mesh: waistMesh,
    assembledPos: new THREE.Vector3(0, 1.3, 0),
    assembledRot: new THREE.Euler(0, 0, 0),
    explodedPos: new THREE.Vector3(0, 4.0, -1.5),
    explodedRot: new THREE.Euler(0.4, 0.5, 0.2),
  });

  // Piece 2: Upper Left Thigh
  const thighGeom = new THREE.CylinderGeometry(0.55, 0.48, 1.2, 24);
  thighGeom.scale(1.0, 1.0, 0.75);
  const leftThigh = new THREE.Mesh(thighGeom, cargoMaterial);
  group.add(leftThigh);
  group.modularPieces.push({
    mesh: leftThigh,
    assembledPos: new THREE.Vector3(-0.48, 0.5, 0),
    assembledRot: new THREE.Euler(0, 0, -0.06),
    explodedPos: new THREE.Vector3(-3.2, 2.0, 2.0),
    explodedRot: new THREE.Euler(-0.5, 0.8, -0.4),
  });

  // Piece 3: Upper Right Thigh
  const rightThigh = leftThigh.clone();
  group.add(rightThigh);
  group.modularPieces.push({
    mesh: rightThigh,
    assembledPos: new THREE.Vector3(0.48, 0.5, 0),
    assembledRot: new THREE.Euler(0, 0, 0.06),
    explodedPos: new THREE.Vector3(3.2, 2.0, 2.0),
    explodedRot: new THREE.Euler(-0.5, -0.8, 0.4),
  });

  // Piece 4: Lower Left Shin
  const shinGeom = new THREE.CylinderGeometry(0.46, 0.38, 1.3, 24);
  shinGeom.scale(1.0, 1.0, 0.75);
  const leftShin = new THREE.Mesh(shinGeom, cargoMaterial);
  group.add(leftShin);
  group.modularPieces.push({
    mesh: leftShin,
    assembledPos: new THREE.Vector3(-0.54, -0.7, 0),
    assembledRot: new THREE.Euler(0, 0, -0.03),
    explodedPos: new THREE.Vector3(-3.8, -2.8, -1.8),
    explodedRot: new THREE.Euler(0.6, -0.4, 0.8),
  });

  // Piece 5: Lower Right Shin
  const rightShin = leftShin.clone();
  group.add(rightShin);
  group.modularPieces.push({
    mesh: rightShin,
    assembledPos: new THREE.Vector3(0.54, -0.7, 0),
    assembledRot: new THREE.Euler(0, 0, 0.03),
    explodedPos: new THREE.Vector3(3.8, -2.8, -1.8),
    explodedRot: new THREE.Euler(0.6, 0.4, -0.8),
  });

  // Piece 6: Left 3D Bellows Cargo Pocket with Tactical Flap
  const pocketGeom = new THREE.BoxGeometry(0.32, 0.52, 0.4);
  const leftPocket = new THREE.Mesh(pocketGeom, cargoMaterial);
  // Pocket flap
  const flapGeom = new THREE.BoxGeometry(0.34, 0.14, 0.42);
  const flapMesh = new THREE.Mesh(flapGeom, buckleMat);
  flapMesh.position.y = 0.24;
  leftPocket.add(flapMesh);
  group.add(leftPocket);
  group.modularPieces.push({
    mesh: leftPocket,
    assembledPos: new THREE.Vector3(-0.95, -0.1, 0.05),
    assembledRot: new THREE.Euler(0, 0, 0.1),
    explodedPos: new THREE.Vector3(-4.5, 0.2, 3.2),
    explodedRot: new THREE.Euler(1.2, 0.8, -0.6),
  });

  // Piece 7: Right 3D Cargo Pocket
  const rightPocket = leftPocket.clone();
  group.add(rightPocket);
  group.modularPieces.push({
    mesh: rightPocket,
    assembledPos: new THREE.Vector3(0.95, -0.1, 0.05),
    assembledRot: new THREE.Euler(0, 0, -0.1),
    explodedPos: new THREE.Vector3(4.5, 0.2, 3.2),
    explodedRot: new THREE.Euler(1.2, -0.8, 0.6),
  });

  // Piece 8: Ankle Cuffs (Gathered Ribbing)
  const cuffGeom = new THREE.TorusGeometry(0.38, 0.06, 16, 24);
  const leftCuff = new THREE.Mesh(cuffGeom, buckleMat);
  leftCuff.rotation.x = Math.PI / 2;
  group.add(leftCuff);
  group.modularPieces.push({
    mesh: leftCuff,
    assembledPos: new THREE.Vector3(-0.55, -1.4, 0),
    assembledRot: new THREE.Euler(Math.PI / 2, 0, 0),
    explodedPos: new THREE.Vector3(-1.8, -4.5, 1.2),
    explodedRot: new THREE.Euler(Math.PI, 0.4, 0),
  });

  const rightCuff = leftCuff.clone();
  group.add(rightCuff);
  group.modularPieces.push({
    mesh: rightCuff,
    assembledPos: new THREE.Vector3(0.55, -1.4, 0),
    assembledRot: new THREE.Euler(Math.PI / 2, 0, 0),
    explodedPos: new THREE.Vector3(1.8, -4.5, 1.2),
    explodedRot: new THREE.Euler(Math.PI, -0.4, 0),
  });

  // Assemble Progress Method (progress: 0 = fully exploded, 1 = fully assembled)
  group.setAssembleProgress = (t: number) => {
    const clamped = Math.max(0, Math.min(1, t));
    group.modularPieces.forEach((p) => {
      // Lerp positions
      p.mesh.position.lerpVectors(p.explodedPos, p.assembledPos, clamped);
      // Interpolate rotation
      p.mesh.rotation.x = THREE.MathUtils.lerp(p.explodedRot.x, p.assembledRot.x, clamped);
      p.mesh.rotation.y = THREE.MathUtils.lerp(p.explodedRot.y, p.assembledRot.y, clamped);
      p.mesh.rotation.z = THREE.MathUtils.lerp(p.explodedRot.z, p.assembledRot.z, clamped);
    });
  };

  // Initialize at assembled position
  group.setAssembleProgress(1);

  return group;
}

// -------------------------------------------------------------
// 5. KINETIC RUNNER SNEAKER (Explodes into 6 technical parts)
// -------------------------------------------------------------
export interface SneakerObject extends THREE.Group {
  explodedParts: {
    mesh: THREE.Object3D;
    restPos: THREE.Vector3;
    restRot: THREE.Euler;
    explodeOffset: THREE.Vector3;
    spinAxis: THREE.Vector3;
  }[];
  setExplodeProgress: (progress: number) => void;
}

export function createSneakerModel(): SneakerObject {
  const group = new THREE.Group() as SneakerObject;
  group.name = "sneaker-root";

  // Materials
  const leatherUpperMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#181920"), // Premium obsidian matte leather
    roughness: 0.4,
    metalness: 0.1,
    clearcoat: 0.3,
  });

  const midsoleMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#f1f5f9"), // Clean sculptural off-white
    roughness: 0.6,
    metalness: 0.05,
    transmission: 0.15, // Subtle bounce cushion look
  });

  const outsoleMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d97706"), // High-traction amber gum rubber
    roughness: 0.85,
  });

  const tpuMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#9333ea"), // Electric violet TPU chassis
    metalness: 0.7,
    roughness: 0.15,
    clearcoat: 1.0,
  });

  const laceMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#38bdf8"), // Reflective cyan laces
    roughness: 0.5,
  });

  group.explodedParts = [];

  // Part 1: Sculptured Midsole Cushion Pod
  const midGeom = new THREE.BoxGeometry(1.3, 0.45, 2.7);
  // Sculpt foot curve
  midGeom.scale(1.0, 0.8, 1.0);
  const midsoleMesh = new THREE.Mesh(midGeom, midsoleMat);
  midsoleMesh.castShadow = true;
  group.add(midsoleMesh);
  group.explodedParts.push({
    mesh: midsoleMesh,
    restPos: new THREE.Vector3(0, -0.2, 0),
    restRot: new THREE.Euler(0, 0, 0),
    explodeOffset: new THREE.Vector3(0, -1.8, 0),
    spinAxis: new THREE.Vector3(0, 1, 0),
  });

  // Part 2: Serrated Outsole Tread
  const outGeom = new THREE.BoxGeometry(1.32, 0.18, 2.75);
  const outsoleMesh = new THREE.Mesh(outGeom, outsoleMat);
  group.add(outsoleMesh);
  group.explodedParts.push({
    mesh: outsoleMesh,
    restPos: new THREE.Vector3(0, -0.45, 0),
    restRot: new THREE.Euler(0, 0, 0),
    explodeOffset: new THREE.Vector3(0, -3.2, 0.5),
    spinAxis: new THREE.Vector3(0.5, 0, 0.5),
  });

  // Part 3: Streamlined Leather Upper Chassis
  const upperGeom = new THREE.CylinderGeometry(0.55, 0.65, 1.1, 24);
  upperGeom.scale(0.9, 1.0, 1.7);
  const upperMesh = new THREE.Mesh(upperGeom, leatherUpperMat);
  group.add(upperMesh);
  group.explodedParts.push({
    mesh: upperMesh,
    restPos: new THREE.Vector3(0, 0.35, -0.1),
    restRot: new THREE.Euler(0.2, 0, 0),
    explodeOffset: new THREE.Vector3(0, 2.2, 0),
    spinAxis: new THREE.Vector3(0, 1, 0),
  });

  // Part 4: Padded Tongue with High-Density Brand Patch
  const tongueGeom = new THREE.BoxGeometry(0.65, 0.95, 0.15);
  const tongueMesh = new THREE.Mesh(tongueGeom, tpuMat);
  // Add badge
  const badgeGeom = new THREE.PlaneGeometry(0.3, 0.2);
  const badgeMat = new THREE.MeshBasicMaterial({ color: "#ffffff" });
  const badge = new THREE.Mesh(badgeGeom, badgeMat);
  badge.position.set(0, 0.25, 0.08);
  tongueMesh.add(badge);
  group.add(tongueMesh);
  group.explodedParts.push({
    mesh: tongueMesh,
    restPos: new THREE.Vector3(0, 0.65, 0.5),
    restRot: new THREE.Euler(0.45, 0, 0),
    explodeOffset: new THREE.Vector3(0, 2.8, 2.5),
    spinAxis: new THREE.Vector3(1, 0, 0),
  });

  // Part 5: External Cage & 4 Crossing Reflective Laces
  const cageGroup = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const laceGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.75, 12);
    const lace1 = new THREE.Mesh(laceGeom, laceMat);
    lace1.rotation.z = Math.PI / 2 + (i % 2 === 0 ? 0.25 : -0.25);
    lace1.position.set(0, 0.25 + i * 0.18, 0.2 + i * 0.25);
    cageGroup.add(lace1);
  }
  group.add(cageGroup);
  group.explodedParts.push({
    mesh: cageGroup,
    restPos: new THREE.Vector3(0, 0.2, 0.1),
    restRot: new THREE.Euler(0, 0, 0),
    explodeOffset: new THREE.Vector3(2.4, 1.8, 1.5),
    spinAxis: new THREE.Vector3(0, 0, 1),
  });

  // Part 6: Moulded TPU Heel Counter with Textile Pull Loop
  const heelGeom = new THREE.SphereGeometry(0.65, 24, 16, 0, Math.PI);
  heelGeom.scale(0.85, 0.9, 0.6);
  const heelMesh = new THREE.Mesh(heelGeom, tpuMat);
  // Pull loop
  const loopGeom = new THREE.TorusGeometry(0.2, 0.04, 12, 16);
  const loopMesh = new THREE.Mesh(loopGeom, outsoleMat);
  loopMesh.rotation.y = Math.PI / 2;
  loopMesh.position.set(0, 0.45, -0.3);
  heelMesh.add(loopMesh);
  group.add(heelMesh);
  group.explodedParts.push({
    mesh: heelMesh,
    restPos: new THREE.Vector3(0, 0.4, -0.9),
    restRot: new THREE.Euler(0, Math.PI, 0),
    explodeOffset: new THREE.Vector3(0, 1.2, -3.2),
    spinAxis: new THREE.Vector3(-1, 0, 0),
  });

  // Explode Progress Handler (0 = fully together, 1 = fully exploded into parts)
  group.setExplodeProgress = (progress: number) => {
    const p = Math.max(0, Math.min(1, progress));
    group.explodedParts.forEach((part) => {
      // Position offset
      part.mesh.position.copy(part.restPos).addScaledVector(part.explodeOffset, p);
      // Rotation spin
      part.mesh.rotation.x = part.restRot.x + part.spinAxis.x * p * Math.PI * 1.5;
      part.mesh.rotation.y = part.restRot.y + part.spinAxis.y * p * Math.PI * 1.5;
      part.mesh.rotation.z = part.restRot.z + part.spinAxis.z * p * Math.PI * 1.5;
    });
  };

  // Default at rest
  group.setExplodeProgress(0);

  return group;
}

// -------------------------------------------------------------
// 6. ACCESSORIES FLEET (Watch, Cap, Sunglasses, Bag)
// -------------------------------------------------------------
export interface AccessoriesFleetObject extends THREE.Group {
  updateFloating: (time: number) => void;
}

export function createAccessoriesFleet(): AccessoriesFleetObject {
  const fleet = new THREE.Group() as AccessoriesFleetObject;
  fleet.name = "accessories-fleet";

  // A. LUXURY TIMEPIECE (Watch)
  const watchGroup = new THREE.Group();
  watchGroup.position.set(-2.2, 0.8, 0.5);

  // Gold Bevelled Case
  const caseGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.16, 32);
  const goldMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#eab308"), // Royal 18k Gold
    metalness: 0.95,
    roughness: 0.15,
    clearcoat: 1.0,
  });
  const caseMesh = new THREE.Mesh(caseGeom, goldMat);
  caseMesh.rotation.x = Math.PI / 2;
  watchGroup.add(caseMesh);

  // Sapphire Glass Crystal Lens (Physical Transmission)
  const glassGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.04, 32);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#ffffff"),
    transmission: 0.92,
    opacity: 1,
    transparent: true,
    roughness: 0.02,
    ior: 1.52,
    reflectivity: 0.9,
  });
  const glassMesh = new THREE.Mesh(glassGeom, glassMat);
  glassMesh.rotation.x = Math.PI / 2;
  glassMesh.position.z = 0.09;
  watchGroup.add(glassMesh);

  // Sunburst Dial with Hands
  const dialGeom = new THREE.CircleGeometry(0.46, 32);
  const dialMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#090d16"), // Emerald obsidian dial
    roughness: 0.3,
  });
  const dialMesh = new THREE.Mesh(dialGeom, dialMat);
  dialMesh.position.z = 0.07;
  watchGroup.add(dialMesh);

  // Watch Hands
  const handGeom = new THREE.BoxGeometry(0.04, 0.25, 0.01);
  const hourHand = new THREE.Mesh(handGeom, goldMat);
  hourHand.position.set(0, 0.1, 0.08);
  hourHand.rotation.z = -0.8;
  watchGroup.add(hourHand);

  // Metal 3-Link Bracelet
  const strapGeom = new THREE.TorusGeometry(0.68, 0.14, 16, 32);
  strapGeom.scale(1.0, 0.45, 1.0);
  const strapMesh = new THREE.Mesh(strapGeom, goldMat);
  watchGroup.add(strapMesh);

  fleet.add(watchGroup);

  // B. STREETWEAR CAP
  const capGroup = new THREE.Group();
  capGroup.position.set(2.0, 1.0, 0.2);

  const capFabricMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1e1b4b"), // Deep Indigo Twill
    roughness: 0.8,
  });
  // Crown
  const crownGeom = new THREE.SphereGeometry(0.75, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55);
  crownGeom.scale(1.0, 0.75, 1.1);
  const crownMesh = new THREE.Mesh(crownGeom, capFabricMat);
  capGroup.add(crownMesh);

  // Curved Visor / Peak
  const visorGeom = new THREE.CylinderGeometry(0.78, 0.82, 0.05, 24, 1, false, 0, Math.PI * 0.7);
  const visorMesh = new THREE.Mesh(visorGeom, capFabricMat);
  visorMesh.rotation.x = -0.35;
  visorMesh.position.set(0, -0.05, 0.55);
  capGroup.add(visorMesh);

  // Top Rivet
  const rivetGeom = new THREE.SphereGeometry(0.06, 12, 12);
  const rivetMesh = new THREE.Mesh(rivetGeom, goldMat);
  rivetMesh.position.y = 0.58;
  capGroup.add(rivetMesh);

  fleet.add(capGroup);

  // C. TITANIUM SUNGLASSES
  const shadesGroup = new THREE.Group();
  shadesGroup.position.set(-1.4, -1.2, 0.8);

  const tintedLensMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#0f172a"),
    transmission: 0.65,
    roughness: 0.05,
    clearcoat: 1.0,
    ior: 1.4,
  });

  const frameMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#e2e8f0"), // Polished Titanium
    metalness: 0.9,
    roughness: 0.2,
  });

  // Left Lens
  const lensGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.04, 24);
  lensGeom.scale(1.1, 1.0, 0.75);
  const leftLens = new THREE.Mesh(lensGeom, tintedLensMat);
  leftLens.rotation.x = Math.PI / 2;
  leftLens.position.x = -0.45;
  shadesGroup.add(leftLens);

  // Right Lens
  const rightLens = leftLens.clone();
  rightLens.position.x = 0.45;
  shadesGroup.add(rightLens);

  // Bridge
  const bridgeGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.35, 12);
  const bridge = new THREE.Mesh(bridgeGeom, frameMat);
  bridge.rotation.z = Math.PI / 2;
  bridge.position.set(0, 0.12, 0);
  shadesGroup.add(bridge);

  // Temples (Arms)
  const armGeom = new THREE.CylinderGeometry(0.025, 0.025, 1.1, 8);
  const leftArm = new THREE.Mesh(armGeom, frameMat);
  leftArm.rotation.x = Math.PI / 2;
  leftArm.position.set(-0.82, 0.1, -0.55);
  shadesGroup.add(leftArm);

  const rightArm = leftArm.clone();
  rightArm.position.x = 0.82;
  shadesGroup.add(rightArm);

  fleet.add(shadesGroup);

  // D. LUXURY LEATHER WEEKENDER BAG
  const bagGroup = new THREE.Group();
  bagGroup.position.set(1.6, -1.1, 0.4);

  const leatherBagMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#3b1f13"), // Cognac Italian Tuscan Leather
    roughness: 0.5,
    metalness: 0.15,
    clearcoat: 0.4,
  });

  // Main Duffel Barrel Body
  const bagBodyGeom = new THREE.CylinderGeometry(0.65, 0.65, 1.7, 24);
  bagBodyGeom.scale(1.0, 1.0, 0.75);
  const bagBody = new THREE.Mesh(bagBodyGeom, leatherBagMat);
  bagBody.rotation.z = Math.PI / 2;
  bagGroup.add(bagBody);

  // Rolled Carry Handles
  const handleGeom = new THREE.TorusGeometry(0.42, 0.06, 12, 24, Math.PI);
  const handleMesh = new THREE.Mesh(handleGeom, goldMat);
  handleMesh.rotation.z = Math.PI;
  handleMesh.position.set(0, 0.65, 0.15);
  bagGroup.add(handleMesh);

  fleet.add(bagGroup);

  // Subtle individual floating bobbing
  fleet.updateFloating = (time: number) => {
    watchGroup.position.y = 0.8 + Math.sin(time * 1.8) * 0.12;
    watchGroup.rotation.y = time * 0.4;
    watchGroup.rotation.x = Math.cos(time * 1.2) * 0.15;

    capGroup.position.y = 1.0 + Math.sin(time * 1.5 + 1.2) * 0.1;
    capGroup.rotation.y = -time * 0.35;
    capGroup.rotation.z = Math.sin(time * 0.9) * 0.1;

    shadesGroup.position.y = -1.2 + Math.cos(time * 2.0) * 0.1;
    shadesGroup.rotation.y = time * 0.5;
    shadesGroup.rotation.x = Math.sin(time * 1.4) * 0.2;

    bagGroup.position.y = -1.1 + Math.sin(time * 1.6 + 2.5) * 0.12;
    bagGroup.rotation.y = -time * 0.3;
  };

  return fleet;
}

// -------------------------------------------------------------
// 7. GRAND RUNWAY SHOWCASE FORMATION
// -------------------------------------------------------------
export function createGrandShowcaseGroup(): THREE.Group {
  const showcase = new THREE.Group();
  showcase.name = "showcase-root";

  // Circular catwalk stage ring
  const ringGeom = new THREE.RingGeometry(3.8, 4.3, 64);
  const ringMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#0c0f17"),
    roughness: 0.1,
    metalness: 0.9,
    clearcoat: 1.0,
    reflectivity: 1.0,
    side: THREE.DoubleSide,
  });
  const ringMesh = new THREE.Mesh(ringGeom, ringMat);
  ringMesh.rotation.x = Math.PI / 2;
  ringMesh.position.y = -2.2;
  showcase.add(ringMesh);

  // Glowing Neon Ring Accent
  const neonGeom = new THREE.TorusGeometry(4.05, 0.04, 16, 64);
  const neonMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#c084fc"),
  });
  const neonRing = new THREE.Mesh(neonGeom, neonMat);
  neonRing.rotation.x = Math.PI / 2;
  neonRing.position.y = -2.18;
  showcase.add(neonRing);

  // Position scaled items in a luxury arc
  const items = [
    { model: createTShirtModel(), pos: [-2.4, 0.4, 0.8], rot: [0, 0.3, 0], scale: 0.72 },
    { model: createHoodieModel(), pos: [0, 0.8, -0.5], rot: [0, 0, 0], scale: 0.82 },
    { model: createCargoPantsModel(), pos: [2.4, -0.2, 0.8], rot: [0, -0.3, 0], scale: 0.75 },
    { model: createSneakerModel(), pos: [-1.2, -1.2, 1.6], rot: [0.2, 0.6, 0], scale: 0.7 },
    { model: createAccessoriesFleet(), pos: [1.2, -1.0, 1.6], rot: [0, -0.4, 0], scale: 0.65 },
  ];

  items.forEach(({ model, pos, rot, scale }) => {
    model.position.set(pos[0], pos[1], pos[2]);
    model.rotation.set(rot[0], rot[1], rot[2]);
    model.scale.setScalar(scale);
    showcase.add(model);
  });

  return showcase;
}

