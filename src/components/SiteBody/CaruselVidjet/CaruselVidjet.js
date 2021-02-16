import React, { useContext, useEffect, useState } from 'react'
import Slider from 'infinite-react-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../../hooks/useFetch'
import Context from '../../../Context'
import Carusel from '../../BlockEditor/BlockMenu/Carusel/Carusel'
import Carousel from 'react-elastic-carousel'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'
import ContextEditor from '../../../ContextEditor'

const CaruselVidjet = ({ body, id }) => {
    const [respDelCarusel, doFetchDelCarusel] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [viewEdit, setViewEdit] = useState(false)
    const [data, setData] = useState(body)
    const [slideSpeed, setSlideSpeed] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState('')
    console.log('render background', backgroundColor)
    const delHandler = () => {
        const formData = new FormData()
        formData.set('landing_prop_id', 1)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelCarusel(formData)
    }


    useEffect(() => {
        if (!respDelCarusel) return
        console.log(respDelCarusel)
        if (respDelCarusel.success === 'Успешно!') {
            const list = [...vidjArr]
            list.forEach((el, i) => {
                if (el.id === id) {
                    list.splice(i, 1)
                }
            })
            setVidjetData(list)
        }
    }, [respDelCarusel])



    const SimpleSlider = () => (
        <div className='questions-container' style = {{backgroundColor:[backgroundColor]}} >
            <WidjetWrapper delHandler={delHandler} setBackground={setBackgroundColor} isView={viewEdit} setViewEdit={setViewEdit} editWindow={<Carusel body={body} setViewEdit={setViewEdit} id={id} />} >
                <div className='questions-body'>
                    <Carousel
                        itemsToShow={1}
                        enableAutoPlay={true}
                        onChange={(currentItem, pageIndex) => {
                        }}
                    >
                        {body.images.map((el, i) => {
                            return <div key={i}><img src={`https://cloudsgoods.com/images${el}`} /></div>
                        })}
                    </Carousel>
                </div>
            </WidjetWrapper>
            {/*    {body.length > 2 && !viewFullList ? <Button onClick={() => viewFillLisnHundler()} title='Еще' /> : null} */}
        </div>
    );
    return (
        <div>
            <SimpleSlider />
        </div>
    )
}

export default CaruselVidjet