import React from 'react'
import './previewMode.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faDesktop, faTabletAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
const PreviewMode = ({changeViewMode}) => {

    return (
        <div className = 'preview-mode'>
            <p onClick = {()=>changeViewMode()} className = 'preview-item  mr-3 pr-3'><FontAwesomeIcon  icon = {faAngleLeft}/> Назад к редактированию </p>
            <div className = 'preview-mode-icon-block'>
                <FontAwesomeIcon  className = 'mr-5' icon = {faDesktop} size = '3x'/>
                <FontAwesomeIcon  className = 'mr-5' icon = {faTabletAlt} size = '3x'/>
                <FontAwesomeIcon  className = 'mr-5' icon = {faMobileAlt} size = '3x'/>
            </div>
        </div>
    )
}

export default PreviewMode