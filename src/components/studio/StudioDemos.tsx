"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { DemoModal } from "./DemoModal";

interface DemoProject {
  id: string;
  imageUrl: string;
  demoUrl: string;
  label: string;
}

const DEMOS: DemoProject[] = [
  {
    id: 'btp',
    label: 'Artisan BTP',
    imageUrl: '/demos/btp.jpeg',
    demoUrl: '/demos/modele-artisan-btp.html',
  },
  {
    id: 'sante',
    label: 'Santé Bien-être',
    imageUrl: '/demos/sante.jpeg',
    demoUrl: '/demos/modele-sante-bienetre.html',
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    imageUrl: '/demos/restaurant.jpeg',
    demoUrl: '/demos/modele-restaurant.html',
  },
  {
    id: 'conseil',
    label: 'Cabinet Conseil',
    imageUrl: '/demos/conseil.jpeg',
    demoUrl: '/demos/modele-cabinet-conseil.html',
  },
  {
    id: 'commerce',
    label: 'Commerce de proximité',
    imageUrl: '/demos/commerce.jpeg',
    demoUrl: '/demos/modele-commerce-proximite.html',
  },
];

function ArrowsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 3L8.5 8.5M3 3H7.5M3 3V7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 19L13.5 13.5M19 19H14.5M19 19V14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

interface DemoCardProps {
  demo: DemoProject;
  variant?: 'tall' | 'wide';
  onSelect: (demo: DemoProject) => void;
}

function DemoCard({ demo, variant = 'tall', onSelect }: DemoCardProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const currentY = useRef(0);
  const targetY = useRef(0);

  const getMaxScroll = useCallback(() => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return 0;
    const renderedH = img.naturalHeight * (container.clientWidth / img.naturalWidth);
    return Math.max(0, renderedH - container.clientHeight);
  }, []);

  const animateRef = useRef<(() => void) | null>(null);

  const animate = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    currentY.current += (targetY.current - currentY.current) * 0.006;
    img.style.transform = `translateY(${-currentY.current}px)`;
    animRef.current = requestAnimationFrame(() => animateRef.current?.());
  }, []);

  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  const stopLoop = useCallback(() => {
    if (animRef.current) { cancelAnimationFrame(animRef.current); animRef.current = null; }
  }, []);

  const startScroll = useCallback(() => {
    setIsHovered(true);
    targetY.current = getMaxScroll();
    stopLoop();
    animRef.current = requestAnimationFrame(animate);
  }, [animate, getMaxScroll, stopLoop]);

  const stopScroll = useCallback(() => {
    setIsHovered(false);
    targetY.current = 0;
    if (!animRef.current) animRef.current = requestAnimationFrame(animate);
  }, [animate]);

  useEffect(() => {
    const mql = window.matchMedia('(hover: none)');
    if (mql.matches) {
      let dir = 1;
      let lastTime = performance.now();
      let pauseUntil = 0;
      let active = true;

      const autoScroll = (time: number) => {
        if (!active) return;
        if (time < pauseUntil) {
          lastTime = time;
          animRef.current = requestAnimationFrame(autoScroll);
          return;
        }
        const dt = time - lastTime;
        lastTime = time;

        const max = getMaxScroll();
        if (max > 0) {
          currentY.current += dir * (dt * 0.05);
          if (currentY.current >= max) {
            currentY.current = max;
            dir = -1;
            pauseUntil = time + 2000;
          } else if (currentY.current <= 0) {
            currentY.current = 0;
            dir = 1;
            pauseUntil = time + 2000;
          }
          if (imgRef.current) {
            imgRef.current.style.transform = `translateY(${-currentY.current}px)`;
          }
        }
        animRef.current = requestAnimationFrame(autoScroll);
      };
      animRef.current = requestAnimationFrame(autoScroll);

      return () => {
        active = false;
        if (animRef.current) cancelAnimationFrame(animRef.current);
      };
    }
  }, [getMaxScroll]);

  const handleClick = useCallback(() => {
    onSelect(demo);
  }, [demo, onSelect]);

  const aspectStyle = variant === 'wide'
    ? { aspectRatio: '16/7' }
    : { aspectRatio: '3/4' };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Voir la démo : ${demo.label}`}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      onMouseEnter={startScroll}
      onMouseLeave={stopScroll}
      className="relative group block rounded-2xl overflow-hidden cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-secondary w-full h-full border border-secondary/30"
      style={aspectStyle}
    >
      <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-primary">
        <img
          ref={imgRef}
          src={demo.imageUrl}
          alt={demo.label}
          className="w-full block"
          style={{ willChange: 'transform', transform: 'translateY(0)' }}
          draggable={false}
        />
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-primary-foreground/5 to-primary-foreground/10 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      />

      <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/25 text-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary group-hover:scale-110">
        <ArrowsIcon />
      </div>
    </div>
  );
}

export default function StudioDemos() {
  const [selectedDemo, setSelectedDemo] = useState<DemoProject | null>(null);

  return (
    <section id="demos" className="py-16 text-primary-foreground">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10">

        <div className="flex flex-col gap-5 sm:hidden">
          {DEMOS.map((demo) => (
            <div key={demo.id} style={{ aspectRatio: '4/5' }}>
              <DemoCard demo={demo} variant="tall" onSelect={setSelectedDemo} />
            </div>
          ))}
        </div>

        <div className="hidden sm:flex flex-col gap-6">

          <div className="grid grid-cols-2 gap-6">
            <DemoCard demo={DEMOS[0]} variant="tall" onSelect={setSelectedDemo} />
            <DemoCard demo={DEMOS[1]} variant="tall" onSelect={setSelectedDemo} />
          </div>

          <DemoCard demo={DEMOS[2]} variant="wide" onSelect={setSelectedDemo} />

          <div className="grid grid-cols-2 gap-6">
            <DemoCard demo={DEMOS[3]} variant="tall" onSelect={setSelectedDemo} />
            <DemoCard demo={DEMOS[4]} variant="tall" onSelect={setSelectedDemo} />
          </div>

        </div>

      </div>

      <DemoModal 
        isOpen={!!selectedDemo} 
        onClose={() => setSelectedDemo(null)} 
        url={selectedDemo?.demoUrl || null}
        title={selectedDemo?.label || ""}
      />
    </section>
  );
}