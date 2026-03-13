import colors from "../color.jsx";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import FeaturedDrop from "./FeaturedDrop.jsx";
import FAQ from "./Faq.jsx";
import Contact from "./Contact.jsx";
import Footer from "../Footer.jsx";

export default function Welcome() {
  return (
    <div
      style={{
        background: colors.background,
      }}
    >
      <Hero />
      <About />
      <FeaturedDrop />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
