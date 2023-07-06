import React from 'react';
import profileImg from '../../assets/profile-img.png';
import shapeOne from '../../assets/shape-1.png';
import shapeTwo from '../../assets/shape-2.png';

import {FaGithub, FaLinkedinIn, FaInstagram} from 'react-icons/fa';
import './home.css';
// import CV from '../../assets/'

const Home = () => {
  return (
    <section className='home' id='home'>
        <div className='home_container container'>
            <p className='home_subtitle text-cs'>
                Hello, <span className='home_subtitle-color'>My name is</span> 
            </p>

{/* change the font and color later */}

            <h1 className='home_title title-cs'>
                <span>Tejas</span> R
            </h1>

            <p className='home_job'>
                <span className='text-cs'>I am</span> <b>Web Developer</b>
            </p>
            
            <div className='home_img-wrapper'>
                <div className='home_banner'>
                    <img src={profileImg} alt='' className='home_profile' />
                </div>

                <p className='home_data home_data-one'>
                    <span className='text-lg'>CS</span>
                    <span className='text-sm text-cs'>Major</span>

                </p>

                
                <p className='home_data home_data-two'>
                    <span className='text-lg'>Developer</span>
                    <span className='text-sm text-cs'></span>

                </p>       

                <img src={shapeOne} alt='' className='shape shape_1' /> 
                <img src={shapeTwo} alt='' className='shape shape_2' />   
                <img src={shapeTwo} alt='' className='shape shape_3' />                  
            </div>
        
            <p className='home_text'>
                my ass, web dev sucks
            </p>

            <div className='home_socials'>
                <a href='https://github.com/Tej-z' className='home_social-link'>
                    <FaGithub />
                </a>

                <a href='https://www.linkedin.com/in/tejas-ramesh-4980a9248/' className='home_social-link'>
                    <FaLinkedinIn />
                </a>

                <a href='https://www.instagram.com/tezyzzz/' className='home_social-link'>
                    <FaInstagram />
                </a>
            </div>

            <div className='home_btns'>
                <a href='' className='btn text-cs'>Download CV</a>

                <a href='#skills' className='hero_link text-cs'>
                    My Skills
                </a>
            </div>
        </div>

        <div className="section_deco deco_left">
            <img src={shapeOne} alt='' className='shape' />
        </div>
    </section>
  );
};

export default Home