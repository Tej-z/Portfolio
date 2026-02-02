import React, { useState } from 'react'

const Card = (props) => {
    const [showInfo, setShowInfo] = useState(false);
  return (
    <div className='resume_item'>
        <div className='resume_header' onClick={() => setShowInfo(!showInfo)}>
            <h3 className='resume_subtitle'>{props.title}</h3>
            <span className='resume_icon'>{showInfo ? '-' : '+'}</span>
        </div>

        <div className={`${showInfo ? 'show-content ' : ''}resume_content`}>
            <div className='resume_date-title'>
                <h3 className='resume_title'>{props.subtitle}</h3>
                <span className='resume_date text-cs'>{props.date}</span>
            </div>


            <p className='resume_description'>{props.description}</p>
        </div>
    </div>
  )
}

export default Card