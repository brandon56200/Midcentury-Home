import { HydrateClient } from "~/trpc/server";
import Navbar from "~/components/sections/Navbar";
import Hero from "~/components/sections/Hero";
import Features from "~/components/sections/Features";
import Footer from "~/components/sections/Footer";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="relative bg-black min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        
        {/* CTA Section */}
        <div className="py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-600/5 -z-10" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center glass p-12 rounded-[3rem] border-indigo-500/20">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to transform your data?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Join 50+ enterprise teams building the future of AI on Midcentury Labs.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 transition-all">
                  Get Started for Free
                </button>
                <button className="text-sm font-semibold leading-6 text-white">
                  Talk to Sales <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </HydrateClient>
  );
}
