"use client";

const logos = [
  { name: "Shopify", svg: (
    <svg viewBox="0 0 110 32" fill="currentColor" className="h-9 sm:h-11">
      <path d="M27.5 5.9c0-.1-.1-.2-.2-.2s-.3 0-.3 0-2.1-.1-2.1-.1-.6-.6-.7-.7c0 0-.1-.1-.2 0l-.9.3c-.1-.4-.3-.8-.6-1.2-.8-1.1-2-1.6-3.4-1.6h-.2c-.4-.5-.9-.7-1.3-.7-3.3 0-4.8 4.1-5.3 6.2l-2.3.7c-.7.2-.7.2-.8.9-.1.5-1.9 14.6-1.9 14.6L20 26l7.5-1.6S27.5 6 27.5 5.9zm-6.7-1.2l-1.5.5c0-.3 0-.6-.1-1-.3-1.6-1.1-2.4-2-2.7.5-.3 1-.5 1.4-.5.4 0 .7.1.9.4.7.3 1.1 1.2 1.3 3.3zm-3.1-2.8c.7.2 1.2.9 1.4 2.2.1.4.1.9.1 1.3l-3.1 1c.6-2.3 1.7-3.9 2.8-4.4-.4-.1-.8-.1-1.2-.1zm-1.2.3c-.2.1-.4.3-.6.5-1.3 1.4-2.3 3.5-2.8 5.6l-2.4.8c.7-2.7 2.4-7 5.8-6.9z"/>
      <path d="M27 5.7s-.3 0-.3 0-2.1-.1-2.1-.1-.6-.6-.7-.7l-.3.1v20.9l7.5-1.6S27.1 5.8 27 5.7z" opacity=".5"/>
      <text x="33" y="22" fontSize="14" fontWeight="700" fontFamily="system-ui">shopify</text>
    </svg>
  )},
  { name: "Klaviyo", svg: (
    <svg viewBox="0 0 100 32" fill="currentColor" className="h-8 sm:h-10">
      <text x="0" y="22" fontSize="16" fontWeight="700" fontFamily="system-ui" letterSpacing="-0.5">klaviyo</text>
      <path d="M89 4l6 12-6 12h8l6-12-6-12z" opacity=".7"/>
    </svg>
  )},
  { name: "Google", svg: (
    <svg viewBox="0 0 90 32" fill="currentColor" className="h-9 sm:h-11">
      <text x="0" y="23" fontSize="18" fontWeight="500" fontFamily="'Product Sans', system-ui" letterSpacing="-0.3">Google</text>
    </svg>
  )},
  { name: "Meta", svg: (
    <svg viewBox="0 0 80 32" fill="currentColor" className="h-8 sm:h-10">
      <path d="M8 8c-3 0-5.5 3.5-5.5 8s2.5 8 5.5 8c1.5 0 3-1 4.5-3.5L16 14l3 6.5c1.5 2.5 3 3.5 4.5 3.5 3 0 5.5-3.5 5.5-8s-2.5-8-5.5-8c-1.5 0-3 1-4.5 3.5L16 18l-3-6.5C11.5 9 10 8 8 8z" opacity=".8"/>
      <text x="34" y="22" fontSize="15" fontWeight="600" fontFamily="system-ui">Meta</text>
    </svg>
  )},
  { name: "Mailchimp", svg: (
    <svg viewBox="0 0 120 32" fill="currentColor" className="h-8 sm:h-10">
      <text x="0" y="22" fontSize="15" fontWeight="700" fontFamily="system-ui">Mailchimp</text>
    </svg>
  )},
  { name: "HubSpot", svg: (
    <svg viewBox="0 0 100 32" fill="currentColor" className="h-8 sm:h-10">
      <circle cx="10" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="10" cy="16" r="2.5"/>
      <text x="22" y="22" fontSize="15" fontWeight="700" fontFamily="system-ui">HubSpot</text>
    </svg>
  )},
  { name: "YouTube", svg: (
    <svg viewBox="0 0 110 32" fill="currentColor" className="h-8 sm:h-10">
      <rect x="0" y="8" width="22" height="16" rx="4" opacity=".8"/>
      <polygon points="9,12.5 16,16 9,19.5" fill="white"/>
      <text x="27" y="22" fontSize="14" fontWeight="700" fontFamily="system-ui">YouTube</text>
    </svg>
  )},
  { name: "Segment", svg: (
    <svg viewBox="0 0 100 32" fill="currentColor" className="h-8 sm:h-10">
      <circle cx="8" cy="16" r="5" opacity=".6"/>
      <text x="18" y="22" fontSize="14" fontWeight="600" fontFamily="system-ui">Segment</text>
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
