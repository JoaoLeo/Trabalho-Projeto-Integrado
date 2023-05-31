import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
/*
Miguel


*/

export default function Home({deputados}) {
  return (
    <>
      <Header />
      <Row md={12}>
      <Col>
        <Carousel variant='dark'>
          {deputados.map(item => (
            <Carousel.Item>
              <img
              
                className="d-block w-20"
                src={item.urlFoto}
                alt="First Slide"
              />
            </Carousel.Item>
          ))}
        </Carousel>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const resultado = await apiDeputados.get("/deputados")
  const deputados = resultado.data.dados
  return {
      props: {
          deputados
      }, 
  }
}