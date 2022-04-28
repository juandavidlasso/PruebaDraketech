import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../redux/actions/productActions';

const Update = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { _id, name, description, price, amount } = location.state.data

    // State
    const [ newUser, setNewUser ] = useState({
        name: name,
        description: description,
        price: price,
        amount: amount
    })

    // OnChange
    const actualizarState = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const updateProducts = (idProduct, nameProduct, descpProduct, priceProduct, amountProduct) => dispatch( updateProduct(idProduct, nameProduct, descpProduct, priceProduct, amountProduct) )

    // Submit
    const submitUpdateUser = async (e) => {
        e.preventDefault()

        // Fetch redux
        updateProducts(_id, newUser.name, newUser.description, newUser.price, newUser.amount).then( (res) => {
            if(res) {
                navigate('/user/profile');
            }
        })
    }

    return (
        <div className='row'>
            <div className='col-12'>
                <div className='col-12 text-center p-4'>
                    <div className='Content_form_profile p-4 mt-4'>
                        <h1 className='Content_form_profile_h1'>
                            Edit Product
                        </h1>
                        <div className='Content_form_profile_table mt-5'>
                            <form onSubmit={submitUpdateUser}>
                                <div className="mb-3 text-start">
                                    <label htmlFor='name' className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name='name' defaultValue={name} onChange={actualizarState} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor='description' className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' defaultValue={description} onChange={actualizarState} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor='price' className="form-label">Price</label>
                                    <input type="text" className="form-control" id="price" name='price' defaultValue={price} onChange={actualizarState} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor='amount' className="form-label">Amount</label>
                                    <input type="text" className="form-control" id="amount" name='amount' defaultValue={amount} onChange={actualizarState} />
                                </div>
                                <div className="mb-3 form-check">
                                    <button type="submit" className="Content_form_button1 me-5 mb-3">Update</button>
                                    <Link to='/user/profile' className='btnEdit1'>Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Update;