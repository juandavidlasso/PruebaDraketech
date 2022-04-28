import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, editProduct, deleteProduct } from '../redux/actions/productActions';
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const deleteProducts = async (id) => {
        await dispatch( deleteProduct(id) ).then( function(res) {
            if(res) {
                navigate('/user/profile')
                getListProducts();
            }
        })
    }

    const getListProducts = () => dispatch( getProducts() )

    useEffect(() => {
        getListProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const listProducts = useSelector( state => state.products.products)

    const updateProduct = async (id) => {
        await dispatch( editProduct(id) ).then( function(res) {
            navigate('/update-product', { state: { data: res }})
        })
    }

    return (
        <div className='row'>
            <div className='col-8 text-end pe-5 p-3'>
                <h1 className='Content_form_profile_h1'>
                    List Products
                </h1>
                </div>
                <div className='col-4 text-center p-3 pt-5'>
                    <Link to='/create-product' className='btnCreate'>Create Product</Link>
                </div>
            <div className='col-12'>
                <div className='col-12 text-center p-4'>
                    <div className='Content_form_profile p-4 mt-2'>
                        <div className='mt-5'>
                            {listProducts.length === 0 ?
                                'There are no registered products'
                            :
                                <table className='table table-bordered table-responsive table-hover'>
                                    <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td>Description</td>
                                            <td>Price</td>
                                            <td>Amount</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listProducts.map( (product) => (
                                            <tr key={parseInt(product._id, 23)}>
                                                <td>{product.name}</td>
                                                <td>{product.description}</td>
                                                <td>{product.price}</td>
                                                <td>{product.amount}</td>
                                                <td>
                                                    <button
                                                        type='button'
                                                        onClick={ () => updateProduct(product._id)}
                                                        className='btnEdit me-3'
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type='button'
                                                        onClick={ () => deleteProducts(product._id)}
                                                        className='btnEdit'
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Profile;