import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Inicio from '../pages/Inicio'
import Carros from '../pages/Carros'

export default function Rotas(){
    return (
        <HashRouter>
            <Routes>
                <Route exact path='/' element={<Inicio/>} />
                <Route exact path='/carros' element={<Carros/>} /> 
            </Routes>
        </HashRouter>
    )
}