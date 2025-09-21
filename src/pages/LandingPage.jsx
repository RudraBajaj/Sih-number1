import React from 'react';
import GradientBlinds from '../components/ForLanding/GradientBlinds/GradientBlinds';
import CardNav from '../components/ForLanding/CardNav/CardNav';
import CardSwap, { Card } from '../components/ForLanding/CardSwap/CardSwap';
import InfiniteMenu from '../components/ForLanding/InfiniteMenu/InfiniteMenu';
import logo from '../assets/images/alum-nexus-logo.png';
import StarBorder from '../StarBorder/StarBorder';
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

      {/* Center hero tagline with StarBorder */}
<div
  style={{
    position: 'absolute',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    zIndex: 2, // above background, below top-right UI if needed
    pointerEvents: 'none' // so it doesn't block clicks; inner re-enables
  }}
>
  <StarBorder
    as="div"
    color="magenta"
    speed="6s"
    thickness={0.5}
    style={{
      display: 'inline-block',
      pointerEvents: 'auto' 
      // allow selecting/clicking inside if links are added
    }}
  >
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        color: '#fff',
        fontWeight: 900,
        letterSpacing: '0.3px',
        textAlign: 'center',
        lineHeight: 1.1,
        // responsive sizing
        fontSize: 'clamp(24px, 5vw, 48px)',
        padding: '10px 18px',
        background: 'transparent',          // keep glow visible
        border: 'none'                       // no extra outer box
      }}
    >
      Your alumni community, supercharged
    </div>
  </StarBorder>
</div>

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
      {/* Bottom-right CardSwap with professional content */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 2 }}>
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={5200}
          pauseOnHover={true}
          width={380}
          height={250}
        >
          {/* Card 1: Event spotlight */}
          <Card style={{ background:'#151226', color:'#fff', padding:16, borderColor:'rgba(255,255,255,0.18)', borderWidth:1, borderStyle:'solid', borderRadius:12 }}>
            <h3 style={{ margin:0, fontSize:18 }}>Next: Alumni Meetup 2024</h3>
            <p style={{ margin:'6px 0 8px', opacity:.9 }}>Dec 15 • 6:00 PM • College Auditorium</p>
            <div style={{ height:6, background:'rgba(255,255,255,0.12)', borderRadius:4, overflow:'hidden', marginBottom:10 }}>
              <div style={{ width:'45%', background:'#06b6d4', height:'100%' }} />
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <a href="/events/meetup-2024" style={{ background:'#06b6d4', color:'#001318', padding:'8px 12px', borderRadius:8, textDecoration:'none', fontWeight:600 }}>RSVP now</a>
              <a href="/events" style={{ color:'#cbd5e1', textDecoration:'none', padding:'8px 12px', border:'1px solid rgba(255,255,255,0.25)', borderRadius:8 }}>View all</a>
            </div>
          </Card>

          {/* Card 2: Mentorship hub */}
          <Card style={{ background:'#1a1430', color:'#fff', padding:16, borderColor:'rgba(255,255,255,0.18)', borderWidth:1, borderStyle:'solid', borderRadius:12 }}>
            <h3 style={{ margin:0, fontSize:18 }}>Mentorship</h3>
            <p style={{ margin:'6px 0 10px', opacity:.9 }}>Share experience or find guidance from alumni.</p>
            <div style={{ display:'flex', gap:10, marginBottom:10 }}>
              <a href="/mentorship/become-mentor" style={{ background:'#8b5cf6', color:'#0b0420', padding:'8px 12px', borderRadius:8, textDecoration:'none', fontWeight:700 }}>Become a mentor</a>
              <a href="/mentorship/find-mentor" style={{ background:'transparent', color:'#fff', padding:'8px 12px', borderRadius:8, textDecoration:'none', border:'1px solid rgba(255,255,255,0.3)' }}>Find a mentor</a>
            </div>
            <div style={{ display:'flex', gap:8, fontSize:12, opacity:.9 }}>
              <span>132 mentors</span>
              <span>•</span>
              <span>47 requests</span>
              <span>•</span>
              <span>~2.1 days response</span>
            </div>
          </Card>

          {/* Card 3: Jobs & referrals */}
          <Card style={{ background:'#10141f', color:'#fff', padding:16, borderColor:'rgba(255,255,255,0.18)', borderWidth:1, borderStyle:'solid', borderRadius:12 }}>
            <h3 style={{ margin:0, fontSize:18 }}>Jobs & Referrals</h3>
            <p style={{ margin:'6px 0 8px', opacity:.9 }}>Featured: SDE II • FinTechX • Bengaluru • Hybrid</p>
            <div style={{ display:'flex', gap:10 }}>
              <a href="/jobs/featured" style={{ background:'#10b981', color:'#00140e', padding:'8px 12px', borderRadius:8, textDecoration:'none', fontWeight:700 }}>View role</a>
              <a href="/referrals/new" style={{ color:'#cbd5e1', textDecoration:'none', padding:'8px 12px', border:'1px solid rgba(255,255,255,0.25)', borderRadius:8 }}>Refer candidate</a>
            </div>
          </Card>

          {/* Card 4: Give back */}
          <Card style={{ background:'#1a1a23', color:'#fff', padding:16, borderColor:'rgba(255,255,255,0.18)', borderWidth:1, borderStyle:'solid', borderRadius:12 }}>
            <h3 style={{ margin:0, fontSize:18 }}>Give Back</h3>
            <p style={{ margin:'6px 0 8px', opacity:.9 }}>Scholarship Fund 2025 • ₹15,000 / ₹25,000</p>
            <div style={{ height:6, background:'rgba(255,255,255,0.12)', borderRadius:4, overflow:'hidden', marginBottom:10 }}>
              <div style={{ width:'60%', background:'#f59e0b', height:'100%' }} />
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <a href="/donate" style={{ background:'#f59e0b', color:'#2b1900', padding:'8px 12px', borderRadius:8, textDecoration:'none', fontWeight:700 }}>Pledge now</a>
              <a href="/campaigns" style={{ color:'#cbd5e1', textDecoration:'none', padding:'8px 12px', border:'1px solid rgba(255,255,255,0.25)', borderRadius:8 }}>See campaigns</a>
            </div>
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
