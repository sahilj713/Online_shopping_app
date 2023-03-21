import PRODUCTS from '../../data/dummy-data';

const initialState = {
    availableProducts : PRODUCTS
};

export default (state = initialState , action) => {
    return state;
}