
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJSViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f8ff);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create Earth globe
    const earthGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2244aa,
      shininess: 5,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    // Create meridians and parallels
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xaaaaff, transparent: true, opacity: 0.3 });
    
    // Add meridians
    for (let i = 0; i < 12; i++) {
      const curve = new THREE.EllipseCurve(
        0, 0,             // Center
        1.5, 1.5,         // xRadius, yRadius
        0, 2 * Math.PI,   // startAngle, endAngle
        false,            // clockwise
        0                 // rotation
      );
      
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const ellipse = new THREE.Line(geometry, lineMaterial);
      ellipse.rotation.x = Math.PI / 2;
      ellipse.rotation.y = i * Math.PI / 6;
      scene.add(ellipse);
    }
    
    // Add parallels
    for (let i = 0; i < 6; i++) {
      const radius = Math.cos((Math.PI / 6) * i) * 1.5;
      const height = Math.sin((Math.PI / 6) * i) * 1.5;
      
      const curve = new THREE.EllipseCurve(
        0, 0,             // Center
        radius, radius,   // xRadius, yRadius
        0, 2 * Math.PI,   // startAngle, endAngle
        false,            // clockwise
        0                 // rotation
      );
      
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const parallel = new THREE.Line(geometry, lineMaterial);
      parallel.position.y = height;
      scene.add(parallel);
      
      if (i > 0) {
        const parallelBottom = new THREE.Line(geometry, lineMaterial);
        parallelBottom.position.y = -height;
        scene.add(parallelBottom);
      }
    }
    
    // Create shipping route visualization
    const routeMaterial = new THREE.LineBasicMaterial({ color: 0xff3333 });
    const routePoints = [];
    routePoints.push(new THREE.Vector3(1.5, 0.5, 0));
    routePoints.push(new THREE.Vector3(1.2, 0, 0.8));
    routePoints.push(new THREE.Vector3(0, -0.5, 1.4));
    routePoints.push(new THREE.Vector3(-1, -0.2, 1.1));
    
    const routeGeometry = new THREE.BufferGeometry().setFromPoints(routePoints);
    const route = new THREE.Line(routeGeometry, routeMaterial);
    scene.add(route);
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      
      earth.rotation.y += 0.002;
      
      renderer.render(scene, camera);
    };
    
    // Start animation
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div ref={containerRef} className="w-full h-full" />;
};

export default ThreeJSViewer;
