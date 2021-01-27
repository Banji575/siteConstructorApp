import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../../hooks/useFetch'
import Text from '../../BlockEditor/BlockMenu/Text/Text'
import ContextEditor from '../../../ContextEditor'
import Context from '../../../Context'
import parse from 'html-react-parser'
import './textContent.css'
const createHTML = str => parse(str) || ''


const TextContent = ({ body, id, replaceVidj }) => {
    const [description, setDescription] = useState(body.discription || '')
    const [viewEdit, setViewEdit] = useState(false)
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [respDelQuestion, doFetchDelQuestion] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')

    const closeEdit = () => setViewEdit(false)

    body.id = id

    const deleteHandler = () => {
        const formData = new FormData()
        formData.set('landing_prop_id', 4)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelQuestion(formData)
    }

    useEffect(() => {
        if (!respDelQuestion || respDelQuestion.success != 'Успешно!') return

        const list = [...vidjArr]
        list.map((el, i) => {
            if (!el) return
            if (el.id === id) {
                console.log(el, id)
                list.splice(i, 1)
            }
        })
        setVidjetData(list)
    }, [respDelQuestion])


    return (
        <div className='text-container'>
            <div className='container '>
                <div className='text-header'>
                    <div className='text-buttons'>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon onClick={() => replaceVidj('up', id)} icon={faAngleUp} />
                        </div>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon onClick={() => replaceVidj('down', id)} icon={faAngleDown} />
                        </div>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon onClick={() => setViewEdit(true)} icon={faEdit} />
                        </div>
                        <div className='icon-conteiner' /* onClick = {delHandler} */ color='green'>
                            <FontAwesomeIcon onClick={deleteHandler} color={'red'} icon={faTrashAlt} />
                        </div>
                    </div>
                    <div className='text-title'>
                        <h3 className='text-h3'>{body.title}</h3>
                        <p className='text-p'>{createHTML(body.discription)}</p>
                    </div>
                </div>
                {/*  <div className='questions-body'>
                { elems()}
            </div> */}

                {/* {body.length>2 && !viewFullList ? <Button onClick = {()=>viewFillLisnHundler()} title = 'Еще'/> : null}  */}
            </div>
            {viewEdit ? <Text setVidjetData={setVidjetData} vidjArr={vidjArr} content={body} closeEdit={() => setViewEdit(false)} /* setViewEdit = {setViewEdit} id = {id}  changeStateVidjet = {changeStateVidjet}  isNew = {false} listArr = {body} */ /> : null}
        </div>
    )
}

export default TextContent