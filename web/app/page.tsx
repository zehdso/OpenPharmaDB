import AppLayout from "@/components/layout/AppLayout";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import WhatsNew from "@/components/WhatsNew";
import LatestRecalls from "@/components/LatestRecalls";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <AppLayout>
      <Hero />
      <Stats />
      <WhatsNew />
      <LatestRecalls />
      <Footer />
    </AppLayout>
  );
}
