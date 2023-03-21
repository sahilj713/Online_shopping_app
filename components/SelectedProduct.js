import React,{useState} from 'react';
import {View,Text,TextInput,StyleSheet,Image,Button,TouchableOpacity,TouchableNativeFeedback,Platform,Modal} from 'react-native';
// import ImageViewer from 'react-native-image-zoom-viewer';
// import NumericInput from 'react-native-numeric-input';


import Colors from '../constants/Colors'


const SelectedProduct = props => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS==='android' && Platform.Version >=21){
        TouchableCmp=TouchableNativeFeedback;
    }
    // const [quantity,setQuantity]=useState(0);
    

    return(
        <View style={styles.product}>
        <View style={styles.touchable}> 
        <TouchableCmp onPress={props.onPress} useForeground> 
        <View>
        <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: props.image}} />
        </View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>Rs.{props.price}/-</Text>
        <Text style={styles.description}>{props.description}</Text>
        <View style={styles.actions}>
            {/* <Button color ={Colors.primary} title='View Details' onPress={props.onViewDetail} /> */}
            {/* <NumericInput value={this.state.value} onChange={value => this.setState({value})} /> */}
            <View style={styles.quantity}>
            <Button color={Colors.primary} title=' - ' onPress={props.onDecrement} disabled={props.check}
            // {() =>{
            //       const newQuantity=parseInt(quantity) - 1;
            //       setQuantity(newQuantity);
                  
            //   }}
            //   disabled={quantity===0}
            //   {quantity===0}
              
               />
            {<Text style={styles.quantityValue}> {props.quantityValue}  </Text>}
            <Button color={Colors.primary} title=' + ' onPress={props.onIncrement}
            // {() =>{
            //       const newQuantity=parseInt(quantity) + 1;
            //       setQuantity(newQuantity);
                  
            //   }} 
            />
            </View>
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
        fontSize:20,
        marginVertical:2,
        textAlign:'center',
        height:'10%',
        fontFamily:'open-sans-bold'
        
        
    },
    price:{
        fontSize:14,
        color:'#ff4c68',
        textAlign:'center',
        height:'5%',
        padding:1,
        fontFamily:'open-sans'

    },
    description:{
        fontSize:14,
        marginVertical:4,
        textAlign:'center',
        height:'5%',
        fontFamily:'open-sans'

    },
    
    quantity:{
        flexDirection:'row',
        },
    
    quantityValue:{
        fontFamily:'open-sans-bold',
        fontSize:16
    },    
    
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginBottom:-10,
        height:'20%'
    }
});

export default SelectedProduct;
