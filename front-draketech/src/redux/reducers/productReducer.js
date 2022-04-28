import { REGISTER_PRODUCT_SUCCESSFULY,
        REGISTER_PRODUCT_ERROR,
        LIST_PRODUCT_SUCCESSFULY, 
        LIST_PRODUCT_ERROR,
        EDIT_PRODUCT_ERROR,
        DELETE_PRODUCT_ERROR,
        UPDATE_PRODUCT_ERROR } from '../types'

// State
const initialState = {
    error: null,
    loading: false,
    products: []
}

// eslint-disable-next-line
export default function(state = initialState, action) {
    switch (action.type) {
        case LIST_PRODUCT_SUCCESSFULY:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload
            }
        case REGISTER_PRODUCT_ERROR:
        case LIST_PRODUCT_ERROR:
        case EDIT_PRODUCT_ERROR:
        case DELETE_PRODUCT_ERROR:
        case UPDATE_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case REGISTER_PRODUCT_SUCCESSFULY:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }
    default:
        return state
    }
}
