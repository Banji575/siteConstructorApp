import React, {createContext, useState} from 'react'
import Popap from './../components/Popap/Popap'

const PopapContext = React.createContext({
    open:'close',
    title: 'Привет мир', 
    classModal: 'modal fade show',
    content: 'vasy'
});

export default PopapContext;