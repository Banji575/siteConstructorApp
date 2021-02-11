import React, { useState } from 'react'
import './feedbackItem.css'
const FeedbackItem = ({ title , isInput, body, checkHandler,saveTitleHandler}) => {
    /* const [checked, setChecked] = useState(body.show) */
    console.log(title)
    const clases = []
    if(title === 'Заголовок'){
        clases.push('d-none')
    }
    return (
        <div className='feedback-item'>
            <p className = 'm-0 feedback-p'>{title}</p>
            <div className ={clases.join(' ')}>
                <input id={title} type='checkbox' onChange = {()=>{checkHandler(title)}} checked = {body.show} className = 'mr-2' />
                <label  className = 'feedback-item-label' htmlFor={title}>Отображать на сайте</label>
            </div>
            {isInput && <input type = 'text' placeholder = {body.text} onBlur = {(evt)=>saveTitleHandler(evt.target.value)} className = 'w-100'/>}
        </div>
    )
}
export default FeedbackItem