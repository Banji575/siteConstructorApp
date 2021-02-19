import React from 'react'
import InputColor from 'react-input-color'

const MenuNavChain = () => {
    return(
        <div className='menu-setting-nav-chain'>
                <div className="block-menu-header">
                    <h3>Навигационная цепочка</h3>
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
            </div>
    )
}

export default MenuNavChain