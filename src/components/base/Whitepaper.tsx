import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";

interface CoinPopupProps {
  open: boolean;
  onClose?: () => void;
}

interface WhitepaperData {
  title: string;
  introduction: { heading: string; content: string };
  vision_mission: {
    heading: string;
    vision: string;
    mission: string[];
  };
  tokenomics: {
    heading: string;
    details: Record<string, string>;
    distribution: { category: string; percentage: string }[];
  };
  utility: { heading: string; items: string[] };
  roadmap: {
    heading: string;
    phases: { phase: string; milestones: string[] }[];
  };
  community_governance: { heading: string; content: string };
  security: { heading: string; content: string };
  disclaimer: { heading: string; content: string };
  join_us: { heading: string; links: Record<string, string> };
  motto: string;
}

export default function CoinPopup({ open, onClose }: CoinPopupProps) {
  const [data, setData] = useState<WhitepaperData | null>(null);
  const [hovered, setHovered] = useState(false);
  const [shouldRender, setShouldRender] = useState(open);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 400); 
      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      fetch("/data.json")
        .then((res) => res.json())
        .then(setData)
        .catch(console.error);
    }
  }, [open]);

  return (
    <AnimatePresence mode="wait">
      {shouldRender && data && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-[550px] bg-white/30 backdrop-blur-md z-50 flex flex-col items-end justify-start pr-8 py-8 text-white text-left"
            initial={{ x: "100%", opacity: 0, scale: 1 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: "100%", opacity: 0, scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 14,
              opacity: { duration: 0.2 },
            }}
          >
            <div className="w-full max-w-[480px] flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent pr-2 space-y-6">
              <h2 className="text-2xl font-bold mb-4">{data.title}</h2>

              <div>
                <h3 className="text-xl font-semibold">
                  {data.introduction.heading}
                </h3>
                <p className="text-sm whitespace-pre-line">
                  {data.introduction.content}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  {data.vision_mission.heading}
                </h3>
                <p className="text-sm mb-2 font-bold">Vision:</p>
                <p className="text-sm mb-2 whitespace-pre-line">
                  {data.vision_mission.vision}
                </p>
                <p className="text-sm mb-2 font-bold">Mission:</p>
                <ul className="list-disc list-inside text-sm">
                  {data.vision_mission.mission.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  {data.tokenomics.heading}
                </h3>
                <div className="text-sm mb-2">
                  {Object.entries(data.tokenomics.details).map(([k, v]) => (
                    <p key={k}>
                      <span className="font-bold">{k}:</span> {v}
                    </p>
                  ))}
                </div>
                <ul className="list-disc list-inside text-sm">
                  {data.tokenomics.distribution.map((d, i) => (
                    <li key={i}>
                      {d.category}: {d.percentage}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  {data.utility.heading}
                </h3>
                <ul className="list-disc list-inside text-sm">
                  {data.utility.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  {data.roadmap.heading}
                </h3>
                {data.roadmap.phases.map((phase, i) => (
                  <div key={i} className="mb-2">
                    <p className="font-bold">{phase.phase}:</p>
                    <ul className="list-disc list-inside text-sm">
                      {phase.milestones.map((m, j) => (
                        <li key={j}>{m}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  {data.community_governance.heading}
                </h3>
                <p className="text-sm whitespace-pre-line">
                  {data.community_governance.content}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  {data.security.heading}
                </h3>
                <p className="text-sm whitespace-pre-line">
                  {data.security.content}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  {data.disclaimer.heading}
                </h3>
                <p className="text-xs whitespace-pre-line">
                  {data.disclaimer.content}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  {data.join_us.heading}
                </h3>
                <ul className="list-none text-sm">
                  {Object.entries(data.join_us.links).map(([k, v], i) => (
                    <li key={i}>
                      <a
                        href={v}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {k}: {v}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs opacity-80">{data.motto}</p>
            </div>

            <motion.button
              onClick={onClose}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              className="mt-4 bg-white/20 px-4 py-2 rounded hover:bg-white/30 transition w-full max-w-[500px] flex justify-center items-center"
            >
              <AnimatePresence mode="wait">
                {!hovered ? (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Close
                  </motion.span>
                ) : (
                  <motion.span
                    key="icon"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoCloseSharp size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
