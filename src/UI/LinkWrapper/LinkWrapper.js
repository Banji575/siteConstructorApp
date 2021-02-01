import React from 'react'

const LinkWrapper = ({children, link}) => {
    return <a href = {link} >{children}</a>
}

export default LinkWrapper