import React ,{useReducer,useCallback,useState,useEffect}from 'react';
import {View,StyleSheet,KeyboardAvoidingView,ScrollView,Button,Text,ActivityIndicator,Alert} from 'react-native';
import LinearGradient from 'expo-linear-gradient';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {useDispatch} from 'react-redux';

import Input from '../components/Input';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/HeaderButton';
import * as authActions from '../store/actions/auth';
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

const AuthScreen = props => {
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState();
    const [isSignup,setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState,dispatchFormState] = useReducer(formReducer,{
        inputValues:{
           email:'',
           password:'',
           userName:''
        },
        inputValidities:{
         email:false,
         password:false,
         userName:false
        },
        formIsValid:false    
    }); 

    useEffect(() => {
        if(error) {
            Alert.alert('An Error Occurred!',error,[{text:'Okay'}]);
        }
    },[error]);

    const authHandler = async () => {
        let action;
        if(isSignup){
            action=authActions.signup(formState.inputValues.email,formState.inputValues.password);
        }else{
            action=authActions.login(formState.inputValues.email,formState.inputValues.password);
        }
        setError(null);
        setIsLoading(true);
        try{
        await dispatch(action);
        props.navigation.navigate('Shop');
        } catch(err) {
        setError(err.message);
        setIsLoading(false);

        }
    };

    // const authLoginHandler = async () => {
    //     setError(null);
    //     setIsLoading(true);
    //     try{
    //         await dispatch(authActions.login(formState.inputValues.email,formState.inputValues.password));
    //         props.navigation.navigate('Shop');
    //     } catch(err){
    //         setError(err.message);
    //         setIsLoading(false);
    //     }
    // }

    // const authSignupHandler = async () => {
    //     setError(null);
    //     setIsLoading(true);
    //     try{
    //         await dispatch(authActions.signup(formState.inputValues.email,formState.inputValues.password));
    //         // props.navigation.navigate('Shop');
    //     } catch(err){
    //         setError(err.message);
    //         setIsLoading(false);
    //     }
    // }

    // const setUserHandler = () => {
    //     dispatch(userActions.fetchUsers());
    // }

    const userHandler =  async () => {
        await dispatch(
            userActions.addUser(
                formState.inputValues.userName,
                formState.inputValues.companyName,
                formState.inputValues.gstNo,
                formState.inputValues.mobileNo,
                formState.inputValues.address,
                formState.inputValues.email,
                formState.inputValues.password
                ));
    };

    // const setUserHandler = () =>{
    //     dispatch(userActions.fetchUsers())
    // }

    const functionCombined = () => {
        authHandler();
        // authSignupHandler();
        userHandler();

      }

    // const loginFunctionCombined = () => {
    //     authHandler();
    //     setUserHandler();
    // }  

    // const inputChangeHandler = useCallback((inputIdentifier,inputValue,inputValidity) => {
    //     dispatchFormState({
    //         type:FORM_INPUT_UPDATE,
    //         value:inputValue,
    //         isValid:inputValidity,
    //         input:inputIdentifier
    //     });
    // },[dispatchFormState]
    // );

    const textChangeHandler = useCallback((inputIdentifier, text) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let isValid = false;
        if(text.trim().length > 0){
            isValid = true;
        }

        if(inputIdentifier==='email'){
            let isValid=false;
            if(emailRegex.test(text.toLowerCase())) {
                isValid = true;
            }
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
    
    });
if(!isSignup){
   return(
       <KeyboardAvoidingView 
       behavior='height'
       keyboardVerticalOffset= {50} 
       style={styles.screen}
       >
         <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient}>
           <Card style={styles.authContainer}>
               <ScrollView>
                   <Input
                     id='email'
                     label='E-Mail'
                     keyboardType='email-address'
                     autoCapitalize='none'
                     onChangeText={textChangeHandler.bind(this,'email')}
                     value={formState.inputValues.email}                     
                    />

                    <Input
                     id='password'
                     label='Password'
                     keyboardType='default'
                     secureTextEntry
                     autoCapitalize='none'
                     onChangeText={textChangeHandler.bind(this,'password')}
                     value={formState.inputValues.password}                      
                    />
                <View style={styles.buttonContainer}>
                {isLoading ? (
                    <ActivityIndicator size='small' color={Colors.primary} />
                ):(
                    <Button title={isSignup ? 'Sign Up' : 'Login'} color={Colors.primary} onPress={authHandler} />

                )
                }
                </View>
                <View style={styles.buttonContainer}>
                <Button title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`} 
                color={Colors.accent2} 
                onPress={() => {setIsSignup(prevState => !prevState)}} />
                </View>

               </ScrollView>
           </Card>
           </LinearGradient>
       </KeyboardAvoidingView>
   );

}else{
    return(
        <KeyboardAvoidingView 
        behavior='height'
        keyboardVerticalOffset= {50} 
        style={styles.screen}
        >
          <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient}>
            <Card style={styles.authContainer}>
                <ScrollView>

                    <Input
                      id='userName'
                      label='User Name'
                      keyboardType='default'
                      autoCapitalize='words'
                      onChangeText={textChangeHandler.bind(this,'userName')}
                      value={formState.inputValues.userName}                     
                     />

                    <Input
                      label='company name'
                      value={formState.inputValues.companyName}
                      onChangeText={textChangeHandler.bind(this,'companyName')}
                      keyboardType='default'
                      returnKeyType='next'
                      autoCapitalize='words'
                     />

                    <Input
                      label="GST No."
                      value={formState.inputValues.gstNo}
                      onChangeText={textChangeHandler.bind(this,'gstNo')}
                      keyboardType='default'
                      autoCapitalize='characters'
                      returnKeyType='next'
                     />

                    <Input
                      label="Mobile No."
                      value={formState.inputValues.mobileNo}
                      onChangeText={textChangeHandler.bind(this,'mobileNo')}
                      keyboardType='number-pad'
                      returnKeyType='next'
                     />

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

                    <Input
                      id='email'
                      label='E-Mail'
                      keyboardType='email-address'
                      autoCapitalize='none'
                      onChangeText={textChangeHandler.bind(this,'email')}
                      value={formState.inputValues.email}                     
                     />
 
                     <Input
                      id='password'
                      label='Password'
                      keyboardType='default'
                      secureTextEntry
                      autoCapitalize='none'
                      onChangeText={textChangeHandler.bind(this,'password')}
                      value={formState.inputValues.password}                      
                     />
                 <View style={styles.buttonContainer}>
                 <Button title={isSignup ? 'Sign Up' : 'Login'} color={Colors.primary} onPress={functionCombined} />
                 </View>
                 <View style={styles.buttonContainer}>
                 <Button title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`} 
                 color={Colors.accent2} 
                 onPress={() => {setIsSignup(prevState => !prevState)}} />
                 </View>
 
                </ScrollView>
            </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}
}

AuthScreen.navigationOptions=navData=>{
    return{
    headerTitle:'Authenticate',
    headerRight:() =>(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title='sign-up'
                iconName={Platform.OS === 'android'?'md-log-in' : 'ios-log-in'}
                onPress={() => {
                    // navData.navigation.navigate('AuthScreenSignUp');
                }}
            />
        </HeaderButtons>
    )
 }
};

const styles=StyleSheet.create({
screen:{
    flex:1,
    
},
gradient:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
authContainer:{
    width:'80%',
    maxWidth:400,
    maxHeight:400,
    padding:20
},
buttonContainer:{
    marginTop:10
}
});

export default AuthScreen;