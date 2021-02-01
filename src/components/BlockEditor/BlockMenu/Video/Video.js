import React, { useContext, useEffect, useState } from 'react'
import {URL_CONTROLLER} from './../../../../Config/Config'

import Context from '../../../../Context'
import ContextEditor from '../../../../ContextEditor'
import useFetch from '../../../../hooks/useFetch'
import Form from './../../../FormsGroup/Form/Form'
import Button from './../../../FormsGroup/Button/Button'
import Label from '../../../FormsGroup/Label/Label'
import TextArea from './../../../FormsGroup/TextArea/TextArea'
import Input from './../../../FormsGroup/Input/Input'
import ContextPopap from './../../../../Context/ContextPopap'

export default (props) => {
    const propId = 3;
    const [link, setLink] = useState(props.video_link)
    const [text, setText] = useState(props.title)
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjetData] = useContext(ContextEditor)
    // const dataContext = useContext(ContextEditor)
    

    const [respEditText, doFetchEditText] = useFetch(URL_CONTROLLER.catalogController+'?')
    const {setModalContent, setTitleModal, setClassModal, setOpenModal} = useContext(ContextPopap)


    // ВАЛИДАЦИЯ ССЫЛКИ ВИДЕО
    const checkLink = (url = null) => {
        let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        let flag = (url.match(p)) ? RegExp.$1 : false
        if(flag != 'false') setLink(url)
        return flag;
    }
    // Для ОБНОВЛЕНИЯ НАСТРОЕК landing_prop_data_id
    
    // СОХРАНЕНИЕ ДАННЫХ ВИДЕО
    const saveVideo = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const formData = new FormData(e.target)
        for(let pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
        }
        doFetchEditText(formData)
    }
    useEffect(()=> {
        if(!respEditText ) return;
        if(respEditText.success && respEditText.success != 'false') {
            setTitleModal('Успешно!')
            setModalContent('Данные успешно сохранены!')
            setTimeout(() => {
                setOpenModal('close')
            }, 5000)
        } else {
            setTitleModal('Ошибка!')
            setModalContent('Попробуйте позже!')
            setTimeout(() => {
                setOpenModal('close')
            }, 2000)
        }
        const list = [...vidjetData]
        list.map(el => {
            if (!el) {
                return
            }
            if (el.id === props.id) {
                const newBody = { id: String(props.id), title: '', discription:'' }
                el.body = newBody
                return el
            }
        })
        setVidjetData(list)
    }, [respEditText]) 

    return (
        <div>
           <Form onSubmit={(e) => saveVideo(e)}>
                <Input attrName={{hidden: true, name: 'mode'}} value='set_landing_prop_data'/>
                {/* ДЛЯ ОБНОВЛЕНИЯ ПО ID */}
                {props.id && <Input attrName={{hidden: true, name: 'landing_prop_data_id'}} value={props.id}/>}
                {/* ДЛЯ СОЗДАНИЯ НОВОГО  */}
                {!props.id && <Input attrName={{hidden: true, name: 'catalog_id'}} value={catalogId}/>}
                {!props.id && <Input attrName={{hidden: true, name: 'landing_prop_id'}} value={propId}/>}
                

                <div className='text-title-conteiner  py-1 px-3'>
                    <Label className="font-weight-bold" text="Заголовок" />
                    <TextArea className="" value={text} attrName={{name: 'title'}} onChange={(e) => setTitleModal(e.target.value)}/>
                </div>
                <div className='text-body-conteiner py-1 px-3'>
                    <Label className="font-weight-bold w-100" text="Ссылка на видео" />
                    <Input value={link} type='text' attrName={{name: 'video_link'}} onChange={(e) => checkLink(e.target.value)}/>
                </div>
                <div className='block-question-save'>
                    <Button className='block-question-button-save border-0 bg-white' attrName={{type:"submit"}}>Сохранить</Button>
                </div>
            </Form>
        </div>
    )
}