import { REGISTER_PRODUCT_SUCCESSFULY,
        REGISTER_PRODUCT_ERROR,
        LIST_PRODUCT_SUCCESSFULY,
        LIST_PRODUCT_ERROR,
        EDIT_PRODUCT_ERROR,
        DELETE_PRODUCT_ERROR,
        UPDATE_PRODUCT_ERROR } from '../types'
import axios from 'axios';
import { toast } from 'react-toastify';

// Function create product
export const createProduct = (nameProduct, descriptionProduct, priceProduct, amountProduct) => {
    return async (dispatch) => {
        try {
            let valid = false;
            
            await axios({
                method: 'POST',
                url: `http://localhost:4000/create-product`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    name: nameProduct,
                    description: descriptionProduct,
                    price: priceProduct,
                    amount: amountProduct
                }
            }).then(res => {
                if(res.status === 200) {
                    dispatch( createProductSuccessfuly(true) )
                    valid = true;
                }
            }).catch(error => {
                valid = false;
                dispatch( createProductError(error) )
                if(error.response.status === 400 ) {
                    toast.error(error.response.data.message, {
                        theme: 'colored',
                        closeOnClick: false,
                        pauseOnHover: false
                    })
                }
            })

            return valid;

        } catch (error) {
            dispatch( createProductError(error) )
            toast.error(error, {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
        }
    }
}

const createProductSuccessfuly = product => ({
    type: REGISTER_PRODUCT_SUCCESSFULY,
    payload: product
})

const createProductError = estado => ({
    type: REGISTER_PRODUCT_ERROR,
    payload: estado
})



// Function get products
export const getProducts = () => {
    return async (dispatch) => {

        try {
            let valid = false;

            await axios({
                method: 'GET',
                url: 'http://localhost:4000/products',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if(res.status === 200) {
                    dispatch( getProductSuccessfuly(res.data) )
                    valid = true;
                }
            }).catch(error => {
                valid = false;
                dispatch( getProductError(error) )
                if(error.response.status === 400 ) {
                    toast.error(error.response.data.message, {
                        theme: 'colored',
                        closeOnClick: false,
                        pauseOnHover: false
                    })
                }
            })
            
            return valid;

        } catch (error) {
            dispatch( getProductError(error) )

            toast.error(error, {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
        }
    }
}

const getProductSuccessfuly = products => ({
  type: LIST_PRODUCT_SUCCESSFULY,
  payload: products
})

const getProductError = estado => ({
  type: LIST_PRODUCT_ERROR,
  payload: estado
})



// Function edit product
export const editProduct = (idProduct) => {
    return async (dispatch) => {

        try {
            let dataProduct = '';

            await axios({
                method: 'GET',
                url: `http://localhost:4000/edit-product/${idProduct}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if(res.status === 200) {
                    dataProduct = res.data;
                }
            }).catch(error => {
                dataProduct = '';
                dispatch( editProductError(error) )
                toast.error(error, {
                    theme: 'colored',
                    closeOnClick: false,
                    pauseOnHover: false
                })
            })

            return dataProduct;
           
        } catch (error) {
            dispatch( editProductError(error) )
            
            toast.error(error, {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
        }
    }
}

const editProductError = estado => ({
  type: EDIT_PRODUCT_ERROR,
  payload: estado
})



// Function delete product
export const deleteProduct = (idProduct) => {
    return async (dispatch) => {

        try {
            let valid = false;

            await axios({
                method: 'DELETE',
                url: `http://localhost:4000/delete-product/${idProduct}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if(res.status === 200) {
                    toast.success(res.data.message, {
                        theme: 'colored',
                        closeOnClick: false,
                        pauseOnHover: false
                    })

                    valid = true;
                }
            }).catch(error => {
                valid = false;
                dispatch( deleteProductError(error) )
                toast.error(error, {
                    theme: 'colored',
                    closeOnClick: false,
                    pauseOnHover: false
                })
            })

            return valid;
            
        } catch (error) {
            dispatch( deleteProductError(error) )

            toast.error(error, {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
        }
    }
}

const deleteProductError = estado => ({
  type: DELETE_PRODUCT_ERROR,
  payload: estado
})




// Function update product
export const updateProduct = (idProduct, nameProduct, descpProduct, priceProduct, amountProduct) => {
    return async (dispatch) => {

        try {
            let valid = false;

            await axios({
                method: 'PUT',
                url: `http://localhost:4000/update-product/${idProduct}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    name: nameProduct,
                    description: descpProduct,
                    price: priceProduct,
                    amount: amountProduct
                }
            }).then(res => {
                if(res.status === 200) {
                    toast.success(res.data.message, {
                        theme: 'colored',
                        closeOnClick: false,
                        pauseOnHover: false
                    })

                    valid = true;
                }
            }).catch(error => {
                valid = false;
                dispatch( updateProductError(error) )
                
                if(error.response.status === 400 ) {
                    toast.error(error.response.data.message, {
                        theme: 'colored',
                        closeOnClick: false,
                        pauseOnHover: false
                    })
                }
            })

            return valid;
            
        } catch (error) {
            dispatch( updateProductError(error) )

            toast.error(error, {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
        }
    }
}

const updateProductError = estado => ({
  type: UPDATE_PRODUCT_ERROR,
  payload: estado
})



