import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../Context'
import useFetch from '../../../hooks/useFetch'
import './loadingLogo.css'

const LoadingLogo = () => {
    const [state, changeState,_,calalogId] = useContext(Context)
    const [loadLogo, setLoadLogo] = useState(false)
    const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=upload_logo')
    const fileChange = evt => {
        const file = evt.target.files[0]
        const formData = new FormData()
       /*  formData.set('mode', 'upload_logo') */
        formData.set('image', file)
        formData.set('catalog_id', calalogId)
        doFetch(formData)

    }
    useEffect(() => {
        if (response) {
            changeState({ siteLogo: response.catalog.logo })
        }
    }, [response])

    const IsLogoComponent = () => {
        if (!state.siteLogo) {
            return (<div className="input__wrapper" >
                <input name="file" type="file" name="file" id="input__file" className="input input__file" multiple onChange={(evt) => fileChange(evt)} />
                <label htmlFor="input__file" className="input__file-button">
                    <span className="input__file-button-text">Загрузить<br /> Логотип</span>
                </label>
            </div>)
        } else {
            return <div className='site-logo-conteiner'><img className='site-logo-img' src={state.siteLogo} /></div>
        }
    }

    return (
        <IsLogoComponent />
    )
}
export default LoadingLogo