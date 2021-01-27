import React from 'react'

const Body = props =>{
    console.log(props.background)
    return <div className = 'site-body' style = {{backgroundColor:props.background}}>{props.children}</div>
}

export default Body;