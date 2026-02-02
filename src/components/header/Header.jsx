// src/components/header/Header.jsx
import React, { useEffect, useState } from "react";
import { links } from "../../Data";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { GiRunningShoe } from "react-icons/gi";
import "./header.css";
import { Link } from "react-scroll";
import { animateScroll } from "react-scroll";
import shapeOne from "../../assets/shape-1.png";

/* ✅ Sneaker-only icons */
import shoeDefault from "../../assets/shoes/default.png";
import shoeReverse from "../../assets/shoes/reverse.png";
import shoeOlive from "../../assets/shoes/olive.png";
import shoePhantom from "../../assets/shoes/phantom.png";

const getStorageTheme = () => localStorage.getItem("theme") || "light-theme";
// ✅ Olive is the default if nothing is set
const getStorageShoe = () => localStorage.getItem("shoeStyle") || "olive";

/* ✅ Icon-only options (no labels shown in UI) */
const SHOE_OPTIONS = [
  { key: "olive", thumb: shoeOlive, title: "Olive (default)" },
  { key: "reverse", thumb: shoeReverse, title: "Reverse Mocha" },
  { key: "phantom", thumb: shoePhantom, title: "Black Phantom" },
  { key: "none", thumb: shoeDefault, title: "Default" },
];

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollNav, setScrollNav] = useState(false);
  const [theme, setTheme] = useState(getStorageTheme());

  const [shoeOpen, setShoeOpen] = useState(false);
  const [shoeStyle, setShoeStyle] = useState(getStorageShoe());

  const scrollTop = () => animateScroll.scrollToTop();
  const changeNav = () => setScrollNav(window.scrollY >= 80);

  const toggleTheme = () => {
    setTheme((t) => (t === "light-theme" ? "dark-theme" : "light-theme"));
  };

  const setShoe = (key) => {
    setShoeStyle(key);
    localStorage.setItem("shoeStyle", key);
    window.dispatchEvent(new CustomEvent("shoeStyleChange", { detail: key }));
    setShoeOpen(false);
  };

  const selectedShoe =
    SHOE_OPTIONS.find((o) => o.key === shoeStyle) ||
    SHOE_OPTIONS.find((o) => o.key === "olive");

  useEffect(() => {
    // ensure localStorage always has something sensible
    const stored = localStorage.getItem("shoeStyle");
    if (!stored) localStorage.setItem("shoeStyle", "olive");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    return () => window.removeEventListener("scroll", changeNav);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", showMenu);
  }, [showMenu]);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // close dropdown outside click + ESC
  useEffect(() => {
    const onDown = (e) => {
      if (e.key === "Escape") setShoeOpen(false);
    };
    const onClick = (e) => {
      if (!e.target.closest(".shoe_menu")) setShoeOpen(false);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <header className={`${scrollNav ? "scroll-header" : ""} header`}>
      <nav className="nav">
        <span
          onClick={scrollTop}
          className="nav_logo text-cs"
          role="button"
          tabIndex={0}
        >
          Tejas Ramesh
        </span>

        <div className={`${showMenu ? "nav_menu show-menu" : "nav_menu"}`}>
          <div className="nav_data">
            <ul className="nav_list">
              {links.map(({ name, path }, index) => (
                <li className="nav_item" key={index}>
                  <Link
                    className="nav_link text-cs"
                    to={path}
                    spy={true}
                    hashSpy={true}
                    smooth={true}
                    offset={-150}
                    duration={500}
                    onClick={() => setShowMenu(false)} // ✅ close only
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="header_socials">
              <a href="https://github.com/Tej-z" className="header_social-link">
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/tejas-ramesh-4980a9248/"
                className="header_social-link"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/tezyzzz/"
                className="header_social-link"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="section_deco deco_left header_deco">
            <img src={shapeOne} alt="" className="shape" />
          </div>
        </div>

        <div className="nav_btns">
          {/* ✅ PREMIUM Shoe Selector */}
          <div className={`shoe_menu ${shoeOpen ? "open" : ""}`}>
            <button
              type="button"
              className="shoe_toggle"
              onClick={(e) => {
                e.stopPropagation();
                setShoeOpen((v) => !v);
              }}
              aria-label="Change sneaker"
              title="Change sneaker"
            >
              <GiRunningShoe className="shoe_toggle_icon" />
              <span className="shoe_selected" aria-hidden="true">
                <img src={selectedShoe.thumb} alt="" draggable="false" />
              </span>
            </button>

            <div className="shoe_dropdown" role="menu" aria-label="Sneakers">
              <div className="shoe_grid">
                {SHOE_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    className={`shoe_card ${
                      shoeStyle === opt.key ? "active" : ""
                    }`}
                    onClick={() => setShoe(opt.key)}
                    title={opt.title}
                    aria-label={opt.title}
                  >
                    <span className="shoe_thumb">
                      <img src={opt.thumb} alt="" draggable="false" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Theme */}
          <div className="theme_toggler" onClick={toggleTheme}>
            {theme === "light-theme" ? <BsMoon /> : <BsSun />}
          </div>

          {/* Hamburger */}
          <div
            className={`${showMenu ? "nav_toggle animate-toggle" : "nav_toggle"}`}
            onClick={() => setShowMenu((v) => !v)}
            aria-label="Toggle menu"
            role="button"
            tabIndex={0}
          >
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
