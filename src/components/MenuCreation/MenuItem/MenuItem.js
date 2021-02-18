import React, { useRef, useState } from 'react'
import './MenuItem.css'
import MenuItemOption from './menuItemOption/MenuItemOptions'

const MenuItem = ({ children, isList, data, deletItem, editItem, id }) => {
    const root = useRef()
    const [shoeOpion, setShowOption] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [inputItemText, setItemText] = useState('')

    const editItemInput = () => {
        console.log( root.current)
        setShowInput(true)
    }

    const inputClasses = ['item-edit-text']
    if (showInput) {
        inputClasses.push('item-edit-text-show')
    }
    const editText = () => {
        setShowInput(false)
        editItem(inputItemText,data.id)
        setItemText('')
    }
    const inputChangeHandler = (evt) => {

        setItemText(evt.target.value)
    }



    if (isList) {
        return (
            <ul className='menu-list'>
                <li className='menu-item'>{data.text}<MenuItemOption editItem={editItemInput} id={data.id} show={shoeOpion} setShow={setShowOption} deletItem={deletItem} />
                    <div className='menu-list-opions' onClick={() => setShowOption(!shoeOpion)} >...</div>
                    {/* Сделать добавлятор меню использую id */}
                    <input autoFocus={true} ref={root} onBlur={editText} onChange={inputChangeHandler} placeholder={data.text} className={inputClasses.join(' ')} text />
                </li>

                {children}
            </ul>

        )
    } else {
        return (
            <ul className='menu-list'>
                <li className='menu-item'>
                    {data.text}
                    <MenuItemOption show={shoeOpion} id={data.id} setShow={setShowOption} editItem={editItemInput} deletItem={deletItem} />
                    <div className='menu-list-opions' onClick={() => setShowOption(!shoeOpion)}>...</div>
                    <input autoFocus={true} ref={root} onBlur={editText} onChange={inputChangeHandler} placeholder={data.text} className={inputClasses.join(' ')} text />
                </li>

            </ul>
        )
    }
}
export default MenuItem