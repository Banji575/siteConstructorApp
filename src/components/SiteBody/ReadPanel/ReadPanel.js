import {useState, useEffect, useFetch} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
export default (props) => {

// const [respDelQuestion, doFetchDelQuestion] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    
    return (
        <div>
            <div className='questions-buttons'>
                <div className='icon-conteiner'>
                    <FontAwesomeIcon icon={faAngleUp} />
                </div>
                <div className='icon-conteiner'>
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
                <div className='icon-conteiner'>
                    <FontAwesomeIcon  icon={faEdit} onClick={() => props.onClickEddit()}/>
                </div>
                <div className='icon-conteiner'  color='green'>
                    <FontAwesomeIcon color={'red'} icon={faTrashAlt}  onClick={() => props.onClickDelete()}/>
                </div>
            </div>
        </div>
    )
}