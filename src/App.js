import React, { useEffect, useState, useContext } from 'react'

import ViewSetting from './components/ViewSetting/ViewSetting';
import Body from './HOC/SiteBody'
import Context from './Context'
import SiteHeader from './components/SiteHeader/SiteHeader'
import './App.css'
import MenuCreation from './components/MenuCreation/MenuCreation';
import useFetch from './hooks/useFetch'
import Adapter from './scripts/Adapter';
import BlockEditor from './components/BlockEditor/BlockEditor';
import SiteBody from './components/SiteBody/SiteBody';
import Popap from './components/Popap/Popap'
import PopapContext  from './Context/ContextPopap'
import ContextEditor from './ContextEditor'

const catalogId = 1118


function App() {
  const [response, doFetch] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog&catalog_id=${catalogId}`)
  const [responseVidjetData, doFetchVidjetData] = useFetch(`https://cloudsgoods.com/api/CatalogController.php?mode=get_catalog_landing_props_data_in_catalog&catalog_id=${catalogId}`)
  const [dataLoading, setDataLoading] = useState(false)
  const [vidjecLoading, setVidjetLoading] = useState(false)
  const [stateApp, setStateApp] = useState('')
  const [vidjetData, setVidjetData] = useState(null)
  
  /**  ЛОГИКА ДЛЯ РАБОТЫ С МОДАЛЬНЫМ ОКНОМ */
    const a = {
      open: 'modal fade show d-block', 
      close: 'modal fade d-none'
    }
    const contextModal = useContext(PopapContext);
    const [modalContent, setModalContent] = useState(contextModal.content);
    const [titleModal, setTitleModal] = useState(contextModal.title);
    const [classModal, setClassModal] = useState(contextModal.classModal);
    const [openModal, setOpenModal] = useState(contextModal.open);
    const [saveModal, setSaveModal] = useState(contextModal.saveModal)
    useEffect(() => {
      setClassModal(a[openModal])
    }, [openModal])
  // ------------------- КОНЕЦ --------------- // 

  // KONTEXT EDITOR
    const [isEditer, setIsEditer] = useState(true)
    const [currentWidjet, setCurrentWidjet] = useState(null)

  useEffect(() => {
    doFetch()
    console.log('contextModal',contextModal)
  }, [])

  useEffect(() => {
    doFetchVidjetData()
  }, [])

  useEffect(() => {
    if (!responseVidjetData) return
    setVidjetLoading(true)
    const adapter = new Adapter(responseVidjetData)
    const data = adapter.createVidjetData()
    setVidjetData(data)
    console.log(data)
  }, [responseVidjetData])

  useEffect(() => {
    if (!response && !dataLoading) return
    setDataLoading(true)
    setStateApp(response)
  }, [response])

  useEffect(() => {
    if (!response && !responseVidjetData) return
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

  useEffect(() => {
    console.log('openModal', openModal)
  }, [openModal])
  return !dataLoading ?
    (<div className='d-flex h-100' ><div class="spinner-border mx-auto my-auto" role="status">
      <span class="sr-only ">Loading...</span>
    </div></div>)
    :
    (
      <PopapContext.Provider value = {{setModalContent, setTitleModal, setClassModal, setOpenModal, setSaveModal}}>
        <Context.Provider value={[state, changeState, setState, catalogId, setVidjetData, vidjetData]}>
        <ContextEditor.Provider value = {[setCurrentWidjet, setIsEditer,setVidjetData, vidjetData]}>
            <div className="app">
              <ViewSetting />
              <SiteHeader />
              <Body background={state.backgroundColor}>
                <MenuCreation />
                <BlockEditor setVidjetData={setVidjetData} vidjArr={vidjetData} />
                {<SiteBody replaceVidj={replaceVidj} setVidjetData={setVidjetData} vidjArr={vidjetData} />}

              </Body>
            </div>
        
        <Popap 
        
            title={titleModal} 
            open={openModal} 
            className={classModal} 
            onClose={() => setOpenModal('close')}
            saveChanges= {() => saveModal}
        >
        {modalContent}
        </Popap>
        </ContextEditor.Provider>
        </Context.Provider>
      </PopapContext.Provider>
        
    );
}

export default App;
