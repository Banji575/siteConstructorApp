import React from 'react'
import Button from '../../../../UI/Button/Button'
import './items.css'

const Items = () => {
    return (
        <div className='block-question-conteiner'>
            <div className='block-menu-header'>
                <h3>Товары</h3>
                <div /* onClick={closeWindow} */ className='block-header-close'></div>
            </div>
            <div className='timer-conteiner d-flex'>
                <div className='mx-auto my-0 p-3'>
                    <h3 className='question-item-header'>Заголовок</h3>
                    <input type='text' className=' question-item-input' />
                    <div className='mt-3'>
                        <h3 className='question-item-header'>Загрузить товар</h3>
                        <div className='items-buttons-block'>
                            <div /* ref={root} */ className="items-input__wrapper items-input-wrapper-position" >
                               
                                <input name="file" type="file" name="file" id="input__file" className="input input__file" multiple /* onChange={(evt) => onLoadHandler(evt)} *//* onChange={(evt) => fileChange(evt)} */ />
                                <label htmlFor="input__file" className="input__file-button input-file-button--custom-height">
                                    <span className="input__file-button-text">Загрузить</span>
                                </label>
                              
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className='block-question-save'><p /* onClick={() => saveList()} */ className='block-question-button-save'>Сохранить</p></div>
        </div>
    )
}

export default Items