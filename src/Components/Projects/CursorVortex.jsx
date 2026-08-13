import React, { useRef, useEffect } from 'react';
import './CursorVortex.css';

const CursorVortex = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    let width, height;
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let mouse = { x: -1000, y: -1000, isActive: false };
    let lastClientX = -1000;
    let lastClientY = -1000;

    const handleMouseMove = (e) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        lastClientX = touch.clientX;
        lastClientY = touch.clientY;
        const rect = canvas.getBoundingClientRect();
        mouse.x = touch.clientX - rect.left;
        mouse.y = touch.clientY - rect.top;
        mouse.isActive = true;
      }
    };
    
    const handleScroll = () => {
      if (mouse.isActive && lastClientX !== -1000) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = lastClientX - rect.left;
        mouse.y = lastClientY - rect.top;
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const particles = [];
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 350 : 1000;
    // Colors from the image: dark greens, bright greens, purples, cyans
    const colors = ['#00ff88', '#8a2be2', '#4b0082', '#00ffff', '#0f52ba', '#1abc9c', '#9b59b6'];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.baseLife = Math.random() * 200 + 100;
        this.life = this.baseLife;
      }

      update() {
        if (mouse.isActive) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < (isMobile ? 350 : 600)) { // Interaction radius
            const angle = Math.atan2(dy, dx);
            const force = 1500 / (dist * dist + 500); 
            
            // Radial vector
            const radialX = Math.cos(angle) * force;
            const radialY = Math.sin(angle) * force;
            
            // Tangential vector (spiral effect)
            const spiralFactor = 3.5; // Controls how strong the vortex spin is
            const tangX = Math.cos(angle + Math.PI / 2) * force * spiralFactor; 
            const tangY = Math.sin(angle + Math.PI / 2) * force * spiralFactor; 
            
            this.vx += radialX + tangX;
            this.vy += radialY + tangY;
          }
        }

        // Reduced friction for smoother longer orbits
        this.vx *= 0.985;
        this.vy *= 0.985;

        // Base drift for particles not in vortex
        if (!mouse.isActive) {
          this.vx += (Math.random() - 0.5) * 0.05;
          this.vy += (Math.random() - 0.5) * 0.05;
          
          // Speed limit when not attracted
          const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
          if (speed > 1.5) {
             this.vx = (this.vx / speed) * 1.5;
             this.vy = (this.vy / speed) * 1.5;
          }
        }

        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        if (this.life <= 0) {
          this.reset();
        }
        
        // Wrap
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (mouse.isActive) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.fill();
        
        // Center black hole dot
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 0.5; // Turn down opacity for all particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      ctx.globalAlpha = 1.0; // Reset opacity

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-vortex-canvas" />;
};

export default CursorVortex;
