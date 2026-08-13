import React, { useEffect, useRef } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import About from './Components/About/About';
import Skills from './Components/Skills/Skills';
import Projects from './Components/Projects/Projects';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';

const App = () => {
    const containerRef = useRef(null);
    const [warpEffect, setWarpEffect] = React.useState('');
    const lastScrollLeft = useRef(0);
    const scrollTimeout = useRef(null);

    const handleScroll = () => {
        const currentScroll = containerRef.current.scrollLeft;
        if (currentScroll > lastScrollLeft.current + 2) {
            setWarpEffect('warp-right');
        } else if (currentScroll < lastScrollLeft.current - 2) {
            setWarpEffect('warp-left');
        }
        lastScrollLeft.current = currentScroll;

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            setWarpEffect('');
        }, 120); // Give the push animations time to visually resolve
    };

    useEffect(() => {
        const handleWheel = (e) => {
            if (window.innerWidth > 768 && e.deltaY !== 0) {
                e.preventDefault();
                containerRef.current.scrollLeft += e.deltaY * 3; // speed up scroll
            }
        };
        const node = containerRef.current;
        if (node) {
            node.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            if (node) node.removeEventListener('wheel', handleWheel);
        };
    }, []);

const SpeedLines = ({ warpEffect }) => {
    if (!warpEffect || (typeof window !== 'undefined' && window.innerWidth <= 768)) return null;
    const lines = Array.from({ length: 25 }); // enough lines to cover the entire page
    return (
        <div className={`speed-lines-container ${warpEffect}`}>
            {lines.map((_, i) => (
                <div key={i} className="streak" style={{
                    // Covers the entire page vertically
                    top: `${Math.random() * 100}%`,
                    height: `${1 + Math.random() * 3}px`,
                    opacity: 0.3 + Math.random() * 0.7,
                    animationDuration: `${0.15 + Math.random() * 0.2}s`,
                    animationDelay: `${Math.random() * 0.05}s`
                }}></div>
            ))}
        </div>
    );
};

    return (
        <div>
            <SpeedLines warpEffect={warpEffect} />
            <Navbar />
            <main ref={containerRef} className={`horizontal-container ${warpEffect}`} onScroll={handleScroll}>
                <section className="horizontal-section"><Hero /></section>
                <section className="horizontal-section"><About /></section>
                <section className="horizontal-section"><Skills /></section>
                <section className="horizontal-section"><Projects /></section>
                <section className="horizontal-section"><Contact /></section>
                <section className="horizontal-section"><Footer /></section>
            </main>
        </div>
    );
};

export default App;