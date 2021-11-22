import React, {useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Cabecalho from '../components/Cabecalho'
import Rodape from '../components/Rodape'

const Inicio = () => {
    return (
        <Container fluid className="p-0">
            <Cabecalho/>
            <Row>
                <Col xs={12} lg={6}>
                    <h1>Bem Vindo!</h1>
                    <p>Esta é a página de início do aplicativo CarTown.</p>
                    <p>Manipule a lista de carros por meio de cadastro, exclusão e edição de veískdfculos através do menu acima.</p>
                </Col>
            </Row>
            <Rodape/>
        </Container>
    )
}

export default Inicio