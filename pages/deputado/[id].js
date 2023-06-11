import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Container, Image } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
import GlobalStyle from "@/styles/global";
/*

JONATHAN 
Página com informações sobre deputados. Dados necessários: Máximo de informação sobre deputado selecionado, suas despesas etc.
*/
const id = ({deputado,id}) => {
    return (
        <>
        <GlobalStyle/>
        <Header/>
        <Container>
        {deputado.nome}
        {id}
        </Container>
        <Footer/>
        </>
      )
    }
    
export default id


export async function getServerSideProps(context) {
  const id = context.params.id
  const resultado = await apiDeputados.get('deputados/' + id)
  const deputado = resultado.data.dados
    return {
      props: {
        deputado, id
      }
    }
  }