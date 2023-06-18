import React, { useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap';
import { IoMdContact } from 'react-icons/io';


const ModalDiscurso = ({titulo, texto}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
      <Table striped bordered hover>
      <tbody>
        <tr>
          <td onClick={()=> setShow(true)} style={{fontSize: '15px'}} >{titulo}</td>
        </tr>
      </tbody>
    </Table>
      <hr/>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Discurso: {titulo}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{texto}</p>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default ModalDiscurso;