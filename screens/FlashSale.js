
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet ,Image,Dimensions ,FlatList,ActivityIndicator,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// AsyncStorage
export default class FlashSale extends Component{
    constructor(props){
        super(props);

        this.state={
            data : [],
            isLoading : true,
            isClick : true
        };
    }

    componentDidMount() {
        fetch('http://'+global.URL+'/myshoe/public/api/fll')
          .then((response) => response.json())
          .then((json) => {
            this.setState({ data: json });
          })
          .catch((error) => console.error(error))
          .finally(() => {
            this.setState({ isLoading: false });
          });
      }

    numberWithCommas =(x)=> {
      x = x.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x))
          x = x.replace(pattern, "$1,$2");
      return x;
    }

    renderItem = ({item,index})=>{
        return (
            
            <TouchableOpacity style={styles.item}
             onPress={()=>{this.props.navigation.navigate('details',
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
                 style={{ width:windoww*0.3, height:windowH*0.19, borderRadius :6,paddingTop : 5 }}></Image>
                  <Text style={{ textAlign  : "center",fontSize : 11 }}>{item.name}</Text>
                 <View style={{ flex : 1, flexDirection :"row", margin : 3 }}>
                    <Text style={{flex:1,fontSize : 11,color : "#777777", textDecorationLine:"line-through" }}>{this.numberWithCommas(item.price)}đ</Text>
                    <Text style={{flex:1, fontSize :11,color : "red"}}>{this.numberWithCommas(item.promotional)}đ</Text>
                </View>
            </TouchableOpacity>
            
        );
    }

render(){
 
    const { data , isLoading ,isClick} = this.state;
    return(
        <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#F767C3', '#8fcbbc']}
          style={styles.background}  
        >
            <View style={{ flex : 1, flexDirection :'row',marginBottom : 3,maxHeight : 25}}>
                <Text style ={styles.text}>{this.props.text}</Text>
                <Text style={{ flex: 1, color : "white",textAlign : "right" ,marginRight : 5,marginTop : 5,height :20}}> {this.props.seeMore}</Text>
                
            </View>
           <View style={styles.itemview}>
           {isLoading ? <ActivityIndicator color="red" size="large"/> : (
          <FlatList
          horizontal
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={this.renderItem}
          />
        )}
           </View>
        </LinearGradient>
      </View>
    );
 }

}
const windowH = Dimensions.get('window').height;
const windoww = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      height : windowH*0.35,
      marginTop : 5,
      borderRadius : 5
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: windowH*0.35,
      borderRadius : 5,
      borderWidth : 1,
      borderTopColor : "red"
    },
    text:{
        fontFamily : "flashsale",
        fontSize : 17,
        color : 'white',
        marginLeft : 5,
        marginTop : 5,
        flex : 1,
        textAlign : "left",
        height : 20

    },
    itemview: {
        flex : 1,
        alignContent: "center",
        marginLeft : 4,
    },
    item : {
        backgroundColor : "white",
        width: windoww*0.33,
        marginHorizontal : 5,
        alignItems : "center",
        marginVertical : 4,
        borderRadius : 6,
        borderColor : "red",
        borderWidth : 1,
        borderColor : "red"
        
        
    },
    red : {
        color : "red"
    },
    pink : {
        color : "pink"
    },
})

