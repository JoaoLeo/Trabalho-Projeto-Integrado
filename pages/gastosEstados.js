import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import apiDeputados from '@/services/apiDeputados';
import GlobalStyle from "@/styles/global";
import { BsCalendarFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import apiLocalidades from '@/services/apiLocalidades';
import { MapBrazil } from 'react-brazil-map';

/*
PEDRO
Página com select para selecionar o estado e mostrar os deputados que mais gastam. 
Dados necessários: Gastos dos deputados, estados dos deputados

*/

const gastosEstados = () => {
  const [dados, setDadosGeograficos] = useState([])
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const { register, handleSubmit,setValue, formState : { errors } } = useForm();
  
  function gastosEstados(){
    apiDeputados.get("/deputados?&siglaUf="+estadoSelecionado).then(async res =>{  
      const lista = res.data.dados      
      lista.forEach(dep => {
        apiDeputados.get(`/deputados/${dep.id}/despesas?ano=${ano}`)
      });  
    })
  }
  useEffect(() => {
    apiLocalidades.get('localidades/estados?orderBy=nome').then(res => {
        setDadosGeograficos(res.data);
        console.log(res.data)
    })
    
}, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        <Row >
          <Form> 
          <Col md='8'>
          <MapBrazil bg='#198754' fill='#0000FF' width={500} height={500} onChange={setEstadoSelecionado} />
          <hr/>
          <h3> Estado Selecionado {estadoSelecionado}</h3>
          </Col>
          <Col md='4'>
            <Form.Group as={Col} controlId="nome">
              <Form.Label> <BsCalendarFill /> <strong>Digite um ano</strong>  </Form.Label>
              <Form.Control type="text" placeholder="Ex.: 2020" {...register('ano', {required: true} )} />
            </Form.Group>
            <br></br>
            <Button variant="success"  className='me-2'>
              Descubra
            </Button>
          </Col>
          </Form>
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

