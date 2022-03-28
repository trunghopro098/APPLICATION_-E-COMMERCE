import React, {Component}from 'react';
import { View, Text ,StyleSheet ,Image,FlatList,ActivityIndicator,Dimensions, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export default class Listproduct extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        isLoading: true
      };
    }
  
    componentDidMount() {
      fetch('http://'+global.URL+'/myshoe/public/api/products')
        .then((response) => response.json())
        .then((json) => {
          this.setState({data: json });
          
        })
        .catch((error) => console.log(error))
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
    ListheaderComponent=(props)=>{
        return(
            <LinearGradient colors={["#8F1CB0","#C8C8C8"]} style={styles.backgroundLinear}>
                <View>
                <Text style={{ color : "white",fontSize : 17,fontFamily: "flashsale",marginTop: 5, textAlign  :"center" }}>{this.props.text}</Text>
                </View>
            </LinearGradient>
        );
    }
    render() {
      const { data, isLoading } = this.state;
      return (

          <View style={styles.container}>
                    
                  {isLoading ? <ActivityIndicator /> : (
                    <FlatList 
                    numColumns={2}
                      data={data}
                      keyExtractor={({ id }) => id}
                      renderItem={this.renderItem}
                      ListHeaderComponent={this.ListheaderComponent}
                    />
                  )}
              </View>
        

    
      );
    }
  };
const windowW = Dimensions.get("window").width ;
const windowH = Dimensions.get("window").height ;
const styles = StyleSheet.create({
    container : {
      flex :1,
        backgroundColor : '#C8C8C8',
        marginBottom : 68
    },
    list : {
        flex : 1,
        padding : 8

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
    nameproduce: {
      alignContent : "center",
      textAlign : "center"
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
    btnBuyNow : {
      flex:1,
      borderRadius:10,
      marginBottom : 10,
      flexDirection: 'row',
      justifyContent: 'center',

    },
    backgroundLinear:{
        flex : 1,
        width : windowW,
        height : windowH*0.06,
        borderTopLeftRadius : 5,
        borderTopRightRadius : 5,
        marginTop : 5,
    
    }
});