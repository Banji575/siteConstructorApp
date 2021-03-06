import React, { useEffect, useRef, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faImage } from '@fortawesome/free-solid-svg-icons'
import ContextEditor from '../../../../ContextEditor'
import './banner.css'

const checkLink = (str) => {
    const regex = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)
    if(!str) return
    if (str.match(regex)) {
        return true
    } else {
        return false
    }
}

const Banner = () => {
    const root = useRef()
    const [previewImage, setPreviewImage] = useState(null)
    const [setCurrentWidjet, setIsEditer] = useContext(ContextEditor)
    const [isLink, setIsLink] = useState(false)
    const [isValidUrl, setIsValidUrl] = useState(true)
    const [link, setLink] = useState(null)


    const saveList = () => { 
        if(isLink){
            if(!checkLink(link)){
                setIsValidUrl(false)
                return
           }
        }
         setIsValidUrl(true)  
    }

    const closeWindow = () => {
        setCurrentWidjet(null)
    }

    const onLoadHandler = (evt) => {
        if (evt.target.files.length === 0) return
        const fr = new FileReader()
        console.log('a;ldjsflkj')
        fr.readAsDataURL(evt.target.files[0])
        fr.addEventListener('load', function () {
            setPreviewImage(fr.result)
        })
    }

    useEffect(() => {
        if (!previewImage) return
        const elem = root.current
        elem.style.backgroundImage = `url('${previewImage}')`
        setPreviewImage(null)
    }, [previewImage])

    return (
        <div className='block-question-conteiner'>
            <div className='block-menu-header'>
                <h3>Баннер</h3>
                <div onClick={closeWindow} className='block-header-close'></div>
            </div>

            <div className='text-body-conteiner py-1 px-3'>
                <div className='banner-upload-area-conteiner'>
                    <FontAwesomeIcon className='banner-upload-logo' size='10x' icon={faImage} />
                    <div ref={root} className="input__wrapper input-wrapper-position" >
                        <input name="file" type="file" name="file" id="input__file" className="input input__file" multiple onChange={(evt) => onLoadHandler(evt)}/* onChange={(evt) => fileChange(evt)} */ />
                        <label htmlFor="input__file" className="input__file-button input-file-button--custom-height">
                            <span className="input__file-button-text"></span>
                        </label>
                        <p>Загрузить картинку</p>
                    </div>
                    <div>
                    </div>
                </div>
                <div className='banner-upload-link-conteiner'>
                    <div className='d-flex'>
                        <div className='mr-2'>
                            <input onChange={() => { setIsLink(s => !s) }} id='upload-check' type='checkbox' />
                        </div>
                        <div>
                            <label htmlFor='upload-check'>Сделать баннер ссылкой</label>
                        </div>

                    </div>
                    <input type='text' pattern='/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/' onChange={(evt) => setLink(evt.target.value)} />

                    {!isValidUrl ? <p className='text-danger'>Не верный формат ссылки</p> : null}
                </div>
            </div>
            <div className='block-question-save'><p onClick={saveList} className='block-question-button-save'>Сохранить</p></div>
        </div>
    )
}
export default Banner