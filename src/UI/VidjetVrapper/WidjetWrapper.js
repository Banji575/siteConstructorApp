import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
const WidjetWrapper = ({children, editWindow,isView, setViewEdit,delHandler}) =>{
return (
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
                            <FontAwesomeIcon onClick={setViewEdit}  icon={faEdit} />
                        </div>
                        <div className='icon-conteiner' onClick={delHandler} color='green'>
                            <FontAwesomeIcon color={'red'} icon={faTrashAlt} />
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