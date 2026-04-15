"use client";

const brands = [
  "HubSpot",
  "Klaviyo",
  "Mailchimp",
  "Braze",
  "Iterable",
  "Customer.io",
  "Bird",
];

export default function LogoCarousel() {
  const allBrands = [...brands, ...brands];

  return (
    <section className="py-8 bg-[#0B0F1A] border-t border-white/5 overflow-hidden">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0F1A] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0F1A] to-transparent z-10" />

        <div className="flex items-center animate-scroll">
          {allBrands.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 mx-10 sm:mx-14 text-gray-500/50 hover:text-gray-300/70 transition-colors duration-300"
            >
              <span className="text-lg sm:text-xl font-semibold tracking-tight whitespace-nowrap">
                {name}
              </span>
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
