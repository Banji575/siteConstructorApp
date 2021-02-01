import React, { useEffect, useState } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import './socialItem.css'
import Button from '../../../../../../UI/Button/Button'

const SocialItem = ({ title, isChecked, link, name, data, saveItem, blockName }) => {
    const [checked, setChecked] = useState(data.checked)
    const [isEdit, setIsEdit] = useState(false)
    const [socialLink, setSocialLink] = useState(data.link)
    const [isValidSocialLink, setIsValidSocialLink] = useState(true)
    const [state, setState] = useState({ [name]: data })
    const [initialize, setInitialaize] = useState(false)

    const saveSocialLink = () => {
        if (!socialLink) {
            setIsValidSocialLink(false)
            return
        }
        setIsEdit(false)
        setIsValidSocialLink(true)
        const newData = { checked: checked, socialLink }
        setState({ [name]: newData })
    }

    useEffect(() => {
        if (!initialize) {
            setInitialaize(true)
            return
        }

        saveItem(blockName, name, state)
    }, [state])


    const settingToggle = () => {
        setIsEdit(state => !state)
    }
    const check = (evt) => {
        const newData = { checked: !checked, socialLink }
        setState({ [name]: newData })
        setChecked(state => !state)
        if (checked) {
            setIsEdit(false)
            setIsValidSocialLink(true)
        }

    }

    return (
        <React.Fragment>
            <div className='social-item-conteiner'>
                <div className='social-checkbox-conteiner'>
                    <FormControlLabel className='social-item-checkbox'
                        control={<Switch size="medium" value={checked} checked={checked} onChange={() => check()} />}
                    />
                    <p className='social-item-title'>{title}</p>
                </div>
                <div className='social-button-center'>
                    <Button disabled={!checked} title='настройки' onClick={settingToggle} />
                </div>

            </div>
            {
                isEdit && checked ? (
                    <div className='social-item-setting'>
                        <p>Ссылка на страницу</p>
                        <input className='w-100' type='text' value={socialLink} onChange={(evt) => setSocialLink(evt.target.value)} />
                        {!isValidSocialLink ? <p className='text-danger'>Поле не дожно быть пустым</p> : null}
                        <div className='social-button-right'>
                            <Button title='Сохранить' onClick={saveSocialLink} />
                        </div>

                    </div>
                )
                    : null
            }

        </React.Fragment>
    )
}

export default SocialItem