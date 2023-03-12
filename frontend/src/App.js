import React from 'react';
import { Container } from 'react-bootstrap';
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';

import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Footer from './components/Footer';
import CartScreen from './screens/CartScreen';
import TryScreen from './screens/TryScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductListScreen from './screens/ProductListScreen';
import ImageUpload from './screens/Upload';
import ProductEditScreen from './screens/ProductEditScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import OrderListScreen from './screens/OrderListScreen';
import CollapsibleExample from './components/NavbarTest';



function App() {

  return (
    <Router>
      <Header/>
      <main className='py-3'>
      <Container>
        <Routes>
          <Route path='/' element={<HomeScreen/>} />
          <Route path='/login' element={<LoginScreen/>} />
          <Route path='/register' element={<RegisterScreen/>} />
          <Route path='/profile' element={<ProfileScreen/>} />
          <Route path='/product/:id' element={<ProductScreen/>} />
          <Route path='/admin/product/:productId/edit' element={<ProductEditScreen/>} />
          <Route path='/admin/product/new' element={<ProductCreateScreen/>} />
          <Route path="/cart/" element={<CartScreen />} />
          <Route path='/cart/:productId' element={<CartScreen/>} />
          <Route path='/placeorder' element={<PlaceOrderScreen/>} />
          <Route path='/order/:orderId' element={<OrderScreen/>} />
          <Route path='/admin/orderlist' element={<OrderListScreen/>} />
          <Route path='/shipping' element={<ShippingScreen/>} />
          <Route path='/payment' element={<PaymentScreen/>} />
          <Route path='/admin/userlist' element={<UserListScreen/>} />
          <Route path='/admin/user/:userId/edit' element={<UserEditScreen/>} />
          <Route path='/admin/productlist' element={<ProductListScreen/>} />
          

          <Route path='/admin/upload' element={<ImageUpload/>} />

          <Route path='/testnav' element={<CollapsibleExample/>} />
          
          

          <Route path='/try' element={<TryScreen/>} />

          <Route path="*" element={
            <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
      }
    />
        </Routes>
        
      </Container>
      <Footer/>
      </main>

      </Router>
  );
}

export default App;
