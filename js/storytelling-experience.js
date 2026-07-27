/**
 * Flowline India - Award-Winning 3-Section Interactive Storytelling Experience
 * Built with Three.js, GSAP ScrollTrigger, GLSL Particle Shaders & SVG Animations
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

class FlowlineStoryEngine {
  constructor() {
    this.container = document.getElementById('story-canvas-container');
    this.canvas = document.getElementById('story-webgl-canvas');
    if (!this.canvas) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollProgress = 0;
    this.currentSection = 1;

    this.initRenderer();
    this.initLights();
    this.init3DFan();
    this.initParticleAirflow();
    this.initEvents();
    this.initScrollAnimations();
    this.animate();
  }

  initRenderer() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.camera.position.set(0, 0, 8.5);
  }

  initLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(this.ambientLight);

    // Key Light
    this.keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    this.keyLight.position.set(5, 8, 5);
    this.keyLight.castShadow = true;
    this.scene.add(this.keyLight);

    // Red Rim Accent Light (Flowline Red)
    this.rimLight = new THREE.PointLight(0xE30613, 3.5, 15);
    this.rimLight.position.set(-4, 2, -3);
    this.scene.add(this.rimLight);

    // Blue/Cyan Blueprint Glow Light
    this.blueprintLight = new THREE.PointLight(0x00A8FF, 0, 15);
    this.blueprintLight.position.set(2, -2, 4);
    this.scene.add(this.blueprintLight);
  }

  init3DFan() {
    this.fanGroup = new THREE.Group();

    // Standard Industrial Metallic Material
    this.metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x2A2E33,
      metalness: 0.85,
      roughness: 0.25,
      envMapIntensity: 1.0
    });

    // Stainless Steel Impeller Material
    this.impellerMaterial = new THREE.MeshStandardMaterial({
      color: 0xD0D7DE,
      metalness: 0.95,
      roughness: 0.15
    });

    // Flowline Red Accent Material
    this.redAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xE30613,
      metalness: 0.5,
      roughness: 0.3
    });

    // Wireframe Blueprint Material
    this.wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x0088FF,
      wireframe: true,
      transparent: true,
      opacity: 0
    });

    // 1. Fan Housing (Volute Casing)
    const voluteShape = new THREE.Shape();
    const radius = 1.8;
    voluteShape.absarc(0, 0, radius, 0, Math.PI * 1.6, false);
    voluteShape.lineTo(radius + 0.8, -radius);
    voluteShape.lineTo(radius + 0.8, radius * 0.8);
    voluteShape.closePath();

    const extrudeSettings = { depth: 1.4, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.08, bevelThickness: 0.08 };
    const voluteGeo = new THREE.ExtrudeGeometry(voluteShape, extrudeSettings);
    voluteGeo.center();

    this.housingMesh = new THREE.Mesh(voluteGeo, this.metalMaterial);
    this.fanGroup.add(this.housingMesh);

    // 2. Impeller Hub & Blades
    this.impellerGroup = new THREE.Group();
    const hubGeo = new THREE.CylinderGeometry(0.45, 0.45, 1.2, 32);
    const hubMesh = new THREE.Mesh(hubGeo, this.impellerMaterial);
    hubMesh.rotation.x = Math.PI / 2;
    this.impellerGroup.add(hubMesh);

    // 12 Curved Impeller Blades
    const numBlades = 12;
    for (let i = 0; i < numBlades; i++) {
      const angle = (i / numBlades) * Math.PI * 2;
      const bladeGeo = new THREE.BoxGeometry(0.08, 0.65, 1.1);
      const bladeMesh = new THREE.Mesh(bladeGeo, this.impellerMaterial);
      bladeMesh.position.x = Math.cos(angle) * 0.9;
      bladeMesh.position.y = Math.sin(angle) * 0.9;
      bladeMesh.rotation.z = angle + 0.35;
      this.impellerGroup.add(bladeMesh);
    }
    this.impellerGroup.position.z = 0.1;
    this.fanGroup.add(this.impellerGroup);

    // 3. Suction Cone (Inlet)
    const coneGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.4, 32, 1, true);
    const coneMesh = new THREE.Mesh(coneGeo, this.redAccentMaterial);
    coneMesh.rotation.x = Math.PI / 2;
    coneMesh.position.z = 0.85;
    this.fanGroup.add(coneMesh);

    // 4. Heavy Duty Motor Cylinder
    this.motorGroup = new THREE.Group();
    const motorBodyGeo = new THREE.CylinderGeometry(0.6, 0.6, 1.4, 24);
    const motorMesh = new THREE.Mesh(motorBodyGeo, this.metalMaterial);
    motorMesh.rotation.z = Math.PI / 2;
    this.motorGroup.add(motorMesh);

    // Motor Cooling Fins
    for (let j = -0.5; j <= 0.5; j += 0.15) {
      const finGeo = new THREE.TorusGeometry(0.62, 0.03, 8, 24);
      const finMesh = new THREE.Mesh(finGeo, this.redAccentMaterial);
      finMesh.rotation.y = Math.PI / 2;
      finMesh.position.x = j;
      this.motorGroup.add(finMesh);
    }
    this.motorGroup.position.set(-1.8, -0.6, -0.6);
    this.fanGroup.add(this.motorGroup);

    // 5. Heavy Steel Base Rails
    const baseGeo = new THREE.BoxGeometry(4.2, 0.25, 2.2);
    const baseMesh = new THREE.Mesh(baseGeo, this.metalMaterial);
    baseMesh.position.set(0, -2.1, -0.2);
    this.fanGroup.add(baseMesh);

    // Add Wireframe Overlay Clone
    this.wireframeGroup = this.fanGroup.clone();
    this.wireframeGroup.traverse((child) => {
      if (child.isMesh) {
        child.material = this.wireframeMaterial;
      }
    });
    this.fanGroup.add(this.wireframeGroup);

    this.scene.add(this.fanGroup);
    this.fanGroup.position.set(0, 0, 0);
  }

  initParticleAirflow() {
    const particleCount = 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Inflow suction particles
      positions[i * 3] = (Math.random() - 0.5) * 3;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      positions[i * 3 + 2] = 4 + Math.random() * 4;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = -0.06 - Math.random() * 0.05;

      scales[i] = Math.random() * 0.08 + 0.04;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Particle Shader Material
    const pMaterial = new THREE.PointsMaterial({
      color: 0xE30613,
      size: 0.12,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    this.airflowParticles = new THREE.Points(geometry, pMaterial);
    this.scene.add(this.airflowParticles);
    this.airflowParticles.visible = true;
  }

  initEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    });
  }

  initScrollAnimations() {
    // Split Section 1 paragraph text into word spans for word-by-word reveal
    const paragraph1 = document.getElementById('story-p1');
    if (paragraph1) {
      const text = paragraph1.innerText;
      const words = text.split(' ').map((word, idx) => {
        const isHighlight = word.includes('2001') || word.includes('Flowline') || word.includes('excellence') || word.includes('reliability');
        return `<span class="word ${isHighlight ? 'highlight' : ''}">${word}</span>`;
      }).join(' ');
      paragraph1.innerHTML = words;
    }

    // Register GSAP ScrollTrigger timeline
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // Section 1 Pin & Scroll Timeline
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: "#story-section-1",
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const p = self.progress;
            this.scrollProgress = p;
            
            // Stagger reveal words in Section 1
            const wordElements = document.querySelectorAll('#story-p1 .word');
            const activeCount = Math.floor(p * wordElements.length * 1.2);
            wordElements.forEach((el, idx) => {
              if (idx <= activeCount) {
                el.classList.add('active');
              } else {
                el.classList.remove('active');
              }
            });

            // Toggle giant 20+ watermark
            const watermark = document.getElementById('story-watermark');
            if (watermark) {
              if (p > 0.6) watermark.classList.add('active');
              else watermark.classList.remove('active');
            }
          }
        }
      });

      // Section 1 Camera & 3D Fan movement
      tl1.to(this.fanGroup.rotation, { y: Math.PI * 0.8, x: 0.2 }, 0)
         .to(this.camera.position, { z: 7.2 }, 0);

      // Section 2 Pin & Step Narrative
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#story-section-2",
          start: "top top",
          end: "+=220%",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const p = self.progress;
            
            // Toggle active step cards in Section 2
            const step1 = document.getElementById('story-step-1');
            const step2 = document.getElementById('story-step-2');
            const step3 = document.getElementById('story-step-3');
            const factoryOverlay = document.getElementById('factory-svg-overlay');

            step1?.classList.toggle('active', p >= 0 && p < 0.35);
            step2?.classList.toggle('active', p >= 0.35 && p < 0.7);
            step3?.classList.toggle('active', p >= 0.7);

            // Toggle Blueprint & Factory overlay
            if (p >= 0.35 && p < 0.7) {
              this.wireframeMaterial.opacity = (p - 0.35) * 2.8;
              this.blueprintLight.intensity = 4.0;
            } else if (p >= 0.7) {
              this.wireframeMaterial.opacity = 0.8;
              if (factoryOverlay) factoryOverlay.classList.add('active');
              this.toggleCallouts(true);
            } else {
              this.wireframeMaterial.opacity = 0;
              this.blueprintLight.intensity = 0;
              if (factoryOverlay) factoryOverlay.classList.remove('active');
              this.toggleCallouts(false);
            }
          }
        }
      });

      // Section 2 Camera rotation & Zoom onto motor
      tl2.to(this.fanGroup.position, { x: -1.8, y: -0.2 }, 0)
         .to(this.fanGroup.rotation, { y: Math.PI * 1.5, x: 0.3 }, 0)
         .to(this.camera.position, { z: 6.0 }, 0.35)
         .to(this.motorGroup.scale, { x: 1.15, y: 1.15, z: 1.15 }, 0.35)
         .to(this.fanGroup.rotation, { y: Math.PI * 2.2 }, 0.7);

      // Section 3 Pin & Finishing Transformation
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: "#story-section-3",
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const p = self.progress;
            const wrapper = document.getElementById('story-wrapper');
            if (wrapper) {
              if (p > 0.4) {
                wrapper.style.backgroundColor = '#FFFFFF';
              } else {
                wrapper.style.backgroundColor = '#FAFBFD';
              }
            }

            // Transition blueprint into polished finished product
            this.wireframeMaterial.opacity = Math.max(0, (1 - p * 2.5));
          }
        }
      });

      // Section 3 Camera zoom out and final elegant rotation
      tl3.to(this.fanGroup.position, { x: 0, y: 0 }, 0)
         .to(this.fanGroup.rotation, { y: Math.PI * 3.5, x: 0 }, 0)
         .to(this.camera.position, { z: 9.0 }, 0.5);
    }
  }

  toggleCallouts(show) {
    const nodes = document.querySelectorAll('.callout-node');
    nodes.forEach(node => node.classList.toggle('visible', show));
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Mouse Parallax Easing
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    this.scene.rotation.y = this.mouse.x * 0.3;
    this.scene.rotation.x = this.mouse.y * 0.3;

    // Continuous Impeller Blade Rotation
    if (this.impellerGroup) {
      this.impellerGroup.rotation.y += 0.08;
    }

    // Animate Airflow Particles
    if (this.airflowParticles) {
      const positions = this.airflowParticles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 2] -= 0.07; // Move towards fan
        if (positions[i * 3 + 2] < -3) {
          positions[i * 3 + 2] = 4 + Math.random() * 3;
          positions[i * 3] = (Math.random() - 0.5) * 3;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
        }
      }
      this.airflowParticles.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FlowlineStoryEngine();
});
