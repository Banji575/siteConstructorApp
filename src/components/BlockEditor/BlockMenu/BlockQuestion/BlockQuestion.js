import React, { useContext, useState } from 'react'
import ContextEditor from '../../../../ContextEditor'
import './blockQuestion.css'
import QuestionItem from './QuestionItem/QuestionItem'
import PopUp from '../../../../UI/PopUp/PopUp'


const randomId = () => Math.random()
const BlockQueston = ({ changeStateVidjet, listArr, id, setViewEdit }) => {
    const mockQuest = [{ id: 1, question: 'test queston', answer: 'test answer' }]

    const [temporaryId, setTemporaryId] = useState('1')
    const [questonsList, setQuestionList] = useState(listArr ? listArr : [{ id: randomId(), answer: '', question: '' }])

    const [setCurrentWidjet, setIsEditer] = useContext(ContextEditor)
    const [tempoparyList, setTemoraryList] = useState(questonsList)
    const [isMoreOne, setIsMoreOne] = useState(() => questonsList.length > 1 ? true : false)



    const onBlackAnswer = () => {
        const list = [...questonsList]
        list.push({ id: randomId(), answer: '', question: '' })
        setQuestionList(list)
    }

    const closeWindow = () => {
        if (id && setViewEdit) {
            setViewEdit(false)
        } else {
            setCurrentWidjet(null)
        }
    }

    const saveList = () => {
        if (id) {
            console.log(changeStateVidjet)
            console.log('asl;fjdaslfkjdafjs')
        }
        const list = [...questonsList]
        setQuestionList(list)
        changeStateVidjet({ questions: list })
        setCurrentWidjet(null)
        console.log('addNewVidjets')
    }

    const saveInTemporary = ({ id, answer, question }) => {

        const newList = [...questonsList]
        console.log(newList)
        newList.map(el => {
            console.log(el.id === id)
            if (el.id === id) {
                el.question = question
                el.answer = answer
            }


        })
        setQuestionList(newList)

    }

    const deleteItem = (id) => {
        const list = [...questonsList]
        list.forEach((el, i) => {
            if (el.id === id) {
                list.splice(i, 1)
                console.log(el)
            }
        })
        setQuestionList(list)
        console.log(questonsList, id)
    }

    return (
        <PopUp title="Карусель картинок" closePopup={closeWindow} saveHandler={() => saveList()}>
                {questonsList.map((el, i) => {

                    return <QuestionItem
                        index={i}
                        questCount={questonsList.length}
                        key={i}
                        propsAnswer={el.answer ? el.answer : ''}
                        propsQuestion={el.question ? el.question : ''}
                        id={el.id || 1}
                        saveInTemporary={saveInTemporary}
                        deleteItem={deleteItem}
                    />
                })}

                <button onClick={onBlackAnswer} className='block-question-button-add'>+Добавить новый вопрос</button>
                {/* <div className='block-question-save'><p onClick={saveList} className='block-question-button-save'>Сохранить</p></div> */}
        </PopUp>
    )
}
export default BlockQueston