import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import './questionItem.css'
const QuestionItem = ({propsAnswer, propsQuestion, index,id,questCount,saveInTemporary,deleteItem}) => {
    const [answer, setAnswer] = useState(propsAnswer || '')
    const [question, setQuestion] = useState(propsQuestion || '')
    console.log(questCount)
    return(
        <div className = 'question-item-conteiner'>
            <div className ='d-flex justify-content-between'>
             <h3 className = 'question-item-header'>{questCount>1? `${index+1} `: null}Вопрос</h3>
               {questCount >1 ? <FontAwesomeIcon  color = {'red'} onClick = {()=>{deleteItem(id)}} icon = {faTrashAlt}/> : null}
            </div>
            
            <input onBlur = {()=>saveInTemporary({id, answer, question})} className = 'question-item-input' value = {question} onChange = {(evt)=>setQuestion(evt.target.value)} type='text'/>
            <h3 className = 'question-item-header'>Ответ</h3>
            <textarea onBlur = {()=>saveInTemporary({id, answer, question})} value = {answer} onChange = {(evt)=>setAnswer(evt.target.value)} className = 'question-item-input'/>
        </div>
    )
}

export default QuestionItem