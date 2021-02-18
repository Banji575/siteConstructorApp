import React, { useContext } from 'react'
import LoadingLogo from './loadingLogo/LoadingLogo'
import SiteTitle from './SiteTitle/SiteTitle'
import './siteHeader.css'
import Context from '../../Context'
import TextEditorPanel from './TextEditorPanel/TextEditorPanel'
import MobileMenuIcon from '../../UI/MobileMenuIcon/MobileMenuIcon'
const SiteHeader = ({changeViewMenu}) => {
    const [state, changeState, setState, catalogId, setVidjetData, vidjetData,decktopMode] = useContext(Context)
    const backgroundColor =  state.titleBackground
    const classes = ['site-header']

    if(!decktopMode){
        classes.push('site-header-preview-mode')
    }

    const styles = {backgroundColor}
    console.log('site-list', state)
    return (
        <div className={classes.join(' ')} style = {{...styles}}>
            <div className='container d-flex'>
                <LoadingLogo />
                <SiteTitle />
               { decktopMode ? <TextEditorPanel/> : null}
                <MobileMenuIcon changeViewMenu={changeViewMenu}/>
            </div>
        </div>
    )
}
export default SiteHeader