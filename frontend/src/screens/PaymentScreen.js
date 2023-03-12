import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'

import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const shippingAddress = cart

  if(!shippingAddress){
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')
 

  const submitHandler = (e) => {
    e.preventDefault()
    //Dispatch the form data i.e the shipping address to the reducer
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
        
        <Col>
          <Form.Check 
          type='radio' 
          label='PayPal or Credit Cards' 
          id='PayPal'
          name='paymentMethod' 
          value='PayPal' checked 
          onChange={(e) => setPaymentMethod(e.target.value)}>
          </Form.Check>

      {/*
          <Form.Check 
          type='radio' 
          label='Stripe' 
          id='Stripe'
          name='paymentMethod' 
          value='Stripe' checked 
          onChange={(e) => setPaymentMethod(e.target.value)}>
          </Form.Check>
  */}
        </Col>
        </Form.Group>
        <Button type='submit' variant='info' className='my-4'>
          Continue
        </Button>



      </Form>
    </FormContainer>
  )
}

export default PaymentScreen