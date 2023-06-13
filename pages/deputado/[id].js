import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Container, Image } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
import GlobalStyle from "@/styles/global";
import { useRouter } from 'next/router';
/*

JONATHAN 
Página com informações sobre deputados. Dados necessários: Máximo de informação sobre deputado selecionado, suas despesas etc.
*/
const id = () => {

  const { query } = useRouter()

  console.log(query.id);

  const [deputado, setDeputado] = useState({})
  useEffect(() => {

    if (query.id) {

      apiDeputados.get('deputados/' + query.id).then(res => {
        console.log(res.data)
      })
    }
  }, [query.id])

  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        {deputado.nome}
        {id}
      </Container>
      <Footer />
    </>
  )
}

export default id

/*
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
*/