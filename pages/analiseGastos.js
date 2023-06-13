import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, InputGroup, Row, Spinner, Table } from 'react-bootstrap'
import  Header  from '@/components/Header'
import Footer from '@/components/Footer'
import apiDeputados from '@/services/apiDeputados';
import Link from 'next/link';
import { BsSendCheck, BsCalendarFill } from 'react-icons/bs'
import apiLocalidades from '@/services/apiLocalidades';
import GlobalStyle from "@/styles/global";
import { GiBrazil } from "react-icons/gi"
/*
JOÃO

 Pagina com 3 selects (Ano1, estado, Ano2), mostrar o total gasto do estado nos anos selecionados e a diferença de gasto entre eles

 */

const analiseGastos = () => {
  const [dados, setDados] = useState([])
  const [ufs, setUfs] = useState([]);
  const [loader, setLoader] = useState(false)
  const [valorTotalAno1, setValorTotalAno1] = useState(0)
  const [valorTotalAno2, setValorTotalAno2] = useState(0)
  const [show, setShow] = useState(false)
  const { register, handleSubmit } = useForm();

  const options = [
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
  ]

  useEffect(() =>{
    console.log(123)
    apiLocalidades.get('localidades/estados?orderBy=nome').then(res =>{
      setUfs(res.data)
    })
  },[])

  function calculaAno1(lista,ano){
    let aux1 = 0
    lista.forEach(l =>{
      setTimeout(() =>{ 
      apiDeputados.get(`/deputados/${l.id}/despesas?ano=${ano}&ordem=ASC&ordenarPor=ano&itens=100`).then(res =>{
       res.data.dados.forEach(d =>{
          aux1 += d.valorLiquido
       })
       setValorTotalAno1(aux1)
      })
    },1000)
    })
  }

  function calculaAno2(lista, ano){
    let aux2 = 0
    lista.forEach(l =>{
      setTimeout(() =>{ 
      apiDeputados.get(`/deputados/${l.id}/despesas?ano=${ano}&ordem=ASC&ordenarPor=ano`).then(res =>{
       res.data.dados.forEach(d =>{
          aux2 += d.valorLiquido
       })
       setValorTotalAno2(aux2)
      })
    },1000)
    }) 
    }

  async function analiseDeGastosEstado(dados){
    setLoader(true)
    const lista = []
    // to-do: add mes e ano busca
    apiDeputados.get("/deputados?itens=50&siglaUF="+dados.estado).then(async res =>{  
      const lista = res.data.dados
      deputados.forEach(element => {
        if(element.siglaUf == dados.estado){
          lista.push(element)
        }         
      });    
        await calculaAno1(lista, dados.ano1);
        await calculaAno2(lista, dados.ano2);
        setLoader(false)
        setShow(true);
      })
  }
 
  return (
    <>
    <GlobalStyle />
    <Header/>
    <Container> 
    <Form>
      <Row className="mb-3"> 
        <Form.Group as={Col} md="4" controlId="nome">
          <Form.Label> <BsCalendarFill className='me-1'/> Ano 1</Form.Label>
          <Form.Select {...register('ano1', { required : true})} defaultValue="default">
          <option value="default"> Selecione o ano 1 </option>
                  {options.map(o => (
                  <option key={o.value} value={o.value}> {o.value} </option>
          ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="nome">
          <Form.Label> <BsCalendarFill className='me-1'/> Ano 2</Form.Label>
          <Form.Select {...register('ano2', { required : true})} defaultValue="default">
          <option value="default"> Selecione o ano 2 </option>
                  {options.map(o => (
                  <option key={o.label} value={o.value}> {o.value} </option>
          ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="estado">
          <Form.Label> <GiBrazil/> Estado</Form.Label>
          <Form.Select {...register('estado', { required : true})} defaultValue="default">
                <option value="default"> Selecione um estado </option>
                  {ufs.map(uf => (
                  <option key={uf.id} value={uf.sigla}> {uf.sigla} </option>
          ))}
          </Form.Select>
        </Form.Group>
        
        <div className='text-center mt-4 pr-1'>
        <Button variant="success" className='me-2' onClick={handleSubmit(analiseDeGastosEstado)}>
          <BsSendCheck className='me-2'/>
          Analisar gastos
        </Button>
        
        </div>
        </Row>
      </Form>

      <h1>
        Dados:
      </h1>
      {
          loader && <Spinner animation="border" variant="success" /> 
        }
        {
          show && <Dados ano1={valorTotalAno1} ano2={valorTotalAno2} diff={valorTotalAno1 - valorTotalAno2}/>
        }
      
    </Container>
    <Footer/>
    </>
  )
}

const Dados = ({ano1, ano2, diff}) =>{
  return(
  <>
   <Table striped bordered hover>
      <thead>
        <tr>
          <th>Ano 1</th>
          <th>Ano 2</th>
          <th>Diferença</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {
          ano1.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })}
        </td>
          <td>
            {
            ano2.toLocaleString("pt-BR", {
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