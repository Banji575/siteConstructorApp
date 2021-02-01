import React,{useContext, useState} from 'react'
import Question from './Question/Question'
import {VideoView} from './VideoView/VideoView';
import ContextEditor from '../../ContextEditor'
import TextContent from './TextContent/TextContent'
import BannerVidjet from './BannerVidjet/BannerVidjet'
import ContactsVidjets from './ContactsVidjets/ContactsVidjets'
import SocialVidjet from './SocialVidjet/SocialVidjet'

const SiteBody = ({ vidjArr,setVidjetData,replaceVidj }) => {
    const [isEditer, setIsEditer] = useState(true)
    const [currentWidjet, setCurrentWidjet] = useState(null)

   
    const renderVidjet = (el,i) => {
        if (!el) return
        switch (el.title) {
            case 'video' : return <VideoView key = {i}  body={el.body} id = {el.id} replaceVidj = {replaceVidj} />
            case 'question': return <Question key = {i}  body={el.body} id = {el.id} replaceVidj = {replaceVidj} />
            case 'text': return <TextContent key = {i} body = {el.body} id = {el.id} replaceVidj = {replaceVidj}/>
            case 'banner' : return <BannerVidjet key = {i} body = {el.body} id = {el.id} replaceVidj = {replaceVidj} />
            case 'contacts' : return <ContactsVidjets key = {i} body = {el.body} id = {el.id} renderVidjet = {replaceVidj}/>
            case 'social' : return <SocialVidjet body = {el.body}/>
            default:
                break;
        }
    }

    return (
        // <ContextEditor.Provider value = {[setCurrentWidjet, setIsEditer,setVidjetData,vidjArr]}>  </ContextEditor.Provider>
            <div>
                {vidjArr.map((el,i) => {
                    console.log('el', el)
                    return renderVidjet(el,i)
                })}
        </div>
      
    )
}

export default SiteBody