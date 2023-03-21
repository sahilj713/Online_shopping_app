import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from '../../models/Cart-Item';
import { ADD_ORDER } from "../actions/orders";

const initialState = {
    items:{},
    totalAmount:0
};

export default(state=initialState , action) => {
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodQuantity = action.quantity;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            const totalSum = prodQuantity * prodPrice;

            if(state.items[addedProduct.id]){
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + prodQuantity,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + totalSum
                );
                return{
                    ...state,
                    items:{...state.items , [addedProduct.id]:updatedCartItem},
                    totalAmount:state.totalAmount + totalSum
                };
            }else{
                const newCartItem = new CartItem(
                    // 1,
                    prodQuantity,
                    prodPrice,
                    prodTitle,
                    totalSum
                );
                return{
                    ...state,
                    items:{...state.items,[addedProduct.id]:newCartItem},
                    totalAmount:state.totalAmount + totalSum
                };
            }
        
        case REMOVE_FROM_CART:
            const currentQuantity = state.items[action.pid].quantity;
            let updatedCartItems;
            if(currentQuantity > 1){
                const updatedCartItem=new CartItem(
                    state.items[action.pid].quantity - 1,
                    state.items[action.pid].productPrice,
                    state.items[action.pid].productTitle,
                    state.items[action.pid].sum - state.items[action.pid].productPrice
                );
            updatedCartItems = {...state.items,[action.pid]:updatedCartItem};
            }else{
                updatedCartItems={...state.items};
                delete updatedCartItems[action.pid];
            }
            return{
                ...state,
                items:updatedCartItems,
                totalAmount:state.totalAmount - state.items[action.pid].productPrice
            }

        case ADD_ORDER:
            return initialState;    
    }
    return state;
}