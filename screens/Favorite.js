import React, { Component } from 'react';
import { View, Text, Button,Image, StyleSheet, TouchableOpacity ,ActivityIndicator,FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../navigation/searchBar';
export default class Favorite extends Component{
    constructor(props){
        super(props);
        this.state={
            data : [],
            dataGetFavorite: [],
            dataFavorite : [],
            isLoading : true
        }
        // this.getProduct();
        this.getDatafavorite()
    }

    getDatafavorite = async()=>{
        const dataGetFavorite = this.state.dataGetFavorite;
        const data = this.state.data;
        
       const getData = await AsyncStorage.getItem("PRODUCTFAVORITE")
       const A = [];
        if(getData != null){
            
            this.setState({dataGetFavorite : JSON.parse(getData)})
            for(let i = 0; i < dataGetFavorite.length ;i++ ){
               
                for(let j = 0; j < data.length ; j++){
                    
                    if(data[j].id == dataGetFavorite[i].id){
                     
                        A.push(data[j])
                    }
                    
                }
            }
            this.setState({dataFavorite : A,isLoading:false});
        
            // console.log(this.state.dataFavorite)
        }

    }
    getProduct = ()=> {
        fetch('http://'+global.URL+'/myshoe/public/api/products')
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({data : json});
            this.getDatafavorite();     
        })
        .catch((err)=>{
            console.log(err);

        })
        .finally(()=>{
           
        });
    }
    componentDidMount(){
        this.props.navigation.addListener('focus',()=>{
           this.getProduct();
       })
    }
    numberWithCommas =(x)=> {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }
    renderItem = ({item,type})=>{
        return(
            <TouchableOpacity style={styles.item} onPress={()=>{this.props.navigation.navigate('details',
            { id:item.id,
              name : item.name,
              description : item.description,
              quantity  : item.quantity,
              price : item.price,
              promotional : item.promotional,
              image : item.image,
              status :item.status,
              idCategory  : item.idCategory,
              idProductType : item.idProductType
            }) }}> 
                 <Image source={{uri:"http://"+global.URL+"/myshoe/public/img/upload/product/"+item.image}}
                 resizeMode="contain"
                 style={{ width:150, height:170, borderRadius :10 }}></Image>
                  <Text style={{ textAlign  : "center" }}>{item.name}</Text>
                 <View style={ styles.priceFormat}>
                  {item.promotional==0 ? 
                  (
                  <Text style={styles.textprice1}>{this.numberWithCommas(item.price)} đ</Text>
                  ):
                    <>
                    <Text style={styles.textprice}>{this.numberWithCommas(item.price)} đ</Text>
                    <Text style={styles.textpricepromotion}>{this.numberWithCommas(item.promotional)} đ</Text>
                    </> 
                  }
                  

                </View>
            </TouchableOpacity>
        )
    }

   

render(){
    const {dataFavorite,isLoading} = this.state;
    return(
        <View style={styles.container}>
            <SearchBar/>
           
     <View style={{ flex: 1 }}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={dataFavorite}
            numColumns = {2}
            extraData={dataFavorite}
            keyExtractor={(item)=>item.id}
            renderItem={this.renderItem}
          />
        )}
      </View>
        </View>
    );
}
// export default Favorite;
}
const styles = StyleSheet.create({
    container : {
        flex : 1,

        backgroundColor : '#8fcbbc'
        
    },
    item : {
        flex : 1,
        alignContent : "center",
        alignItems: "center",
        marginTop : 5,
        marginLeft : 5,
        marginRight : 5,
        backgroundColor : "white",
        borderRadius :10,
        borderWidth : 0.5,
        borderColor : "#8F1CB0"
      
      },
      priceFormat: {
        flex : 1,
        paddingLeft :5,
        marginTop:7,
        alignContent : "center",
        flexDirection:"row"
      },
      textprice : {
        flex : 1,
        color :"#777777",
        textAlign : "center",
        textDecorationLine:"line-through",
        fontSize : 12
        
      },
      textprice1 : {
        flex : 1,
        color :"red",
        textAlign : "center",
        fontSize : 12
        
      },
      textpricepromotion:{
        flex : 1,
        color :"red",
        textAlign : "center",
        
      },
});