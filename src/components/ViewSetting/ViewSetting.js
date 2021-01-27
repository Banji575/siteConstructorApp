import React from 'react';
import ColorSetting from './ColorSetting/ColorSetting';
import DirectionSetting from './DirectionSetting/DirectionSetting';

const ViewSetting = () => {
    return (
        <div className = 'view-setting d-flex container'>
            <DirectionSetting/>
            <ColorSetting leftBorder = {true} title = 'backgroundColor'/>
            <ColorSetting leftBorder = {false} title = 'colorTopTitle'/>
        </div>
    )
}
export default ViewSetting