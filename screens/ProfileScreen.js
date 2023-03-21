import React, {useState,useCallback,useEffect,useReducer} from 'react';
import {ScrollView,View,Button,StyleSheet,Text,Platform, Alert,KeyboardAvoidingView} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {useDispatch, useSelector} from 'react-redux';

import CustomHeaderButton from '../components/HeaderButton';
import Input from '../components/Input';
import * as userActions from '../store/actions/user';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state,action) => {
    if(action.type === FORM_INPUT_UPDATE){
       const updatedValues = {
           ...state.inputValues,
           [action.input] : action.value
       };

       const updatedValidities = {
        ...state.inputValidities,
        [action.input] : action.isValid
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidities){
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

       return{
           inputValues: updatedValues,
           inputValidities:updatedValidities,
           formIsValid: updatedFormIsValid
       };
    }
    return state;
};

const ProfileScreen = props =>{

    const dispatch = useDispatch();
    // const id=useSelector(state => state.user.id)
    // const user_name = useSelector(state => state.user.user_name);

    // useEffect(()=>{
    //     dispatch(userActions.fetchUsers());
    // });

  const [formState,dispatchFormState] = useReducer(formReducer,{
       inputValues:{
           userName:'',
           companyName:'',
           gstNo:'',
           mobileNo:'',
           address:''
       },
       inputValidities:{
        userName:false,
        companyName:false,
        gstNo:false,
        mobileNo:false,
        address:false
       },
       formIsValid:false    
   }); 

    // const [userName,setUserName] = useState('');
    // const [userNameIsValid,setUserNameIsValid] = useState(false);
    // const [companyName,setCompanyName] = useState('');
    // const [gstNo,setGstNo] = useState('');
    // const [mobileNo,setMobileNo] = useState('');
    // const [address,setAddress] = useState('');

    const submitHandler= useCallback(() =>{
        if(!formState.formIsValid){
            Alert.alert('Wrong input!','Please check the errors in the form.',[
            {text:'Okay'}
            ]);
            return;
        }
        console.log('Submitting!');
        props.navigation.navigate('ProductsOverview');
    },[formState]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler});
    },[submitHandler]);

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if(text.trim().length > 0){
            isValid = true;
        }
        if(inputIdentifier==='mobileNo'){
            isValid=false;
            if(text.trim().length===10){
                isValid = true;
            }
        }
        if(inputIdentifier==='gstNo'){
            isValid=false;
            if(text.trim().length===15){
                isValid = true;
            }
        }
        dispatchFormState({
            type:FORM_INPUT_UPDATE, 
            value:text, 
            isValid:isValid,
            input:inputIdentifier
        });
    };

    // useEffect(() => {
    //      dispatch(userActions.fetchUsers());
    // },[dispatch]);

return(
    <KeyboardAvoidingView style={{flex:1}} behavior='padding' keyboardVerticalOffset={50}>
    <ScrollView>
    <View>


    <Input
    label='user name'
    value={formState.inputValues.userName}
    // {formState.inputValues.userName} 
    onChangeText={textChangeHandler.bind(this,'userName')}
    keyboardType='default'
    returnKeyType='next'
    autoCapitalize='words'
     />
{!formState.inputValues.userName && <Text>  Please enter a valid User Name!</Text>}

    <Input
    label='company name'
    value={formState.inputValues.companyName}
    onChangeText={textChangeHandler.bind(this,'companyName')}
    keyboardType='default'
    returnKeyType='next'
    autoCapitalize='words'
     />
{!formState.inputValues.companyName && <Text>  Please enter a valid company Name!</Text>}


    <Input
    label="GST No."
    value={formState.inputValues.gstNo}
    onChangeText={textChangeHandler.bind(this,'gstNo')}
    keyboardType='default'
    autoCapitalize='characters'
    returnKeyType='next'
     />
{!formState.inputValues.gstNo && <Text>  Please enter a valid GST Number!</Text>}


     <Input
    label="Mobile No."
    value={formState.inputValues.mobileNo}
    onChangeText={textChangeHandler.bind(this,'mobileNo')}
    keyboardType='number-pad'
    returnKeyType='next'
    />
{!formState.inputValues.mobileNo && <Text>  Please enter a valid Mobile Number!</Text>}


    <Input
    label="Address"
    value={formState.inputValues.address}
    onChangeText={textChangeHandler.bind(this,'address')}
    keyboardType='default'
    returnKeyType='next'
    autoCapitalize='words'
    multiline
    numberOfLines={3}
     />
{!formState.inputValues.address && <Text>  Please enter a valid Address!</Text>}

     </View>
     </ScrollView>
     </KeyboardAvoidingView>
);

}

ProfileScreen.navigationOptions = navData => { 
    const submitFn = navData.navigation.getParam('submit');

    return{
    headerTitle:'Profile',
    headerLeft:() => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title='Menu'
                iconName={Platform.OS === 'android'?'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
     ),
     headerRight:() =>(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title='save'
                iconName={Platform.OS === 'android'?'md-checkmark' : 'ios-checkmark'}
                onPress={submitFn}
            />
        </HeaderButtons>
    )
    
    }
}

const styles=StyleSheet.create({

});

export default ProfileScreen;