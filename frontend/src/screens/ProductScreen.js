import React, { useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import { listProductDetails, createProductReview } from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'

const ProductScreen = () => {

  const{ id } = useParams();
  const navigate = useNavigate()

  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()


  const productDetails =useSelector(state => state.productDetails)
  const {loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <>
      <Link to='/' className='btn btn-light my-3' >
        Go Back
      </Link>

      {loading ? <Loader/> : error ? <Message variant= 'danger'>{error}</Message> : (
        <Row>
        <Col md={10}>

        <Row> 
      <Col md={4} >
        <Image src={product.image} alt={product.name} fluid />
      </Col>

      <Col md={4}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </ListGroup.Item>
          <ListGroup.Item>
            Price: &#8358;{product.price}
          </ListGroup.Item>
          <ListGroup.Item>
            <h3>Product details</h3>
            <p>{product.description}</p>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      
      <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>&#8358;{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>         
                </ListGroup>
              </Card>
            </Col>
        </Row>
        </Col>
        <Col md={2}></Col>

      </Row>
      )

    }
    </>
  )
}

export default ProductScreen