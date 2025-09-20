import React from 'react';
import GradientBlinds from '../components/ForLanding/GradientBlinds/GradientBlinds';
import CardNav from '../components/ForLanding/CardNav/CardNav';
import CardSwap, { Card } from '../components/ForLanding/CardSwap/CardSwap';
import InfiniteMenu from '../components/ForLanding/InfiniteMenu/InfiniteMenu';
import logo from '../assets/images/alum-nexus-logo.png';
import alumni1 from "../assets/images/alumni/alumni1.png";
import alumni2 from "../assets/images/alumni/alumni2.png";
import alumni3 from "../assets/images/alumni/alumni3.png";
import alumni4 from "../assets/images/alumni/alumni4.png";

const navItems = [
        { label: 'About', bgColor: '#0D0716', textColor: '#fff', links: [{ label: 'Company' }, { label: 'Careers' }] },
        { label: 'Projects', bgColor: '#170D27', textColor: '#fff', links: [{ label: 'Featured' }, { label: 'Case Studies' }] },
        { label: 'Contact', bgColor: '#271E37', textColor: '#fff', links: [{ label: 'Email' }, { label: 'Twitter' }, { label: 'LinkedIn' }] },
    ];
 const alumniItems = [
     { image: alumni1, link: 'https://www.linkedin.com/', title: 'Arjun - 2019 CSE', description: 'SDE @ TechCorp' },
     { image: alumni2, link: 'https://www.linkedin.com/', title: 'Meera - 2020 ECE', description: 'RF Engineer' },
     { image: alumni3, link: 'https://www.linkedin.com/', title: 'Meenu - 2018 IT', description: 'Data Scientist' },
     { image: alumni4, link: 'https://www.linkedin.com/', title: 'Nisha - 2017 CSE', description: 'Product Manager' },
 ];

export default function LandingPage() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <GradientBlinds
          gradientColors={['#FF9FFC', '#5227FF']}
          angle={0}
          noise={0.1}
          blindCount={14}
          blindMinWidth={60}
          spotlightRadius={0.55}
          spotlightSoftness={1}
          spotlightOpacity={0.9}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="normal"
        />
      </div>

      {/* Top-left logo */}
      <a
        href="/"
        style={{
          position: 'absolute',
          top: 20,
          left: 50,
          zIndex: 3,
          display: 'inline-flex',
          alignItems: 'left',
          gap: 10,
          textDecoration: 'none'
        }}
        aria-label="Alum Nexus Home"
      >
        <img
          src={logo}
          alt="Alum Nexus"
          style={{
            height: 96,
            width: 60,
            objectFit: 'contain',
            
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))',
            left: 32,
            position: 'relative'
          }}
        />
      </a>

      {/* Top-right project name */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          right: 90,
          zIndex: 3,
          color: '#fff',
          fontWeight: 900,
          height: 55,
          letterSpacing: '0.3px',
          background: 'rgba(0, 0, 0, 0.66)',
          border: '1px solid rgba(255,255,255,0.18)',
          padding: '8px 14px',
          borderRadius: 12,
          backdropFilter: 'blur(1px)',
          fontSize: 25,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        Alum Nexus
      </div>

      {/* Top navigation (without logo now) */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <CardNav
          // logo removed
          items={navItems}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />
      </div>

      {/* Bottom-right CardSwap */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 2 }}>
        <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={true} width={360} height={240}>
          <Card style={{ background: '#120E1A', borderColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: 16 }}>
            <h3 style={{ margin: 0 }}>Welcome Alumni</h3>
            <p style={{ margin: 0 }}>Reconnect and grow</p>
          </Card>
          <Card style={{ background: '#191326', borderColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: 16 }}>
            <h3 style={{ margin: 0 }}>Mentorship</h3>
            <p style={{ margin: 0 }}>Guide students</p>
          </Card>
          <Card style={{ background: '#251B3A', borderColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: 16 }}>
            <h3 style={{ margin: 0 }}>Events</h3>
            <p style={{ margin: 0 }}>Reunions & talks</p>
          </Card>
        </CardSwap>
      </div>

      {/* Infinite menu */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '38vh', zIndex: 1, color: 'white', opacity: 0.6 }}>
        <InfiniteMenu items={alumniItems} />
      </div>
    </div>
  );
}
