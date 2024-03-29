import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav , NavDropdown } from 'react-bootstrap';
import { Routes, Route, useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import UserListScreen from '../screens/UserListScreen';
import ProductListScreen from '../screens/ProductListScreen';
import OrderListScreen from '../screens/OrderListScreen';
const Header = ({color}) => {

  const dispatch = useDispatch()
  const key = useParams()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    console.log('logout')
    dispatch(logout())
  }

  return (
    <header>
      <Navbar  id='mynav' variant='dark' expand='sm' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand>FIAZ</Navbar.Brand>
          </LinkContainer>
          <i style={{color}} className="fa-solid fa-camera fa-2x"></i>      

          <Navbar.Toggle aria-controls='navbarScroll' data-bs-target="#navbarScroll" />           
         
         <Navbar.Collapse id='navbarScroll'>
        
          <SearchBox/>
        
            <Nav className='ml-auto'>

            <LinkContainer to='/'>
                <Nav.Link className='items'><i className='fas fa-shopping-home'></i> Home
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/cart'>
                <Nav.Link className='items'><i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username' >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                <Nav.Link><i className='fas fa-user'></i> Sign In
                </Nav.Link>
                </LinkContainer>
              
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>

      
    </header>
  )
}

Header.defaultProps = {
  color: '#fff',
}

export default Header