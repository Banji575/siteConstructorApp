import React, { useContext,useEffect } from 'react'
import Context from '../../Context'
import MenuItemWrapper from './MenuItemWrapper/MenuItemWrapper'
import useFetch from '../../hooks/useFetch'
import MenuItem from './MenuItem/MenuItem'
import './menuCreation.css'

const MenuCreation = () => {
    const [state, changeState, setState,calalogId] = useContext(Context)
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_menu_item')
    const [resp, doFetchCreate] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=create_menu_item')
    const [respEditText, doFetchEditText] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=update_menu_item')
    console.log('menucreation')
    const drawMenu = (data, isSub, lev) => {
        let level = lev || 0
        let children = []
       
        
        data.map((el, i) => {
            if (el.childrenList.length !== 0) {
                level += 1
                children.push(
                    <MenuItem key={i} isList={true} data={el} editItem = {editItem} deletItem={deletItem}>  {drawMenu(data[i].childrenList)}</MenuItem>
                )
            } else {
                children.push(
                    <MenuItem key = {i} isList={false} data={el} editItem = {editItem} deletItem={deletItem}>  {drawMenu(data[i].childrenList)}</MenuItem>
                )
            }
        })
        return <div className='wrapper d-flex'>{children}</div>;
    }


    const editItem = (value, id)=>{
        const newList = [...state.siteMenu]
        const findEl = (arr, currentId) => {
            arr.forEach((elem, i, array) => {
                if (elem.id == currentId) {
                        elem.text = value
                     changeState({ siteMenu: newList })
                } else {
                    findEl(elem.childrenList, currentId)
                }
            })
        }
        findEl(newList, id)
        const formData = new FormData()
        formData.set('menu_id', id)
        formData.set('catalog_id', calalogId)
        formData.set('text', value)
        doFetchEditText(formData)
        console.log(value, id)
    }

 const deletItem = (id) => {
            console.log(id)
            const newList = [...state.siteMenu]
            console.log(newList)
            const findEl = (arr, currentId) => {
                arr.forEach((elem, i, array) => {
                    if (elem.id == currentId) {
                        console.log(elem.id, currentId, array,i)
                        array.splice(i, 1)
                         changeState({ siteMenu: newList })
                    } else {
                        findEl(elem.childrenList, currentId)
                    }
                })
            }
            findEl(newList, id)
            const formData = new FormData()
            formData.set('menu_id', id)
            formData.set('catalog_id', calalogId)
            doFetch(formData)
        }
    
        useEffect(() => {
            if (resp) {

                const siteMenu = [...state.siteMenu, { id:[resp.id], catalog_id:[resp.catalog_id],  parentId:[resp.parent_id],text: 'Новый раздел',  childrenList: [] }]
                changeState({ 'siteMenu': siteMenu })
            }
        }, [resp])
        useEffect(() => {
            if (respEditText) {
               // const siteMenu = [...state.siteMenu, { id:[resp.id], catalog_id:[resp.catalog_id],  parentId:[resp.parent_id],text: 'Новый раздел',  childrenList: [] }]
               
            }
        }, [respEditText])

    const addMenuItemHandler = () => {
       
        const formData = new FormData()
        formData.set('parent_id', 0)
        formData.set('catalog_id', calalogId)
        formData.set('text', 'Новый раздел')
        
        doFetchCreate(formData)
        console.log(state.siteMenu)
    }

    return (
        <div className='menu-creation-container container d-flex justify-content-end'>
            <p className='menu-creation-main-button'>Главая</p>
            { drawMenu(state.siteMenu)}
            <button onClick={addMenuItemHandler} className='add-menu-item'>Добавить раздел</button>
        </div>
    )
}
export default MenuCreation