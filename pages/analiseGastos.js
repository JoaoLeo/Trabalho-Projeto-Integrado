import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Button, Col, Container, Form, InputGroup, Row, Spinner, Table } from 'react-bootstrap'
import  Header  from '@/components/Header'
import Footer from '@/components/Footer'
import apiDeputados from '@/services/apiDeputados';
import Link from 'next/link';
import { BsSendCheck, BsCalendarFill } from 'react-icons/bs'
import apiLocalidades from '@/services/apiLocalidades';
import GlobalStyle from "@/styles/global";
import { GiBrazil, GiDiamonds } from "react-icons/gi"
import analiseGastoValidator from '../validators/analiseGastosValidators/analiseGastoValidators';

/*
JOÃO

 Pagina com 3 selects (Ano1, estado, Ano2), mostrar o total gasto do estado nos anos selecionados e a diferença de gasto entre eles

 */

const analiseGastos = () => {
  const [dados, setDados] = useState([])
  const [ufs, setUfs] = useState([]);
  const [loader, setLoader] = useState(false)
  const [valorTotalMes1Ano1, setValorTotalMes1Ano1] = useState(0)
  const [valorTotalMes2Ano2, setValorTotalMes2Ano2] = useState(0)
  const [show, setShow] = useState(false)
  const [alert, setAlert] = useState(false);
  const [mes1, setMes1] = useState("")
  const [mes2, setMes2] = useState("")
  const [ano1, setAno1] = useState("")
  const [ano2, setAno2] = useState("")
  const [uf, setUf] = useState("")
  const { register, handleSubmit,setValue, formState : { errors } } = useForm();

  const options = [
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
  ]
  const meses = [
      {value:'1', label: '1'}, {value:'2', label: '2'}, {value:'3', label: '3'}, {value:'4', label: '4'},
      {value:'5', label: '5'}, {value:'6', label: '6'}, {value:'7', label: '7'}, {value:'8', label: '8'},
      {value:'9', label: '9'}, {value:'10', label: '10'}, {value:'11', label: '11'}, {value:'12', label: '12'},
    
  ]

  useEffect(() =>{
    apiLocalidades.get('localidades/estados?orderBy=nome').then(res =>{
      setUfs(res.data)
    })
  },[])
  function handleChange(event){
    setValue(event.target.name, (mask(event.target.value, event.target.getAttribute("mask"))))
  }
  function calculaAno(lista,mes,ano,qualAno){
    let aux = 0
    console.log(lista, mes, ano, qualAno);
  
    lista.forEach(l =>{     
      apiDeputados.get(`/deputados/${l.id}/despesas?mes=${mes}&ano=${ano}`).then(res =>{
       res.data.dados.forEach(d =>{
          aux += d.valorLiquido
       })
       if(qualAno)
          setValorTotalMes1Ano1(aux)
        else
        setValorTotalMes2Ano2(aux)
      })
    })
    
  }


  async function analiseGastos(dados){
    if(alert)
      setAlert(false)
    setLoader(true)
    setUf(dados.estado)
    setMes1(dados.mes1)
    setMes2(dados.mes2)
    setAno1(dados.ano1)
    setAno2(dados.ano2)
    const lista = []
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth(); // Retorna um valor entre 0 e 11, onde 0 representa janeiro e 11 representa dezembro
    const anoAtual = dataAtual.getFullYear(); // Retorna o ano com quatro dígitos

    if((dados.ano1 == anoAtual || dados.ano2 == anoAtual) && (dados.mes1 >= mesAtual + 1|| dados.mes2 >= mesAtual + 1)){
      for(let campo in dados) { setValue(campo, "") }
      setAlert(true)
      setLoader(false)
      return;
    }
    apiDeputados.get("/deputados?&itens=5&siglaUf="+dados.estado).then(async res =>{  
      const lista = res.data.dados        
        await calculaAno(lista, dados.mes1, dados.ano1,true);
        await calculaAno(lista, dados.mes2,dados.ano2,false);
      });     
        setLoader(false)
        setShow(true);
  }
 
  return (
    <>
    <GlobalStyle />
    <Header/>
    <Container> 
      {
        alert && 
        <Alert variant="danger">
        <Alert.Heading>Aviso!</Alert.Heading>
        <p>
        A api ainda não possui dados referentes aos gastos futuros dos deputados, tente novamente informando um mês e ano válidos;
        </p>
      </Alert>
      }
      {
        !alert &&
        <> 
        <h1> Análise de Gastos </h1> <hr style={{color: '#006400'}}/>
        </> 
      }
    
    <Form>
      <Row className="mb-3"> 
      <Col> 
      <h5> Selecione ao lado um estado e duas datas para analisar os gastos totais desse estado nas datas inseridas e a diferença entre eles

      </h5>
      </Col>
      <Col> 
      <Row> 
      <Form.Group as={Col} md="6" controlId="mes1">
          <Form.Label> <BsCalendarFill className='me-1'/> Mês 1</Form.Label>
          <Form.Select isInvalid={errors.ano1} {...register('mes1', analiseGastoValidator.mes)}>
          <option value=""> Selecione o mês 1 </option>
                  {meses.map(m => (
                  <option key={m.value} value={m.value}> {m.value} </option>
          ))}
          </Form.Select>
        </Form.Group>


        <Form.Group as={Col} md="6" controlId="ano1">
          <Form.Label> <BsCalendarFill className='me-1'/> Ano 1</Form.Label>
          <Form.Select isInvalid={errors.ano1} {...register('ano1', analiseGastoValidator.ano)}>
          <option value=""> Selecione o ano 1 </option>
                  {options.map(o => (
                  <option key={o.value} value={o.value}> {o.value} </option>
          ))}
          </Form.Select>
        </Form.Group>
        </Row>
        <hr style={{color: '#006400'}}/>
        <Row> 
        <Form.Group as={Col} md="6" controlId="mes2">
          <Form.Label> <BsCalendarFill className='me-1'/> Mês 2</Form.Label>
          <Form.Select isInvalid={errors.ano1} {...register('mes2', analiseGastoValidator.mes)}>
          <option value=""> Selecione o mês 2 </option>
                  {meses.map(m => (
                  <option key={m.value} value={m.value}> {m.value} </option>
          ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md="6"  controlId="ano2">
          <Form.Label> <BsCalendarFill className='me-1'/> Ano 2</Form.Label>
          <Form.Select isInvalid={errors.ano1} {...register('ano2', analiseGastoValidator.ano)}> 
          <option value=""> Selecione o ano 2 </option>
                  {options.map(o => (
                  <option key={o.label} value={o.value}> {o.value} </option>
          ))}
          </Form.Select>
        </Form.Group>
        </Row>
        <hr style={{color: '#006400'}}/>
        <Row> 
        <Form.Group controlId="estado">
          <Form.Label> <GiBrazil/> Estado</Form.Label>
          <Form.Select isInvalid={errors.estado} {...register('estado', analiseGastoValidator.estado)}>
                <option value=""> Selecione um estado </option>
                  {ufs.map(uf => (
                  <option key={uf.id} value={uf.sigla}> {uf.sigla} </option>
          ))}
          </Form.Select>
        </Form.Group>   
        </Row>
        <br/>
        <Row> 
        <Button variant="success" className='me-2' onClick={handleSubmit(analiseGastos)}>
          <BsSendCheck className='me-2'/>
          Analisar gastos
        </Button>
        </Row>
        </Col>
        </Row>
      </Form>
      
      <h1>
        Dados:
      </h1>
      {
          loader && <Spinner animation="border" variant="success" /> 
        }
        {
          show && <Dados 
          uf={uf}
          mes1={mes1} 
          mes2={mes2}
          ano1={ano1} 
          ano2={ano2} 
          totAno1={valorTotalMes1Ano1} 
          totAno2={valorTotalMes2Ano2}
          diff={valorTotalMes1Ano1 - valorTotalMes2Ano2}/>
        }
      
    </Container>
    <Footer/>
    </>
  )
}

const Dados = ({uf,mes1,mes2,ano1,ano2,totAno1, totAno2, diff}) =>{
  return(
  <>
   <Table striped bordered hover>
      <thead>
        <tr>
          <th>Gasto total em {mes1}/{ano1} no estado do {uf.toUpperCase()}</th>
          <th>Gasto total em {mes2}/{ano2} no estado do {uf.toUpperCase()}</th>
          <th>Diferença</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {
          totAno1.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })}
        </td>
          <td>
            {
            totAno2.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
          </td>
          <td>{
           diff.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
          </td>
        </tr>
      </tbody>
    </Table>

  </>)
}
export default analiseGastos