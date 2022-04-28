import React, { useState } from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInUser } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // State
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    })

    // OnChange
    const actualizarState = e => {
        setUserLogin({
          ...userLogin,
          [e.target.name]: e.target.value
        })
    }

    const { email, password } = userLogin
    const loginUser = (emailUser, passwordUser) => dispatch( signInUser(emailUser, passwordUser) )

    // Submit
    const submitSignIn = async (e) => {
        e.preventDefault()

        // Validation
        if(email.trim() === '' || password.trim() === '') {
            toast.error("Please enter all data", {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            return;
        }

        // Fetch redux
        loginUser(email, password).then( (res) => {
            if(res) {
                navigate('/user/profile');
            }
        })
    }

    return (
        <div className='row'>
            <div className='col-12'>
                <div className='col-md-6 offset-md-3 text-center p-4'>
                    <div className='Content_form p-4 mt-4'>
                        <form onSubmit={submitSignIn}>
                            <div className="mb-3 text-center">
                                <img src={logo} alt='logo' className='Content_form_image' />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="emailAddress" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="emailAddress" name='email' placeholder="Email address" value={email} onChange={actualizarState} />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name='password' placeholder="Password" value={password} onChange={actualizarState} />
                            </div>
                            <div className="mb-3 form-check">
                                <button type="submit" className="Content_form_button mb-3">Sign In</button>
                                <br />
                                <Link to='/user/register'>Do not you have an account? Create an account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Login;