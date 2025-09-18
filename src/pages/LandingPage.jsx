import React from 'react';
import GradientBlinds from '../components/ForLanding/GradientBlinds/GradientBlinds';
import CardNav from '../components/ForLanding/CardNav/CardNav';
import CardSwap, { Card } from '../components/ForLanding/CardSwap/CardSwap';
import InfiniteMenu from '../components/ForLanding/InfiniteMenu/InfiniteMenu';
import logo from '../assets/images/alum-nexus-logo.png';

const navItems = [
    { label: 'About', bgColor: '#0D0716', textColor: '#fff', links: [{ label: 'Company' }, { label: 'Careers' }] },
    { label: 'Projects', bgColor: '#170D27', textColor: '#fff', links: [{ label: 'Featured' }, { label: 'Case Studies' }] },
    { label: 'Contact', bgColor: '#271E37', textColor: '#fff', links: [{ label: 'Email' }, { label: 'Twitter' }, { label: 'LinkedIn' }] },
];

const alumniItems = [
    { image: 'https://picsum.photos/seed/alumni1/800/800?grayscale', link: 'https://www.linkedin.com/', title: 'Arjun - 2019 CSE', description: 'SDE @ TechCorp' },
    { image: 'https://picsum.photos/seed/alumni2/800/800?grayscale', link: 'https://www.linkedin.com/', title: 'Meera - 2020 ECE', description: 'RF Engineer' },
    { image: 'https://picsum.photos/seed/alumni3/800/800?grayscale', link: 'https://www.linkedin.com/', title: 'Meenu - 2018 IT', description: 'Data Scientist' },
    { image: 'https://picsum.photos/seed/alumni4/800/800?grayscale', link: 'https://www.linkedin.com/', title: 'Nisha - 2017 CSE', description: 'Product Manager' },
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

            text
            {/* Top navigation */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                <CardNav
                    logo={logo}
                    logoAlt="Alum Nexus"
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

            {/* <div style={{ position: 'absolute', top: '35vh', left: '50%', transform: 'translateX(-50%)', width: 'min(760px, 88vw)', padding: '20px 24px', borderRadius: 16, background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.12)', color: '#EDEDF7', zIndex: 2, textAlign: 'center', backdropFilter: 'blur(8px)' }}> <h2 style={{ margin: '6px 0 8px 0', fontWeight: 700, letterSpacing: '-0.4px' }}>Alum Nexus — Chandigarh University</h2> <p style={{ margin: 0, color: '#CFCFE8' }}> A unified alumni platform for mentorship, jobs, and events, connecting graduates and students to grow together. Manage profiles, post opportunities, and stay engaged with the CU community. </p> </div> */}

            {/* Bottom InfiniteMenu section */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '38vh', zIndex: 1, color: 'white', opacity: 0.6 }}>
                <InfiniteMenu items={alumniItems} />
            </div>
        </div>
    );
} 