import React from 'react'
import './button.css'

const Button = ({ onClick, title, disabled }) => {
    return <button disabled = {disabled}  className = 'button' onClick={onClick}>{title}</button>
}

export default Button