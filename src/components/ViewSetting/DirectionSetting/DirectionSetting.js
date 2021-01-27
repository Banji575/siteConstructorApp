import React, { useContext } from 'react'
import './directionSetting.css'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Context from '../../../Context'
const DirectionSetting = () => {

    const [{verticalMenu}, changeState] = useContext(Context)

    const direction = verticalMenu !== undefined ? verticalMenu : false
    console.log(direction)

    return (
        <div className='direction-conteiner'>
            <p className='direction-conteiner-p'>Расположение <br></br> Меню</p>
            <div className = 'd-flex'>
                <FormControlLabel
                    control={<Switch size="medium" checked={direction} onChange={()=>changeState('checked')} />}
                />
                <div className='direction-titles'>
                    <p className='direction-titles-item'>Горизонтальное</p>
                    <p className='direction-titles-item'>Вертикальное</p>
                </div>
            </div>
        </div>
    )
}

export default DirectionSetting