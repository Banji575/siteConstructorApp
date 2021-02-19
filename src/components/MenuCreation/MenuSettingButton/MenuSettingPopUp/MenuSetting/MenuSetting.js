import React from 'react'
import InputColor from 'react-input-color'
import './menuSetting.css'
const MenuSetting = () => {
    return (
        <React.Fragment>
            <div className='menu-setting-direction'>
                <h3 class="question-item-header my-3">Расположение</h3>
                <div>
                    <input id='direction-label-horizontal' name='directionRadio' type='radio' />
                    <label htmlFor='direction-label-horizontal' className = 'direction-label'>Горизонтальное</label>
                    <input id='direction-label-vertical' name='directionRadio' type='radio' />
                    <label htmlFor='direction-label-vertical' className = 'direction-label'>Вертикальное</label>
                </div>
            </div>
            <div className='menu-setting-font'>
                <h3 class="question-item-header my-3">Шрифт</h3>
                <select>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                </select>
                <h3 class="question-item-header my-3">Размер шрифта</h3>
                <select>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                </select>
            </div>
            <div className='menu-setting-font-color'>
                <h3 class="question-item-header my-3">Цвет шрифта</h3>
                <div className='d-flex'>
                    <div className='d-flex'>
                        <InputColor
                            className='input-color-widjet'
                            initialValue={"#5e72e4"}
                            /*  onChange={(evt)=>setBackground(evt.rgba)} */
                            placement="right"
                        />
                        <p>Без выделения</p>
                    </div>
                    <div class='d-flex'>
                        <InputColor
                            className='input-color-widjet'
                            initialValue={"#5e72e4"}
                            /*  onChange={(evt)=>setBackground(evt.rgba)} */
                            placement="right"
                        />
                        <p>При выделении</p>
                    </div>
                </div>
                <h3 class="question-item-header my-3">Цвет заливки</h3>
                <div className='d-flex'>
                    <div className='d-flex'>
                        <InputColor
                            className='input-color-widjet'
                            initialValue={"#5e72e4"}
                            /*  onChange={(evt)=>setBackground(evt.rgba)} */
                            placement="right"
                        />
                        <p>Без выделения</p>
                    </div>
                    <div class='d-flex'>
                        <InputColor
                            className='input-color-widjet'
                            initialValue={"#5e72e4"}
                            /*  onChange={(evt)=>setBackground(evt.rgba)} */
                            placement="right"
                        />
                        <p>При выделении</p>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}
export default MenuSetting