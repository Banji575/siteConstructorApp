import React, { useState, useContext, useEffect } from 'react'
import ContextEditor from '../../../../ContextEditor'
import Context from '../../../../Context'
import useFetch from '../../../../hooks/useFetch'
import PopUp from '../../../../UI/PopUp/PopUp'

import './video.css'

const generateId = () => Math.random()

const Video = ({ content, setViewEdit, id, setVidjetDataArray, vidjArray }) => {
    const [link, setLink] = useState(content ? content.body.link : '')
    const [validLink, setValidLink] = useState(true)
    const [title, setTitle] = useState(content ? content.body.title : '')
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [respEditVideo, doFetchEditVideo] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const closeWindow = () => {
        if (setViewEdit) {
            setViewEdit(false)
        } else
            setCurrentWidjet(null)
    }

    const checkLink = (url = null) => {
        console.log('url', url)
        let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        let flag = (url.match(p)) ? RegExp.$1 : false
        if (flag != false) setLink(url)
        return flag;
    }

    const saveList = () => {
        console.log(title, link)
        link === '' ? setValidLink(false) : setValidLink(true)
        const formData = new FormData()
        formData.set('landing_prop_id', 3)
        formData.set('catalog_id', catalogId)
        formData.set('title', title)
        formData.set('video_link', link)
        if (content) {
            formData.set('landing_prop_data_id', content.id)
        }
        doFetchEditVideo(formData)
    }

    useEffect(() => {
        if (!respEditVideo) {
            return
        }
        if (respEditVideo.success === 'Успешно!') {
            if (content) {
                const list = [...vidjArr]
                list.map((el, i) => {
                    console.log(el, id)
                    if (el.id == id) {
                        console.log('элемент найден', el)
                        el.body = { title, link }

                    }
                })
                console.log(list)
                setVidjetData(list)
            } else {
                const list = [...vidjArray]
                const elem = { title: 'video', id: generateId(), body: { title, link } }
                list.unshift(elem)
                setVidjetDataArray(list)
            }
            closeWindow()
        }
    }, [respEditVideo])


    return (
        <PopUp title="Видео" closePopup={closeWindow} saveHandler={() => saveList()}>
                <div className='video-body-conteiner p-3'>
                    <p className='video-p'>Заголовок</p>
                    <textarea className='video-textarea' value={title} onChange={(evt) => setTitle(evt.target.value)} />
                    <p className='video-p'>Ссылка на видео</p>
                    <input type='text' value={link} onChange={(evt) => checkLink(evt.target.value)} />
                    {!validLink ? <p className='text-danger'>Поле не должно быть пустым</p> : null}
                </div>
                {/* <div className='block-question-save'><p onClick={saveList} className='block-question-button-save'>Сохранить</p></div> */}
        </PopUp>
    )
}

export default Video