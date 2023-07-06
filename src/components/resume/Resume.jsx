import React from 'react'
import './resume.css'
import { cv } from '../../Data'
import Card from './Card'
import shapeOne from '../../assets/shape-1.png';
// import shapeTwo from '../../assets/shape-2.png';

const Resume = () => {
  return (
    <section className="resume section" id="resume">
        <h2 className="section_title text-cs">Resume</h2>

    
    <div className="resume_container container grid">
        <div className="resume_group">
            <h3 className="resume_heading">Education</h3>

            <div className="resume_items">
                { cv.map((val, id) => {
                    if(val.category === 'education'){
                        return(
                        <Card 
                        key={id} 
                        title={val.title} 
                        subtitle={val.subtitle} 
                        date={val.date} 
                        description = {val.description}
                        />
                    );
                    }
                }) }
            </div>
        </div>

        <div className="resume_group">
            <h3 className="resume_heading">Experience</h3>

            <div className="resume_items">
                { cv.map((val, id) => {
                    if(val.category === 'experience'){
                        return(
                        <Card key={id} 
                        title={val.title} 
                        subtitle={val.subtitle} 
                        date={val.date} 
                        description = {val.description}
                        />
                    );
                    }
                }) }
            </div>
        </div>


        <div className="section_deco deco_left">
            <img src={shapeOne} alt='' className='shape' />
        </div>

        <div className="section_bg-wrapper">
            <span className="bg_title"> RESUME </span>
        </div>
    </div>
    </section>


  )
}

export default Resume