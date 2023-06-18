import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Form, Button, Alert, Card, Image } from 'react-bootstrap'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import apiDeputados from '@/services/apiDeputados';
import GlobalStyle from "@/styles/global";
import { BsCalendarFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import apiLocalidades from '@/services/apiLocalidades';
import { MapBrazil } from 'react-brazil-map';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

/*
PEDRO
Página com select para selecionar o estado e mostrar os deputados que mais gastam. 
Dados necessários: Gastos dos deputados, estados dos deputados

*/

const gastosEstados = () => {
  const [dados, setDadosGeograficos] = useState([])
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const { register, handleSubmit,setValue, formState : { errors } } = useForm();
  const [alert, setAlert] = useState(false);
  const [top10, setTop10] = useState([])

  const meses = [
    {value:'1', label: '1'}, {value:'2', label: '2'}, {value:'3', label: '3'}, {value:'4', label: '4'},
    {value:'5', label: '5'}, {value:'6', label: '6'}, {value:'7', label: '7'}, {value:'8', label: '8'},
    {value:'9', label: '9'}, {value:'10', label: '10'}, {value:'11', label: '11'}, {value:'12', label: '12'},
  
]

async function gastosEstados(dados) {
  if (!estadoSelecionado) {
    setAlert(true);
    return;
  }

  const despesasPorDeputado = {};

  try {
    const responseDeputados = await apiDeputados.get(`/deputados?siglaUf=${estadoSelecionado}&itens=10`);
    const lista = responseDeputados.data.dados;

    for (const deputado of lista) {
      const idDeputado = deputado.id;

      const responseDespesas = await apiDeputados.get(`/deputados/${idDeputado}/despesas`, {
        params: {
          ano: dados.ano,
          mes: dados.mes,
        },
      });
      const despesasDeputado = responseDespesas.data.dados;
      despesasPorDeputado[idDeputado] = despesasDeputado.reduce((total, despesa) => total + despesa.valorLiquido, 0);
    }

    const top10DeputadosIds = Object.keys(despesasPorDeputado)
      .sort((a, b) => despesasPorDeputado[b] - despesasPorDeputado[a])
      .slice(0, 10);

    const top10Deputados = top10DeputadosIds.map(idDeputado => lista.find(deputado => deputado.id === parseInt(idDeputado)));
    setTop10(top10Deputados)
    setAlert(false);
  } catch (error) {
    console.error('Erro ao obter dados dos deputados:', error);
  }
}

    
  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
      <Form> 
        <Row>          
          <Col md='8'>
          <MapBrazil bg='#198754' fill='#0000FF' width={500} height={500} onChange={setEstadoSelecionado} />
          <hr/>
          <h3> Estado Selecionado {estadoSelecionado}</h3>
          </Col>
          <Col md='4'>

          <Form.Group as={Col} md="6" controlId="mes1">
          <Form.Label> <BsCalendarFill className='me-1'/> Mês </Form.Label>
          <Form.Select isInvalid={errors.ano1} {...register('mes', {required: true})}>
          <option value=""> Selecione o mês  </option>
                  {meses.map(m => (
                  <option key={m.value} value={m.value}> {m.value} </option>
          ))}
          </Form.Select>
         </Form.Group>
         <br/>

            <Form.Group as={Col} controlId="ano">
              <Form.Label> <BsCalendarFill /> <strong>Digite um ano</strong>  </Form.Label>
              <Form.Control type="text" placeholder="Ex.: 2020" {...register('ano', {required: true} )} />
            </Form.Group>

            <br></br>
            <Button variant="success" onClick={handleSubmit(gastosEstados)}  className='me-2'>
              Descubra
            </Button>
          </Col>
        </Row>
        </Form>
        {
          !alert && 
          top10.map(d =>(
            <> 
            <Card style={{ width: '100%'}}>
            <Row>
            <Col md={3}>
            <Card.Img as={Image} style={{ width: '70%'}} src={d.urlFoto} />
            </Col> 
            <Col md={9}>           
            <h3> {d.nome} </h3>
            <Card.Text>
               <h5> <b>Partido: </b> {d.siglaPartido} </h5>
              </Card.Text>
              </Col>
              <br/>
            <Link href={`/deputado/${d.id}`}> 
              <Button variant="success"> Detalhes </Button>
              </Link>
            </Row>
          </Card>
          <br/>
          </>
          ))
        }
        {
        alert && 
        <Alert variant="danger">
        <Alert.Heading>Aviso!</Alert.Heading>
        <p>
        Selecione o estado!
        </p>
      </Alert>
      }
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

