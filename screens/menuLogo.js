
import { data } from 'browserslist';
import React, { Component,useState } from 'react'
import { View, Text,Image,StyleSheet,ActivityIndicator, FlatList,Dimensions,TouchableOpacity } from 'react-native'


export default class Menu extends Component {
    
    constructor(props){
        super(props);
        this.state={
            data : [],
            isLoading  : true,
            isClick  :true
        };
 
    }


    componentDidMount(){
        
        fetch('http://'+global.URL+'/myshoe/public/api/listcategary')
        .then((respone)=>respone.json())
        .then((json)=>{
            this.setState({data: json})
            // console.warn("ffffffffffffff" ,json)
            
        })
        .catch((error)=>console.error(error))
        .finally(()=>{this.setState({isLoading: false});
    });
    }

    renderItem=({item,index})=>{
        const {data, isLoading, isClick} = this.state;
        return(
            <View style={styles.item}>
            <TouchableOpacity onPress={()=>this.setState({isClick : !isClick})}>
                <Image source={{uri:"http://"+global.URL+"/myshoe/public/img/upload/logo/"+item.logo}}
                resizeMode="contain"
                style={{ width  :40, height: 40}}
                ></Image>
            
                <Text style={isClick ?styles.Text2: styles.Text1}>{item.name}</Text>
            </TouchableOpacity>
            </View>
        );
    }

    render(){
        const {data, isLoading, isClick} = this.state;
        return(
            <View style={styles.container}>
                {isLoading ? <ActivityIndicator/> : (
                    <FlatList
                    horizontal
                    data ={data}
                    keyExtractor={({id},index)=>id}
                    renderItem={this.renderItem}
                    />
                )} 
            </View>
        );
    }
}
const windowH = Dimensions.get("window").height;
const windoww = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        height : windowH*0.09,
        flex:1,
        backgroundColor : "white",
        color : "black",
        marginTop : 4,
        borderColor : "#8F1CB0",
        borderWidth :1
    },
    item:{
        width : windowH*0.09,
        height : windowH*0.09,
        marginHorizontal : 5,
        borderRightColor :"red",
        alignContent : "center",
        alignItems : "center",
        borderRightWidth :1,
        backgroundColor  :"white"
        
    },
    Text1  :{
        fontSize : 11,
        color  :"red",
    },
    Text2  :{
        fontSize : 11,
        color  :"black",
    }
})