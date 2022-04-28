import React from 'react';
import jwt_decode from 'jwt-decode';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Update from './components/Update';
import Navbar from './components/Navbar';
import CreateProduct from './components/CreateProduct';


// Protected routes
const isAuthenticated = () => {
  const token = sessionStorage.getItem('token')
  let isValid = true
  try{
    isValid = jwt_decode(token)
  }catch(e){
    return false;
  }
  return isValid;
}

// Component private
const PrivateRoute = ({ children }) => (
  isAuthenticated()
    ? children
    :<Navigate to="/user/login" />
)

const App = () => {

  const location = useLocation();

  return (
    <div className='container-fluid'>
      <Provider store={store}>

        {location.pathname === "/user/profile" ||
        location.pathname === "/update-product" ||
        location.pathname === "/create-product"  ? 
          <Navbar />  
        : 
          null
        }

        <Routes>
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
          <Route path="/update-product" element={<PrivateRoute> <Update /> </PrivateRoute>} />
          <Route path="/create-product" element={<PrivateRoute> <CreateProduct /> </PrivateRoute>} />
          <Route path="*" element={<Navigate to="/user/login" />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
      </Provider>
    </div>
  );
}

export default App;
