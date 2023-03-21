import React,{useState} from 'react';
import {ScrollView,View,Text,Button,StyleSheet,Image,FlatList,Modal,TextInput} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';


import SelectedProduct from '../components/SelectedProduct';
import * as cartActions from '../store/actions/cart';
// import {quantity} from '../components/SelectedProduct';

const ProductDetailsScreen = props => {
    const [quantity,setQuantity]=useState(1);


    // images=[{
    //     url:'https://cdn1.storehippo.com/s/5b7a7e4a57aaa53f0da2d67a/ms.products/5d9f19fafd35835d140e0954/images/5d9f19fafd35835d140e0955/5d9f19fafd35835d140e0954/webp/5d9f19fafd35835d140e0954-480x480.jpg'
    // }]
    const dispatch = useDispatch();
    const productId = props.navigation.getParam('productId');
    const selectedProduct=useSelector(state => state.products.availableProducts).filter(prod => prod.id === productId);
    return(
    <View style={styles.screen}>
       <FlatList
          data={selectedProduct}
          keyExtractor={item => item.id}
          renderItem={itemData => (<SelectedProduct 
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              price={itemData.item.price}
              description={itemData.item.description}
              
            //   check={quantity===0}
            
              onDecrement={() =>{
                  const newQuantity=parseInt(quantity) - 1;
                  setQuantity(newQuantity);
                  
              }}
            //    /* <Text style={styles.quantityValue}>  {quantity}  </Text> */
            //    display={quantity}
              onIncrement={() =>{
                  const newQuantity=parseInt(quantity) + 1;
                  setQuantity(newQuantity);
                  
              }}
              quantityValue={quantity}
              check={quantity===0}
//               onPress={() => {
//                   return(
//                 <Modal visible={true} transparent={true}>
//     <ImageViewer imageUrls={images}/>
// </Modal>
//                   );
//               }} 
              onAddToCart={() =>{
                  dispatch(cartActions.addToCart(itemData.item,quantity));
              }}
          />
          )
          }
       />
    </View>
    );
};

ProductDetailsScreen.navigationOptions = navData =>{
    return{
        headerTitle:navData.navigation.getParam('productTitle')
    };
}

const styles= StyleSheet.create({
screen :{
    flex:1,
    
}
});

export default ProductDetailsScreen;