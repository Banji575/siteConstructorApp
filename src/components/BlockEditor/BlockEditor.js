import React, {useContext, useEffect, useState} from 'react'
import './blockEditor.css'
import BlockMenu from './BlockMenu/BlockMenu'
import BlockQueston from './BlockMenu/BlockQuestion/BlockQuestion'
import ContextEditor from '../../ContextEditor'
import Context from '../../Context'
import useFetch from '../../hooks/useFetch'
import Text from './BlockMenu/Text/Text'
import Banner from './BlockMenu/Banner/Banner'
import Video from './BlockMenu/Video/Video'
import PopapContext  from './../../Context/ContextPopap'


import Form from './../FormsGroup/Form/Form'

import Contacts from './BlockMenu/Contacts/Contacts'
import Social from './BlockMenu/Social/Social'

const changeDataObjForBackend = (formdata, arr)=>{
    console.log(arr)
    arr.forEach((el,i)=>{
        formdata.set(`issue[${i}]`, `${el.answer}`)
        formdata.set(`answer[${i}]`, `${el.answer}`)
    })
    return formdata
}

const BlockEditor = () => {
    // ОБНОВЛЕНИЕ МОДАЛКИ
    const {setModalContent, setTitleModal, setClassModal, setOpenModal} = useContext(PopapContext);
    // ----------------------
    const [isEditer, setIsEditer] = useState(true)
    const [objNewQuestion, setObjNewQuestion] = useState(null)
    const [currentWidjet, setCurrentWidjet] = useState(null)
    const [state,changeState,setState, catalogId,setVidjetData,vidjArr] = useContext(Context)
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    
    const changeWidget = (text) => {
        setIsEditer(true)
        setCurrentWidjet(text)
    }

    const handlerClickAddBlock = () => {
        setTitleModal('Выбрать блок')
        setModalContent([<BlockMenu setCurrentWidjet={(text)=>changeWidget(text)} hideBlock = {setIsEditer}/>])
        setOpenModal('open');
    }
    const handlerClickMenuItem = (typeWidget) => {
        setModalContent(openWidjet(typeWidget))

    }

    const changeStateVidjet = (obj) =>{
        const vidjetName = Object.keys(obj)[0]
        const newState = {...state}
        newState.siteVidjets[vidjetName] = obj[vidjetName]
        setState(newState)
        setObjNewQuestion(obj)
        const formData = new FormData()
        formData.set('landing_prop_id', 2)
        formData.set('catalog_id', catalogId)
        changeDataObjForBackend(formData,obj.questions)
        doFetch(changeDataObjForBackend(formData,obj.questions))
    }

    useEffect(()=>{
        if(!response) return;
        const list = [...vidjArr]
        list.push({title:'question', id:String(response.landing_prop_data_id) , body:objNewQuestion.questions})
        setVidjetData(list)
    },[response])

    const Test = (props) => {
        return (
            <h1>{props.text || 'Принимает'}</h1>
        )
    }
    const testClick = (text) => {
        setTitleModal('Охренеть')
        setModalContent([<Video textTitle="Серега это рабоатет!" linkVideo="https://www.youtube.com/watch?v=d0zLuC68xvk"/>])
        setOpenModal('open');
    }
    const openWidjet = (text) => {
        switch (text) {
            case 'questions': return <BlockQueston changeStateVidjet = {changeStateVidjet}/>
            case 'text': return <Text setVidjetData = {setVidjetData} vidjArr = {vidjArr}/>
            case 'video' : return <Video  setVidjetData = {setVidjetData} vidjArr = {vidjArr} textTitle = "Тут будет текст заголовка" linkVideo="https://relieffo.ru"/>
            case 'banner': return <Banner setVidjetData = {setVidjetData} vidjArr = {vidjArr}/>
            case 'contacts': return <Contacts setVidjetDataArray = {setVidjetData} vidjArray = {vidjArr}/>
            case 'social': return <Social setVidjetDataArray = {setVidjetData} vidjArray = {vidjArr}/>
            default: return null
        } 
    }

    return (
        // <ContextEditor.Provider value = {{setCurrentWidjet, setIsEditer}}></ContextEditor.Provider>
            <div className='container'>
            <button onClick={() => testClick()}>Тест</button>
                    {/* {isEditer && <button onClick = {()=> setIsEditer(false)}  className = 'block-editor-button'>Добавить блок +</button>}  */}
                {isEditer && <button onClick = {()=> handlerClickAddBlock()}  className = 'block-editor-button'>Добавить блок +</button>}
                    {/* {!isEditer && <BlockMenu setCurrentWidjet={(text)=>changeWidget(text)} hideBlock = {setIsEditer}/>} */}
                {openWidjet()}
                
                {/* {handlerClickMenuItem()} */}
            {/* {isEditer && <button onClick = {()=>setIsEditer(false)}  className = 'block-editor-button'>Добавить блок +</button>} 
            {!isEditer && <BlockMenu setCurrentWidjet={(text)=>changeWidget(text)} hideBlock = {setIsEditer}/>}
            {openWidjet()} */}
            </div>
        
    )
}

export default BlockEditor