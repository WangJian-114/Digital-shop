import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import Products from "./pages/Products";
import Login from "./pages/auth/Login";
import NewAccount from "./pages/auth/NewAccount";
import PrivateRoute from "./components/routes/PrivateRoute";
import Admin from "./pages/Admin";
import AdminProducts from "./components/administracion/AdminProducts";
import FormEditProduct from "./components/administracion/FormEditProduct";
import FormAddProduct from "./components/administracion/FormAddProduct";
import AdminUsers from "./components/administracion/AdminUsers";
import AdminOrders from "./components/administracion/AdminOrders";
import MyBuys from "./components/buys/MyBuys";


import ProductState from "./context/products/productState";
import CartState from "./context/cart/cartState";
import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState';
import UserState from './context/user/userState';
import OrderState from './context/order/orderState';

import tokenAuth from './config/tokenAuth';

// Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}


function App() {

  return (
    <Router>
      <AlertState>
        <OrderState>
          <UserState>
            <ProductState>
              <CartState>
                <AuthState>
                  <Switch>
                      <Route exact path="/" component={Products} />
                      <Route exact path="/login" component={Login} /> 
                      <Route exact path='/nueva-cuenta' component={NewAccount} />
                      <Route exact path="/usuario/compras" component={MyBuys} />
                      <PrivateRoute exact path="/administracion" component={Admin} />
                      <PrivateRoute exact path="/administracion/productos" component={AdminProducts} />
                      <PrivateRoute exact path="/administracion/editar-producto/:id" component={FormEditProduct} />
                      <PrivateRoute exact path="/administracion/agregar-producto" component={FormAddProduct} />
                      <PrivateRoute exact path="/administracion/usuarios" component={AdminUsers} />
                      <PrivateRoute exact path="/administracion/ordenes" component={AdminOrders} />
                      <Redirect to="/" />
                  </Switch>
                </AuthState>
              </CartState>
            </ProductState>
          </UserState>
        </OrderState> 
      </AlertState>  
    </Router>
      
  );
}

export default App;