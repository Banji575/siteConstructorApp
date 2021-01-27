import React, { useContext,useEffect } from 'react';
import InputColor from 'react-input-color';
import Context from '../../../Context';
import useFetch from '../../../hooks/useFetch'
import './colorPicker.css'
const ColorPicker = ({propsName}) => {
  const [color, setColor] = React.useState({});
  const [state, changeState] = useContext(Context)

  const [response, doFetch] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=update_background_color')

  const fileChange = evt => {
    if(typeof evt !== 'object'){
      return
    }
      const color = evt.hex.slice(1, -2)
      const formData = new FormData()
      formData.set('background', color)
      formData.set('catalog_id', 2)
      doFetch(formData)

  }
  useEffect(() => {
      if (response) {
         /*  changeState({ backgroundColor: color }) */
      }
  }, [response])


  return (
    <div>
      <InputColor
        initialValue= {state[propsName] || "#5e72e4"}
        onChange={fileChange}
        placement="right"
      />
    </div>
  );
}
export default ColorPicker