import React, { useState } from 'react'
import Button from '../../../../../UI/Button/Button'

import './newItems.css'

const NewItem = ({ setView, img ,createNewItem}) => {
    const [itemName, setItemName] = useState('')
    const [itemPrice, setItemPrice] = useState('')
    const [isValidName, setIsValidName] = useState(true)
    const [isValidPrice, setIsValidPrice] = useState(true)


    const addItem = () => {
        if (itemName.length === 0) {
            console.log('Поле имя false')
            setIsValidName(false)
            return
        }
        setIsValidName(true)
        if (itemPrice.length === 0) {
            console.log('Поле цена')
            setIsValidPrice(false)
            return
        }
        setIsValidPrice(true)
        createNewItem(itemName, itemPrice)
        setView(false)

    }

    return (
        <div className='item-new-container'>
            <div className='item-new-image-wrapper'>
                <img src={img} />
            </div>
            <div dir='item-new-desc-wpapper'>
                <div className='input-wpapper'>
                    <div>
                        <label htmlFor='item-desc'>Введите название товара</label>
                        <input id='item-desc' value={itemName} onChange={evt => setItemName(evt.target.value)} type='text' />
                    </div>
                    {!isValidName ? <p className='text-danger'>Поле не должно быть пустым</p> : null}
                </div>
                <div className='input-wpapper'>
                    <div>
                        <label htmlFor='item-price'>Укажите стоимость товара</label>
                        <input id='item-price' value={itemPrice} onChange={evt => setItemPrice(evt.target.value)} type='number' />
                    </div>
                    {!isValidPrice ? <p className='text-danger'>Поле не должно быть пустым</p> : null}

                </div>

                <div>
                    <Button title='Отмена' onClick={() => setView(false)} />
                    <Button title="Применить" onClick={() => addItem()} />
                </div>

            </div>
        </div>
    )
}

export default NewItem;