import React, { useState, useContext, useEffect } from 'react'
import './videoVidjet.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Video from '../../BlockEditor/BlockMenu/Video/Video'
import ContextEditor from '../../../ContextEditor'
import Context from '../../../Context'
import useFetch from '../../../hooks/useFetch'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'

const getVideoLink = (link) => {
    console.log(link.replace(/.+\?v=/, "https://www.youtube.com/embed/"))
    return link.replace(/.+\?v=/, "https://www.youtube.com/embed/")
}

const VideoVidjet = ({ body, id,replaceVidj }) => {
    const [respDelVideo, doFetchDelVideo] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [viewEdit, setViewEdit] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState('')
    const editHandler = () => {
        setViewEdit(true)
    }

    const delHandler = () => {
        const formData = new FormData()
        formData.set('landing_prop_id', 3)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelVideo(formData)
    }
    useEffect(() => {
        if (!respDelVideo) return
        if (respDelVideo.success === 'Успешно!') {
            const list = [...vidjArr]
            list.map((el, i) => {
                if (!el) return
                if (el.id === id) {
                    list.splice(i, 1)
                }
            })
            setVidjetData(list)
        }
    }, [respDelVideo])


    return (
        <div className='questions-container' style = {{backgroundColor: [backgroundColor]}}>
               {/*  <div className='questions-header'>
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
                </div> */}
                <WidjetWrapper id={id} replaceVidj = {replaceVidj} setBackground = {setBackgroundColor} isView={viewEdit} setViewEdit={setViewEdit} delHandler = {delHandler} editWindow={ <Video  setViewEdit={setViewEdit} id={id} content={{ id: id, title: 'video', body: body }} />} >
                <div className='questions-body'>
                    <p>{body.title}</p>
                    <iframe src={getVideoLink(body.link)} />
                </div>
                </WidjetWrapper>
            {viewEdit ? <Video setViewEdit={setViewEdit} id={id} content={{ id: id, title: 'video', body: body }} /> : null}
        </div>
    )
}

export default VideoVidjet