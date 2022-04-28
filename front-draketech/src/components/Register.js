import React, { useState } from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // State
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    // OnChange
    const actualizarState = e => {
        setUser({
          ...user,
          [e.target.name]: e.target.value
        })
    }

    const { firstName, lastName, email, password } = user
    const registerUser = (firstNameUser, lastNameUser, emailUser, passwordUser) => dispatch( signUpUser(firstNameUser, lastNameUser, emailUser, passwordUser) )

    // Submit
    const submitSignUp = async (e) => {
        e.preventDefault()

        // Validation
        if(firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '') {
            toast.error("Please enter all data", {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            return;
        }

        // Fetch redux
        registerUser(firstName, lastName, email, password).then( (res) => {
            if(res) {
                toast.success("You has been successfully registered, you can sign in", {
                    theme: 'colored',
                    closeOnClick: false,
                    pauseOnHover: false
                })
                navigate('/user/login');
            }
        })
    }
    
    return (
        <div className='row'>
            <div className='col-12'>
                <div className='col-md-6 offset-md-3 text-center p-4'>
                    <div className='Content_form p-4 mt-2'>
                        <form onSubmit={submitSignUp}>
                            <div className="mb-3 text-center">
                                <img src={logo} alt='logo' className='Content_form_image' />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="name" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="name" name='firstName' placeholder="First Name" value={firstName} onChange={actualizarState} />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="last" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="last" name='lastName' placeholder="Last Name" value={lastName} onChange={actualizarState} />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" name='email' placeholder="Email address" value={email} onChange={actualizarState} />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name='password' placeholder="Password" value={password} onChange={actualizarState} />
                            </div>
                            <div className="mb-3 form-check">
                                <button type="submit" className="Content_form_button mb-3">Sign Up</button>
                                <br />
                                <Link to='/user/login'>Do you have an account? Sign In here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Register;