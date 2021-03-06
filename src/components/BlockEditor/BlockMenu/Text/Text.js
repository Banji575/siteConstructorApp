import React, { useContext, useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ContextEditor from '../../../../ContextEditor'
import Context from '../../../../Context'
import useFetch from '../../../../hooks/useFetch'
//import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'

import './text.css'
import Body from '../../../../HOC/SiteBody'
const randomId = () => Math.random()
/* console.log(ClassicEditor.builtinPlugins.map(plugin => plugin.pluginName)); */
const Text = ({ content, closeEdit, vidjArr, setVidjetData ,replaceVidj}) => {
    const [state, changeState, setState, catalogId] = useContext(Context)
    const [setCurrentWidjet, setIsEditer] = useContext(ContextEditor)
    const [textContent, setTextContent] = useState(content || { id: randomId(), title: '', description: '' })
    const [respEditText, doFetchEditText] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=set_landing_prop_data')

    const closeWindow = () => {
        if (closeEdit) {
            closeEdit()
        } else
            setCurrentWidjet(null)
    }


    const saveList = () => {
        const formData = new FormData()
        formData.set('landing_prop_id', 4)
        formData.set('catalog_id', catalogId)
        formData.set('title', textContent.title)
        formData.set('description', textContent.description)
        if (content) {
            formData.set('landing_prop_data_id', content.id)
        } else {
            console.log('new')
        }
        doFetchEditText(formData)
    }

    useEffect(() => {
        if (!respEditText) {
            return
        }
        if (respEditText.success === 'Успешно!') {
            closeWindow()
            const list = [...vidjArr]
            if (content) {
                list.map(el => {
                    if (!el) {
                        return
                    }
                    if (el.id === content.id) {
                        console.log(el.id, content.id, el)
                        const newBody = { id: String(content.id), title: textContent.title, discription: textContent.description }
                        el.body = newBody
                        return el
                    }
                })

                console.log(list)
            } else {
                const id = respEditText.landing_prop_data_id;
                const newObj = {
                    title: "text", id, body: {
                        discription: textContent.description,
                        id,
                        title: textContent.title
                    }
                }
                list.push(newObj)
            }
            setVidjetData(list)

        }
    }, [respEditText])

    const changeTitleHandler = evt => {
        const title = evt.target.value
        setTextContent(state => {
            return {
                ...state,
                title
            }
        })
    }

    const changeTextHandler = editor => {
        const description = editor.getData()
        console.log(description)
        setTextContent(state => {
            return {
                ...state,
                description
            }
        })
    }

    return (
        <div className='block-question-conteiner'>
            <div className='block-menu-header'>
                <h3>Текст</h3>
                <div onClick={closeWindow} className='block-header-close'></div>
            </div>
            <div className='text-title-conteiner  py-1 px-3'>
                <h3 className='text-item-header'>Заголовок</h3>
                <textarea onBlur={(evt) => changeTitleHandler(evt)} className='w-100' placeholder={content ? content.title : ''} />
            </div>
            <div className='text-body-conteiner py-1 px-3'>
                <h3 className='text-item-header'>Текст</h3>
                <CKEditor
                    editor={ClassicEditor}
                    data={content ? content.discription : ''}
                    config={{
                        toolbar: {
                            items: [
                                'fontfamily', 'fontsize', '|',
                                'alignment', '|',
                                'fontColor', 'fontBackgroundColor', '|',
                                'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                                'insertTable', '|',
                                'imageUpload', 'blockQuote', '|',
                                'undo', 'redo'
                            ],
                            shouldNotGroupWhenFull: true
                        }
                    }}
                    onBlur={(event, editor) => changeTextHandler(editor)}
                />
            </div>
            <div className='block-question-save'><p onClick={saveList} className='block-question-button-save'>Сохранить</p></div>
        </div>
    )
}

export default Text