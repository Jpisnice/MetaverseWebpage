// Floating 3D Solids Background for Metaverse App
// This file sets up a Three.js scene with floating solids and GSAP ScrollTrigger animations.
// It is imported as a module in index.html.

import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Global configuration for 3D shapes and cameras
const SHAPE_CONFIG = {
  bgCamera: {
    fov: 90,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.9,
    far: 1000,
    position: { x: 0, y: 0, z: 20 },
    rotation: { x: 0, y: 0, z: 0 }
  },
  fgCamera: {
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
    position: { x: 0, y: 0, z: 20 },
    rotation: { x: 0, y: 0, z: 0 }
  },
  bgIcosahedrons: [
    { x: -13, y: -28, z: -12, rot: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { x: 2, y: -37, z: 3, rot: { x: 0.5, y: 0.5, z: 0 }, scale: { x: 1.2, y: 1.2, z: 1.2 } },
    { x: 12, y: -42, z: 7, rot: { x: 1, y: 0, z: 0.5 }, scale: { x: 0.8, y: 0.8, z: 0.8 } },
  ],
  bgSpheres: [
    { x: -7, y: -36, z: 8, rot: { x: 0, y: 1, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { x: 10, y: -34, z: -10, rot: { x: 0.2, y: 0.8, z: 0.3 }, scale: { x: 1.5, y: 1.5, z: 1.5 } },
  ],
  fgIcosahedrons: [
    { x: -8, y: -25, z: 8, rot: { x: 0.3, y: 0.2, z: 0.1 }, scale: { x: 1, y: 1, z: 1 } },
    { x: 5, y: -28, z: -5, rot: { x: 0.7, y: 0.1, z: 0.2 }, scale: { x: 0.7, y: 0.7, z: 0.7 } },
  ],
  fgSpheres: [
    { x: -12, y: -20, z: 0, rot: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    { x: 12, y: -22, z: 12, rot: { x: 0.5, y: 0.5, z: 0.5 }, scale: { x: 1.3, y: 1.3, z: 1.3 } },
  ]
};

class FloatingShapes3D {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.shapes = [];
    this.mouse = { x: 0, y: 0 };
    // For background shapes
    this.bgScene = null;
    this.bgCamera = null;
    this.bgRenderer = null;
    this.bgShapes = [];
    this.init();
  }

  init() {
    this.createScenes();
    this.createShapes();
    this.setupLighting();
    this.setupGSAP();
    this.addEventListeners();
    this.animate();
    // Hide loading
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
  }

  createScenes() {
    // Main scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x667eea, 10, 50);
    this.camera = new THREE.PerspectiveCamera(
      SHAPE_CONFIG.fgCamera.fov,
      SHAPE_CONFIG.fgCamera.aspect,
      SHAPE_CONFIG.fgCamera.near,
      SHAPE_CONFIG.fgCamera.far
    );
    this.camera.position.set(
      SHAPE_CONFIG.fgCamera.position.x,
      SHAPE_CONFIG.fgCamera.position.y,
      SHAPE_CONFIG.fgCamera.position.z
    );
    this.camera.rotation.set(
      SHAPE_CONFIG.fgCamera.rotation.x,
      SHAPE_CONFIG.fgCamera.rotation.y,
      SHAPE_CONFIG.fgCamera.rotation.z
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const fgContainer = document.getElementById('fg-canvas-container');
    if (fgContainer) {
      this.renderer.domElement.style.zIndex = 4;
      this.renderer.domElement.style.position = 'absolute';
      this.renderer.domElement.style.top = '0';
      this.renderer.domElement.style.left = '0';
      this.renderer.domElement.style.width = '100vw';
      this.renderer.domElement.style.height = '100vh';
      fgContainer.appendChild(this.renderer.domElement);
    }
    // Background scene (for shapes behind content)
    this.bgScene = new THREE.Scene();
    this.bgScene.fog = new THREE.Fog(0x667eea, 10, 50);
    this.bgCamera = new THREE.PerspectiveCamera(
      SHAPE_CONFIG.bgCamera.fov,
      SHAPE_CONFIG.bgCamera.aspect,
      SHAPE_CONFIG.bgCamera.near,
      SHAPE_CONFIG.bgCamera.far
    );
    this.bgCamera.position.set(
      SHAPE_CONFIG.bgCamera.position.x,
      SHAPE_CONFIG.bgCamera.position.y,
      SHAPE_CONFIG.bgCamera.position.z
    );
    this.bgCamera.rotation.set(
      SHAPE_CONFIG.bgCamera.rotation.x,
      SHAPE_CONFIG.bgCamera.rotation.y,
      SHAPE_CONFIG.bgCamera.rotation.z
    );
    this.bgRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.bgRenderer.setSize(window.innerWidth, window.innerHeight);
    this.bgRenderer.setClearColor(0x000000, 0);
    this.bgRenderer.domElement.style.position = 'absolute';
    this.bgRenderer.domElement.style.top = '0';
    this.bgRenderer.domElement.style.left = '0';
    this.bgRenderer.domElement.style.width = '100vw';
    this.bgRenderer.domElement.style.height = '100vh';
    this.bgRenderer.domElement.style.zIndex = 1;
    const bgContainer = document.getElementById('bg-canvas-container');
    if (bgContainer) bgContainer.appendChild(this.bgRenderer.domElement);
  }

  // --- Custom Material Methods ---
  generateGrainTexture() {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    const imageData = context.createImageData(size, size);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 128 + 128;
        data[i] = value;
        data[i+1] = value;
        data[i+2] = value;
        data[i+3] = 255;
    }
    context.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
  }

  createGrainyMetallicMaterial() {
      const grainTexture = this.generateGrainTexture();
      return new THREE.MeshStandardMaterial({
          color: 0xcccccc,
          metalness: 1.0,
          roughness: 0.6,
          bumpMap: grainTexture,
          bumpScale: 0.03,
          transparent: false,
      });
  }

  // --- Add Custom Shape ---
  addCustomShape(geometry, material, position, wireframeMaterial, zIndex = 1, isBg = false) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    mesh.rotation.set(
      position.rot?.x || 0,
      position.rot?.y || 0,
      position.rot?.z || 0
    );
    mesh.scale.set(
      position.scale?.x || 1,
      position.scale?.y || 1,
      position.scale?.z || 1
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.originalY = mesh.position.y;
    mesh.userData.floatSpeed = 1.0; // No randomness
    mesh.userData.rotationSpeed = 0.01; // No randomness
    mesh.userData.zIndex = zIndex;
    if (isBg) {
      this.bgShapes.push(mesh);
      this.bgScene.add(mesh);
    } else {
      this.shapes.push(mesh);
      this.scene.add(mesh);
    }
    // Add wireframe overlay if provided
    if (wireframeMaterial) {
      const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
      wireframe.position.copy(mesh.position);
      wireframe.rotation.copy(mesh.rotation);
      wireframe.scale.copy(mesh.scale);
      wireframe.castShadow = false;
      wireframe.receiveShadow = false;
      if (isBg) {
        this.bgShapes.push(wireframe);
        this.bgScene.add(wireframe);
      } else {
        this.shapes.push(wireframe);
        this.scene.add(wireframe);
      }
    }
    this.addGSAPAnimation(mesh, isBg);
    return mesh;
  }

  addGSAPAnimation(shape, isBg = false) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: isBg ? 8 : 6,
      }
    });
    tl.to(shape.position, {
      y: shape.userData.originalY + 40,
      duration: 5,
    });
    tl.to(shape.rotation, {
      x: shape.rotation.x + Math.PI * 2,
      y: shape.rotation.y + Math.PI * 2,
      z: shape.rotation.z + Math.PI,
      duration: 6,
    }, 0);
    tl.fromTo(shape.scale, {
      x: 0.1, y: 0.1, z: 0.1
    }, {
      x: 1, y: 1, z: 1,
      duration: 2,
      ease: 'elastic.out(1, 0.3)'
    }, 0);
  }

  createShapes() {
    const grainyMetallicMaterial = this.createGrainyMetallicMaterial();

    // Textures for spheres
    const textureLoader = new THREE.TextureLoader();
    const baseTexture = textureLoader.load('/textures/panel/texture.png');
    baseTexture.wrapS = THREE.RepeatWrapping;
    baseTexture.wrapT = THREE.RepeatWrapping;
    baseTexture.repeat.set(2, 2);

    const detailTexture = textureLoader.load('/textures/panel/texture2.png');
    detailTexture.wrapS = THREE.RepeatWrapping;
    detailTexture.wrapT = THREE.RepeatWrapping;
    detailTexture.repeat.set(2, 2);

    const heightTexture = textureLoader.load('/textures/panel/texture3-height.png');
    heightTexture.wrapS = THREE.RepeatWrapping;
    heightTexture.wrapT = THREE.RepeatWrapping;
    heightTexture.repeat.set(2, 2);

    const normalTexture = textureLoader.load('/textures/panel/texture4-normal.png');
    normalTexture.wrapS = THREE.RepeatWrapping;
    normalTexture.wrapT = THREE.RepeatWrapping;
    normalTexture.repeat.set(2, 2);

    const aoTexture = textureLoader.load('/textures/panel/texture5-AmbientOclusions.png');
    aoTexture.wrapS = THREE.RepeatWrapping;
    aoTexture.wrapT = THREE.RepeatWrapping;
    aoTexture.repeat.set(2, 2);

    const metallicTexture = textureLoader.load('/textures/panel/texture6-metallic.png');
    metallicTexture.wrapS = THREE.RepeatWrapping;
    metallicTexture.wrapT = THREE.RepeatWrapping;
    metallicTexture.repeat.set(2, 2);

    const sphereMaterial = new THREE.MeshStandardMaterial({
        map: baseTexture,
        metalnessMap: metallicTexture,
        normalMap: normalTexture,
        aoMap: aoTexture,
        aoMapIntensity: 1.5,
        emissiveMap: detailTexture,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.6,
        displacementMap: heightTexture,
        displacementScale: 0.1,
        roughnessMap: detailTexture,
        metalness: 1.0,
        roughness: 1.0,
    });

    // Background Icosahedrons
    for (const pos of SHAPE_CONFIG.bgIcosahedrons) {
      const icosahedronGeometry = new THREE.IcosahedronGeometry(3, 0);
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });
      this.addCustomShape(
        icosahedronGeometry,
        grainyMetallicMaterial,
        pos,
        wireframeMaterial,
        -1,
        true
      );
    }
    // Background Spheres
    for (const pos of SHAPE_CONFIG.bgSpheres) {
      const sphereGeometry = new THREE.SphereGeometry(3, 64, 64);
      sphereGeometry.setAttribute('uv2', new THREE.BufferAttribute(sphereGeometry.attributes.uv.array, 2));
      this.addCustomShape(
        sphereGeometry,
        sphereMaterial,
        pos,
        null,
        -1,
        true
      );
    }
    // Foreground Icosahedrons
    for (const pos of SHAPE_CONFIG.fgIcosahedrons) {
      const icosahedronGeometry = new THREE.IcosahedronGeometry(3, 0);
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });
      this.addCustomShape(
        icosahedronGeometry,
        grainyMetallicMaterial,
        pos,
        wireframeMaterial,
        1,
        false
      );
    }
    // Foreground Spheres
    for (const pos of SHAPE_CONFIG.fgSpheres) {
      const sphereGeometry = new THREE.SphereGeometry(3, 64, 64);
      sphereGeometry.setAttribute('uv2', new THREE.BufferAttribute(sphereGeometry.attributes.uv.array, 2));
      this.addCustomShape(
        sphereGeometry,
        sphereMaterial,
        pos,
        null,
        1,
        false
      );
    }
  }

  setupLighting() {
    // Add lights to both scenes
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);
    this.bgScene.add(ambientLight.clone());
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);
    this.bgScene.add(directionalLight.clone());
    const pointLight1 = new THREE.PointLight(0x8fd3f4, 0.7, 50);
    pointLight1.position.set(-15, 10, 10);
    this.scene.add(pointLight1);
    this.bgScene.add(pointLight1.clone());
    const pointLight2 = new THREE.PointLight(0xf9ca24, 0.7, 50);
    pointLight2.position.set(15, -10, 10);
    this.scene.add(pointLight2);
    this.bgScene.add(pointLight2.clone());
  }

  setupGSAP() {
    // Camera animation (main scene)
    gsap.to(this.camera.position, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 4
      },
      z: 10,
      y: 10,
      duration: 4
    });
    // Scene rotation (main scene)
    gsap.to(this.scene.rotation, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 4
      },
      y: 6,
      duration: 2
    });
    // Camera/rotation for bgScene can be added similarly if needed
  }

  addEventListeners() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    window.addEventListener('resize', () => {
      // Update camera aspect ratios and projection matrices from config
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.bgCamera.aspect = window.innerWidth / window.innerHeight;
      this.bgCamera.updateProjectionMatrix();
      this.bgRenderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    // Mouse-based camera movement for both scenes
    this.camera.position.x += (this.mouse.x * 2 - this.camera.position.x) * 0.05;
    this.camera.position.y += (this.mouse.y * 2 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);
    this.bgCamera.position.x += (this.mouse.x * 2 - this.bgCamera.position.x) * 0.05;
    this.bgCamera.position.y += (this.mouse.y * 2 - this.bgCamera.position.y) * 0.05;
    this.bgCamera.lookAt(this.bgScene.position);
    // Animate shapes
    this.shapes.forEach((shape) => {
      shape.rotation.x += shape.userData.rotationSpeed;
      shape.rotation.y += shape.userData.rotationSpeed * 0.07;
      shape.rotation.z += shape.userData.rotationSpeed * 0.05;
    });
    this.bgShapes.forEach((shape) => {
      shape.rotation.x += shape.userData.rotationSpeed;
      shape.rotation.y += shape.userData.rotationSpeed * 0.01;
      shape.rotation.z += shape.userData.rotationSpeed * 0.01;
    });
    // Render both scenes
    this.bgRenderer.render(this.bgScene, this.bgCamera);
    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('load', () => {
  new FloatingShapes3D();
}); 