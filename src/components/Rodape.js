import React from 'react'

import { Navbar, NavbarBrand } from 'react-bootstrap'

import { IoCarSport } from "react-icons/io5"

const Rodape = () => {
    return (
        <Navbar className="p-3" bg="danger" fixed="bottom">
            <NavbarBrand className="text-light">
                <IoCarSport/> CarTown &copy; - Todos os direitos reservados
            </NavbarBrand>
        </Navbar>
    )
}

export default Rodape