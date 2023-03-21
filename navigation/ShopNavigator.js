import React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import {Platform,SafeAreaView,View,Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';

import ProductsOverviewScreen from '../screens/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import CategoryLehngaScreen from '../screens/CategoryLehngaScreen';
import CategorySareeScreen from '../screens/CategorySareeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Colors from '../constants/Colors';
import AuthScreen from '../screens/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/actions/auth';
// import AuthScreenSignUp from '../screens/AuthScreenSignUp';

const ProductsNavigator = createStackNavigator({
    ProductsOverview : ProductsOverviewScreen,
    ProductDetails : ProductDetailsScreen,
    Cart : CartScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig =>(
            <Ionicons 
                name={Platform.OS==='android'?'md-cart': 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTitleStyle:{
            fontFamily:'open-sans-bold'
        },
        headerBackTitleStyle:{
            fontFamily:'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? Colors.accent : Colors.primary
    }
});

const OrdersNavigator= createStackNavigator(
    {
     Orders:OrderScreen
    },
    { 
        navigationOptions:{
            drawerIcon: drawerConfig =>(
                <Ionicons 
                    name={Platform.OS==='android'?'md-list': 'ios-list'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor:Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTitleStyle:{
                fontFamily:'open-sans-bold'
            },
            headerBackTitleStyle:{
                fontFamily:'open-sans'
            },
            headerTintColor: Platform.OS === 'android' ? Colors.accent : Colors.primary
        }
    }
);

const CategoryLehngaNavigator= createStackNavigator(
    {
     CategoryLehnga:CategoryLehngaScreen
    },
    { 
        navigationOptions:{
            drawerIcon: drawerConfig =>(
                <Ionicons 
                    name={Platform.OS==='android'?'md-arrow-forward': 'ios-arrow-forward'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor:Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTitleStyle:{
                fontFamily:'open-sans-bold'
            },
            headerBackTitleStyle:{
                fontFamily:'open-sans'
            },
            headerTintColor: Platform.OS === 'android' ? Colors.accent : Colors.primary
        }
    }
);

const CategorySareeNavigator= createStackNavigator(
    {
     CategorySaree:CategorySareeScreen
    },
    { 
        navigationOptions:{
            drawerIcon: drawerConfig =>(
                <Ionicons 
                    name={Platform.OS==='android'?'md-arrow-forward': 'ios-arrow-forward'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor:Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTitleStyle:{
                fontFamily:'open-sans-bold'
            },
            headerBackTitleStyle:{
                fontFamily:'open-sans'
            },
            headerTintColor: Platform.OS === 'android' ? Colors.accent : Colors.primary
        }
    }
);

const ProfileNavigator= createStackNavigator(
    {
     Profile:ProfileScreen
    },
    { 
        navigationOptions:{
            drawerIcon: drawerConfig =>(
                <Ionicons 
                    name={Platform.OS==='android'?'md-person': 'ios-person'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor:Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTitleStyle:{
                fontFamily:'open-sans-bold'
            },
            headerBackTitleStyle:{
                fontFamily:'open-sans'
            },
            headerTintColor: Platform.OS === 'android' ? Colors.accent : Colors.primary
        }
    }
);



const ShopNavigator = createDrawerNavigator(
    {
    Products:ProductsNavigator,
    Orders:OrdersNavigator,
    Lehnga:CategoryLehngaNavigator,
    Saree:CategorySareeNavigator,
    Profile:ProfileNavigator
    },
    {
    contentOptions:{
        activeTintColor:Colors.primary
    },
    contentComponent: props =>{
        const dispatch = useDispatch();
       return <View style={{flex:1,paddingTop:20 }}>
           <SafeAreaView forceInset = {{top:'always', horizontal:'never'}}>
               <DrawerItems {...props} />
               <Button title='Logout' color={Colors.primary} onPress={() => {
                   dispatch(authActions.logout());
                   props.navigation.navigate('Auth');
               }} /> 
           </SafeAreaView>
       </View>
    }    
    }
);

const AuthNavigator = createStackNavigator({
    Auth:AuthScreen
    
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTitleStyle:{
            fontFamily:'open-sans-bold'
        },
        headerBackTitleStyle:{
            fontFamily:'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? Colors.accent : Colors.primary
    }
});




const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth:AuthNavigator,
    // AuthSignUp:AuthNavigatorSignUp,
    Shop:ShopNavigator
});

export default createAppContainer(MainNavigator);