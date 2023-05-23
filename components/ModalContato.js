import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { IoMdContact } from 'react-icons/io';


const ModalContato = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [contatos, setContatos] = useState({
    github: "",
    email: "",
    telefone: ""
  })
  return (
    <>
      <div>
        <span onClick={() => {
          contatos.github = <a href="https://github.com/JoaoLeo" target="_blank"> JoaoLeo </a>
          contatos.email = "joaoleonardo9921@gmail.com"
          contatos.telefone = "(61)99889178"
          setContatos(contatos)
          handleShow()
        }}>
          <Button variant="success" ><IoMdContact/> João Leonardo</Button>
        </span>
        <span onClick={() => {
          contatos.github = <a href="https://github.com/wolacii" target="_blank"> wolacii</a>
          contatos.email = "Jonathan.Oliver767@gmail.com"
          contatos.telefone = "(61)986447252"
          setContatos(contatos)
          handleShow()
        }}>
          <Button variant="success" ><IoMdContact/> Jonathan Oliveira</Button>
        </span>
        <span onClick={() => {
          contatos.github = <a href="https://github.com/M1guelSantos" target="_blank"> M1guelSantos</a>
          contatos.email = "migueldossantos096@gmail.com"
          contatos.telefone = "(61)981745308"
          setContatos(contatos)
          handleShow()
        }}>
          <Button variant="success" ><IoMdContact/> Miguel dos Santos</Button>
        </span>
        <span onClick={() => {
          contatos.github = <a href="https://github.com/pedroooluiz" target="_blank">Pedro Luiz</a>
          contatos.email = "pedroluizrodrigues337@gmail.com"
          contatos.telefone = "(61)998505826"
          setContatos(contatos)
          handleShow()
        }}>
          <Button variant="success" ><IoMdContact/> Pedro Luiz</Button>
        </span>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Contatos
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5> Github: {contatos.github} </h5>
            <h5> Email: {contatos.email} </h5>
            <h5> Telefone: {contatos.telefone} </h5>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default ModalContato;