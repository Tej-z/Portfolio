import React from 'react'
import {FaGithub, FaLinkedinIn, FaInstagram} from 'react-icons/fa';
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer_container container grid">
        <div className='footer_socials'>
                <a href='https://github.com/Tej-z' className='footer_social-link'>
                    <FaGithub />
                </a>

                <a href='https://www.linkedin.com/in/tejas-ramesh-4980a9248/' className='footer_social-link'>
                    <FaLinkedinIn />
                </a>

                <a href='https://www.instagram.com/tezyzzz/' className='footer_social-link'>
                    <FaInstagram />
                </a>
            </div>
            <p className="footer_copyright text-cs">
                &copy; 2023 All Rights Reserved
            </p>


            <p className="footer_copyright text-cs">
                Developed by <span>Tejas R</span>
            </p>
        </div>
    </footer>
  )
}

export default Footer