import React from 'react'
import './feedbackVidjetItem.css'
const changeNameObj = {
    name:'Введите имя',
    email: 'Введите email',
    phone:'Введите телефон',
    message: 'Чем мы можем вам помочь'
}

const FeedbackVidjetItem = ({ data, title }) => {
    console.log(title, data)
    if(title === 'ourEmail')
    return null
    const Elem = () => (
        <div className = 'feedback-vidjet-item mb-3'>
            <label className = 'feedback-item-label' htmlFor={title}>{changeNameObj[title]}</label>
          {title==='message' ? <textarea/> :  <input className = 'question-item-input' id='title' type='text' />} 
        </div>
    )
    return (
        <React.Fragment>
           {data.show ? <Elem /> : null} 
        </React.Fragment>
    )
}

export default FeedbackVidjetItem