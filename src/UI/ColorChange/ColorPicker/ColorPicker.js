import React, { useContext, useEffect, useRef, useState } from 'react';
import InputColor from 'react-input-color';
import Context from '../../../Context';
import useFetch from '../../../hooks/useFetch'

import './colorPicker.css'
const ColorPicker = ({ propsName, show }) => {
  const [color, setColor] = React.useState({});
  const [firstLoad, setFirstLoad] = useState(false)
  const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=update_background_color')
  const [resTitleColor, doFetchTitleColor] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=update_title_background')
  const [state, changeState, setState, catalogId] = useContext(Context)
  console.log(state[propsName])
  useEffect(() => {
    if (!firstLoad) return

  }, [firstLoad])

  const fileChange = evt => {
    console.log('change', state, propsName, state[propsName])
    if (typeof evt !== 'object') {
      return
    }
    if (state[propsName] == evt.hex) return
    /*     if (state[propsName] === undefined) return */
    console.log('first', state[propsName], evt.hex)
    if (propsName === 'backgroundColor') {
      const color = evt.hex.slice(1, -2)
      const formData = new FormData()
      setColor(color)
      formData.set('background', color)
      formData.set('catalog_id', catalogId)
      doFetch(formData)
    }
    if (propsName === 'titleBackground') {
      console.log('colorTopTitle')
      const color = '#' + evt.hex.slice(1, -2)
      setColor(color)
      const formData = new FormData()
      formData.set('background', color)
      formData.set('catalog_id', catalogId)
      doFetchTitleColor(formData)
    }

  }
  useEffect(() => {
    if (!resTitleColor) return
    console.log(color)
    changeState({ titleBackground: color })
    console.log()

  }, [resTitleColor])

  useEffect(() => {
    if (!response) return
    console.log(color)
    changeState({ backgroundColor: color })
    console.log(InputColor)
  }, [response])


  return (
    <div onClick={(evt) => {console.log(evt)}}>
      <InputColor
        initialValue={state[propsName] || "#5e72e4"}
        onChange={fileChange}
        placement="right"
        
      />
    </div>
  );
}
export default ColorPicker