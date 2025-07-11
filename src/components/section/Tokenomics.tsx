import { useState } from "react";
import { motion } from "framer-motion";
import CoinCanvas from "../base/Coin"; // 3D Coin canvas
import BlurText from "../base/BlurText";
import CTAButton from "../base/CTAButton";
import CoinPopup from "../base/Whitepaper";

export default function TokenomicsSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const tokenomics = {
    heading: "Tokenomics",
    details: {
      "Token Name": "Floopa",
      Symbol: "$FLOOPA",
      "Total Supply": "1,000,000,000",
      Blockchain: "Ethereum (ERC-20)",
    },
    distribution: [
      { category: "Community & Rewards", percentage: "50%" },
      { category: "Liquidity Pool", percentage: "30%" },
      { category: "Marketing & Partnerships", percentage: "10%" },
      { category: "Team & Development", percentage: "10%" },
    ],
  };

  return (
    <>
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <CoinCanvas />
      </motion.div>

      <BlurText
        text={tokenomics.heading}
        delay={150}
        animateBy="words"
        direction="top"
        className="absolute top-16 font-bold left-8 text-white font-floopa text-[4rem] z-10 text-left"
      />

      <div className="absolute top-44 sm:top-28 sm:right-8 flex flex-col items-end gap-4 z-10">
        {[
          {
            text: "See Coinmarketcap",
            handler: () => setIsPopupOpen(true),
            delay: 0.1,
          },
        ].map((btn, idx) => (
          <motion.div
            key={idx}
            onClick={btn.handler}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: btn.delay }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <CTAButton width="w-[16rem]" text={btn.text} />
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-12 left-8 max-w-md  text-left z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-white text-lg leading-6 font-quicksand mb-4"
        >
          {Object.entries(tokenomics.details).map(([key, value]) => (
            <p key={key} className="mb-1">
              <span className="font-bold">{key}:</span> {value}
            </p>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-white font-quicksand"
        >
          <ul className="list-disc list-inside">
            {tokenomics.distribution.map((d, i) => (
              <li key={i}>
                {d.category}: {d.percentage}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="absolute hidden sm:block bottom-8 right-8 text-right z-10">
        {["SECURE", "COMMUNITY", "TRANSPARENT"].map((word, index) => (
          <motion.p
            key={word}
            className="text-white font-baloo text-6xl leading-[3rem] font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {word}
          </motion.p>
        ))}
      </div>

      {isPopupOpen && (
        <CoinPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      )}
    </>
  );
}
