import React, { useContext, useEffect, useState } from 'react'
import './question.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import BlockQueston from '../../BlockEditor/BlockMenu/BlockQuestion/BlockQuestion'
import ContextEditor from '../../../ContextEditor'
import Context from '../../../Context'
import useFetch from '../../../hooks/useFetch'
import Button from '../../../UI/Button/Button'

const changeDataObjForBackend = (formdata, arr) => {
    arr.forEach((el, i) => {
        formdata.set(`issue[${i}]`, `${el.answer}`)
        formdata.set(`answer[${i}]`, `${el.answer}`)
    })
    return formdata
}


const Question = ({ body, id,replaceVidj }) => {
    const [questons, setQuestions] = useState(body)
    const [viewEdit, setViewEdit] = useState(null)
    const [viewFullList, setViewFullList] = useState(false)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [respEditQuestion, doFetchEditQuestion] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const [respDelQuestion, doFetchDelQuestion] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const [state, changeState, setState, catalogId] = useContext(Context)


    const editHandler = () => {
        setViewEdit(true)
    }


    const delHandler = () => {
        console.log(id)
        const formData = new FormData()
        formData.set('landing_prop_id', 2)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelQuestion(formData)
    }
    useEffect(() => {
        if (!respDelQuestion || respDelQuestion.success !== 'Успешно!') {
            return
        }
        const list = [...vidjArr]
        list.forEach((el, i) => {
            if(!el) return
            if (el.id === id) {
                list.splice(i, 1)
            }
        })
        setVidjetData(list)
    }, [respDelQuestion])



    const changeStateVidjet = (obj) => {
        setViewEdit(false)
        const list = [...vidjArr]
        list.map(el => {
            if (!el) {
                return
            }
            if (el.id === id) {
                el.body = obj.questions
            }
        })
        setVidjetData(list)
        const formData = new FormData()
        formData.set('landing_prop_id', 2)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        changeDataObjForBackend(formData, obj.questions)
        doFetchEditQuestion(changeDataObjForBackend(formData, obj.questions))
    }

    const elems = () => {
        if (!viewFullList) {
            return body.map((el, i) => {
                if (i == 0 || i == 1) {
                    return (
                        <React.Fragment key={i}>
                            <h4>{el.question}</h4>
                            <p>{el.answer}</p>
                        </React.Fragment>
                    )
                }
            })
        } else {
            return (
                body.map(el => {
                    return (
                        <React.Fragment>
                            <h4>{el.question}</h4>
                            <p>{el.answer}</p>
                        </React.Fragment>
                    )
                })
            )
        }
    }

    const viewFillLisnHundler = () => {
        setViewFullList(true)
    }


    return (body === null ? null :
        <div className='questions-container'>
            <div className='container question-center site-top-line'>
                <div className='questions-header'>
                    <div className='questions-buttons'>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon onClick = {()=>replaceVidj('up', id)} icon={faAngleUp} />
                        </div>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon onClick = {()=>replaceVidj('down', id)} icon={faAngleDown} />
                        </div>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon onClick={editHandler} icon={faEdit} />
                        </div>
                        <div className='icon-conteiner' onClick={delHandler} color='green'>
                            <FontAwesomeIcon color={'red'} icon={faTrashAlt} />
                        </div>
                    </div>
                    <div className='questions-title'>
                        <h3 className='question-h3'>FAQ</h3>
                        <p className='question-p'>Часто задаваемые вопросы</p>
                    </div>
                </div>
                <div className='questions-body'>
                    {elems()}
                </div>

                {body.length > 2 && !viewFullList ? <Button /* disabled = {false} */ onClick={() => viewFillLisnHundler()} title='Еще' /> : null}
            </div>
            {viewEdit ? <BlockQueston setViewEdit={setViewEdit} id={id} changeStateVidjet={changeStateVidjet} isNew={false} listArr={body} /> : null}
        </div>
    )
}

export default Question