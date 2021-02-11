import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './feedbackVidjet.css'
import FeedbackVidjetItem from './FeedbackVidjetItem/FeedbackVidjetItem'
import Button from '../../../UI/Button/Button'
import Context from '../../../Context'
import ContextEditor from '../../../ContextEditor'
import Feedback from '../../BlockEditor/BlockMenu/FeedBack/Feedback'
import useFetch from '../../../hooks/useFetch'

const FeedbackVidject = ({ body , id}) => {
    const [viewEdit, setViewEdit] = useState(false)
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [respDelFeedback, doFetchDelFeedback] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const editHandler = () => setViewEdit(true)

    const delHandler = () => {
        console.log('del', id)
        const formData = new FormData()
        formData.set('landing_prop_id', 9)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelFeedback(formData)
    }

    useEffect(()=>{
        if (!respDelFeedback) return
        if (respDelFeedback.success === 'Успешно!') {
            const list = [...vidjArr]
            list.map((el, i) => {
                if (!el) return
                if (el.id === id) {
                    list.splice(i, 1)
                }
            })
            setVidjetData(list)
        }
    },[respDelFeedback])

    return (
        <div className='questions-container '>
            <div className='container question-center site-top-line'>
                <div className='questions-header'>
                    <div className='questions-buttons'>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon /* onClick = {()=>replaceVidj('up', id)} */ icon={faAngleUp} />
                        </div>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon /* onClick = {()=>replaceVidj('down', id)} */ icon={faAngleDown} />
                        </div>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon onClick={editHandler} icon={faEdit} />
                        </div>
                        <div className='icon-conteiner' onClick={delHandler} color='green'>
                            <FontAwesomeIcon color={'red'} icon={faTrashAlt} />
                        </div>
                    </div>
                </div>
                <div className='questions-body feedback-body'>
                    <h3 className='feedback-vidjet-h3 text-center'>{body.title.text}</h3>
                    {Object.keys(body).map((el, i) => {
                        return <FeedbackVidjetItem  key = {i} title = {el} data = {body[el]}/>
                    })} 
                    <Button  title = 'Отправить'/>
                </div>
                    

            </div>
             {viewEdit ?<Feedback setViewEdit = {setViewEdit} content = {{id:id, title:'feedback',body:body}}/> :  null}
        </div>
    )
}

export default FeedbackVidject