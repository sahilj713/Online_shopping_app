import React from 'react';
import {View,StyleSheet,KeyboardAvoidingView,ScrollView,Button} from 'react-native';
import LinearGradient from 'expo-linear-gradient';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

import Input from '../components/Input';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/HeaderButton';


const AuthScreenSignUp = props => {
   return(
       <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset= {20} style={styles.screen}>
         <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient}>
           <Card style={styles.authContainer}>
               <ScrollView>
                   <Input
                     id='email'
                     label='E-Mail'
                     keyboardType='email-address'
                     autoCapitalize='none'
                     onInputChange={() =>{}}
                     initialValue=''                      
                    />

                    <Input
                     id='password'
                     label='Password'
                     keyboardType='default'
                     secureTextEntry
                     autoCapitalize='none'
                     onInputChange={() =>{}}
                     initialValue=''                      
                    />
                <View style={styles.buttonContainer}>
                <Button title='Login' color={Colors.primary} onPress={() => {}} />
                </View>
                <View style={styles.buttonContainer}>
                <Button title='Switch to Sign-up' color={Colors.accent2} onPress={() => {}} />
                </View>

               </ScrollView>
           </Card>
           </LinearGradient>
       </KeyboardAvoidingView>
   );
};

AuthScreenSignUp.navigationOptions={
    headerTitle:'Authenticate2',
    headerRight:() =>(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title='sign-up'
                iconName={Platform.OS === 'android'?'md-log-in' : 'ios-log-in'}
                onPress={() => {
                    // navData.navigation.navigate('');
                }}
            />
        </HeaderButtons>
    )
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

export default AuthScreenSignUp;