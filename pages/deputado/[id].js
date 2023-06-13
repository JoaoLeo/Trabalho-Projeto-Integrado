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
  const [despesas, setDespesas] = useState([])
  const [eventos, setEventos] = useState([])
  const [frentes, setFrentes] = useState([])
  const [profissoes, setProfissoes] = useState([])
  const [orgaos, setOrgaos] = useState([])
  const [ocupacoes, setOcupacoes] = useState([])
  useEffect(() => {

    if (query.id) {

      apiDeputados.get('deputados/' + query.id).then(res => {
       setDeputado(res.data.dados)
       console.log("deputado:", res.data.dados);
      })
      apiDeputados.get('deputados/' + query.id + '/despesas').then(res => {
        setDespesas(res.data.dados)
        console.log("despesas:", res.data.dados);
       })
       apiDeputados.get('deputados/' + query.id + '/eventos').then(res => {
        setEventos(res.data.dados)
        console.log("eventos:", res.data.dados);
       })
       apiDeputados.get('deputados/' + query.id + '/').then(res => {
        setFrentes(res.data.dados)
        console.log("frentes:", res.data.dados);
       })
       apiDeputados.get('deputados/' + query.id + '/profissoes').then(res => {
        setProfissoes(res.data.dados)
        console.log("profissoes:", res.data.dados);
       })
       apiDeputados.get('deputados/' + query.id + '/orgaos').then(res => {
        setOrgaos(res.data.dados)
        console.log("orgaos:", res.data.dados);
       })
       apiDeputados.get('deputados/' + query.id + '/ocupacoes').then(res => {
        setOcupacoes(res.data.dados)
        console.log("ocupacoes:", res.data.dados);
       })

    }
  }, [query.id])
     
  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        NOME: {deputado.nomeCivil}
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