
import HeroSpline from "../../components/landing/HeroSpline";
import Features from "../../components/landing/Features";
import Testimonials from "../../components/landing/Testimonials";
import CTA from "../../components/landing/CTA";

const Landing = () => {
  return (
    <div className="w-full overflow-hidden">
      <HeroSpline />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Landing;
