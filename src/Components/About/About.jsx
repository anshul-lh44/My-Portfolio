import React, { useEffect, useState, useRef } from 'react';
import './About.css';

const About = () => {
  const [tracks, setTracks] = useState([]);
  const requestRef = useRef();
  const tracksRef = useRef([]);
  const trackNodesRef = useRef(new Map());

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width <= 768;
    const trackCount = isMobile ? 12 : 48;

    // Initialize track physics properties
    tracksRef.current = Array.from({ length: trackCount }, (_, i) => ({
      id: i + 1,
      x: Math.random() * (width + 200) - 100,
      y: Math.random() * (height + 200) - 100,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 0.2,
      radius: 40 // Approximate collision radius updated for smaller size
    }));

    setTracks(tracksRef.current.map(t => t.id));

    const update = () => {
      const ts = tracksRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Update positions
      for (let i = 0; i < ts.length; i++) {
        let t = ts[i];
        t.x += t.vx;
        t.y += t.vy;
        t.rotation += t.vRot;

        // Whenever a track is pushed completely out of the screen, generate a new one inserted into the view
        if (t.x < -150 || t.x > w + 150 || t.y < -150 || t.y > h + 150) {
          const spawnEdge = Math.floor(Math.random() * 4);
          // Spawn just outside the visible edge
          if (spawnEdge === 0) {
            t.x = Math.random() * w; t.y = -140; 
            t.vy = Math.random() * 0.5 + 0.1; t.vx = (Math.random() - 0.5) * 0.7; 
          } else if (spawnEdge === 1) {
            t.x = w + 140; t.y = Math.random() * h; 
            t.vx = -(Math.random() * 0.5 + 0.1); t.vy = (Math.random() - 0.5) * 0.7; 
          } else if (spawnEdge === 2) {
            t.x = Math.random() * w; t.y = h + 140; 
            t.vy = -(Math.random() * 0.5 + 0.1); t.vx = (Math.random() - 0.5) * 0.7; 
          } else {
            t.x = -140; t.y = Math.random() * h; 
            t.vx = Math.random() * 0.5 + 0.1; t.vy = (Math.random() - 0.5) * 0.7; 
          }
          t.rotation = Math.random() * 360;
          t.vRot = (Math.random() - 0.5) * 0.2;
        }
      }

      // Check collisions on desktop
      if (!isMobile) {
        for (let i = 0; i < ts.length; i++) {
          for (let j = i + 1; j < ts.length; j++) {
            let t1 = ts[i];
            let t2 = ts[j];
            let dx = t2.x - t1.x;
            let dy = t2.y - t1.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let minDist = t1.radius + t2.radius;

            if (dist < minDist && dist > 0) {
              let nx = dx / dist;
              let ny = dy / dist;
              let dvx = t1.vx - t2.vx;
              let dvy = t1.vy - t2.vy;
              let relVel = dvx * nx + dvy * ny;

              if (relVel > 0) {
                let impulse = 1.0 * relVel / 2;
                t1.vx -= impulse * nx;
                t1.vy -= impulse * ny;
                t2.vx += impulse * nx;
                t2.vy += impulse * ny;

                let overlap = minDist - dist;
                t1.x -= (nx * overlap) / 2;
                t1.y -= (ny * overlap) / 2;
                t2.x += (nx * overlap) / 2;
                t2.y += (ny * overlap) / 2;
              }
            }
          }
        }
      }

      // Update DOM
      for (let i = 0; i < ts.length; i++) {
        const node = trackNodesRef.current.get(ts[i].id);
        if (node) {
          node.style.transform = `translate(${ts[i].x}px, ${ts[i].y}px) rotate(${ts[i].rotation}deg)`;
        }
      }

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="tracks-background" style={{ overflow: 'hidden' }}>
        {tracks.map((id) => (
          <img 
            key={id} 
            ref={(el) => {
              if (el) trackNodesRef.current.set(id, el);
              else trackNodesRef.current.delete(id);
            }}
            src={`/tracks/track_${((id - 1) % 24) + 1}.png`} 
            className="floating-track" 
            alt="racing track shape"
            style={{ left: 0, top: 0, transformOrigin: 'center center' }}
          />
        ))}
      </div>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              Hello! My name is Anshul Shukla. I am a Computer Science Engineering student currently pursuing my B.Tech at <strong>VIT Bhopal University</strong>. Driven by curiosity and a desire to explore my own limits, I love building web applications, programming, and exploring AI & Machine Learning.
            </p>
            <p>
              I bridge technical engineering with creative media — blending web development, graphic design, and video editing to craft engaging digital experiences and bring creative ideas to life through real-world applications.
            </p>
            <p>
              Outside of technology, I am intensely passionate about motorsports, cars, sports, music, and content creation. I am always striving to broaden my horizons, master new domains, and apply my skills to meaningful projects.
            </p>
          </div>
          
          <div className="about-image">
            <div className="image-wrapper">
              <img 
                src="/anshul-about.jpg" 
                alt="Anshul Shukla Profile" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
