import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import InputColor from 'react-input-color';
import EditButton from '../../UI/EditButton/EditButton'
import ArrowDown from '../../UI/ArrowButton/ArrowButton'

import './widjetWrapper.css'
import DeleteButton from '../DeleteButton/DeleteButton';
const WidjetWrapper = ({ children, editWindow, isView, setViewEdit, delHandler, setBackground ,replaceVidj,id}) => {
    return (
        <div className='questions-container '>
            <div className='container question-center '>
                <div className='questions-header'>
                    <div className='questions-buttons'>
                        <div className='icon-conteiner'>
                            {/*    <FontAwesomeIcon onClick = {()=>replaceVidj('up', id)} size='2x' icon={faAngleUp} /> */}
                            <ArrowDown id={id} replaceVidj = {replaceVidj}/>
                        </div>
                        <div className='icon-conteiner'>
                            {/*  <FontAwesomeIcon onClick = {()=>replaceVidj('down', id)} size='2x' icon={faAngleDown} /> */}
                            <ArrowDown id={id} replaceVidj={replaceVidj} direction='up' />
                        </div>
                        <div className='d-flex  icon-conteiner px-2 icon-container-padding'>
                            <div>
                                <p className='edit-background-text input-color-label'>Фон</p>
                            </div>
                            <InputColor
                                className='input-color-widjet input-color-margin'
                                initialValue={"#f0f1f7"}
                                onChange={(evt) => setBackground(evt.rgba)}
                                placement="right"

                            />
                        </div>
                        <div className='icon-conteiner icon-conteiner--middle-line icon-conteiner--double-icon' color='green'>
                            <DeleteButton onDelete={delHandler} />
                            {/*   <FontAwesomeIcon color={'red'} icon={faTrashAlt} size='2x' onClick={delHandler} /> */}
                            <EditButton openEdit={setViewEdit} />
                            {/* <FontAwesomeIcon onClick={setViewEdit} icon={faEdit} size='2x' /> */}
                        </div>
                    </div>
                </div>
                <div className='questions-body'>
                    {children}
                </div>
            </div>
            {isView ? editWindow : null}
            {/*  {viewEdit ? <BlockQueston setViewEdit={setViewEdit} id={id} changeStateVidjet={changeStateVidjet} isNew={false} listArr={body} title = {title} /> : null} */}
        </div>
    )
}

export default WidjetWrapper;