import React, { useState } from 'react'
import './buttonAddComponent.css'
const ButtonAddComponent = ({onClick}) => {
    const [mouseOn, setMouseOn] = useState(false)
    return (
        
        <button 
        onMouseEnter = {()=>setMouseOn(true)} 
        onMouseLeave = {()=>setMouseOn(false)}
        onClick = {()=>onClick()}
        className = 'button-add-component'
        >{mouseOn ? 'Добавить блок' : "+"}</button>
    )
}

export default ButtonAddComponent