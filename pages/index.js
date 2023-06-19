import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Card, Col, Container, Row, } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
import Link from 'next/link';
import GlobalStyle from "@/styles/global";
import styles from "@/styles/index.module.css"


export default function Home({ deputados }) {

  return (
    <>
    <GlobalStyle/>
      <Header />
      <Container>
      <h3> Deputados:
</h3> <hr style={{color: '#006400'}}/>
      <Row md={4}> 
                {deputados.map(item => (
                  <Col>
                    <Card className={styles.card} title={`Clique para ver as informações de ${item.nome}`}>
                    <Link href={'/deputado/' + item.id}>
                      <Card.Img variant="top" src={item.urlFoto} className={styles.img}/>
                      <Card.Title className={styles.nome}>{item.nome}</Card.Title>
                      </Link> 
                    </Card>
                    </Col>
                ))}
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