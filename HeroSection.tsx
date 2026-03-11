import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const topRightImageRef = useRef<HTMLDivElement>(null);
  const bottomRightImageRef = useRef<HTMLDivElement>(null);
  const lineARef = useRef<HTMLDivElement>(null);
  const lineBRef = useRef<HTMLDivElement>(null);
  const lineCRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ delay: 0.3 });

      // Images entrance
      loadTl.fromTo(
        leftImageRef.current,
        { opacity: 0, x: '-12vw' },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        0
      );
      loadTl.fromTo(
        topRightImageRef.current,
        { opacity: 0, x: '12vw' },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        0.1
      );
      loadTl.fromTo(
        bottomRightImageRef.current,
        { opacity: 0, y: '12vh' },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        0.2
      );

      // Gold lines draw on
      loadTl.fromTo(
        lineARef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.8, ease: 'power2.out' },
        0.4
      );
      loadTl.fromTo(
        lineBRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.out' },
        0.5
      );
      loadTl.fromTo(
        lineCRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.out' },
        0.6
      );

      // Micro label
      loadTl.fromTo(
        microLabelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.5
      );

      // Headline words animation
      const headlineWords = headlineRef.current?.querySelectorAll('.word');
      if (headlineWords) {
        loadTl.fromTo(
          headlineWords,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out' },
          0.6
        );
      }

      // CTA fade in
      loadTl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.9
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([leftImageRef.current, topRightImageRef.current, bottomRightImageRef.current], {
              opacity: 1, x: 0, y: 0,
            });
            gsap.set([lineARef.current, lineBRef.current, lineCRef.current], {
              scaleX: 1, scaleY: 1, opacity: 1,
            });
            gsap.set(headlineRef.current, { opacity: 1, y: 0 });
            gsap.set(ctaRef.current, { opacity: 1, y: 0 });
            gsap.set(microLabelRef.current, { opacity: 1 });
          },
        },
      });

      // Phase 1 (0-70%): Hold - no animation
      // Phase 2 (70-100%): Exit
      scrollTl.fromTo(
        leftImageRef.current,
        { x: 0, opacity: 1 },
        { x: '-55vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        topRightImageRef.current,
        { x: 0, opacity: 1 },
        { x: '55vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        bottomRightImageRef.current,
        { y: 0, opacity: 1 },
        { y: '55vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );
      scrollTl.fromTo(
        microLabelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        lineARef.current,
        { scaleY: 1, opacity: 1 },
        { scaleY: 0, opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        lineBRef.current,
        { scaleX: 1, opacity: 1 },
        { scaleX: 0, opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        lineCRef.current,
        { scaleX: 1, opacity: 1 },
        { scaleX: 0, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToDestinations = () => {
    const element = document.getElementById('destinations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`section-pinned ${className}`}
    >
      {/* Left Image (Large Vertical) */}
      <div
        ref={leftImageRef}
        className="absolute will-change-transform"
        style={{
          left: '6vw',
          top: '14vh',
          width: '34vw',
          height: '72vh',
        }}
      >
        <img
          src="/hero_left_aerial_coast.jpg"
          alt="Luxury coastal resort"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top Right Image (Horizontal) */}
      <div
        ref={topRightImageRef}
        className="absolute will-change-transform"
        style={{
          right: '6vw',
          top: '14vh',
          width: '48vw',
          height: '34vh',
        }}
      >
        <img
          src="/hero_topright_villa_pool.jpg"
          alt="Luxury villa pool"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Right Image (Horizontal) */}
      <div
        ref={bottomRightImageRef}
        className="absolute will-change-transform"
        style={{
          right: '6vw',
          bottom: '14vh',
          width: '48vw',
          height: '34vh',
        }}
      >
        <img
          src="/hero_bottomright_mountain_road.jpg"
          alt="Mountain road journey"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gold Rule Lines */}
      <div
        ref={lineARef}
        className="absolute gold-rule will-change-transform origin-top"
        style={{
          left: '42vw',
          top: '14vh',
          width: '1.5px',
          height: '72vh',
        }}
      />
      <div
        ref={lineBRef}
        className="absolute gold-rule will-change-transform origin-left"
        style={{
          right: '6vw',
          top: '50vh',
          width: '48vw',
          height: '1.5px',
        }}
      />
      <div
        ref={lineCRef}
        className="absolute gold-rule will-change-transform origin-left"
        style={{
          left: '6vw',
          top: '78vh',
          width: '88vw',
          height: '1.5px',
        }}
      />

      {/* Micro Label */}
      <div
        ref={microLabelRef}
        className="absolute micro-label will-change-transform"
        style={{
          left: '6vw',
          top: '9.5vh',
        }}
      >
        Bespoke Itineraries
      </div>

      {/* Headline Block */}
      <div
        ref={headlineRef}
        className="absolute will-change-transform"
        style={{
          left: '6vw',
          bottom: '10vh',
          width: '62vw',
        }}
      >
        <h1 className="font-serif text-hero text-off-white leading-tight mb-4">
          <span className="word inline-block">Travel</span>{' '}
          <span className="word inline-block">Beyond</span>{' '}
          <span className="word inline-block">Luxury</span>
        </h1>
        <p className="text-muted-text text-base lg:text-lg max-w-xl leading-relaxed">
          Curated journeys for those who expect the exceptional—private aviation, 
          secluded villas, and experiences designed around you.
        </p>
      </div>

      {/* CTA Button */}
      <div
        ref={ctaRef}
        className="absolute will-change-transform"
        style={{
          right: '6vw',
          bottom: '10vh',
        }}
      >
        <button onClick={scrollToDestinations} className="btn-primary flex items-center gap-3 group">
          <span>Explore Destinations</span>
          <ArrowRight 
            size={16} 
            className="transition-transform group-hover:translate-x-1" 
          />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
