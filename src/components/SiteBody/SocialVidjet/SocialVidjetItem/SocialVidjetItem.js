
import React from 'react'
import Button from '../../../../UI/Button/Button'
import './socialVidjetItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'

const nameSocialButton = {
    vk: 'Наша страница в Вконтакте',
    facebook: 'Наша страница в facebook',
    facebook: 'Наша страница в facebook',
    twitter: 'Наша страница в twitter',
    tiktok: 'Наша страница в tiktok',
    whatsup: 'Написать нам в WhatsApp',
    Viber: 'Написать нам в Viber',
    Skype: 'Написать нам в Skype',
    telegram: 'Написать нам в Telegtam',
}

const SocialVidjetItem = ({ data }) => {
    console.log('data', data)

    const goToLink = (link) =>{
        console.log(link)
        window.location.href = link
    }


    return (
        <div className='social-vidjet-item-conteiner container'>
            <h3>{data.title}</h3>
            <div className='social-vidjet-item-buttons'>
                {Object.keys(data)
                    .map((el, i) => {
                        console.log(data[el])
                        if (el === 'title' || !data[el].checked)
                            return
                        return (
                            <React.Fragment>
                                <button onClick = {()=>{goToLink(data[el].link)}} className = 'social-vidjet-button'>{nameSocialButton[el]}</button>
                            </React.Fragment>

                        )
                    })}
            </div>

        </div>
    )
}

export default SocialVidjetItem