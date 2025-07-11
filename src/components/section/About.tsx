import { useState } from "react";
import { motion } from "framer-motion";
import FloopaCanvas from "../base/Floppa";
import BlurText from "../base/BlurText";
import CTAButton from "../base/CTAButton";
import CoinPopup from "../base/Whitepaper";

export default function About() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <FloopaCanvas />
      </motion.div>
      <BlurText
        text="What’s Floopa?"
        delay={150}
        animateBy="words"
        direction="top"
        className="absolute top-20 left-8 sm:hidden block  font-bold text-white font-floopa text-[2.5rem] sm:text-[4.5rem] z-10"
      />

      <BlurText
        text="What’s"
        delay={150}
        animateBy="words"
        direction="top"
        className="absolute lg:block hidden top-16 left-4 sm:left-8 font-bold text-white font-floopa text-[2.5rem] sm:text-[4.5rem] z-10"
      />
      <BlurText
        text="Floopa?"
        delay={200}
        animateBy="words"
        direction="top"
        className="absolute lg:block hidden top-36 left-4 sm:left-8 font-bold text-white font-floopa text-[2.5rem] sm:text-[4.5rem] z-10"
      />

      <div className="absolute top-36 sm:top-28 lg:block hidden right-8  max-w-xs sm:max-w-sm text-left sm:text-right z-10">
        <motion.p
          className="text-white font-quicksand mb-4 text-sm sm:text-base"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Floopa is the coin that refuses to take itself too seriously. Built by
          and for a community who believe fun is the ultimate utility.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <CTAButton width="w-full max-w-[10rem]" text="Learn More" />
        </motion.div>
      </div>
      <div className="absolute top-36 sm:top-28 block lg:hidden left-8  max-w-xs sm:max-w-sm text-left sm:text-right z-10">
        <motion.p
          className="text-white font-quicksand mb-4 text-sm sm:text-base"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Floopa is the coin that refuses to take itself too seriously. Built by
          and for a community who believe fun is the ultimate utility.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <CTAButton width="w-full max-w-[10rem]" text="Learn More" />
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-4 sm:right-8 text-right z-10">
        {["PLAY", "LAUGH", "EARN"].map((word, index) => (
          <motion.p
            key={word}
            className="text-white font-baloo text-2xl sm:text-8xl leading-tight sm:leading-[4rem] font-bold mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {word}
          </motion.p>
        ))}
      </div>

      <div className="absolute bottom-8 right-4 left-8 sm:right-auto flex flex-col items-start gap-4 z-10">
        {[
          {
            text: "Read Whitepaper",
            handler: () => setIsPopupOpen(true),
            delay: 0.1,
          },
          {
            text: "Community",
            handler: () => window.open("", "_blank"),
            delay: 0.2,
          },
        ].map((btn, idx) => (
          <motion.div
            key={idx}
            onClick={btn.handler}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: btn.delay }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <CTAButton
              width="sm:w-[40rem] w-[20rem] max-w-[12rem]"
              text={btn.text}
            />
          </motion.div>
        ))}
      </div>

      {isPopupOpen && (
        <CoinPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      )}
    </>
  );
}
