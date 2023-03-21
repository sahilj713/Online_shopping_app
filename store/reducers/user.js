import {SET_USER} from '../actions/user';

const initialState = {
    id:'',
    user_name : ''
};

export default(state = initialState, action) =>{
    switch(action.type){
        case SET_USER:
            return{
                id:action.id,
                user_name:action.user_name
            };
    }

    return state;
};