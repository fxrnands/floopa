import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const words = ["FREQUENTLY", "ASKED", "QUESTION"];
  const columns = [
    {
      title: "Whitepaper",
      description: "Read our vision, tokenomics, and roadmap.",
      link: "#whitepaper",
    },
    {
      title: "Community",
      description: "Join the Floopa community on Telegram & Discord.",
      link: "#community",
    },
    {
      title: "Buy Floopa",
      description: "Get your hands on $FLOOPA on your favorite DEX.",
      link: "#buy",
    },
    {
      title: "Contact Us",
      description: "Have questions? Reach out to the team directly.",
      link: "#contact",
    },
  ];

  const faqs = [
    {
      question: "What is Floopa?",
      answer:
        "Floopa is a meme-driven crypto token built for fun, community, and real value. We believe the ultimate utility is joy!",
    },
    {
      question: "How do I buy $FLOOPA?",
      answer:
        "You can buy $FLOOPA on popular DEXs. Make sure you DYOR and only use official links shared by our community.",
    },
    {
      question: "Is Floopa safe?",
      answer:
        "Our smart contracts are audited, liquidity pools are locked, and treasury uses multi-sig wallets for extra security.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full relative text-white px-8 pt-20 pb-8 flex flex-col min-h-screen justify-between">
      <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="text-left order-1 md:order-2">
          <h2 className="text-4xl sm:text-6xl font-bold leading-[1.2]">
            {words.map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                viewport={{ once: false, amount: 0.3 }}
                className="block"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="space-y-4 md:col-span-2 order-2 md:order-1">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition backdrop-blur-md"
              onClick={() => toggleFAQ(i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl"
                >
                  +
                </motion.span>
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.p
                    className="mt-2 text-sm text-white/80"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Find out more about Floopa
          </motion.h2>
          <p className="text-lg text-white/70">
            Explore everything you need to play, laugh, and earn together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
          {columns.map((col, i) => (
            <div
              key={i}
              className="bg-white/20 p-6 rounded-lg border border-white backdrop-blur-sm hover:bg-white/40 transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{col.title}</h3>
              <p className="text-sm mb-4 text-white/80">{col.description}</p>
              <a href={col.link} className="underline text-white">
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
