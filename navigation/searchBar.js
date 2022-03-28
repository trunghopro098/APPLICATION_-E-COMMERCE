
import React, { Component } from "react";
import { View, Text,TextInput,Dimensions,StyleSheet,Image,TouchableOpacity } from "react-native";


export default class SearchBar extends Component{


    
    render(){
        return(
            <View style={{ backgroundColor : "#EDECFC", height : WindowH*0.074}} >
                <View style={styles.textInput} onFocus={()=>{alert("xin chao")}}>
                <TextInput placeholder={'search'} style={{  fontSize :14,width:WindowW*0.7 }}/>

                <Image source={require('../assets/icons/search1.png')} 
                style={{width : 30,height :30, flex :1,marginTop : 3,marginLeft : 20}}
                resizeMode={'contain'}/>
                </View>
            </View>
           
        )
    }
}
const WindowW = Dimensions.get('window').width;
const WindowH = Dimensions.get('window').height;
const styles= StyleSheet.create({
    textInput:{
        flex:1,
        flexDirection:"row",
        width: WindowW*0.97,
        borderColor :'#7520A4',
        borderWidth : 1, 
        marginBottom : 5,
        marginTop : 5,
        marginLeft:5,
        borderRadius : 50,
        paddingLeft : 20,
       
        
    }
})