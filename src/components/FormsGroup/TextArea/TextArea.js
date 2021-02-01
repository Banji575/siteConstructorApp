import React from 'react';

export default (props) => {
    const classText = props.className + 'form-control';
    const attrs = props.attrName || {};
    return (
        <textarea  
            className={classText}
            onChange={props.onChange}
            {...attrs}
        >
            {props.value}
        </textarea>
    )
}