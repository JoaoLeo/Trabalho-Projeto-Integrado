import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button, Card, Col, Container, Row, } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
import styles from '@/styles/carrosel.module.css';
import { motion } from 'framer-motion';
import {useState, useEffect, useRef} from 'react'
import { set } from 'react-hook-form';

export default function Home({ deputados }) {

  const carousel = useRef();
  const [width, setWidth] = useState(0)

  useEffect(() => {
     console.log(carousel.current?.scrollWidth, carousel.current?.offsetWidth)
     setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
  }, [])
  
  return (
    <>
      <Header />
      <Container>
        <Row className={styles.carrosel}>
          <Col></Col>
          <Col>
            <motion.div ref={carousel} className={styles.carousel} whileTap={{cursor: "grabbing"}}>
              <motion.div 
              className={styles.inner}
              drag="x"
              dragConstraints = {{ right:0, left: -width }}
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              >
            {deputados.map(item => (
              <motion.div className={styles.item} key={item}>
              <Card className={styles.card}>
                <Card.Img className={styles.img} variant="top" src={item.urlFoto} />
                <Card.Body>
                  <Card.Title>{item.nome}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Ver mais</Button>
                </Card.Body>
              </Card>
              </motion.div>
            ))}
            </motion.div>
            </motion.div>
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