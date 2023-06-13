import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav} from 'react-bootstrap'
import { BsGraphUp, BsCashCoin, BsFillDatabaseFill } from 'react-icons/bs'
import { FaUserTie } from 'react-icons/fa'

const Cabecalho = () => {
  return (
  <> 
    <Navbar bg="success" className='mb-4' variant="success">
    <Container>
      <Navbar.Brand href="/"> <BsFillDatabaseFill/> API Deputados</Navbar.Brand>
      <Nav className="me-auto">
      <Nav.Link href="/"> <FaUserTie/> Deputados</Nav.Link>
        <Nav.Link href="/gastosEstados"> <BsCashCoin/> Gastos por estado</Nav.Link>
        <Nav.Link href="/analiseGastos"> <BsGraphUp/> Análise de gastos</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  </>
  )
}

export default Cabecalho