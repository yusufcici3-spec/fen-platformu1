'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

type Props = {
  sampleColor: string;
  looking: boolean;
  onPick: () => void;
  onArrived: () => void;
};

const HOME_POS = new THREE.Vector3(19, 16, 29);
const HOME_TARGET = new THREE.Vector3(0, 7.5, 0);
const HOME_FOV = 40;

// Okülerin ekseni: yukarı ve kullanıcıya doğru 45° eğimli
const EYE_DIR = new THREE.Vector3(0, Math.SQRT1_2, Math.SQRT1_2);
const HEAD = new THREE.Vector3(0, 10.8, 0.5);
const EYE_TIP = HEAD.clone().add(EYE_DIR.clone().multiplyScalar(5.6));
const LOOK_POS = EYE_TIP.clone().add(EYE_DIR.clone().multiplyScalar(3.2));
const LOOK_FOV = 24;

function makeWoodTexture() {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 1024;
  const g = c.getContext('2d')!;
  g.fillStyle = '#b9824a';
  g.fillRect(0, 0, 1024, 1024);
  for (let i = 0; i < 90; i++) {
    const y = Math.random() * 1024;
    g.strokeStyle = `rgba(${90 + Math.random() * 50},${50 + Math.random() * 30},20,${0.1 + Math.random() * 0.22})`;
    g.lineWidth = 1 + Math.random() * 4;
    g.beginPath();
    g.moveTo(0, y);
    for (let x = 0; x <= 1024; x += 64) g.lineTo(x, y + Math.sin(x * 0.01 + i) * 5);
    g.stroke();
  }
  for (let i = 0; i < 5; i++) {
    g.fillStyle = 'rgba(60,30,10,0.35)';
    g.fillRect(0, i * 205 - 2, 1024, 4);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 3);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export default function MicroscopeScene({ sampleColor, looking, onPick, onArrived }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const lookingRef = useRef(looking);
  const cbRef = useRef({ onPick, onArrived });
  const apiRef = useRef<{ setColor: (c: string) => void; go: (toLook: boolean) => void } | null>(null);

  cbRef.current = { onPick, onArrived };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#3a2a1d');
    scene.fog = new THREE.Fog('#3a2a1d', 45, 90);

    const camera = new THREE.PerspectiveCamera(HOME_FOV, 1, 0.1, 200);
    camera.position.copy(HOME_POS);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;touch-action:none;';
    mount.appendChild(renderer.domElement);

    // Işıklar
    scene.add(new THREE.HemisphereLight('#fff4e0', '#6b4a2b', 0.9));
    const sun = new THREE.DirectionalLight('#fff1d6', 1.5);
    sun.position.set(-14, 28, 16);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -22, right: 22, top: 22, bottom: -22, near: 1, far: 80 });
    sun.shadow.bias = -0.0004;
    scene.add(sun);

    // Masa
    const table = new THREE.Mesh(
      new THREE.PlaneGeometry(120, 120),
      new THREE.MeshStandardMaterial({ map: makeWoodTexture(), roughness: 0.75 })
    );
    table.rotation.x = -Math.PI / 2;
    table.receiveShadow = true;
    scene.add(table);

    // Malzemeler
    const white = new THREE.MeshStandardMaterial({ color: '#f1eee6', roughness: 0.38, metalness: 0.05 });
    const black = new THREE.MeshStandardMaterial({ color: '#1a1d22', roughness: 0.5, metalness: 0.2 });
    const metal = new THREE.MeshStandardMaterial({ color: '#b9c0c8', roughness: 0.25, metalness: 0.9 });
    const rubber = new THREE.MeshStandardMaterial({ color: '#0e0f12', roughness: 0.9 });

    const scope = new THREE.Group();
    scene.add(scope);
    const add = (m: THREE.Mesh, parent: THREE.Object3D = scope) => {
      m.castShadow = true;
      m.receiveShadow = true;
      parent.add(m);
      return m;
    };

    // Taban
    const base = add(new THREE.Mesh(new RoundedBoxGeometry(11, 1.3, 13, 4, 0.5), white));
    base.position.set(0, 0.65, -0.5);

    // Kavisli kol
    const armCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.2, -4.8),
      new THREE.Vector3(0, 5, -5.4),
      new THREE.Vector3(0, 9, -4.4),
      new THREE.Vector3(0, 10.6, -1.2),
      new THREE.Vector3(HEAD.x, HEAD.y, HEAD.z - 0.2),
    ]);
    add(new THREE.Mesh(new THREE.TubeGeometry(armCurve, 48, 1.05, 16, false), white));

    // Baş (gövde tüpü birleşimi)
    const head = add(new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.45, 2.2, 32), white));
    head.position.copy(HEAD);

    // Oküler tüpü
    const tubeQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), EYE_DIR);
    const tube = add(new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.05, 4.2, 32), white));
    tube.position.copy(HEAD).add(EYE_DIR.clone().multiplyScalar(2.6));
    tube.quaternion.copy(tubeQuat);

    const eyepiece = add(new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.72, 2.2, 32), black));
    eyepiece.position.copy(HEAD).add(EYE_DIR.clone().multiplyScalar(4.7));
    eyepiece.quaternion.copy(tubeQuat);

    const cap = add(new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.68, 0.7, 32), rubber));
    cap.position.copy(HEAD).add(EYE_DIR.clone().multiplyScalar(5.55));
    cap.quaternion.copy(tubeQuat);

    const lens = new THREE.Mesh(
      new THREE.CircleGeometry(0.55, 32),
      new THREE.MeshStandardMaterial({ color: '#7fb4d6', roughness: 0.05, metalness: 0.3, emissive: '#10304a', emissiveIntensity: 0.6 })
    );
    lens.position.copy(HEAD).add(EYE_DIR.clone().multiplyScalar(5.92));
    lens.quaternion.copy(tubeQuat);
    scope.add(lens);

    // Nesnel tablası (objektifler)
    const turret = add(new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.7, 0.9, 32), metal));
    turret.position.set(0, 9.2, 0.5);
    const objectiveColors = ['#d33a3a', '#e8c533', '#3a6fd3'];
    const objectiveLengths = [1.6, 2.1, 2.6];
    objectiveLengths.forEach((len, i) => {
      const a = ((i - 1) * 0.9 * Math.PI) / 2.2;
      const holder = new THREE.Group();
      holder.position.set(Math.sin(a) * 0.85, 8.75, 0.5 + (Math.cos(a) * 0.5 - 0.3));
      holder.rotation.z = -Math.sin(a) * 0.55;
      holder.rotation.x = Math.cos(a) * 0.1;
      turret.parent!.add(holder);
      const body = add(new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.5, len, 24), metal), holder);
      body.position.y = -len / 2;
      const ring = add(new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.2, 24), new THREE.MeshStandardMaterial({ color: objectiveColors[i], roughness: 0.4 })), holder);
      ring.position.y = -0.45;
    });

    // Tabla (stage)
    const stage = add(new THREE.Mesh(new RoundedBoxGeometry(8.4, 0.35, 7.2, 3, 0.1), black));
    stage.position.set(0, 4.2, 0.4);
    const hole = add(new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.4, 32), new THREE.MeshStandardMaterial({ color: '#050607' })));
    hole.position.set(0, 4.22, 0.5);
    const stageSupport = add(new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.2, 4), white));
    stageSupport.position.set(0, 3.5, -2.6);
    [-1.6, 1.6].forEach((x) => {
      const clip = add(new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 2.4), metal));
      clip.position.set(x, 4.46, 0.2);
    });

    // Lam (preparat)
    const slide = new THREE.Group();
    slide.position.set(0, 4.5, 0.5);
    scope.add(slide);
    const glass = add(new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 0.12, 1.9),
      new THREE.MeshPhysicalMaterial({ color: '#dff1ff', transparent: true, opacity: 0.55, roughness: 0.05, transmission: 0.2 })
    ), slide);
    glass.castShadow = false;
    const specMat = new THREE.MeshStandardMaterial({ color: sampleColor, roughness: 0.5 });
    const spec = add(new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.16, 28), specMat), slide);
    spec.position.set(0, 0.04, 0);
    const labelStrip = add(new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.14, 1.7), new THREE.MeshStandardMaterial({ color: '#f5f1e2' })), slide);
    labelStrip.position.set(-2.0, 0.02, 0);

    // Kondansatör / ışık
    const condenser = add(new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 0.9, 32), metal));
    condenser.position.set(0, 1.8, 0.5);
    const lamp = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 0.7, 0.1, 32),
      new THREE.MeshStandardMaterial({ color: '#fff7c7', emissive: '#ffe58a', emissiveIntensity: 1.2 })
    );
    lamp.position.set(0, 2.28, 0.5);
    scope.add(lamp);
    const lampLight = new THREE.PointLight('#ffe9a8', 0.9, 8);
    lampLight.position.set(0, 2.6, 0.5);
    scope.add(lampLight);
    // Odak düğmeleri
    ([-1, 1] as const).forEach((s) => {
      const coarse = add(new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.9, 32), black));
      coarse.rotation.z = Math.PI / 2;
      coarse.position.set(s * 1.65, 5.6, -5.2);
      const fine = add(new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.7, 32), metal));
      fine.rotation.z = Math.PI / 2;
      fine.position.set(s * 2.3, 5.6, -5.2);
    });

    // Açma düğmesi
    const sw = add(new THREE.Mesh(new RoundedBoxGeometry(1.1, 0.4, 0.8, 2, 0.1), black));
    sw.position.set(3.4, 1.4, 3.6);

    // Etrafındaki masa öğeleri: kapak camı kutusu
    const box = add(new THREE.Mesh(new RoundedBoxGeometry(3, 0.8, 2, 2, 0.1), new THREE.MeshStandardMaterial({ color: '#dcd2bd', roughness: 0.7 })), scene);
    box.position.set(-12, 0.4, 6);
    box.rotation.y = 0.4;

    // --- Etkileşim ---
    const pickables: THREE.Object3D[] = [];
    scope.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) pickables.push(o);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(HOME_TARGET);
    controls.enableDamping = true;
    controls.minDistance = 16;
    controls.maxDistance = 50;
    controls.minPolarAngle = 0.25;
    controls.maxPolarAngle = Math.PI / 2 - 0.08;
    controls.enablePan = false;
    controls.update();

    type Anim = {
      t0: number; dur: number;
      p0: THREE.Vector3; p1: THREE.Vector3;
      l0: THREE.Vector3; l1: THREE.Vector3;
      f0: number; f1: number;
      toLook: boolean;
    };
    let anim: Anim | null = null;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const curLookAt = HOME_TARGET.clone();

    const go = (toLook: boolean) => {
      controls.enabled = false;
      anim = {
        t0: performance.now(),
        dur: toLook ? 1900 : 1300,
        p0: camera.position.clone(),
        p1: (toLook ? LOOK_POS : HOME_POS).clone(),
        l0: curLookAt.clone(),
        l1: (toLook ? EYE_TIP : HOME_TARGET).clone(),
        f0: camera.fov,
        f1: toLook ? LOOK_FOV : HOME_FOV,
        toLook,
      };
      lookingRef.current = toLook;
    };

    apiRef.current = {
      setColor: (c) => specMat.color.set(c),
      go,
    };

    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let downX = 0, downY = 0;
    const hit = (e: PointerEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      return ray.intersectObjects(pickables, false).length > 0;
    };
    const onDown = (e: PointerEvent) => { downX = e.clientX; downY = e.clientY; };
    const onUp = (e: PointerEvent) => {
      if (lookingRef.current || anim) return;
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) return;
      if (hit(e)) cbRef.current.onPick();
    };
    const onMove = (e: PointerEvent) => {
      renderer.domElement.style.cursor = !lookingRef.current && !anim && hit(e) ? 'pointer' : 'grab';
    };
    renderer.domElement.addEventListener('pointerdown', onDown);
    renderer.domElement.addEventListener('pointerup', onUp);
    renderer.domElement.addEventListener('pointermove', onMove);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    let raf = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (anim) {
        const k = Math.min(1, (now - anim.t0) / anim.dur);
        const e = ease(k);
        camera.position.lerpVectors(anim.p0, anim.p1, e);
        curLookAt.lerpVectors(anim.l0, anim.l1, e);
        camera.fov = THREE.MathUtils.lerp(anim.f0, anim.f1, e);
        camera.updateProjectionMatrix();
        camera.lookAt(curLookAt);
        if (k >= 1) {
          const done = anim;
          anim = null;
          if (done.toLook) {
            cbRef.current.onArrived();
          } else {
            controls.target.copy(HOME_TARGET);
            controls.enabled = true;
            controls.update();
          }
        }
      } else if (!lookingRef.current) {
        controls.update();
        curLookAt.copy(controls.target);
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onDown);
      renderer.domElement.removeEventListener('pointerup', onUp);
      renderer.domElement.removeEventListener('pointermove', onMove);
      controls.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.geometry.dispose();
          const mat = m.material as THREE.Material | THREE.Material[];
          (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
      apiRef.current = null;
    };
    // sahne yalnızca bir kez kurulur
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    apiRef.current?.setColor(sampleColor);
  }, [sampleColor]);

  useEffect(() => {
    if (lookingRef.current !== looking) apiRef.current?.go(looking);
  }, [looking]);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} aria-label="3 boyutlu mikroskop" role="img" />;
}
