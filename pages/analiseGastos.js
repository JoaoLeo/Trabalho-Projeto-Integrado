import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import  Header  from '@/components/Header'
import Footer from '@/components/Footer'
import apiDeputados from '@/services/apiDeputados';
/*
JOÃO

 Pagina com 3 selects (Ano1, estado, Ano2), mostrar o total gasto do estado nos anos selecionados e a diferença de gasto entre eles
 */
const analiseGastos = () => {
  return (
    <>
    <Header/>
    <Container> 
    analiseGastos
    </Container>
    <Footer/>
    </>
  )
}

export default analiseGastos

export async function getServerSideProps(context) {
  const resultado = await apiDeputados.get("/deputados")
  return {
      props: {
          
      }, 
  }
}