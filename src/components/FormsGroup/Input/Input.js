import React from 'react';

export default (props) => {
    let classNames = 'form-control ' + (props.className || '');
    let attr = props.attrName || {};
    return ( <input
        id = {props.id}
        className = {classNames}
        type = {props.type}
        defaultValue = {props.value}
        onChange = {props.onChange}
        onBlur = {props.onBlur}
        onClick = {props.onClick}
        {...attr}/>
    )
}