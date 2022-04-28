import express from 'express'
import { signIn, signUp } from '../controllers/user.controller'
import { createProduct, listProducts, editProduct, deleteProduct, updateProduct } from '../controllers/product.controller'
const router = express.Router();

// Routes
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/create-product', createProduct)
router.get('/products', listProducts)
router.get('/edit-product/:id', editProduct)
router.delete('/delete-product/:id', deleteProduct)
router.put('/update-product/:id', updateProduct)

export default router;