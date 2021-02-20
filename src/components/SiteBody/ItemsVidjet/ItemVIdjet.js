import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import './itemVidjet.css'
import Context from '../../../Context'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'

const ItemsVidjet = ({ key, body, bgColor, id, replaceVidj }) => {
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?')
    const [state, changeState, setState, catalogId, setVidjetData, vidjArr] = useContext(Context)
    const [imageArr, setImageArr] = useState([])
    const [background, setBackground] = useState('')

    useEffect(() => {
        const formData = new FormData()
        formData.set('mode', 'get_catalog_objects')
        formData.set('catalog_id', catalogId)
        formData.set('menu_id', 0)
        formData.set('start', 0)
        formData.append('limit', 50)
        doFetch(formData)
    }, [])


    useEffect(() => {
        if (!response) return
        console.log(response)
        setImageArr(response.data)
    }, [response])


    return (

        <div className='questions-container' >
            <WidjetWrapper setBackground={setBackground} /* id={id} replaceVidj = {replaceVidj} delHandler = {delHandler} setBackground = {setBackgroundColor} isView={viewEdit} setViewEdit={setViewEdit} editWindow={<Feedback setViewEdit = {setViewEdit} content = {{id:id, title:'feedback',body:body}}/>} */ >
                <div className='items-vidjet'>
                    <h3 className = 'text-center'>{body.title}</h3>
                    <div className='items-conteiner d-flex '>
                        {imageArr.map((el, i) => {
                            return (
                                <div className = 'd-flex flex-column m-3'>
                                    <div>
                                        <img src={el.default_look_preview_200} />
                                    </div>
                                    <p className = 'items-p' >{el.price}</p>
                                    <p className = 'items-p'> {el.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </WidjetWrapper>
            {/*   <ButtonAddComponent isVidjetButton = {true} onClick={() => setIsOpenEditBlock(false)}/> */}
        </div>
    )
}

export default ItemsVidjet;