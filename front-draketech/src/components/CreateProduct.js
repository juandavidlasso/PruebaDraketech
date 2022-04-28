import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createProduct } from '../redux/actions/productActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // State
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        amount: ''
    })

    // OnChange
    const actualizarState = e => {
        setProduct({
          ...product,
          [e.target.name]: e.target.value
        })
    }

    const { name, description, price, amount } = product
    const registerProduct = (nameProduct, descpProduct, priceProduct, amountProduct) => dispatch( createProduct(nameProduct, descpProduct, priceProduct, amountProduct) )

    // Submit
    const submitCreateProduct = async (e) => {
        e.preventDefault()

        // Validation
        if(name.trim() === '' || description.trim() === '' || price.trim() === '' || amount.trim() === '') {
            toast.error("Please enter all data", {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            return;
        }

        // Fetch redux
        registerProduct(name, description, price, amount).then( (res) => {
            if(res) {
                toast.success("The product has been successfully registered", {
                    theme: 'colored',
                    closeOnClick: false,
                    pauseOnHover: false
                })
                navigate('/user/profile');
            }
        })
    }

    return (
        <div className='row'>
            <div className='col-12'>
                <div className='col-12 text-center p-4'>
                    <div className='Content_form_profile p-4'>
                        <h1 className='Content_form_profile_h1'>
                            Create Product
                        </h1>
                        <div className='Content_form_profile_table mt-5'>
                            <form onSubmit={submitCreateProduct}>
                                <div className="mb-3 text-start">
                                    <label htmlFor='name' className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name='name' value={name} onChange={actualizarState} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor='description' className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' value={description} onChange={actualizarState} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor='price' className="form-label">Price</label>
                                    <input type="text" className="form-control" id="price" name='price' value={price} onChange={actualizarState} />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor='amount' className="form-label">Amount</label>
                                    <input type="text" className="form-control" id="amount" name='amount' value={amount} onChange={actualizarState} />
                                </div>
                                <div className="mb-3 form-check">
                                    <button type="submit" className="Content_form_button1 me-5 mb-3">Create</button>
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
 
export default CreateProduct;