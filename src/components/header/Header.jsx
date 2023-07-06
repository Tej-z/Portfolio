import React, { useEffect, useState } from 'react';
import { links } from '../../Data';
import {FaGithub, FaLinkedinIn, FaInstagram} from 'react-icons/fa';
import {BsSun, BsMoon} from 'react-icons/bs'
import './header.css'
import { Link } from 'react-scroll';
import { animateScroll } from 'react-scroll';


const getStorageTheme = () => {
    let theme = 'light-theme';
    if(localStorage.getItem('theme')){
        theme = localStorage.getItem('theme')
    }
}

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [scrollNav, setScrollNav] = useState(false);
    const [theme, setTheme] = useState(getStorageTheme());

    const scrollTop = () => {
        animateScroll.scrollToTop();
    };

    const changeNav = () => {
        if(window.scrollY >= 80) {
            setScrollNav(true)
        }
        else {
            setScrollNav(false)
        }
    }

    const toggleTheme = () => {
        if(theme === 'light-theme'){
            setTheme('dark-theme');
        }
        else {
            setTheme('light-theme');
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, []);

    useEffect(() => {
        document.body.classList.toggle('no-scroll', showMenu);
    }, [showMenu]);

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme])

  return (
    <header className={`${scrollNav ? 'scroll-header': ''} header`}>
        <nav className='nav'>
            <Link href='/' onClick={scrollTop} className='nav_logo text-cs'>
                Tejas
            </Link>

            <div className={`${showMenu ? 'nav_menu show-menu' : 'nav_menu'}`}>
                <div className='nav_data'>
                <ul className='nav_list'>
                    { links.map(({name, path}, index) => {
                        return(
                            <li className='nav_item' key={index}>
                                <Link 
                                className='nav_link text-cs'
                                to={path} 
                                spy={true} 
                                hashSpy={true}
                                smooth={true} 
                                offset={-150} 
                                duration={500} 
                                onClick={() => setShowMenu(!showMenu)}
                                >
          {name}
        </Link>
                            </li>
                        )
                    })}
                </ul>

                <div className='header_socials'>
                <a href='' className='header_social-link'>
                    <FaGithub />
                </a>

                <a href='' className='header_social-link'>
                    <FaLinkedinIn />
                </a>

                <a href='' className='header_social-link'>
                    <FaInstagram />
                </a>
            </div>

                </div>
            </div>


            <div className='nav_btns'>
                <div className='theme_toggle' onClick={toggleTheme}>
                    {theme == 'light-theme' ? <BsMoon /> : <BsSun />}
                </div>

                <div className={`${showMenu ? 'nav_toggle animate-toggle' : 'nav_toggle'}`} onClick={() => setShowMenu(!showMenu)}>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header