import { useRef, useEffect } from "react";
import gsap from "gsap";

interface Props {
  text: string;
  width?: string;
}

export default function CTAButton({ text, width = "w-[20rem]" }: Props) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (textRef.current && arrowRef.current) {
      tl.current = gsap.timeline({ paused: true });
      tl.current
        .to(
          textRef.current,
          { y: -10, opacity: 0, duration: 0.3, ease: "power2.out" },
          0
        )
        .to(
          arrowRef.current,
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
          0
        );
    }
  }, []);

  const handleMouseEnter = () => {
    tl.current?.play();
  };

  const handleMouseLeave = () => {
    tl.current?.reverse();
  };

  return (
    <a
      href="#"
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
    inline-block 
    px-6 py-3 ${width} rounded-full border border-white 
    text-white font-quicksand relative overflow-hidden
    hover:bg-white hover:text-black 
    transition-colors duration-300 ease-in-out
  `}
    >
      <span className="relative block h-6">
        <span ref={textRef} className="block absolute inset-0 text-center">
          {text}
        </span>
        <span
          ref={arrowRef}
          className="block absolute inset-0 text-black font-bold font-floopa text-center opacity-0 translate-y-2"
        >
          GO
        </span>
      </span>
    </a>
  );
}
