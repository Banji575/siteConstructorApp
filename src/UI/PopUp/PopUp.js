import React from 'react'
import './popUp.css'
const PopUp = ({ children, closePopup, title ,saveHandler}) => {
    
    return (
        <React.Fragment>
            <div className='popup-container  pupUpZindex '>
                <div className='block-menu-header'>
                    <h3 className='ml-3'>{title}</h3>
                    <div onClick={closePopup} className='block-header-close'></div>
                </div>
                <div className = 'popup-body'>
                {children}
                </div>
                <div className='block-question-save'><p onClick={saveHandler}  className='block-question-button-save'>Сохранить</p></div>
            </div>
            <div onClick={closePopup} className='overlay-wpapper'>
            </div>
        </React.Fragment>
    )
}
export default PopUp