import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Card, Col, Container, Dropdown, Image, Row, Table } from 'react-bootstrap';
import apiDeputados from '@/services/apiDeputados';
import GlobalStyle from "@/styles/global";
import { useRouter } from 'next/router';
import Link from 'next/link';
import ModalDiscurso from '@/components/ModalDiscurso';
/*

JONATHAN 
Página com informações sobre deputados. Dados necessários: Máximo de informação sobre deputado selecionado, suas despesas etc.
*/
const id = ({deputado, despesas, profissoes, orgaos, frentes, discursos}) => {

     
  return (
    <>
      <GlobalStyle />
      <Header />
      <Container> 
    <Row>

                            <Col md={3}>       
                            <Card className='mt-4'> 
                            <Card.Img variant="top" src={deputado.ultimoStatus.urlFoto} title={deputado.nomeCivil} />
                            <Card.Body> 
                              <Card.Title>{deputado.ultimoStatus.nome}</Card.Title>
                              <p> Partido: {deputado.ultimoStatus.siglaPartido}</p>
                              <p> UF partido: {deputado.ultimoStatus.siglaUf} </p>
                              </Card.Body>
                            </Card>
                            <hr style={{color: '#006400'}}/>
                            <Link href={"/"} className='btn btn-primary'> Voltar</Link>
                            </Col>
                            <Col md={8}>
                            <h3> Despesas </h3>
                            <div style={{ height: '200px', overflowY: 'scroll' }}>
                            <Table striped>
                                    <thead>
                                        <tr>
                                        <th>Data</th>
                                        <th>Descrição</th>
                                        <th>Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                    {despesas.map(d => (
                                      <tr>
                                        <td> {d.dataDocumento} </td>
                                        <td> {d.tipoDespesa} </td>
                                        <td> {d.valorLiquido} </td>
                                        </tr> 
                                    ))}                                                         
                                    </tbody>
                                </Table>
                                </div>
                                <hr style={{color: '#006400'}}/>
                            <h3> Orgãos </h3>    
                            <div style={{ height: '200px', overflowY: 'scroll' }}>
                            <Table striped>
                                    <thead>
                                        <tr>
                                        <th>Orgão</th>
                                        <th>Sigla Orgão</th>
                                        <th>Título</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                    {orgaos.map(d => (
                                      <tr>
                                        <td> {d.nomeOrgao} </td>
                                        <td> {d.siglaOrgao} </td>
                                        <td> {d.titulo} </td>
                                        </tr> 
                                    ))}                                                         
                                    </tbody>
                                </Table>
                                </div>
                                <hr style={{color: '#006400'}}/>
                            <h3> Frentes Parlamentares </h3>    
                            <div style={{ height: '200px', overflowY: 'scroll' }}>
                            <Table striped>
                                    <thead>
                                        <tr>
                                        <th>ID Legislatura</th>
                                        <th>Frente</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                    {frentes.map(f => (
                                      <tr>
                                        <td> {f.idLegislatura} </td>
                                        <td> {f.titulo} </td>
                                        </tr> 
                                    ))}                                                         
                                    </tbody>
                                </Table>
                                </div>
                            </Col>
                            <Col md={1}>
                            <Dropdown>
                              <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Profissões
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {profissoes.map(p => (
                                  <>
                                <Dropdown.Item>{p.titulo}</Dropdown.Item>
                                  </>
                                ))}
                                
                              </Dropdown.Menu>
                            </Dropdown>
                            <hr style={{color: '#006400'}}/>
                            <Dropdown>
                              <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Discursos
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {discursos.map(d => (
                                  <>
                                  <ModalDiscurso titulo={d.tipoDiscurso} texto={d.transcricao}>n</ModalDiscurso> 
                                  </>
                                ))}
                                
                              </Dropdown.Menu>
                            </Dropdown>
                            </Col>
                </Row>
    </Container>
      <Footer />
    </>
  )
}

export default id

export async function getServerSideProps(context) {
  const id = context.params.id;
  const resultadoDeputados = await apiDeputados.get("/deputados/" + id)
  const deputado = resultadoDeputados.data.dados
  const resultadoDespesas = await apiDeputados.get("/deputados/" + id +  "/despesas")
  const despesas = resultadoDespesas.data.dados
  const resultadoProfissoes = await apiDeputados.get("/deputados/" + id +  "/profissoes")
  const profissoes = resultadoProfissoes.data.dados
  const resultadoEventos = await  apiDeputados.get('deputados/' + id + '/eventos')
  const eventos = resultadoEventos.data.dados
  const resultadoOrgao = await apiDeputados.get('deputados/' + id + '/orgaos')
  const orgaos = resultadoOrgao.data.dados
  const resultadoFrentes = await apiDeputados.get('deputados/' + id + '/frentes')
  const frentes = resultadoFrentes.data.dados
  const resultadoDiscursos = await apiDeputados.get('deputados/' + id + '/discursos')
  const discursos = resultadoDiscursos.data.dados
  return {
      props: {
        deputado, despesas, profissoes, eventos, orgaos, frentes, discursos
      }, 
  }
}