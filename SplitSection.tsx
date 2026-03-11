import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SplitSectionProps {
  id: string;
  imageSrc: string;
  imagePosition: 'left' | 'right';
  microLabel: string;
  headline: string;
  body: string;
  ctaText: string;
  secondaryLink?: string;
  caption: string;
  className?: string;
}

const SplitSection = ({
  id,
  imageSrc,
  imagePosition,
  microLabel,
  headline,
  body,
  ctaText,
  secondaryLink,
  caption,
  className = '',
}: SplitSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Image entrance from left or right
      const imageFromX = imagePosition === 'left' ? '-60vw' : '60vw';
      const imageExitX = imagePosition === 'left' ? '-18vw' : '18vw';
      const contentFromX = imagePosition === 'left' ? '45vw' : '-45vw';
      const contentExitX = imagePosition === 'left' ? '18vw' : '-18vw';

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        imageRef.current,
        { x: imageFromX, scale: 1.08, opacity: 1 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        contentRef.current,
        { x: contentFromX, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );
      scrollTl.fromTo(
        lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );
      scrollTl.fromTo(
        bodyRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );
      scrollTl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );
      scrollTl.fromTo(
        captionRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.22
      );

      // SETTLE (30-70%) - no animation needed, just hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: imageExitX, opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: contentExitX, opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        lineRef.current,
        { scaleY: 1, opacity: 1 },
        { scaleY: 0, opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: -24, opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        bodyRef.current,
        { y: 0, opacity: 1 },
        { y: -16, opacity: 0, ease: 'power2.in' },
        0.72
      );
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: -10, opacity: 0, ease: 'power2.in' },
        0.74
      );
      scrollTl.fromTo(
        captionRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, [imagePosition]);

  const isLeft = imagePosition === 'left';

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section-pinned ${className}`}
    >
      {/* Image */}
      <div
        ref={imageRef}
        className={`absolute will-change-transform ${
          isLeft ? 'left-0' : 'right-0'
        }`}
        style={{
          top: 0,
          width: '55vw',
          height: '100vh',
        }}
      >
        <img
          src={imageSrc}
          alt={headline}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Panel */}
      <div
        ref={contentRef}
        className={`absolute will-change-transform bg-deep-black ${
          isLeft ? 'right-0' : 'left-0'
        }`}
        style={{
          top: 0,
          width: '45vw',
          height: '100vh',
        }}
      >
        {/* Gold Rule Line */}
        <div
          ref={lineRef}
          className={`absolute gold-rule will-change-transform origin-top ${
            isLeft ? 'left-0' : 'right-0'
          }`}
          style={{
            top: '10vh',
            width: '1.5px',
            height: '80vh',
          }}
        />

        {/* Content */}
        <div
          className="absolute"
          style={{
            [isLeft ? 'left' : 'right']: '6vw',
            top: '18vh',
            width: '34vw',
          }}
        >
          {/* Micro Label */}
          <div className="micro-label mb-6">{microLabel}</div>

          {/* Headline */}
          <h2
            ref={headlineRef}
            className="font-serif text-section text-off-white mb-8 will-change-transform"
          >
            {headline}
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="text-muted-text text-base lg:text-lg leading-relaxed mb-10 will-change-transform"
          >
            {body}
          </p>

          {/* CTA Row */}
          <div ref={ctaRef} className="flex flex-col gap-4 will-change-transform">
            <button className="btn-primary flex items-center gap-3 group w-fit">
              <span>{ctaText}</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            {secondaryLink && (
              <button className="text-sm text-off-white/60 hover:text-luxury-gold transition-colors flex items-center gap-2 w-fit">
                <Download size={14} />
                <span>{secondaryLink}</span>
              </button>
            )}
          </div>

          {/* Caption */}
          <p
            ref={captionRef}
            className="absolute text-xs text-muted-text/60 tracking-wider mt-16 will-change-transform"
            style={{
              top: '48vh',
            }}
          >
            {caption}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SplitSection;
