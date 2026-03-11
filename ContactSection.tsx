import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: '',
    travelDate: '',
    budget: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Content column animation
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      // Form fields stagger animation
      const formFields = formRef.current?.querySelectorAll('.form-field');
      if (formFields) {
        gsap.fromTo(
          formFields,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit to GetForm
    try {
      const response = await fetch('https://getform.io/f/166995', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          destination: '',
          travelDate: '',
          budget: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative bg-[#111111] py-24 lg:py-32 ${className}`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div ref={contentRef} className="lg:col-span-2">
            <h2 className="font-serif text-section text-off-white mb-6">
              Begin Your Journey
            </h2>
            <p className="text-muted-text text-base lg:text-lg leading-relaxed mb-12">
              Tell us where you want to go, and we'll craft the first draft of an 
              extraordinary trip.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center">
                  <Mail size={16} className="text-luxury-gold" />
                </div>
                <div>
                  <p className="text-xs text-muted-text uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:journeys@royalatlas.travel"
                    className="text-off-white hover:text-luxury-gold transition-colors"
                  >
                    journeys@royalatlas.travel
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center">
                  <Phone size={16} className="text-luxury-gold" />
                </div>
                <div>
                  <p className="text-xs text-muted-text uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+12125550138"
                    className="text-off-white hover:text-luxury-gold transition-colors"
                  >
                    +1 (212) 555-0138
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center">
                  <MapPin size={16} className="text-luxury-gold" />
                </div>
                <div>
                  <p className="text-xs text-muted-text uppercase tracking-wider mb-1">
                    Offices
                  </p>
                  <p className="text-off-white">New York • London • Dubai</p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="p-6 border border-luxury-gold/20 rounded-lg">
              <p className="text-sm text-muted-text">
                Typical response time:{' '}
                <span className="text-luxury-gold">within 24 hours</span>
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center p-12 border border-luxury-gold/30 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-luxury-gold/10 flex items-center justify-center mb-6">
                  <Check size={32} className="text-luxury-gold" />
                </div>
                <h3 className="font-serif text-2xl text-off-white mb-4">
                  Thank You
                </h3>
                <p className="text-muted-text text-center">
                  We've received your inquiry and will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="p-8 lg:p-10 border border-off-white/10 rounded-lg bg-deep-black/50"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="form-field">
                    <label className="block text-xs text-muted-text uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-off-white/20 py-3 text-off-white focus:border-luxury-gold outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div className="form-field">
                    <label className="block text-xs text-muted-text uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-off-white/20 py-3 text-off-white focus:border-luxury-gold outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-field">
                    <label className="block text-xs text-muted-text uppercase tracking-wider mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-off-white/20 py-3 text-off-white focus:border-luxury-gold outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Destination */}
                  <div className="form-field">
                    <label className="block text-xs text-muted-text uppercase tracking-wider mb-2">
                      Destination Interest
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-off-white/20 py-3 text-off-white focus:border-luxury-gold outline-none transition-colors"
                      placeholder="Where would you like to go?"
                    />
                  </div>

                  {/* Travel Date */}
                  <div className="form-field">
                    <label className="block text-xs text-muted-text uppercase tracking-wider mb-2">
                      Travel Date (Approximate)
                    </label>
                    <input
                      type="text"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-off-white/20 py-3 text-off-white focus:border-luxury-gold outline-none transition-colors"
                      placeholder="e.g., Summer 2025"
                    />
                  </div>

                  {/* Budget */}
                  <div className="form-field">
                    <label className="block text-xs text-muted-text uppercase tracking-wider mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-off-white/20 py-3 text-off-white focus:border-luxury-gold outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-deep-black">
                        Select budget range
                      </option>
                      <option value="25000-50000" className="bg-deep-black">
                        $25,000 - $50,000
                      </option>
                      <option value="50000-100000" className="bg-deep-black">
                        $50,000 - $100,000
                      </option>
                      <option value="100000-250000" className="bg-deep-black">
                        $100,000 - $250,000
                      </option>
                      <option value="250000+" className="bg-deep-black">
                        $250,000+
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="form-field mt-6">
                  <label className="block text-xs text-muted-text uppercase tracking-wider mb-2">
                    Special Requests / Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-transparent border-b border-off-white/20 py-3 text-off-white focus:border-luxury-gold outline-none transition-colors resize-none"
                    placeholder="Tell us about your vision..."
                  />
                </div>

                {/* Submit Button */}
                <div className="form-field mt-10">
                  <button
                    type="submit"
                    className="btn-solid flex items-center gap-3 group"
                  >
                    <span>Request a Proposal</span>
                    <Send
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full px-6 lg:px-12 mt-24 pt-8 border-t border-off-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-lg text-off-white">ROYAL ATLAS</p>
          <p className="text-xs text-muted-text">
            © 2025 Royal Atlas Travels. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-xs text-muted-text hover:text-luxury-gold transition-colors">
              Privacy Policy
            </button>
            <button className="text-xs text-muted-text hover:text-luxury-gold transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
