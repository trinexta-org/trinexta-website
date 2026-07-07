"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { reviews, Review } from "@/data/reviews";

function ReviewCard({ review }: { review: Review }) {
  const initial = review.authorName.charAt(0).toUpperCase();

  return (
    <a
      href={review.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-full focus:outline-none group"
      aria-label={`Lire l'avis de ${review.authorName} sur Google`}
    >
      <div className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl flex flex-col gap-4 p-6 h-full shadow-sm relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold shrink-0">
              {initial}
            </div>
            <div>
              <Heading as="h4" className="text-white text-base leading-tight">
                {review.authorName}
              </Heading>
              <Text variant="small" className="text-white/50">
                il y a quelques temps
              </Text>
            </div>
          </div>
          <svg viewBox="0 0 24 24" width="18" height="18" className="shrink-0" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex text-yellow-500 text-sm" aria-hidden="true">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>
          <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-8.1 8.1z"/></svg>
        </div>
        
        <Text className="text-white/70 line-clamp-4 flex-grow text-sm">
          "{review.text}"
        </Text>
        
        <Text variant="small" className="text-white/50 font-medium mt-2 group-hover:text-white transition-colors">
          Lire l'avis
        </Text>
      </div>
    </a>
  );
}

export function CustomerReviews() {
  const half = Math.ceil(reviews.length / 2);
  const col1Data = [...reviews.slice(0, half), ...reviews.slice(0, half)];
  const col2Data = [...reviews.slice(half), ...reviews.slice(half)];

  const scrollRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -window.innerWidth * 0.85, behavior: "smooth" });
  };
  const handleNext = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: window.innerWidth * 0.85, behavior: "smooth" });
  };

  const googleReviewsUrl = "https://www.google.com/search?sca_esv=d7a897ae2fa4bc83&hl=fr-FR&gl=fr&sxsrf=APpeQnsmj9UBvj_RpLyWrK9KyoJRqFR_pg:1783430744173&q=Trinexta+Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2tTA3MzGyMDQytLQwNbU0NzIz28DI-IqRN6QoMy-1oiRRwbEss3gRKyofAGYqAVc6AAAA&rldimm=5876428121985597266&tbm=lcl&sa=X&ved=2ahUKEwiKj_Of1cCVAxUtTaQEHQ6vLiIQ9fQKegQIOxAG&biw=1920&bih=945&dpr=1#lkt=LocalPoiReviews";

  return (
    <Section id="avis-clients" className="bg-primary py-20 overflow-hidden">
      <Container>
        
        {/* =========================================
            VERSION MOBILE (< 1024px)
            ========================================= */}
        <div className="lg:hidden">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-4 -mx-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((review) => (
              <div key={review.id} className="snap-center shrink-0 w-[85vw] md:w-[350px] h-auto">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 relative z-40">
            <button onClick={handlePrev} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95" aria-label="Avis précédent">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={handleNext} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all active:scale-95" aria-label="Avis suivant">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================
            VERSION ORDINATEUR (>= 1024px)
            ========================================= */}
        <div className="hidden lg:grid grid-cols-2 gap-8 h-[600px] overflow-hidden relative group max-w-4xl mx-auto">
          
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary to-transparent z-10 pointer-events-none" />

          {/* Colonne 1 */}
          <div className="flex flex-col gap-8 animate-slide-up group-hover:[animation-play-state:paused]">
            {col1Data.map((review, index) => (
              <div key={`col1-${review.id}-${index}`}>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          {/* Colonne 2 */}
          <div className="flex flex-col gap-8 animate-slide-down group-hover:[animation-play-state:paused]">
            {col2Data.map((review, index) => (
              <div key={`col2-${review.id}-${index}`}>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

        </div>

        {/* =========================================
            BOUTON GLOBAL : Voir tous les avis
            ========================================= */}
        <div className="mt-12 flex justify-center relative z-20">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-white hover:text-primary transition-colors duration-300 shadow-lg"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Voir tous nos avis sur Google
          </a>
        </div>

      </Container>
    </Section>
  );
}