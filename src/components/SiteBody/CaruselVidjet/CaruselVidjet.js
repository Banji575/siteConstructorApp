import React, { useContext, useState } from 'react'
import Slider from 'infinite-react-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../../hooks/useFetch'
import Context from '../../../Context'
import Carusel from '../../BlockEditor/BlockMenu/Carusel/Carusel'

const CaruselVidjet = ({ body, id }) => {

    const [respDelCarusel, doFetchDelCarusel] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const [state, changeState, setState, catalogId] = useContext(Context)

    const [viewEdit, setViewEdit] = useState(false)
    const [data, setData] = useState(body)
    const [slideSpeed, setSlideSpeed] = useState(null)
    const delHandler = () => {
        const formData = new FormData()
        formData.set('landing_prop_id', 1)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelCarusel(formData)
    }
    console.log(body, 'body')

    const settings = {
        autoplay: true,
        autoplaySpeed: body.interval * 1000,
        centerMode: true,
        adaptiveHeight: true,
        centerPadding: 100
    }



    const SimpleSlider = () => (
        <div className='questions-container'>
            <div className='container question-center site-top-line'>
                <div className='questions-header'>
                    <div className='questions-buttons'>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon /* onClick = {()=>replaceVidj('up', id)} */ icon={faAngleUp} />
                        </div>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon /* onClick = {()=>replaceVidj('down', id)} */ icon={faAngleDown} />
                        </div>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon onClick={() => setViewEdit(true)} icon={faEdit} />
                        </div>
                        <div className='icon-conteiner' onClick={delHandler} color='green'>
                            <FontAwesomeIcon color={'red'} icon={faTrashAlt} />
                        </div>
                    </div>
                    {/*       <div className='questions-title'>
                        <h3 className='question-h3'></h3>
                    </div> */}
                </div>
                <div className='questions-body'>
                    <Slider
                        {...settings}
                        dots>
                        {body.images.map((el, i) => {
                            console.log(el)
                            return <div key={i}><img src={`https://cloudsgoods.com/images${el}`} /></div>
                        })}
                    </Slider>

                </div>

                {/*    {body.length > 2 && !viewFullList ? <Button onClick={() => viewFillLisnHundler()} title='Еще' /> : null} */}
            </div>
            {viewEdit ? <Carusel body={body} setViewEdit={setViewEdit} id={id}  /* changeStateVidjet={changeStateVidjet} isNew={false} listArr={body} */ /> : null}
        </div>

    );

    return (
        <div>
            <SimpleSlider />
        </div>
    )
}

export default CaruselVidjet