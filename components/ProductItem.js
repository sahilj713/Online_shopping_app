import React, { version } from 'react';
import {View,Text,StyleSheet,Image,Button,TouchableOpacity,TouchableNativeFeedback,Platform} from 'react-native';

import Colors from '../constants/Colors'

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS==='android' && Platform.Version >=21){
        TouchableCmp=TouchableNativeFeedback;
    }

    return(
        <View style={styles.product}>
        <View style={styles.touchable}>
        <TouchableCmp onPress={props.onViewDetail} useForeground>
        <View>
        <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: props.image}} />
        </View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>Rs.{props.price}/-</Text>
        <View style={styles.actions}>
            <Button color ={Colors.primary} title='View Details' onPress={props.onViewDetail} />
            <Button color ={Colors.primary} title='Add to Cart' onPress={props.onAddToCart} />
        </View>
        </View>
        </TouchableCmp>
        </View>
        </View>

    );
};

const styles= StyleSheet.create({
    product:{
        
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'#fff',
        height:400,
        margin:20,
    },
    touchable:{
        overflow:'hidden',
        borderRadius:10
    },
    imageContainer:{
        width:'100%',
        height:'60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    },
    image:{
        width:'100%',
        height:'100%'
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:18,
        marginVertical:4,
        textAlign:'center',
        height:'7.5%',
        
        
    },
    price:{
        fontFamily:'open-sans',
        fontSize:14,
        color:'#ff4c68',
        textAlign:'center',
        height:'7.5%',
        padding:5

    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:20,
        height:'25%'
    }
});

export default ProductItem;