import React, { useState } from 'react';
import SiteLogo from '../../UI/SiteLogo/SiteLogo';
import ColorSetting from './ColorSetting/ColorSetting';
import DirectionSetting from './DirectionSetting/DirectionSetting';
import logo from '../../../src/image/siteLogo.png'
import './viewSetting.css'
import PreviewBlock from './PreviewBlock/PreviewBlock';
import PreviewMode from './PreviewMode/PreviewMode';
const ViewSetting = () => {
    const [viewMode, setViewMode] = useState(false)
    const changeViewMode = () => setViewMode(state=>!state)


    return (
        <div className='view-setting d-flex'>
            { !viewMode ? (
                <React.Fragment>
                    <div className='view-setting-left-block d-flex'>
                        <SiteLogo img={logo} link={'https://cloudsgoods.com/'} />
                        <DirectionSetting />
                        <ColorSetting leftBorder={false} title='backgroundColor' />
                        {/*  <ColorSetting leftBorder = {false} title = 'titleBackground'/> */}
                    </div>
                    <div className='view-setting-right-block'>
                        <PreviewBlock changeViewMode={changeViewMode} />
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <PreviewMode changeViewMode={changeViewMode} />
                </React.Fragment>
            )}
        </div>
    )
}
export default ViewSetting