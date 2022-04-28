import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const firstName = sessionStorage.getItem('firstName')
    const lastName = sessionStorage.getItem('lastName')

    const cerrarSesion = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('lastName')
        sessionStorage.removeItem('firstName')
        sessionStorage.clear()
    }


    return (
        <div className='row'>
            <div className='col-12'>
                <nav className="navbar navbar-expand-lg navbar-light Content_navbar">
                    <div className="container-fluid">
                        <a className="navbar-brand text-white" href="#!">DraKetech</a>
                        <p className='text-white'>User: {firstName} {lastName} </p>
                        <Link to='/user/login' className='btnLogount' onClick={() => cerrarSesion()}>Logout</Link>
                    </div>
                </nav>
            </div>
        </div>
    );
}
 
export default Navbar;