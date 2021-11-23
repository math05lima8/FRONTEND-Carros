import React, { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'
import Modal from 'react-bootstrap/Modal'

import Cabecalho from '../components/Cabecalho'
import Rodape from '../components/Rodape'

import { GiSteeringWheel } from "react-icons/gi"
import { MdModeEdit, MdDelete, MdSave, MdList } from 'react-icons/md'

import {BACKEND} from '../constants'

const Carros = () => {
    const valorInicial = {modelo: '', ano: '', cor: '', fabricante: '', preco: ''}
    const [carro, setCarro] = useState(valorInicial)
    const [carros, setCarros] = useState([])
    const [carregandoCarros, setCarregandoCarros] = useState(false)
    const [erros, setErros] = useState({})
    const [salvandoCarros, setSalvandoCarros] = useState(false)
    const [aviso, setAviso] = useState('')
    const [confirmaExclusao, setConfirmaExclusao] = useState(false)

    const { modelo, ano, cor, fabricante, preco } = carro
    
    async function obterCarros(){
        setCarregandoCarros(true)
        let url = `${BACKEND}/carros`
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setCarros(data)
        })
        .catch(function(error){
            console.error('Erro ao obter os carros: ' + error.message)
        })
        setCarregandoCarros(false)
    }

    useEffect(() => {
        obterCarros()
        document.title = 'Cadastro de Carros'
    }, [])

    const validaErrosCarro = () => {
        const novosErros = {}

  
        if (!modelo || modelo === '') novosErros.modelo = 'O campo Modelo não pode estar vázio'     

        if (isNaN(parseInt(ano))) novosErros.ano = 'O ano do veículo deve ser um número!'

        if (ano.length > 4) novosErros.ano = 'O ano do veículo é inválido'

        if (!cor || cor === '') novosErros.cor = 'O campo Cor não pode estar vázio'
        
        if (!fabricante || fabricante === '') novosErros.fabricante = 'O campo Fabricante não pode estar vázio'

        if (isNaN(parseFloat(preco))) novosErros.preco = 'O Preço do veículo deve ser um número!'



        return novosErros
    }

    async function salvarCarro(event){
        event.preventDefault() // evita que a página seja recarregada

        const novosErros = validaErrosCarro()
        if (Object.keys(novosErros).length > 0){
            // Sim, temos erros!
            setErros(novosErros)
        } else {
            setSalvandoCarros(true)
                const metodo = carro.hasOwnProperty('_id') ? 'PUT' : 'POST'
                let url = `${BACKEND}/carros`
                await fetch (url, {
                    method: metodo,
                    headers: {
                        Accept: 'appliction/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(carro)
                }) .then(response => response.json())
                .then(data => {
                    (data._id || data.message) ? setAviso('Registro salvo com sucesso!') : setAviso('')
                    setCarro(valorInicial) // Limpar a tela com os valores iniciais
                    obterCarros() // Atualizar a tela com os registros atualizados
                }) .catch(function (error){
                    console.error(`Erro ao salvar o carro: ${error.message}`)
                })
                setSalvandoCarros(false)
        }
    }

    async function excluirCarro(){
        let url = `${BACKEND}/carros/${carro._id}`
        await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }) .then(response => response.json())
        .then(data => {
            data.message ? setAviso(data.message) : setAviso('')
            obterCarros()
        })
        .catch(function (error) {
            console.error(`Erro ao excluir o carro: ${error.message}`)
        })
    }

    const alteraDadosCarro = e => {
        setCarro({...carro, [e.target.name]: e.target.value})
        setErros({})
    }

    return (
        <Container fluid className="p-0">
            <Cabecalho/>
            &nbsp;
            <Row className="p-3">
                <Col xs={12} lg={6}>
                    {/* Formulário de Carros */}
                    <h4><GiSteeringWheel/> Cadastro dos Carros</h4>
                    &nbsp;
                    <Form method="post">

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="modelo">
                            <Form.Label>Modelo do Carro</Form.Label>
                            <Form.Control name="modelo" placeholder="Ex: Brasília" value={modelo} onChange={alteraDadosCarro} isInvalid={!!erros.modelo}/>
                                <Form.Control.Feedback type='invalid'>
                                    {erros.modelo}
                                </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="ano">
                            <Form.Label>Ano do Carro</Form.Label>
                            <Form.Control name="ano" placeholder="Ex: 2012" value={ano} onChange={alteraDadosCarro} isInvalid={!!erros.ano}/>
                                <Form.Control.Feedback type='invalid'>
                                    {erros.ano}
                                </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="cor">
                            <Form.Label>Cor do Carro</Form.Label>
                            <Form.Control name="cor" placeholder="Ex: Verde" value={cor} onChange={alteraDadosCarro} isInvalid={!!erros.cor}/>
                                <Form.Control.Feedback type='invalid'>
                                    {erros.cor}
                                </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="fabricante">
                            <Form.Label>Fabricante do Carro</Form.Label>
                            <Form.Control name="fabricante" placeholder="Ex: Volkswagen" value={fabricante} onChange={alteraDadosCarro} isInvalid={!!erros.fabricante}/>
                                <Form.Control.Feedback type='invalid'>
                                    {erros.fabricante}
                                </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Form.Group as={Col} controlId="preco">
                            <Form.Label>Preco do Carro</Form.Label>
                            <Form.Control name="preco" placeholder="Ex: 5000" value={preco} onChange={alteraDadosCarro} isInvalid={!!erros.preco}/>
                                <Form.Control.Feedback type='invalid'>
                                    {erros.preco}
                                </Form.Control.Feedback>
                        </Form.Group>
                        &nbsp;
                        <Row>
                            &nbsp;
                            </Row>
                        <Button variant="dark" type="submit" 
                            title="Salvar o registro" onClick={(e) => salvarCarro(e)}>
                            {salvandoCarros
                                ? <><Spinner animation="border" variant="dark" size="sm"/> Aguarde...</>
                                : <><MdSave/> Salvar</>
                            }
                        </Button>
                    </Form>
                </Col>
                <Col xs={12} lg={6}>
                    {/* Listagem de Carros */}
                    <h4><MdList/> Listagem dos Carros</h4>
                    &nbsp;
                    {carregandoCarros &&
                    <>
                    <Spinner animation="grow" variant="dark"/>
                    <p>Aguarde enquanto os carros são recarregados...</p>
                    </>}
                    <Table striped bordered>
                        <thead>
                            <tr className="bg-dark text-light">
                                <th>Modelo</th>
                                <th>Ano</th>
                                <th>Cor</th>
                                <th>Fabricante</th>
                                <th>Preço</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carros.map(item => (
                                <tr key={item._id}>
                                    <td>{item.modelo}</td>
                                    <td>{item.ano}</td>
                                    <td>{item.cor}</td>
                                    <td>{item.fabricante}</td>
                                    <td>R${new Number(item.preco).toLocaleString()}</td>
                                    <td>
                                        <Button variant="dark" title="Editar o registro"
                                        onClick={() => setCarro(item)}><MdModeEdit/></Button>
                                        &nbsp;
                                        <Button variant="dark" title="Excluir o registro"
                                        onClick={() => {
                                            setConfirmaExclusao(true)
                                            setCarro(item)
                                        }}><MdDelete/></Button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-dark text-light">
                                <td colSpan="6">Total de Registros:</td>
                                <td>{carros.length}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Toast
                onClose={() => setAviso('')}
                show={aviso.length > 0}
                animation={false}
                delay={4000}
                autohide
                className="bg-light"
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10
                }}>
                <Toast.Header closeButton={false}>Aviso</Toast.Header>
                <Toast.Body>{aviso}</Toast.Body>
            </Toast>
            <Modal animation={false} show={confirmaExclusao}
                onHide={() => setConfirmaExclusao(false)}>
                <Modal.Header>
                    <Modal.Title>Confirmação da Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Confirma a exclusão do carro selecionado?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => setConfirmaExclusao(!confirmaExclusao)}>
                        ❌Cancelar
                    </Button>
                    <Button variant="dark" onClick={() => {
                            excluirCarro()
                            setConfirmaExclusao(!confirmaExclusao)
                        }}>
                        ✅Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Rodape/>
        </Container>
    )
}

export default Carros