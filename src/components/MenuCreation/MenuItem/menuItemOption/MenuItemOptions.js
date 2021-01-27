import React, { useEffect, useRef } from 'react'
import './MenuItemOptions.css'
const MenuItemOption = ({ show, setShow, deletItem, id , editItem}) => {
    const clases = ['menu-item-option-conteiner']

    const root = useRef()
    const hideElem = () => {
        show = !show
    }

    const onClickHandler = () =>{
        setShow(!show)
        editItem()
    }

    useEffect(() => {
        if (!show) {
            return
        }
        const onClick = e =>  root.current.contains(e.target) || setShow(!show)
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
    }, [show])

    if (show) {
        clases.push('menu-option-show')
    }
    return (
        <div ref={root} className={clases.join(' ')}>
            <ul className='menu-item-option-list'>
                <li onClick = {onClickHandler} className='menu-item-button'>Редактировать</li>
                <li onClick={() => deletItem(id)} className='menu-item-button'>Удалить</li>
            </ul>
        </div>
    )
}
export default MenuItemOption;