"use client";

const logos = [
  { name: "HubSpot", svg: (
    <svg viewBox="0 0 120 32" fill="currentColor" className="h-8 sm:h-10">
      <circle cx="10" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="10" cy="16" r="2.5"/>
      <text x="22" y="22" fontSize="15" fontWeight="700" fontFamily="system-ui">HubSpot</text>
    </svg>
  )},
  { name: "Klaviyo", svg: (
    <svg viewBox="0 0 120 32" fill="currentColor" className="h-8 sm:h-10">
      <text x="0" y="22" fontSize="16" fontWeight="700" fontFamily="system-ui" letterSpacing="-0.5">klaviyo</text>
      <path d="M85 4l6 12-6 12h8l6-12-6-12z" opacity=".7"/>
    </svg>
  )},
  { name: "Mailchimp", svg: (
    <svg viewBox="0 0 130 32" fill="currentColor" className="h-8 sm:h-10">
      <circle cx="10" cy="16" r="7" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="10" cy="16" r="2"/>
      <text x="22" y="22" fontSize="15" fontWeight="700" fontFamily="system-ui">Mailchimp</text>
    </svg>
  )},
  { name: "Braze", svg: (
    <svg viewBox="0 0 100 32" fill="currentColor" className="h-8 sm:h-10">
      <path d="M4 8l6 4-6 4v-8zm0 10l6 4-6 4v-8z" opacity=".8"/>
      <text x="16" y="22" fontSize="16" fontWeight="700" fontFamily="system-ui" letterSpacing="-0.3">braze</text>
    </svg>
  )},
  { name: "Iterable", svg: (
    <svg viewBox="0 0 120 32" fill="currentColor" className="h-8 sm:h-10">
      <rect x="2" y="8" width="3" height="16" rx="1"/>
      <rect x="8" y="12" width="3" height="12" rx="1" opacity=".7"/>
      <rect x="14" y="6" width="3" height="18" rx="1" opacity=".85"/>
      <text x="22" y="22" fontSize="15" fontWeight="700" fontFamily="system-ui">Iterable</text>
    </svg>
  )},
  { name: "Customer.io", svg: (
    <svg viewBox="0 0 140 32" fill="currentColor" className="h-8 sm:h-10">
      <circle cx="10" cy="16" r="7" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M7 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <text x="22" y="22" fontSize="14" fontWeight="700" fontFamily="system-ui">Customer.io</text>
    </svg>
  )},
  { name: "Bird", svg: (
    <svg viewBox="0 0 90 32" fill="currentColor" className="h-8 sm:h-10">
      <path d="M4 20c2-8 8-10 12-6 2 2 4 4 6 2 2-2 0-6-4-6 4-2 8 2 8 6s-4 8-10 8c-6 0-10-2-12-4z" opacity=".85"/>
      <text x="32" y="22" fontSize="16" fontWeight="700" fontFamily="system-ui" letterSpacing="-0.3">Bird</text>
    </svg>
  )},
];

export default function LogoCarousel() {
  const allLogos = [...logos, ...logos];

  return (
    <section className="py-8 bg-[#0B0F1A] border-t border-white/5 overflow-hidden">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0F1A] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0F1A] to-transparent z-10" />

        <div className="flex items-center animate-scroll">
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 mx-10 sm:mx-14 text-gray-500/50 hover:text-gray-300/70 transition-colors duration-300"
            >
              {logo.svg}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
