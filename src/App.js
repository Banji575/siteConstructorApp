import React, { useEffect, useState } from 'react'
import ViewSetting from './components/ViewSetting/ViewSetting';
import Body from './HOC/SiteBody'
import Context from './Context'
import SiteHeader from './components/SiteHeader/SiteHeader'
import './app.css'
import MenuCreation from './components/MenuCreation/MenuCreation';
import useFetch from './hooks/useFetch'
import Adapter from './scripts/Adapter';
import BlockEditor from './components/BlockEditor/BlockEditor';
import SiteBody from './components/SiteBody/SiteBody';
const catalogId = 1118

function App() {
  const [response, doFetch] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog&catalog_id=${catalogId}`)
  const [responseVidjetData, doFetchVidjetData] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog_landing_props_data_in_catalog&catalog_id=${catalogId}`)
  const [dataLoading, setDataLoading] = useState(false)
  const [vidjecLoading, setVidjetLoading] = useState(false)
  const [stateApp, setStateApp] = useState('')
  const [vidjetData, setVidjetData] = useState(null)
  const [mobileMenuIsOpen, setMobilemenuIsOpen] = useState(true)

  useEffect(() => {
    doFetch()
  }, [])

  useEffect(() => {
    doFetchVidjetData()
  }, [])

  useEffect(() => {
    if (!responseVidjetData) {
      return
    }
    setVidjetLoading(true)
    const adapter = new Adapter(responseVidjetData)
    const data = adapter.createVidjetData()
    setVidjetData(data)
    console.log(data)
  }, [responseVidjetData])

  useEffect(() => {
    if (!response && !dataLoading) {
      return
    }
    setDataLoading(true)
    setStateApp(response)
  }, [response])

  useEffect(() => {
    if (!response && !responseVidjetData) {
      return
    }
    const adapter = new Adapter(response, responseVidjetData)
    const data = adapter.createData()

    setState(data)

  }, [response])

  const [state, setState] = useState('')

  //перемещение виджета

  const replaceVidj = (direction, id) => {
    const list = [...vidjetData]

    list.forEach((el, i) => {
      if (!el) return

      if (el.id == id) {
        direction === 'up' ? [list[i], list[i-1]] = [list[i-1], list[i]] :  [list[i], list[i+1]] = [list[i+1], list[i]]
      }
    })
    console.log(list)
    setVidjetData(list)
  }

   // Для Header сайта
  const changeState = (props) => {
    if (typeof props === 'object') {
      const propsName = Object.keys(props)[0]
      const newState = { ...state }
      newState[propsName] = props[propsName]
      setState(newState)

    }
    switch (props) {
      case 'checked':
        const verticalMenu = !state.verticalMenu
        const newState = { ...state, verticalMenu }
        setState(newState)
        break
      default:
        break
    }
  }

  return !dataLoading ?
    (<div className='d-flex h-100' ><div class="spinner-border mx-auto my-auto" role="status">
      <span class="sr-only ">Loading...</span>
    </div></div>)
    :
    (<Context.Provider value={[state, changeState, setState, catalogId, setVidjetData, vidjetData]}>
      <div className="app">
        <ViewSetting />
        <SiteHeader changeViewMenu = {setMobilemenuIsOpen} />
        <Body state={state}>
          <MenuCreation menuIsView = {mobileMenuIsOpen} />
          <div>
          {vidjetData ? <SiteBody replaceVidj={replaceVidj} setVidjetData={setVidjetData} vidjArr={vidjetData} /> : null}
          <BlockEditor setVidjetData={setVidjetData} vidjArr={vidjetData} />
          </div>
        
        </Body>
      </div>
    </Context.Provider>
    );
}

export default App;
