import React, { useEffect, useState, useContext } from 'react'
import Button from '../../../../UI/Button/Button'
import useImageLoad from '../../../../hooks/useImageLoad'
import CKEditor from 'ckeditor4-react-advanced'
import Utils from '../../../../scripts/Utils'
import NewItem from './NewItems/NewItems'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useFetch from '../../../../hooks/useFetch'
import Context from '../../../../Context'
import './items.css'
import MyItem from './MyItem/MyItem'
import ContextEditor from '../../../../ContextEditor'
import PopUp from '../../../../UI/PopUp/PopUp'

const Items = ({ setViewEdit }) => {
    const [url, doLoad] = useImageLoad(null)
    const [viewPopUp, setViewPopUp] = useState(false)
    const [file, setFile] = useState(null)
    const [loadArr, setLoadArr] = useState([])
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [myItemsPopup, setMyItemsPopup] = useState(false)
    const [resAddData, doFetchAddItem] = useFetch(`https://cloudsgoods.com/api/actionsAdmin.php?mode=object_add_product`)
    const [resAddVidjetItem, doFetchAddVidjetItem] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const closeWindow = () => {
        if (setViewEdit) {
            setViewEdit(false)
            return
        }
        setCurrentWidjet(null)
    }
    

    const delChangeItem = (el, i) => {
        const list = [...loadArr]
        list.splice(i, 1)
        setLoadArr(list)
    }

    const saveList = () => {
        console.log(loadArr)
        const itemsIdArr = new Array(loadArr.length)
        .fill('')
        .map((el,i)=>{
            return loadArr[i].id
        })

        console.log(itemsIdArr)
        const formData = new FormData()
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_id',5)
        formData.set('title', '')
        itemsIdArr.forEach(el=>formData.append('object_id[]', el))
        doFetchAddVidjetItem(formData)
    }

    useEffect(()=>{
        if(!resAddVidjetItem) return
        console.log(resAddVidjetItem)
    },[resAddVidjetItem])

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
        <React.Fragment>
        <PopUp title="Товары" closePopup={closeWindow} saveHandler={() => saveList()}>
            <div className='timer-conteiner d-flex flex-column'>
                <h3 className='question-item-header my-3'>Заголовок</h3>
                <CKEditor
                    config={{
                        toolbar: [Utils.CKEditorTools],
                        height: '60px'
                    }}
                />
                {/*  <input type='text' className=' question-item-input' /> */}
                <div className='mt-3'>
                    <div className='items-buttons-block d-flex justify-content-between'>
                        <div /* ref={root} */ className="items-input__wrapper items-input-wrapper-position" >
                            <input disabled={viewPopUp} name="fileItem" type="file" name="file" id="input__file_item" className="input input__file" multiple onChange={(evt) => onLoadHandler(evt)}/* onChange={(evt) => fileChange(evt)} */ />
                            <label htmlFor="input__file_item" className="input__file-button input-file-button--custom-height items-input__wrapper">
                               <p className = 'mx-auto my-0'>Загрузить новый товар</p> 
                                </label>
                        </div>
                        <div /* ref={root} */ onClick={() => setMyItemsPopup(true)} className="items-input__wrapper items-input-wrapper-position" >
                            <label className="input__file-button input-file-button--custom-height items-input__wrapper">
                                <p className = 'mx-auto my-0'>Выбрать из загруженных товаров</p>
                                </label>
                        </div>
                    </div>
                </div>
                </div>
                <div className = 'd-flex items-card-conteiner'>
                {loadArr.map((el, i) => {
                        return (                         
                            <div className='mr-3 item-card d-flex'><img src={el.src} /><div className='icon-conteiner'/*  onClick={delHandler} */ color='green'>
                                <FontAwesomeIcon onClick={() => delChangeItem(el, i)} color={'red'} icon={faTrashAlt} />
                            </div></div>)
                    })}
                    </div>
                </PopUp>
                    {viewPopUp ?<PopUp title="Загрузить товар" closePopup={closeWindow} saveHandler={() => saveList()}> <NewItem createNewItem={createNewItem} img={url} setView={setViewPopUp} /></PopUp> : null}
                    {myItemsPopup ? <MyItem renderCheckImg={setLoadArr} showMyItem={setMyItemsPopup} /> : null}
                <div className='d-flex flex-wrap' >
                </div>
                </React.Fragment> 
    )
}

export default Items