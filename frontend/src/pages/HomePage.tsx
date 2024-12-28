import { NavbarDemo } from "../components/Navbar";
import { HeroSection } from "../components/Herosection";
import { TrendingCard } from "../components/TrendingCard";
import { TypewriterEffectSmoothDemo } from "../components/Typewriter";
import { AnimatedTestimonialsDemo } from "../components/Testimonial";
import ExploreCat from "../components/ExploreCat";
import { SubLetter } from "../components/SubLetter";
function HomePage() {
  return (
    <div>
      <NavbarDemo />
      <HeroSection />
      <TypewriterEffectSmoothDemo />
      <div className="mt-28">
        <TrendingCard />
      </div>
      <div className="ml-80 mr-80">
        <AnimatedTestimonialsDemo />
      </div>
      <div className="flex justify-center mt-10 items-center">
        <ExploreCat />
      </div>
      <div className="flex justify-center mt-10 items-center">
        <SubLetter />
      </div>
    </div>
  );
}

export default HomePage;
