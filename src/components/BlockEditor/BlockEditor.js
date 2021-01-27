import React, {useContext, useEffect, useState} from 'react'
import './blockEditor.css'
import BlockMenu from './BlockMenu/BlockMenu'
import BlockQueston from './BlockMenu/BlockQuestion/BlockQuestion'
import ContextEditor from '../../ContextEditor'
import Context from '../../Context'
import useFetch from '../../hooks/useFetch'
import Text from './BlockMenu/Text/Text'
import Banner from './BlockMenu/Banner/Banner'

const changeDataObjForBackend = (formdata, arr)=>{
    console.log(arr)
    arr.forEach((el,i)=>{
        formdata.set(`issue[${i}]`, `${el.answer}`)
        formdata.set(`answer[${i}]`, `${el.answer}`)
    })
    return formdata
}

const BlockEditor = () => {
    const [isEditer, setIsEditer] = useState(true)
    const [objNewQuestion, setObjNewQuestion] = useState(null)
    const [currentWidjet, setCurrentWidjet] = useState(null)
    const [state,changeState,setState, catalogId,setVidjetData,vidjArr] = useContext(Context)
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')

    const changeWidget = (text) => {
        setIsEditer(true)
        setCurrentWidjet(text)
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
        if(!response){
            return
        }
        const list = [...vidjArr]
        list.push({title:'question', id:String(response.landing_prop_data_id) , body:objNewQuestion.questions})
        setVidjetData(list)
    },[response])
    const openWidjet = () => {
        switch (currentWidjet) {
            case 'questions': return <BlockQueston changeStateVidjet = {changeStateVidjet}/>
            case 'text': return <Text setVidjetData = {setVidjetData} vidjArr = {vidjArr}/>
            case 'banner': return <Banner/>
            default: return null
        } 
    }
    return (
        <ContextEditor.Provider value = {[setCurrentWidjet, setIsEditer]}>
            <div className='container'>
            {isEditer && <button onClick = {()=>setIsEditer(false)}  className = 'block-editor-button'>Добавить блок +</button>} 
            {!isEditer &&<BlockMenu setCurrentWidjet={(text)=>changeWidget(text)} hideBlock = {setIsEditer}/>}
            {openWidjet()}
            </div>
        </ContextEditor.Provider>

    )
}

export default BlockEditor