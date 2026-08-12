import React, { useEffect, useRef, useState } from 'react';

const WaterfallBackground = () => {
  const canvasRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // We observe the closest horizontal-section (which is the full viewport wrapper)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      // Find the nearest horizontal-section container
      const section = canvasRef.current.closest('.horizontal-section') || canvasRef.current.parentElement;
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      // Set to the dimensions of the full screen / horizontal-section
      const section = canvas.closest('.horizontal-section');
      if (section) {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Increase density for more waterfall amount
    const numLines = Math.floor(canvas.width / 4); 
    const lines = [];

    const createLine = (initial = false) => {
      // Much lower opacity
      const alpha = 0.02 + Math.random() * 0.08; // 0.02 to 0.10

      return {
        x: Math.random() * canvas.width,
        // Start all drops off-screen initially so they cascade down when viewed
        y: initial ? -Math.random() * canvas.height - 200 : -Math.random() * 100 - 150,
        length: Math.random() * 200 + 50,
        // Slower speed
        speed: Math.random() * 1.5 + 0.5,
        width: Math.random() * 1.5 + 0.5,
        color: `rgba(255, 255, 255, ${alpha})`,
      };
    };

    for (let i = 0; i < numLines; i++) {
      lines.push(createLine(true));
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        let currentAlpha = 1;
        const distFromBottom = canvas.height - (line.y + line.length);
        
        if (distFromBottom < 150) {
          currentAlpha = Math.max(0, distFromBottom / 150);
        }

        if (currentAlpha > 0) {
          const grad = ctx.createLinearGradient(line.x, line.y, line.x, line.y + line.length);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(1, line.color);
          
          ctx.globalAlpha = currentAlpha;
          ctx.beginPath();
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x, line.y + line.length);
          ctx.strokeStyle = grad;
          ctx.lineWidth = line.width;
          ctx.lineCap = 'round';
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }

        line.y += line.speed;

        // Reset if line completely passed the bottom
        if (line.y > canvas.height) {
          Object.assign(line, createLine(false));
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [inView]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, /* ensuring it's behind content */
        pointerEvents: 'none',
      }}
    />
  );
};

export default WaterfallBackground;
