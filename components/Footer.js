import React from 'react'
import { Button } from 'react-bootstrap'
import ModalContato from '@/components/ModalContato'

const footerStyle = {
    width: "100%",
    height: "40px"
}
const Footer = () => {
  return (
    <>
    <div style={footerStyle} className='bg-success text-center position-fixed bottom-0'>
    <ModalContato> </ModalContato>
    </div>
    </>
  )
}

export default Footer