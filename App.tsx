import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import SplitSection from './sections/SplitSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-deep-black">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection className="z-10" />
      
      {/* Destinations Section */}
      <SplitSection
        id="destinations"
        imageSrc="/destinations_mediterranean.jpg"
        imagePosition="left"
        microLabel="Explore the World"
        headline="Destinations"
        body="From Mediterranean coastlines to alpine hideaways and vibrant capitals—each location is chosen for its ability to deliver quiet luxury and extraordinary moments."
        ctaText="View Destination Collection"
        secondaryLink="Download Portfolio"
        caption="Access to 80+ countries • Private concierge in every region"
        className="z-20"
      />
      
      {/* Experiences Section */}
      <SplitSection
        id="experiences"
        imageSrc="/experiences_desert.jpg"
        imagePosition="right"
        microLabel="Moments That Matter"
        headline="Experiences"
        body="Helicopter arrivals. After-hours museum visits. Private tastings with makers. We design moments that feel effortless—and unforgettable."
        ctaText="Explore Experiences"
        secondaryLink="See Sample Itinerary"
        caption="24/7 concierge • Real-time adjustments • Local insiders"
        className="z-30"
      />
      
      {/* Curated Journeys Section */}
      <SplitSection
        id="journeys"
        imageSrc="/journeys_rice_terraces.jpg"
        imagePosition="left"
        microLabel="Your Vision, Our Craft"
        headline="Curated Journeys"
        body="Every trip is built around your pace, preferences, and purpose. We handle the complexity so you can stay present."
        ctaText="Start Planning"
        secondaryLink="How It Works"
        caption="Dedicated trip designer • Transparent pricing • Full support"
        className="z-40"
      />
      
      {/* Bespoke Service Section */}
      <SplitSection
        id="service"
        imageSrc="/service_overwater_bungalow.jpg"
        imagePosition="right"
        microLabel="Personalized Excellence"
        headline="Bespoke Service"
        body="Your preferences become our protocol. From dietary details to pacing, we design a journey that feels like it was always meant for you."
        ctaText="Request a Consultation"
        secondaryLink="Meet the Team"
        caption="Pre-trip briefing • Daily check-ins • Post-trip follow-up"
        className="z-50"
      />
      
      {/* Exclusive Access Section */}
      <SplitSection
        id="access"
        imageSrc="/access_night_city.jpg"
        imagePosition="left"
        microLabel="Doors That Stay Closed"
        headline="Exclusive Access"
        body="Private viewings, chef's table dinners, and behind-the-scenes introductions—our network opens doors that remain closed to most travelers."
        ctaText="Explore Access"
        secondaryLink="Read Guest Stories"
        caption="Invitations • Introductions • After-hours entry"
        className="z-[60]"
      />
      
      {/* Private Aviation Section */}
      <SplitSection
        id="aviation"
        imageSrc="/aviation_private_jet.jpg"
        imagePosition="right"
        microLabel="Take Flight"
        headline="Private Aviation"
        body="Skip the terminal. Fly on your schedule with vetted operators, discreet crews, and aircraft matched to your route and style."
        ctaText="Arrange a Flight"
        secondaryLink="Aircraft Options"
        caption="Global coverage • 4–16 seats • Pet-friendly • Catering on request"
        className="z-[70]"
      />
      
      {/* Yacht & Sea Section */}
      <SplitSection
        id="yacht"
        imageSrc="/yacht_aerial_deck.jpg"
        imagePosition="left"
        microLabel="The Open Water"
        headline="Yacht & Sea"
        body="Charter a vessel for a day—or a week. Crystal waters, hidden coves, and a crew that anticipates every request before you speak."
        ctaText="View Charter Collection"
        secondaryLink="Ask a Question"
        caption="Crewed charters • Watersports • Island hopping • Event hosting"
        className="z-[80]"
      />
      
      {/* Contact Section */}
      <ContactSection className="z-[90]" />
    </div>
  );
}

export default App;
