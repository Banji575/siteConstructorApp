import React, { useEffect, useState } from 'react'
import SocialItem from './SocialItem/SocialItem'
import './socialBlock.css'


const SocialBlock = ({ blockTitle, itemArr, content, saveItem, blockName, saveTitle }) => {
    const [firstLoad, setFirstLoad] = useState(false)
    const [customTitle, setCustomTitle] = useState('')

    const [title, setTitle] = useState(!firstLoad ? content.title : customTitle)



    return (
        <div className='social-block-container'>
            <h3 className='social-block-h'>{blockTitle}</h3>
            <div className='social-block-header'>
                <p className='social-block-p'>Заголовок </p>
                <input type='text' value={customTitle} placeholder={title} onChange={(evt) => setCustomTitle(evt.target.value)} onBlur={()=>saveTitle(blockName, customTitle)} />
                {itemArr.map((el, i) => {
                    return <SocialItem blockName={blockName} saveItem={saveItem} data={content[el.name]} title={el.title} name={el.name} key={i} />
                })}
            </div>
        </div>
    )
}

export default SocialBlock