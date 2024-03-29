import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productAction'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'

const HomeScreen = () => {

  const { keyword } = useParams();
console.log(keyword)
  
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, error, products } = productList
 

  useEffect(() => {
      dispatch(listProducts(keyword))
    }, [dispatch, keyword])

  return (
    <>
      <h1>Latest Products</h1>

      {loading ? <Loader/> : error ? <Message variant= 'danger'>{error}</Message> :
        <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} >
            <Product product={product} />
          </Col>
        ))}
    </Row>
      }
    </>
  )
}

export default HomeScreen