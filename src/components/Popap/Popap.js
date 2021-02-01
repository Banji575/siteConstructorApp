import React, {useState, useEffect} from 'react';

const Popap = (props) => {

    return (
        <div className={props.className} id={props.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        
          <div className={"modal-dialog modal-" +(props.size || 'lg')}>
        
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={props.id + '__title'} >{props.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClose()}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {props.children}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={() => props.onClose()}>Close</button>
                <button type="button" className="btn btn-primary" onClick={props.saveChanges}>Сохранить</button>
              </div>
            </div>
          </div>
        </div>
    )
}
export default Popap;