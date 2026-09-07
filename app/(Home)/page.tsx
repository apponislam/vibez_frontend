import Badge from "../Components/Home/Badge";
import Hero from "../Components/Home/Hero";
import HowItWorks from "../Components/Home/HowItWorks";
import Review from "../Components/Home/Review";
import Download from "../Components/Home/download";
import MapSection from "../Components/Home/simple";
import Taste from "../Components/Home/taste";

export default function Home() {
  return (
    <div className="space-y-0 overflow-x-hidden">
      <section className="container mx-auto px-4 pt-8 sm:pt-16 lg:pt-20 pb-8 sm:pb-10">
        <Hero />
      </section>
      <section className="bg-[#F1F5F9] py-6 sm:py-10">
        <Badge />
      </section>
      <section className="py-12 sm:py-20 lg:py-28">
        <HowItWorks />
      </section>
      <section className="py-8 sm:py-12">
        <Review />
      </section>
      <section className="py-8 sm:py-12">
        <MapSection />
      </section>
      <section className="py-8 sm:py-12">
        <Taste />
      </section>
      <section className="py-8 sm:py-12">
        <Download />
      </section>
    </div>
  );
}