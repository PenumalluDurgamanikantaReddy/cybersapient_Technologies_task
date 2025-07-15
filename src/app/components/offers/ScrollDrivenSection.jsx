'use client'

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import HorizontalPanel from './HorizontalPanel';

gsap.registerPlugin(ScrollTrigger);

const ScrollDrivenSection = () => {
  const sectionRef = useRef(null);
  const verticalRef = useRef(null);
  const cardRef = useRef(null);

const panels = [
    {
      id: 1,
      title: "Innovation",
      content: "Cutting-edge solutions that push boundaries and redefine possibilities.",
      bgColor: "hsl(220, 100%, 95%)",
      cardBg: "hsl(220, 100%, 98%)",
      cardImage: "/placeholder.svg",
      accentColor: "hsl(220, 100%, 60%)"
    },
    {
      id: 2,
      title: "Design",
      content: "Beautiful interfaces crafted with attention to detail and user experience.",
      bgColor: "hsl(280, 100%, 95%)",
      cardBg: "hsl(280, 100%, 98%)",
      cardImage: "/placeholder.svg",
      accentColor: "hsl(280, 100%, 60%)"
    },
    {
      id: 3,
      title: "Performance",
      content: "Lightning-fast applications optimized for speed and reliability.",
      bgColor: "hsl(160, 100%, 95%)",
      cardBg: "hsl(160, 100%, 98%)",
      cardImage: "/placeholder.svg",
      accentColor: "hsl(160, 100%, 60%)"
    },
    {
      id: 4,
      title: "Security",
      content: "Enterprise-grade security measures to protect your valuable data.",
      bgColor: "hsl(340, 100%, 95%)",
      cardBg: "hsl(340, 100%, 98%)",
      cardImage: "/placeholder.svg",
      accentColor: "hsl(340, 100%, 60%)"
    },
    {
      id: 5,
      title: "Support",
      content: "24/7 dedicated support team ready to assist you every step of the way.",
      bgColor: "hsl(40, 100%, 95%)",
      cardBg: "hsl(40, 100%, 98%)",
      cardImage: "/placeholder.svg",
      accentColor: "hsl(40, 100%, 60%)"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const vertical = verticalRef.current;
    const card = cardRef.current;

    if (!section || !vertical || !card) return;

    const totalHeight = vertical.scrollHeight - section.clientHeight;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const panelIndex = Math.floor(progress * panels.length);
          const currentPanel = panels[Math.min(panelIndex, panels.length - 1)];

          gsap.to(section, {
            backgroundColor: currentPanel.bgColor,
            duration: 0.3,
            ease: "power2.out"
          });

          gsap.to(card, {
            backgroundColor: currentPanel.cardBg,
            borderColor: currentPanel.accentColor,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });

    tl.to(vertical, {
      y: -totalHeight,
      ease: "none"
    });

    panels.forEach((panel, index) => {
      const panelElement = vertical.children[index];
      if (panelElement) {
        gsap.fromTo(panelElement.querySelector('.panel-content'), {
          opacity: 0,
          y: 50
        }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panelElement,
            start: "top 80%",
            end: "top 20%",
            containerAnimation: tl,
            scrub: 1
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: panels[0].bgColor }}
    >
      <div className="flex h-full">
        {/* Left - Static card */}
        <div className="w-1/3 flex items-center justify-center p-8">
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ProductCard panels={panels} />
          </motion.div>
        </div>

        {/* Right - Vertical scroll panels */}
        <div className="w-2/3 overflow-hidden">
          <div
            ref={verticalRef}
            className="flex flex-col h-auto"
            style={{ height: `${panels.length * 100}vh` }}
          >
            {panels.map((panel, index) => (
              <HorizontalPanel 
                key={panel.id}
                panel={panel}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollDrivenSection;
