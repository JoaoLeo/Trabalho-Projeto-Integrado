import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button, Card, Carousel, Col, Container, Row, } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';

export default function Home({ deputados }) {
  return (
    <>
      <Header />
      <Container>
        <Row className="justify-content-md-center">
          <Col></Col>
          <Col md={9}>
            <Carousel variant='dark'>
              


              {deputados.map(item => (
                <Carousel.Item >


                  <Card style={{ width: '18rem' }} md='auto'>
                    <Card.Img variant="top" src={item.urlFoto} />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>

                </Carousel.Item>
              ))}



            </Carousel>
          </Col>
          <Col></Col>
        </Row>
      </Container>
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