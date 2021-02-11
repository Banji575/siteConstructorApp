import React from 'react'
import './previewBlock.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faSave } from '@fortawesome/free-solid-svg-icons'

const PreviewBlock = ({changeViewMode}) => {
    return(
        <div className = 'preview-block mt-2'>
            <p onClick = {()=>changeViewMode()} className = 'preview-item border-rigth mr-3 pr-3'>Предпросмотр <FontAwesomeIcon className = 'preview-item-icon' icon = {faCaretRight}/></p>
            <p className = 'preview-item'>Сохранить <FontAwesomeIcon icon = {faSave}/></p>
           
        </div>
    )
}
export default PreviewBlock