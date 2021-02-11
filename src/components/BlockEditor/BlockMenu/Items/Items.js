import React, { useEffect, useState, useContext } from 'react'
import Button from '../../../../UI/Button/Button'
import useImageLoad from '../../../../hooks/useImageLoad'
import NewItem from './NewItems/NewItems'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useFetch from '../../../../hooks/useFetch'
import Context from '../../../../Context'
import './items.css'
import MyItem from './MyItem/MyItem'
import ContextEditor from '../../../../ContextEditor'

const Items = ({setViewEdit}) => {
    const [url, doLoad] = useImageLoad(null)
    const [viewPopUp, setViewPopUp] = useState(false)
    const [file, setFile] = useState(null)
    const [loadArr, setLoadArr] = useState([])
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [myItemsPopup, setMyItemsPopup] = useState(false)
    const [resAddData, doFetchAddItem] = useFetch(`https://cloudsgoods.com/api/actionsAdmin.php?mode=object_add_product`)
    const [resAddVidjetItem, doFetchAddVidjetItem] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    console.log(';ljasf;ljasdfklkjasdf')
    const closeWindow = () => {
        if (setViewEdit) {
            setViewEdit(false)
            return
        }
        setCurrentWidjet(null)
    }

    const delChangeItem = (el, i) => {
        const list = [...loadArr]
        list.splice(i,1)
        setLoadArr(list)
    }

    const saveList = () =>{
        console.log('saveList',loadArr)
        const formData = new FormData()
        formData.set('catalog_id', catalogId)
        formData.set('title', '')
        formData.set('')
    }

    const onLoadHandler = (evt) => {
        const file = evt.target.files[0]
        setFile(file)
        doLoad(file)
    }

    const createNewItem = (text, price) => {
        const formData = new FormData()
        formData.set('mode', 'object_add_product')
        formData.set('catalog_id', catalogId)
        formData.set('title', text)
        formData.set('price', price)
        formData.append('photo_file[]', file)
        doFetchAddItem(formData)
    }

    useEffect(() => {
        if (!resAddData) return
        const img = resAddData.object.default_preview_200

    }, [resAddData])

    useEffect(() => {
        if (!url) return
        setViewPopUp(true)
    }, [url])
    return (
        <div className='block-question-conteiner'>
            <div className='block-menu-header'>
                <h3>Товары</h3>
                <div onClick={closeWindow} className='block-header-close'></div>
            </div>

            <div className='timer-conteiner d-flex flex-column'>
                <div className='mx-auto my-0 p-3'>
                    <h3 className='question-item-header'>Заголовок</h3>
                    <input type='text' className=' question-item-input' />
                    <div className='mt-3'>
                        <h3 className='question-item-header'>Загрузить товар</h3>
                        <div className='items-buttons-block d-flex'>
                            <div /* ref={root} */ className="items-input__wrapper items-input-wrapper-position" >
                                <input disabled={viewPopUp} name="fileItem" type="file" name="file" id="input__file_item" className="input input__file" multiple onChange={(evt) => onLoadHandler(evt)}/* onChange={(evt) => fileChange(evt)} */ />
                                <label htmlFor="input__file_item" className="input__file-button input-file-button--custom-height">
                                    <span className="input__file-button-text">Загрузить новый</span>
                                </label>
                            </div>
                            <div /* ref={root} */ className="items-input__wrapper items-input-wrapper-position" >
                                <Button title='загрузить свой' onClick={() => setMyItemsPopup(true)} />

                            </div>
                        </div>
                    </div>
                    {viewPopUp ? <NewItem  createNewItem={createNewItem} img={url} setView={setViewPopUp} /> : null}
                    {myItemsPopup ? <MyItem renderCheckImg = {setLoadArr} showMyItem = {setMyItemsPopup}/> : null}
                </div>
                <div className = 'd-flex flex-wrap' >

                    {loadArr.map((el,i)=>{
                        return (
                        <div className= 'mr-3'><img  src = {el.src}/><div className='icon-conteiner'/*  onClick={delHandler} */ color='green'>
                        <FontAwesomeIcon onClick = {()=>delChangeItem(el,i)} color={'red'} icon={faTrashAlt} />
                    </div></div>)
                    })}
                </div>
            </div>
            <div className='block-question-save'><p onClick={() => saveList()} className='block-question-button-save'>Сохранить</p></div>
        </div>
    )
}

export default Items