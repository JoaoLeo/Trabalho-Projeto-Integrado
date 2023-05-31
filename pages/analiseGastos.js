import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import  Header  from '@/components/Header'
import Footer from '@/components/Footer'
import apiDeputados from '@/services/apiDeputados';
import Link from 'next/link';
import { BsSendCheck } from 'react-icons/bs'
import apiLocalidades from '@/services/apiLocalidades';
import GlobalStyle from "@/styles/global";
/*
JOÃO

 Pagina com 3 selects (Ano1, estado, Ano2), mostrar o total gasto do estado nos anos selecionados e a diferença de gasto entre eles
 */

const analiseGastos = () => {
  const [dados, setDados] = useState([])
  const [ufs, setUfs] = useState([]);
  useEffect(() =>{
    apiLocalidades.get('localidades/estados?orderBy=nome').then(res =>{
      setUfs(res.data)
    })
  },[])

  const { register, handleSubmit } = useForm();

  function salvar(dados) {
    const map = new Map(Object.entries(dados));
    setDados(map)
    console.log(map);
    console.log(dados);
  }

  return (
    <>
     <GlobalStyle />
    <Header/>
    <Container> 
    <Form>
      <Row className="mb-3"> 
        <Form.Group as={Col} md="4" controlId="nome">
          <Form.Label>Ano 1</Form.Label>
          <Form.Control type="text" placeholder="Digite o ano 1" {...register('ano1')} />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="ano2">
          <Form.Label>Ano 2</Form.Label>
          <Form.Control type="text" placeholder="Digite o ano 2" {...register('ano2')}  />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="estado">
          <Form.Label>Estado</Form.Label>
          <Form.Select {...register('estado')}>
                <option value="0"> Selecione um estado </option>
                  {ufs.map(uf => (
                <option  key={uf.id} value={uf.sigla}> {uf.sigla} </option>
          ))}
          </Form.Select>
        </Form.Group>


        <div className='text-center mt-4 pr-1'>
        <Button variant="success" className='me-2' onClick={handleSubmit(salvar)}>
          <BsSendCheck className='me-2'/>
          Salvar
        </Button>
        </div>
        </Row>
      </Form>


      <h1>
        Dados:
      </h1>
      {dados}
    </Container>
    <Footer/>
    </>
  )
}

export default analiseGastos

export async function getServerSideProps(context) {
  //const res = await apiLocalidades.get("localidades/estados?orderBy=nome")
  const resultado = await apiDeputados.get("/deputados")
  //const uf = res.data || ['teste1', 'teste2', 'teste3']
  return {
      props: {
          
      }, 
  }
}