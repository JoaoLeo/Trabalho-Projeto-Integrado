import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';

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
      <div className='text-black'>
        <span variant="primary" onClick={()=>{
          contatos.github = <a href="https://github.com/JoaoLeo" target="_blank"> JoaoLeo </a>
          contatos.email = "joaoleonardo9921@gmail.com"
          contatos.telefone = "(61)99889178"
          setContatos(contatos)
          handleShow()
        }}>
        &bull; João Leonardo
        </span>
        <span variant="primary" onClick={() =>{
           contatos.github = <a href="https://github.com/wolacii" target="_blank"> wolacii</a>
           contatos.email = "Jonathan.Oliver767@gmail.com"
           contatos.telefone = "(61)986447252"
           setContatos(contatos)
           handleShow()
        }}>
        &bull;Jonathan Oliveira
        </span>
        <span variant="primary" onClick={() =>{
           contatos.github = <a href="https://github.com/M1guelSantos" target="_blank"> M1guelSantos</a>
           contatos.email = "migueldossantos096@gmail.com"
           contatos.telefone = "(61)981745308"
           setContatos(contatos)
           handleShow()
        }}>
        &bull; Miguel dos Santos
        </span>
        <span variant="primary" onClick={()=>{
          contatos.github = <a href="https://github.com/pedroooluiz" target="_blank">Pedro Luiz</a>
          contatos.email = "pedroluizrodrigues337@gmail.com"
          contatos.telefone = "(61)998505826"
          setContatos(contatos)
          handleShow()
        }}>
         &bull;Pedro Luiz
        </span>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Contatos</Modal.Title>
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