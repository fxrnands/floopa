import "./App.css";
import BlurText from "./components/base/BlurText";
import Iridescence from "./components/base/Iridences";
import CTAButton from "./components/base/CTAButton";
import Navbar from "./components/base/Navbar";
import BodyFloopa from "./components/section/About";
import { motion } from "framer-motion";
import { useState } from "react";
import CoinPopup from "./components/base/Whitepaper";
import Tokenomics from "./components/section/Tokenomics";
import Footer from "./components/section/Footer";

function App() {
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div className="relative h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
      <Navbar />

      <section className="snap-start min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-8 text-center">
        <Iridescence
          color={[0.7, 0.4, 0.8]}
          mouseReact={false}
          amplitude={0.1}
          speed={0.2}
        />

        <BlurText
          text="Wanna Floop?!"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-[3rem] sm:text-[6rem] text-white font-bold font-floopa mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <CTAButton text="Join the Floopa Army" />
        </motion.div>

        <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 text-right">
          <BlurText
            text="Too silly. Too shiny."
            delay={170}
            animateBy="words"
            direction="top"
            className="text-white font-quicksand text-sm sm:text-base md:text-lg mb-1"
          />
          <BlurText
            text="Pure Floopa."
            delay={200}
            animateBy="words"
            direction="top"
            className="text-white font-floopa text-lg sm:text-xl md:text-2xl font-bold"
          />
        </div>
      </section>

      <section
        id="about-section"
        className="snap-start min-h-screen relative px-8"
      >
        <BodyFloopa />
      </section>
      <section
        id="tokenomics-section"
        className="snap-start min-h-screen relative px-8"
      >
        <Tokenomics />
      </section>
      <section
        id="faq-section"
        className="snap-start min-h-screen relative"
      >
        <Footer />
      </section>

      <CoinPopup open={openPopup} onClose={() => setOpenPopup(false)} />
    </div>
  );
}

export default App;
