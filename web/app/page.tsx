import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import WhatsNew from "@/components/WhatsNew";
import LatestRecalls from "@/components/LatestRecalls";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <Stats />
      <WhatsNew />
      <LatestRecalls />
      <Footer />
    </main>
  );
}
