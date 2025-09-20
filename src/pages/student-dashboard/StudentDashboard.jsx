import React, { useEffect, useRef, useState } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

import NavBar from './components/Nav';

// Import the scoped CSS
import './StudentsDashboard.css';

export default function StudentDashboard() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          color: 0x7c3aed,
          backgroundColor: 0x101827,
          points: 12.0,
          maxDistance: 25.0,
          spacing: 20.0,
          showDots: true,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="alumni-dashboard-container">
      {/* Vanta background - fixed and full screen behind content */}
      <div
        ref={vantaRef}
        className="fixed top-0 left-0 w-screen h-screen"
        style={{ zIndex: -50, pointerEvents: 'none' }}
      />

      {/* Your existing NavBar handles everything else */}
      <NavBar />
    </div>
  );
}
