import React from 'react';
import {View,Text,Button,StyleSheet,FlatList,Platform} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

import ProductItem from '../components/ProductItem';
import PRODUCTS from '../data/dummy-data';
import * as cartActions from '../store/actions/cart';
import CustomHeaderButton from '../components/HeaderButton';

const CategorySareeScreen = props => {
    const products = useSelector(state => state.products.availableProducts).filter(prod => prod.category ==='saree');
    // const uniqueProduct = products.find(prod => prod.id === products.id)
    const dispatch = useDispatch();
  return(
      <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={itemData => (<ProductItem 
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              price={itemData.item.price}
              onViewDetail={()=>{
                  props.navigation.navigate('ProductDetails',{
                      productId: itemData.item.id,
                      productTitle:itemData.item.title
                      }
                    );
              }}
              onAddToCart={() =>{
                  dispatch(cartActions.addToCart(itemData.item,1));
              }}
          />)
          }
       />
  );
}

CategorySareeScreen.navigationOptions = navData => {
    return{
    headerTitle:"Fancy Saree",
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
                title='cart'
                iconName={Platform.OS === 'android'?'md-cart' : 'ios-cart'}
                onPress={() => {
                    navData.navigation.navigate('Cart');
                }}
            />
        </HeaderButtons>
    )
    }
}

const styles= StyleSheet.create({
screen :{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
}
});

export default CategorySareeScreen;