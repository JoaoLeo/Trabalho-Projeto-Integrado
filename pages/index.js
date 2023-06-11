import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button, Card, Col, Container, Row, } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
import styles from '@/styles/carrosel.module.css';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';


export default function Home({ deputados }) {

  const carousel = useRef(null);
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
  }, [])


  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth
  }

  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth
  }



  return (
    <>
      <Header />
      <Container>
        <Row className={styles.carrosel}>
          <Col>
            <motion.div ref={carousel} className={styles.carousel} whileTap={{ cursor: "grabbing" }}>
              <motion.div
                className={styles.inner}
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
              >
                {deputados.map(item => (
                  <motion.div className={styles.item} key={item}>
                    <Card className={styles.card}>
                      <Card.Img className={styles.img} variant="top" src={item.urlFoto} />
                      <Card.Body>
                        <Card.Title>{item.nome}</Card.Title>
                        <Card.Text>
                          <p><strong>Partido:</strong>{item.siglaPartido}</p>
                          <p><strong>UF Deputado:</strong>{item.siglaUf}</p>
                        </Card.Text>
                        <Button variant="primary">Ver mais</Button>
                      </Card.Body>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div className={styles.seta}>
              <motion.div onClick={handleLeftClick}>
                <AiOutlineLeft />
              </motion.div>
              <motion.div onClick={handleRightClick}>
                <AiOutlineRight />
              </motion.div>
            </motion.div>
          </Col>
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