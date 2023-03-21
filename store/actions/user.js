export const ADD_USER = 'ADD_USER';
export const SET_USER = 'SET_USER';

import User from '../../models/User';



export const addUser= (userName,companyName,gstNo,mobileNo,address,email,password) => {
      return async (dispatch,getState) =>{
        //   const user_id = getState.user.userId;
        //   console.log(user_id);
          const response = await fetch(
            'https://nakhrali-saree-app.firebaseio.com/users.json',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    userName,
                    companyName,
                    gstNo,
                    mobileNo,
                    address,
                    email,
                    password
                })
            }

          );

          if(!response.ok){
              throw new Error('Something went wrong');
          }
          const resData = await response.json();
        //   console.log(resData);
        

          dispatch({
              type:ADD_USER,
              id:resData.name,
              user_name:userName,
              company_name:companyName,
              gst_no:gstNo,
              mobile_no:mobileNo,
              address:address,
              email:email,
              password:password
            });
      }
}

export const fetchUsers = () => {
    return async (dispatch,getState) => {
        const  userId = getState().user.userId;
        // console.log(userId);
        // console.log(getState());
        try{
            const response = await fetch(
            `https://nakhrali-saree-app.firebaseio.com/users/${userId}.json`
         );

        if (!response.ok){
            throw new Error('something went wrong!');
        }

        const resData = await response.json();
        // console.log(resData);
        // const id =resData.name;
        // const user_name=resData.userName;
    
        dispatch({type: SET_USER});
    }catch(err){
        throw err;
    }
    };
};