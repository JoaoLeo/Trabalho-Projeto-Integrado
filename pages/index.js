import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Container } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
/*
Miguel


*/

export default function Home() {
  return (
    <>
    <Header/>
    <Container>
    teste
    </Container>
    <Footer/>
    </>
  )
}

export async function getServerSideProps(context) {
  const resultado = await apiDeputados.get("")
  return {
      props: {
          
      }, 
  }
}