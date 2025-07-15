import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from './ProductCard';
import HorizontalPanel from './HorizontalPanel';

gsap.registerPlugin(ScrollTrigger);

const ScrollDrivenSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const panels = [
    {
      id: 1,
      title: 'Innovation',
      content: 'Cutting-edge technology that transforms the way you work and live.',
      bgColor: 'from-blue-600 to-purple-700',
      cardBg: 'from-blue-500/20 to-purple-600/20',
      cardImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      accentColor: 'border-blue-400'
    },
    {
      id: 2,
      title: 'Performance',
      content: 'Unmatched speed and efficiency for your most demanding tasks.',
      bgColor: 'from-emerald-600 to-teal-700',
      cardBg: 'from-emerald-500/20 to-teal-600/20',
      cardImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      accentColor: 'border-emerald-400'
    },
    {
      id: 3,
      title: 'Design',
      content: 'Beautiful aesthetics that complement powerful functionality.',
      bgColor: 'from-rose-600 to-pink-700',
      cardBg: 'from-rose-500/20 to-pink-600/20',
      cardImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop',
      accentColor: 'border-rose-400'
    },
    {
      id: 4,
      title: 'Security',
      content: 'Enterprise-grade protection for your data and privacy.',
      bgColor: 'from-orange-600 to-red-700',
      cardBg: 'from-orange-500/20 to-red-600/20',
      cardImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      accentColor: 'border-orange-400'
    },
    {
      id: 5,
      title: 'Future',
      content: 'Tomorrow\'s technology available today, shaping the future.',
      bgColor: 'from-violet-600 to-indigo-700',
      cardBg: 'from-violet-500/20 to-indigo-600/20',
      cardImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      accentColor: 'border-violet-400'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    
    if (!section || !container) return;

    // Pin the section and enable horizontal scrolling
    const scrollTween = gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => "+=" + (container.scrollWidth - window.innerWidth),
        anticipatePin: 1,
      }
    });

    // Animate background colors
    panels.forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: () => (index / panels.length) * (container.scrollWidth - window.innerWidth),
        end: () => ((index + 1) / panels.length) * (container.scrollWidth - window.innerWidth),
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentPanel = panels[index];
          const nextPanel = panels[index + 1];
          
          if (nextPanel && progress > 0) {
            // Interpolate between current and next panel colors
            gsap.to(section, {
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700"
      style={{
        background: 'linear-gradient(135deg, #2563eb, #7c3aed)'
      }}
    >
      <div ref={containerRef} className="flex h-full">
        {/* Static Card - Left Side */}
        <div className="flex-shrink-0 w-1/3 h-full flex items-center justify-center p-8">
          <ProductCard panels={panels} />
        </div>

        {/* Horizontal Scrolling Panels - Right Side */}
        <div className="flex-shrink-0 flex h-full">
          {panels.map((panel, index) => (
            <HorizontalPanel key={panel.id} panel={panel} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollDrivenSection;
