// src/app/VisualEffects.jsx (or wherever you place this component)
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const VisualEffects = () => {
  const containerRef = useRef(null); // Main scroll container
  const particlesRef = useRef(null);
  const morphShapeRef = useRef(null);
  const glowOrbRef = useRef(null);
  const textRef = useRef(null);
  const sectionRefs = useRef([]); // To hold references to multiple scroll sections

  // Helper to add elements to sectionRefs array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const particles = particlesRef.current;
    const morphShape = morphShapeRef.current;
    const glowOrb = glowOrbRef.current;
    const textElement = textRef.current; // Renamed to avoid conflict with 'text' string

    if (!container || !particles || !morphShape || !glowOrb || !textElement || sectionRefs.current.length === 0) {
      return;
    }

    // --- Floating particles (continuous, independent of main scroll) ---
    const createParticles = () => {
      // Clear existing particles to prevent duplicates on re-renders
      particles.innerHTML = ''; 
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 6 + 2}px;
          height: ${Math.random() * 6 + 2}px;
          background: radial-gradient(circle, rgba(${Math.random() * 255},${Math.random() * 255},255,0.8) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
        `;
        particles.appendChild(particle);

        gsap.to(particle, {
          duration: Math.random() * 10 + 5,
          x: (Math.random() - 0.5) * 800,
          y: (Math.random() - 0.5) * 600,
          rotation: Math.random() * 360,
          scale: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    };

    // --- Scroll-driven animations ---
    // Pin the main container while its internal sections scroll
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom', // Pin for the full height of the container
      pin: true,
      scrub: 1, // Smoothly link scroll to animation
      // markers: true, // Uncomment for debugging scroll triggers
    });

    // Background color change based on sections
    sectionRefs.current.forEach((section, i) => {
      if (i < sectionRefs.current.length - 1) {
        gsap.to(container, { // Animate the main container's background
          backgroundColor: sectionRefs.current[i + 1].dataset.bgColor,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'bottom center', // Start transition when bottom of section hits center of viewport
            end: 'bottom top',     // End transition when bottom of section hits top of viewport
            scrub: true,
            // markers: true,
          },
        });
      }
    });

    // Morphing shape animation (now scroll-driven)
    gsap.to(morphShape, {
      scrollTrigger: {
        trigger: sectionRefs.current[1], // Trigger on the second section
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        // markers: true,
      },
      borderRadius: "50%",
      scale: 1.5,
      rotation: 360,
      x: '50%', // Move right
      background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)",
      ease: "none" // Use ease: "none" with scrub for direct scroll control
    });

    gsap.to(morphShape, {
      scrollTrigger: {
        trigger: sectionRefs.current[2], // Trigger on the third section
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        // markers: true,
      },
      borderRadius: "10px",
      scale: 0.8,
      rotation: 720,
      x: '-50%', // Move left
      background: "linear-gradient(225deg, #11998e, #38ef7d, #fcb045, #fd1d1d)",
      ease: "none"
    });

    // Glow Orb animation (now scroll-driven)
    gsap.to(glowOrb, {
      scrollTrigger: {
        trigger: sectionRefs.current[1], // Trigger on the second section
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        // markers: true,
      },
      scale: 1.8,
      rotation: -360,
      x: '-50%', // Move left
      boxShadow: "0 0 80px rgba(255,255,255,0.8), 0 0 120px rgba(0,255,255,0.6), 0 0 160px rgba(255,0,255,0.4)",
      ease: "none"
    });

    gsap.to(glowOrb, {
      scrollTrigger: {
        trigger: sectionRefs.current[2], // Trigger on the third section
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        // markers: true,
      },
      scale: 1,
      rotation: -720,
      x: '50%', // Move right
      boxShadow: "0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(0,255,255,0.4)",
      ease: "none"
    });

    // Text animation (now scroll-driven)
    const letters = textElement.querySelectorAll('.letter');
    gsap.fromTo(letters, {
      opacity: 0,
      y: 50,
      rotationX: 90
    }, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      stagger: 0.05, // Stagger still works with scrub
      ease: "power2.out", // Can use ease with scrub, it affects the "feel"
      scrollTrigger: {
        trigger: textElement,
        start: 'top center',
        end: 'center center',
        scrub: true,
        // markers: true,
      }
    });

    // --- Mouse effect (remains independent of scroll) ---
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to(morphShape, {
        duration: 0.5,
        x: xPercent * 50, // Added to existing scroll-driven x
        y: yPercent * 50, // Added to existing scroll-driven y
        ease: "power2.out",
        overwrite: 'auto' // Important to prevent conflicts with scrollTrigger
      });

      gsap.to(glowOrb, {
        duration: 0.8,
        x: -xPercent * 30, // Added to existing scroll-driven x
        y: -yPercent * 30, // Added to existing scroll-driven y
        ease: "power2.out",
        overwrite: 'auto' // Important to prevent conflicts with scrollTrigger
      });
    };

    createParticles(); // Initialize particles
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill all ScrollTriggers
    };
  }, []); // Empty dependency array means this runs once on mount

  const text = "VISUAL EFFECTS";
  const letters = text.split('').map((letter, index) => (
    <span key={index} className="letter inline-block">
      {letter === ' ' ? '\u00A0' : letter}
    </span>
  ));

  return (
    // Main container for the scroll-driven experience
    <div ref={containerRef} className="relative w-full min-h-[300vh] bg-black overflow-hidden"> {/* Increased height for scroll */}
      {/* Background gradient (will be animated by GSAP) */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black opacity-80" />

      {/* Particles layer */}
      <div ref={particlesRef} className="absolute inset-0" />

      {/* Morphing shape */}
      <div
        ref={morphShapeRef}
        className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32"
        style={{
          background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
          filter: "blur(1px)"
        }}
      />
      {/* Glow Orb */}
      <div
        ref={glowOrbRef}
        className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(0,255,255,0.6) 50%, transparent 100%)",
          boxShadow: "0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(0,255,255,0.4)"
        }}
      />
      {/* Main Text */}
      <div
        ref={textRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white tracking-wider z-20"
        style={{
          textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(0,255,255,0.6)"
        }}
      >
        {letters}
      </div>

      {/* Decorative elements (can also be scroll-animated if desired) */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-ping" />
      <div className="absolute top-40 right-40 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
      <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-bounce" />

      {/* Rings */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-40 h-40 border-2 border-cyan-400 rounded-full animate-spin opacity-30" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-4 w-32 h-32 border-2 border-pink-400 rounded-full animate-spin opacity-40" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
        <div className="absolute inset-8 w-24 h-24 border-2 border-yellow-400 rounded-full animate-spin opacity-50" style={{ animationDuration: '4s' }} />
      </div>

      {/* Scroll Sections - these will define the scroll points for animations */}
      {/* Each section should be at least h-screen to provide enough scroll space */}
      <section ref={addToRefs} data-bg-color="#0A0A0A" className="h-screen w-full flex items-center justify-center"></section> {/* Initial dark background */}
      <section ref={addToRefs} data-bg-color="#2C0A2C" className="h-screen w-full flex items-center justify-center"></section> {/* Purple phase */}
      <section ref={addToRefs} data-bg-color="#0A2C2C" className="h-screen w-full flex items-center justify-center"></section> {/* Teal phase */}
      <section ref={addToRefs} data-bg-color="#2C2C0A" className="h-screen w-full flex items-center justify-center"></section> {/* Yellow phase */}
      <section ref={addToRefs} data-bg-color="#0A0A0A" className="h-screen w-full flex items-center justify-center"></section> {/* Back to dark */}

    </div>
  );
};

export default VisualEffects;
