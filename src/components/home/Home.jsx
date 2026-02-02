import React, { useEffect, useMemo, useRef, useState } from "react";
import "./home.css";
import GhostParty from "./GhostParty";

/** Character */
import characterBase from "../../assets/tejas-sketch.png";

/** Shoe overlays (IMPORTANT: keep using ONLY these for overlay) */
import shoesReverse from "../../assets/Reversed-Mocha.png";
import shoesOlive from "../../assets/olive-green.png";
import shoesPhantom from "../../assets/black-phantom.png";

/** Bubble PNGs */
import bubble1 from "../../assets/bubble/bubble1.png";
import bubble2 from "../../assets/bubble/bubble2.png";
import bubble3 from "../../assets/bubble/bubble3.png";
import bubble4 from "../../assets/bubble/bubble4.png";

/** Default shoe */
const getStorageShoe = () => localStorage.getItem("shoeStyle") || "olive";

export default function Home() {
  /* ============================
     SHOES SYSTEM
  ============================ */
  const shoeMap = useMemo(
    () => ({
      none: null,
      olive: shoesOlive,
      reverse: shoesReverse,
      phantom: shoesPhantom,
    }),
    []
  );

  const [shoeStyle, setShoeStyle] = useState(getStorageShoe());
  const [currentSrc, setCurrentSrc] = useState(shoeMap[getStorageShoe()]);
  const [fading, setFading] = useState(false);

  /* ============================
     THOUGHT BUBBLE (PNG) SYSTEM
  ============================ */
  const bubbles = useMemo(() => [bubble1, bubble2, bubble3, bubble4], []);

  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // bubble image + variant
  const [bubbleImg, setBubbleImg] = useState(bubble1);
  const [bubbleIndex, setBubbleIndex] = useState(1); // 1..4

  // animation controls
  const [bubbleFadedIn, setBubbleFadedIn] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [textAnimKey, setTextAnimKey] = useState(0); // forces re-anim on new message

  const bubbleRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const fadeInTimeoutRef = useRef(null);

  const pickRandomBubble = () => {
    const idx0 = Math.floor(Math.random() * bubbles.length); // 0..3
    const img = bubbles[idx0] || bubble1;
    return { idx: idx0 + 1, img };
  };

  /* Show bubble message with typewriter */
  const showMessage = (text) => {
    // Clear pending close/fade timers
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (fadeInTimeoutRef.current) {
      clearTimeout(fadeInTimeoutRef.current);
      fadeInTimeoutRef.current = null;
    }

    // pick a bubble image + matching variant every time
    const picked = pickRandomBubble();
    setBubbleIndex(picked.idx);
    setBubbleImg(picked.img);

    // reset states
    setBubbleOpen(true);
    setBubbleFadedIn(false);
    setTypedText("");
    setIsTyping(false);

    // force text animation reset for every new message
    setTextAnimKey((k) => k + 1);

    // comic shake (on every message open)
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 520);

    // clear any previous typing interval (prevents glitches)
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    // "magic" fade-in
    fadeInTimeoutRef.current = setTimeout(() => {
      setBubbleFadedIn(true);
      fadeInTimeoutRef.current = null;
    }, 60);

    // typewriter
    const full = String(text ?? "");
    let i = 0;

    setIsTyping(true);
    typingIntervalRef.current = setInterval(() => {
      i += 1;
      setTypedText(full.slice(0, i));

      if (i >= full.length) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setIsTyping(false);
      }
    }, 25);
  };

  /* Auto greet after 1 sec */
  useEffect(() => {
    const timer = setTimeout(() => {
      showMessage("Hi, I’m Tejas 👋 Welcome to my portfolio!");
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Close bubble (with fade-out) */
  const closeBubble = () => {
    // stop typing
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    setIsTyping(false);

    // start fade out
    setBubbleFadedIn(false);

    // after fade out, unmount
    closeTimeoutRef.current = setTimeout(() => {
      setBubbleOpen(false);
      setTypedText("");
      closeTimeoutRef.current = null;
    }, 180);
  };

  /* ESC closes */
  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === "Escape") closeBubble();
    };

    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ============================
     REACT TO GHOST CLICKS
  ============================ */
  useEffect(() => {
    const ghostHandler = () => {
      showMessage("Ghost caught! 👻✨");
    };

    window.addEventListener("ghostClicked", ghostHandler);
    return () => window.removeEventListener("ghostClicked", ghostHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ============================
     REACT TO SHOE CHANGES
  ============================ */
  useEffect(() => {
    const handler = (e) => {
      const next = e?.detail || "olive";
      setShoeStyle(next);

      if (next === "phantom") showMessage("Black Phantom activated 🖤🔥");
      if (next === "reverse") showMessage("Reverse Mocha looks clean 🤎✨");
      if (next === "olive") showMessage("Olive Green vibe 💚");
      if (next === "none") showMessage("bohahahaha 😭");
    };

    window.addEventListener("shoeStyleChange", handler);
    return () => window.removeEventListener("shoeStyleChange", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Fade sneaker swap */
  useEffect(() => {
    const nextSrc = shoeMap[shoeStyle] || null;
    if (nextSrc === currentSrc) return;

    setFading(true);

    const t = setTimeout(() => {
      setCurrentSrc(nextSrc);
      setFading(false);
    }, 180);

    return () => clearTimeout(t);
  }, [shoeStyle, shoeMap, currentSrc]);

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (fadeInTimeoutRef.current) clearTimeout(fadeInTimeoutRef.current);
    };
  }, []);

  return (
    <section className="home" id="home">
      {/* Ghost Party */}
      <GhostParty areaSelector="#home" />

      <div className="home_hero">
        {/* LEFT */}
        <div className="hero_left">
          <div className="hero_character_wrap">
            {/* Character */}
            <img
              className="hero_character"
              src={characterBase}
              alt="Tejas"
              draggable="false"
            />

            {/* Shoe Overlay */}
            {currentSrc && (
              <img
                className={`shoe_png_overlay ${fading ? "is-fading" : ""}`}
                src={currentSrc}
                alt=""
                draggable="false"
              />
            )}

            {/* Thought Bubble (PNG) */}
            {bubbleOpen && (
              <div
                className={[
                  "hero_bubble_png",
                  `bubble_variant_${bubbleIndex}`,
                  bubbleFadedIn ? "bubble_visible" : "bubble_hidden",
                  isShaking ? "bubble_shake" : "",
                ].join(" ")}
                ref={bubbleRef}
              >
                <img className="bubble_img" src={bubbleImg} alt="" draggable="false" />

                <div className="bubble_text_overlay">
                  {/* key forces smooth re-anim per new message */}
                  <span key={textAnimKey} className="bubble_text">
                    {typedText}
                  </span>
                  <span className={`bubble_caret ${isTyping ? "show" : ""}`} />
                </div>

                <button className="bubble_close" onClick={closeBubble}>
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero_right">
          <div className="term">
            <div className="term_top">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="term_title">tejas@portfolio:~</span>
            </div>

            <div className="term_body">
              <p>{">> Hello! My name is Tejas."}</p>
              <p>{">> I'm a Web Developer + AI enthusiast."}</p>
              <p>{">> React, Node, Python, ML 🚀"}</p>
              <p>{">> Currently seeking opportunities."}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}