import React,{useState, useEffect,useContext} from 'react'
import './socialVidjet.css'
import SocialVidjetItem from './SocialVidjetItem/SocialVidjetItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Social from '../../BlockEditor/BlockMenu/Social/Social'
import useFetch from '../../../hooks/useFetch'
import Context from '../../../Context'
import ContextEditor from '../../../ContextEditor'
import WidjetWrapper from '../../../UI/VidjetVrapper/WidjetWrapper'

const SocialVidjet = ({ body ,id}) => {
    const [viewEdit, setViewEdit] = useState(false)
    const [respDelSocial, doFetchDelSocial] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const [backgroundColor, setBackgroundColor] = useState('')
    const editHandler = () => {
        setViewEdit(true)
    }

    const delHandler = () => {
        const formData = new FormData()
        formData.set('landing_prop_id', 10)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelSocial(formData)
    }

    useEffect(() => {
        if (!respDelSocial) return
        if (respDelSocial.success === 'Успешно!') {
            const list = [...vidjArr]
            list.map((el, i) => {
                if (!el) return
                if (el.id === id) {
                    list.splice(i, 1)
                }
            })
            setVidjetData(list)
        }
    }, [respDelSocial])
    const socialSection = Object.keys(body)
    return (
        <div className='questions-container' style = {{backgroundColor:[backgroundColor]}}>
            <div className='container question-center'>
                <WidjetWrapper delHandler = {delHandler} setBackground = {setBackgroundColor} isView={viewEdit} setViewEdit={setViewEdit} editWindow={ <Social content = {body} setViewEdit={setViewEdit} id={id} /* changeStateVidjet={changeStateVidjet} isNew={false} listArr={body} */ />} >
                <div className='questions-body'>
                    <div className='social-vidjet-list-container'>
                        {socialSection.map((el, i) => {
                            return <SocialVidjetItem key={i} data={body[el]} />
                        })}
                    </div>
                </div>

                </WidjetWrapper>
            </div>
             {viewEdit ? <Social content = {body} setViewEdit={setViewEdit} id={id} /* changeStateVidjet={changeStateVidjet} isNew={false} listArr={body} */ /> : null}
        </div>
    )


}

export default SocialVidjet