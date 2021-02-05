
import React from 'react'
import Button from '../../../../UI/Button/Button'
import './socialVidjetItem.css'


const nameSocialButton = {
    vk: 'Наша страница в Вконтакте',
    facebook: 'Наша страница в facebook',
    facebook: 'Наша страница в facebook',
    twitter: 'Наша страница в twitter',
    tiktok: 'Наша страница в tiktok',
    whatsup: 'Написать нам в WhatsApp',
    viber: 'Написать нам в Viber',
    skype: 'Написать нам в Skype',
    telegram: 'Написать нам в Telegtam',
}

const SocialVidjetItem = ({ data }) => {
    const goToLink = (link) => {
        document.location.href = link
    }
    return (
        <div className='social-vidjet-item-conteiner container '>
            <h3 className='social-vidjet-title'>{data.title}</h3>
            <div className='social-vidjet-item-buttons'>
                {Object.keys(data)
                    .map((el, i) => {
                        if (el === 'title' || !data[el].checked)
                            return
                        return (
                            <React.Fragment>
                                <a key={i} href={`https://${data[el].link}`} /* onClick={() => { goToLink(data[el].link) }} */ className='social-vidjet-button'>{nameSocialButton[el]}</a>
                            </React.Fragment>
                        )
                    })}
            </div>

        </div>
    )
}

export default SocialVidjetItem