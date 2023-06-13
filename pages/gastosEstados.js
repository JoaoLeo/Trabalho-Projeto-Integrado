import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Mapa from '@/components/Mapa';
import apiDeputados from '@/services/apiDeputados';
import GlobalStyle from "@/styles/global";
import { BsCalendarFill } from 'react-icons/bs';
/*
PEDRO
Página com select para selecionar o estado e mostrar os deputados que mais gastam. 
Dados necessários: Gastos dos deputados, estados dos deputados

*/

const gastosEstados = () => {


  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        <h1>
          Gatos por estado
        </h1>
        <hr></hr>
        <Row >
          <Col md='8'>
            <Mapa />
          </Col>
          <Col md='4'>
            <p>
              Digite um ano e clique em um estado para saber os top 10 deputados que mais gastaram no estado, ou apenas um ano para saber quais deputados mais gastaram.
            </p>

            <Form.Group as={Col} controlId="nome">
              <Form.Label> <BsCalendarFill /> <strong>Digite um ano</strong>  </Form.Label>
              <Form.Control type="text" placeholder="Ex.: 2020" />
            </Form.Group>
            <br></br>
            <Button variant="success" className='me-2'>
              Descubra
            </Button>
          </Col>
        </Row>



      </Container>
      <Footer />
    </>


  )
}

export default gastosEstados

export async function getServerSideProps(context) {
  const resultado = await apiDeputados.get("/deputados")
  const deputados = resultado.data.dados
  return {
    props: {
      deputados
    },
  }
}

