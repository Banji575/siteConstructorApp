import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../../hooks/useFetch'
import Context from '../../../Context'
import ContextEditor from '../../../ContextEditor'
import './contactsVidjets.css'
import Contacts from '../../BlockEditor/BlockMenu/Contacts/Contacts'

const ContactsVidjets = ({ body, id, replaceVidj }) => {
    const [viewEdit, setViewEdit] = useState(false)
    const [respDelContacts, doFetchDelContacts] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)
    const { address, email, phone, fax } = body
    const editHandler = () => {
        setViewEdit(true)
    }

    const delHandler = () => {
        console.log('del', id)
        const formData = new FormData()
        formData.set('landing_prop_id', 6)
        formData.set('catalog_id', catalogId)
        formData.set('landing_prop_data_id', id)
        doFetchDelContacts(formData)
    }

    useEffect(() => {
        if (!respDelContacts) return
        if (respDelContacts.success === 'Успешно!') {
            const list = [...vidjArr]
            list.map((el, i) => {
                if (!el) return
                if (el.id === id) {
                    list.splice(i, 1)
                }
            })
            setVidjetData(list)
        }
    }, [respDelContacts])

    return (
        <div className='questions-container'>
            <div className='container question-center'>
                <div className='questions-header'>
                    <div className='questions-buttons'>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon /* onClick = {()=>replaceVidj('up', id)} */ icon={faAngleUp} />
                        </div>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon /* onClick = {()=>replaceVidj('down', id)} */ icon={faAngleDown} />
                        </div>
                        <div className='icon-conteiner'>
                            <FontAwesomeIcon onClick={editHandler} icon={faEdit} />
                        </div>
                        <div className='icon-conteiner' onClick={delHandler} color='green'>
                            <FontAwesomeIcon color={'red'} icon={faTrashAlt} />
                        </div>
                    </div>
                    <div className='questions-title'>
                        <h3 className='question-h3'>Контакты</h3>
                    </div>
                    {address.checked ? <p className='contacts-p'>{address.text}</p> : null}
                    {email.checked ? <p className='contacts-p'>{email.text}</p> : null}
                    {phone.checked ? <p className='contacts-p'>{phone.text}</p> : null}
                    { fax.checked ?  <p className='contacts-p'>{fax.text}</p> : null}


                   
                </div>
                <div className='questions-body'>

                </div>

                {/*    {body.length > 2 && !viewFullList ? <Button onClick={() => viewFillLisnHundler()} title='Еще' /> : null} */}
            </div>
            {viewEdit ? <Contacts content={body} setViewEdit={setViewEdit} id={id}  /* changeStateVidjet={changeStateVidjet} isNew={false} listArr={body} */ /> : null}
        </div>
    )
}

export default ContactsVidjets