import React, {useState ,useEffect,Component}from 'react';
import { View, Text, Button, StyleSheet ,Image,FlatList,ActivityIndicator,TouchableOpacity,SafeAreaView, ScrollView} from 'react-native';
import HeaderBanner from './banner';
import FlashSale from './FlashSale';
import Menu from './menuLogo';
import SellingTop from './sellingTop';
import Listproduct from '../screenListproduct/listProduct';
import SearchBar from '../navigation/searchBar';

 function VirtualizedView(props) {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => "dummy"}
      renderItem={null}
      ListHeaderComponent={() => (
      <React.Fragment>{props.children}</React.Fragment>
      )}
    />
  );
}
// handle = ()=>{
//   this.props.update()
// }
export default class HomeScreen extends Component {
    render() {
      return (
        <View>
         <SearchBar/>
         <VirtualizedView>
            <View style={styles.container}>
                <HeaderBanner/>
                <FlashSale navigation={this.props.navigation}  text='FLASH SALE' seeMore="xem thêm>>" />
                <Menu/>
                <View style = {{ flex  : 1, marginBottom : 55}}>
                <Listproduct  navigation={this.props.navigation} text="SẢN PHẨM HOT"/>
                </View> 
            </View>
          </VirtualizedView>
        </View>
      );
    }
  };

const styles = StyleSheet.create({
    container : {
      flex :1,
        backgroundColor : '#C8C8C8'
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
 

});