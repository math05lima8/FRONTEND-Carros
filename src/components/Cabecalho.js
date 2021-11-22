import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { GiCarWheel } from "react-icons/gi"
import { IoCarSport, IoHome } from "react-icons/io5"

const Cabecalho = () => {
    return (
    <Navbar className="p-3" bg="dark" variant="dark">
        <Navbar.Brand><IoCarSport/> CarTown</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="#/"><IoHome/> Início</Nav.Link>
            <Nav.Link href="#/carros"><GiCarWheel/> Carros</Nav.Link>
        </Nav>
    </Navbar>
    )
}

export default Cabecalho