import React from 'react';
import {ScrollView,View,Text,StyleSheet,TextInput} from 'react-native';

const Input = props =>{
  return(
    <ScrollView>
    <View style={styles.formControl}>
    <Text style={styles.label}>{props.label}</Text>
    <TextInput
      {...props}
      style={styles.input}
    //   value={inputState.value}
    //   onChangeText={textChangeHandler}
      />
      </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create(
    {
        formControl: {
        width: '100%'
        },
        label: {
          fontFamily: 'open-sans-bold',
          marginVertical: 8,
          marginHorizontal:8
        },
        input: {
          paddingHorizontal: 2,
          paddingVertical: 5,
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          marginLeft:8
        }
});

export default Input;