import React,{useContext, useState} from 'react'
import Question from './Question/Question'
import ContextEditor from '../../ContextEditor'
import TextContent from './TextContent/TextContent'

const SiteBody = ({ vidjArr,setVidjetData,replaceVidj }) => {
    const [isEditer, setIsEditer] = useState(true)
    const [currentWidjet, setCurrentWidjet] = useState(null)

   
    const renderVidjet = (el,i) => {
        if (!el) {
            return
        }
        switch (el.title) {
            case 'question': return <Question key = {i}  body={el.body} id = {el.id} replaceVidj = {replaceVidj} />
            case 'text': return <TextContent key = {i} body = {el.body} id = {el.id} replaceVidj = {replaceVidj}/>
            default:
                break;
        }
    }

    return (
        <ContextEditor.Provider value = {[setCurrentWidjet, setIsEditer,setVidjetData,vidjArr]}>
            <div>
                {vidjArr.map((el,i) => {
                    return renderVidjet(el,i)
                })}
        </div>
        </ContextEditor.Provider>
    )
}

export default SiteBody