import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav} from 'react-bootstrap'

const Cabecalho = () => {
  return (
  <> 
    <Navbar bg="success" className='mb-4' variant="success">
    <Container>
      <Navbar.Brand href="/">API Deputados</Navbar.Brand>
      <Nav className="me-auto">
      <Nav.Link href="/">Deputados</Nav.Link>
        <Nav.Link href="/gastosEstados">Gastos por estados</Nav.Link>
        <Nav.Link href="/analiseGastos">Análise de gastos</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  </>
  )
}

export default Cabecalho