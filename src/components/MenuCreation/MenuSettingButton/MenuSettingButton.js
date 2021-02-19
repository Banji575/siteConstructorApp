import React, { useState } from 'react'
import './menuSettingButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import MenuSettingPopUp from './MenuSettingPopUp/MenuSettingPopUp'
import InputColor from 'react-input-color'
import PopUp from '../../../UI/PopUp/PopUp'
import EditButton from '../../../UI/EditButton/EditButton'

const MenuSettingButton = () => {
    const [isEdintText, setIsEditText] = useState(false)

    const closePopUp = () => {
        setIsEditText(s=>!s)
    }
    return (
        <div className='menu-creation-container container d-flex justify-content-end'>
            <div className='d-flex  icon-conteiner'>
                <div>
                    <p className='edit-background-text input-color-label'>Фон</p>
                </div>
                <InputColor
                    className='input-color-widjet'
                    initialValue={"#5e72e4"}
                    /*  onChange={(evt)=>setBackground(evt.rgba)} */
                    placement="right"
                />
            </div>
            <div className='edit-text'>
                <EditButton openEdit = {() => setIsEditText(state => !state)}/>
             {/*    <FontAwesomeIcon fontWeight = 'light' onClick={() => setIsEdit(state => !state)} icon={faEdit} size='2x' /> */}
            </div>
               {/*  <FontAwesomeIcon fontWeight='light' onClick={() => setIsEditText(state => !state)} icon={faEdit} size='2x' /> */}
                {isEdintText ?
                    <PopUp title='Настройка меню' closePopup={closePopUp} >
                        <MenuSettingPopUp/>
                    </PopUp> : null}
            </div>
    )
}

export default MenuSettingButton