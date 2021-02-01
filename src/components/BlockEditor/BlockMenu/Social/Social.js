import React, { useEffect, useState,useContext } from 'react'
import Context from '../../../../Context'
import useFetch from '../../../../hooks/useFetch'
import SocialBlock from './SocialBlock/SocialBlock'
const itemArrSocial = [
    { title: 'Вконтакте', name: 'vk' },
    { title: 'Facebook', name: 'facebook' },
    { title: 'Twitter', name: 'twitter' },
    { title: 'TickTok', name: 'ticktok' },
]
const itemArrMessedger = [
    { title: 'WhatsApp', name: 'whatsup' },
    { title: 'Telegram', name: 'telegram' },
    { title: 'Skype', name: 'skype' },
    { title: 'Viber', name: 'viber' },
]

const genetateId = () => Math.random()

const Social = ({ content }) => {
    const [data, setData] = useState(content ? content : { title: 'social', id: genetateId(), social: { title: 'Социальные сети и месседжеры', vk: { checked: true, link: 'akhdasfkljdhasfkj' }, facebook: { checked: false, link: '' }, twitter: { checked: false, link: '' }, ticktok: { checked: false, link: '' } }, messeger: { title: 'Месседжеры', whatsup: { checked: false, link: '' }, telegram: { checked: false, link: '' }, skype: { checked: false, link: '' }, viber: { chedked: false, link: '' } } })
    const [respEditSocial, doFetchEditSocial] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const [state, changeState, setState, catalogId] = useContext(Context)
    const getParams = () => {
    }

    const saveList = () => {

        const formData = new FormData()
        formData.set('landing_prop_id', 10)
        formData.set('catalog_id', catalogId)
        formData.set('social_title', data.social.title)
        formData.set('messengers_title', data.messeger.title)

        formData.set('vk_link', data.social.vk.socialLink)
        formData.set('vk', data.social.vk.checked === true ? 1 : false)
        formData.set('facebook_link', data.social.facebook.socialLink)
        formData.set('facebook', data.social.facebook.checked === true ? 1 : false)
        formData.set('twitter_link', data.social.twitter.socialLink)
        formData.set('twitter', data.social.twitter.checked === true ? 1 : false)
        formData.set('ticktok_link', data.social.ticktok.socialLink)
        formData.set('ticktok', data.social.ticktok.checked === true ? 1 : false)

        formData.set('WhatsApp_link', data.messeger.whatsup.socialLink)
        formData.set('WhatsApp', data.messeger.whatsup.checked === true ? 1 : false)
        formData.set('Telegram_link', data.messeger.telegram.socialLink)
        formData.set('Telegram', data.messeger.telegram.checked === true ? 1 : false)
        formData.set('Viber_link', data.messeger.viber.socialLink)
        formData.set('Viber', data.messeger.viber.checked === true ? 1 : false)
        formData.set('skype_link', data.messeger.skype.socialLink)
        formData.set('skype', data.messeger.skype.checked === true ? 1 : false)

        doFetchEditSocial(formData)
    }

    useEffect(()=>{
        if(!respEditSocial)
        return
        console.log(respEditSocial)
    },[respEditSocial])

    const saveTitle = (category, title)=>{
        console.log(category, title)
        if(title === ''){
            return
        }
        const list = {...data}
        list[category].title = title
        setData(list)
    }

    useEffect(()=>{
        console.log('data', data)
    }, [data])

    const saveItem = (blockName, name ,itemStr) => {
       /*  console.log(blockName, name ,itemStr) */
        const list = {...data}
        const objName = Object.keys(itemStr)[0]
        list[blockName][objName] = itemStr[objName]
        console.log(list)
    }

    return (
        <div className='block-question-conteiner'>
            <div className='block-menu-header'>
                <h3>Соц. сети/ Месседжеры</h3>
                <div /* onClick={closeWindow} */ className='block-header-close'></div>
            </div>
            <SocialBlock saveTitle = {saveTitle} itemArr={itemArrSocial} blockName = 'social' saveItem = {saveItem}  content = {data.social} blockTitle='Социальные сети' />
            <SocialBlock saveTitle = {saveTitle} itemArr={itemArrMessedger} blockName = 'messeger' saveItem = {saveItem} content = {data.messeger} blockTitle='Месседжеры' />
            <div className='block-question-save'><p onClick={saveList} className='block-question-button-save'>Сохранить</p></div>
        </div>
    )
}

export default Social