import React from 'react'
import './socialVidjet.css'
import SocialVidjetItem from './SocialVidjetItem/SocialVidjetItem'


const SocialVidjet = ({body}) => {
    console.log(body)
    const socialSection = Object.keys(body)
    return (
        <div className = 'social-vidjet-list-container'>
            {socialSection.map((el,i)=>{
                return <SocialVidjetItem key = {i} data = {body[el]}/>
            })}
        </div>
    )
}

export default SocialVidjet