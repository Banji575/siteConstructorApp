import React,{useContext, useState} from 'react'
import Question from './Question/Question'
import ContextEditor from '../../ContextEditor'
import TextContent from './TextContent/TextContent'
import BannerVidjet from './BannerVidjet/BannerVidjet'
import ContactsVidjets from './ContactsVidjets/ContactsVidjets'
import SocialVidjet from './SocialVidjet/SocialVidjet'
import FeedbackVidject from './FeedbackVidjet/FeedbackVidjet'
import VideoVidjet from './VideoVidjet/VideoVidjet'
import TimerVidjet from './TimerVidjet/TimerVidjet'
import CaruselVidjet from './CaruselVidjet/CaruselVidjet'
import './siteBody.css';
const SiteBody = ({ vidjArr,setVidjetData,replaceVidj }) => {
    const [isEditer, setIsEditer] = useState(true)
    const [currentWidjet, setCurrentWidjet] = useState(null)

   
    const renderVidjet = (el,i) => {
        if (!el) {
            return
        }
        console.log(el)

        switch (el.title) {
            case 'question': return <Question key = {i}  body={el.body} id = {el.id} replaceVidj = {replaceVidj} />
            case 'text': return <TextContent key = {i} body = {el.body} id = {el.id} replaceVidj = {replaceVidj}/>
            case 'banner' : return <BannerVidjet key = {i} body = {el.body} id = {el.id} replaceVidj = {replaceVidj} />
            case 'contacts' : return <ContactsVidjets key = {i} body = {el.body} id = {el.id} renderVidjet = {replaceVidj}/>
            case 'social' : return <SocialVidjet key = {i} body = {el.body} id ={el.id}/>
            case 'feedback': return <FeedbackVidject key = {i} body = {el.body} id = {el.id}/>
            case 'video' : return <VideoVidjet key = {i} body = {el.body} id = {el.id} />
            case 'timer' : return <TimerVidjet key = {i} body = {el.body} id = {el.id}/>
            case 'carusel': return <CaruselVidjet key = {i} body = {el.body} id = {el.id}/>
            default:
                break;
        }
    }

    return (
        <ContextEditor.Provider value = {[setCurrentWidjet, setIsEditer,setVidjetData,vidjArr]}>
            <div className = 'siteBody'>
                {vidjArr.map((el,i) => {
                    return renderVidjet(el,i)
                })}
        </div>
        </ContextEditor.Provider>
    )
}

export default SiteBody