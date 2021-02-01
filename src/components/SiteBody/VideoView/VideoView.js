import {useState, useEffect, useContext} from 'react';
import useFetch from './../../../hooks/useFetch'
import ReadPanel from './../../SiteBody/ReadPanel/ReadPanel'
import PopapContext  from './../../../Context/ContextPopap'
import Video from './../../../components/BlockEditor/BlockMenu/Video/Video'
import YouTubeLink from './../../../scripts/YouTubeLink'
import ContextEditor from './../../../ContextEditor'

export const VideoView = (props) => {
    const [setCurrentWidjet, setIsEditer, setVidjetData, vidjArr] = useContext(ContextEditor)

    const {setModalContent, setTitleModal, setClassModal, setOpenModal} = useContext(PopapContext)
    const [respDelVideo, doFetchDelVideo] = useFetch('https://cloudsgoods.com/api/CatalogController.php?mode=delete_catalog_landing_prop_data')
    let data = props.body || null;
    const deleteVideo = () => {
        if(!data) return;
        let forma = new FormData();
        forma.set('landing_prop_id', data.landing_prop_id)
        forma.set('catalog_id', data.catalog_id)
        forma.set('landing_prop_data_id', data.id)
        doFetchDelVideo(forma)
    }

    const vl = new YouTubeLink(props.body.video_link);

    // ОБНОВЛЕНИЕ ВСЕГО СПИСКА 
    const reloadWidgetList = () => {
        const list = [...vidjArr]
        list.map((el, i) => {
            if (!el) return
            if (el.id === data.id) {
                console.log(el, data.id)
                list.splice(i, 1)
            }
        })
        setVidjetData(list)
    }
    // Модалка при удалении
    useEffect(() => {
        if(!respDelVideo) return
        if(respDelVideo) {
            setTitleModal('Успешно удалено!')
            reloadWidgetList()
        } else {
            setTitleModal('Ошибка при удалении!')
        }
        
        setModalContent('')
        setOpenModal('open')

    }, [respDelVideo]) 
    return (
        <div className="container">
        <ReadPanel 
            onClickDelete  ={() => {
                deleteVideo()
            }}

            data={props.body}

            onClickEddit={()=> {
                setOpenModal('open')
                setTitleModal(`Редактирование видео с ID ${props.id}`)
                setModalContent(<Video id={props.id} title={props.body.title} video_link={props.body.video_link} data={props.body}/>)
            }}
        />
        {vl.getVideoLink() && <iframe width="100%" height="600" src={vl.getVideoLink()} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>}
        </div>
    )   
}
export default VideoView;