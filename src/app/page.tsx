import { GoogleRatingSection } from "@/components/sections/GoogleRatingSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <GoogleRatingSection />
      <section className="flex flex-col items-center justify-center flex-1 py-32 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-[#0a233e] mb-6 tracking-tighter">
          Bienvenue sur TRINEXTA<span className="text-[#5c92b8]">.</span>
        </h1>
      </section>
    </main>
  );
}
