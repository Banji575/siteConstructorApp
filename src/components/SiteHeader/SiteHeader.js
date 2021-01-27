import React from 'react'
import LoadingLogo from './loadingLogo/LoadingLogo'
import SiteTitle from './SiteTitle/SiteTitle'
import './siteHeader.css'
const SiteHeader = () => {
    return (
        <div className = 'site-header'>
            <div className = 'container d-flex'>
                <LoadingLogo/>
                <SiteTitle/>
            </div>
        </div>
    )
}
export default SiteHeader