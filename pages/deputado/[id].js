import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Container } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
import GlobalStyle from "@/styles/global";
/*

JONATHAN 
Página com informações sobre deputados. Dados necessários: Máximo de informação sobre deputado selecionado, suas despesas etc.
*/
const id = () => {
    return (
        <>
        <GlobalStyle/>
        <Header/>
        <Container>
        teste
        </Container>
        <Footer/>
        </>
      )
    }
    
export default id

export async function getServerSideProps(context) {
    const resultado = await apiDeputados.get("/deputados")
    return {
        props: {
            
        }, 
    }
  }