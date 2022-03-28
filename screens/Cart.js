import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {View,Alert, ActivityIndicator,TouchableOpacity,Dimensions, Text,FlatList, StyleSheet ,Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from '../navigation/searchBar';
import LottieView from 'lottie-react-native'
export default class CartScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            cartdata : [],
            dataserver: [],
            datarender : [],
            isLoading : true,
            total :0
        }

    }

getcartdata = async()=>{
    let dataArr = [];
    var data = await AsyncStorage.getItem("InforCart")
    if(data != null){
        // dataArr = JSON.parse(data);
        this.setState({cartdata : JSON.parse(data)})
    }
    
    // this.setState({cartdata : dataArr})
    // console.log(this.state.cartdata)
}

getdataServer = ()=>{
        fetch('http://'+global.URL+'/myshoe/public/api/products')
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({dataserver : json});    
        })
        .catch((err)=>{
            console.log(err);

        })
        .finally(()=>{
           
        }); 
}
getRenderdata = ()=>{
    const A = [];
    const dataAsyn = this.state.cartdata;
    const dataserver = this.state.dataserver;
    for ( let i = 0 ; i < dataAsyn.length; i++){
        for( let j = 0; j < dataserver.length ; j++){
            if(dataserver[j].id === dataAsyn[i].id){
                dataserver[j].qty = dataAsyn[i].quantity;
                dataserver[j].addStatus = dataAsyn[i].addStatus;
                A.push(dataserver[j]);
            }
        }
    }
    // console.log(A)
    this.setState({datarender : A})

}

Carttotal =(dataren)=>{
    var tong=0;
    for( let item = 0;item<=dataren.length-1;item++){
        if (dataren[item].addStatus==true){
            if(dataren[item].promotional >0){
                tong +=(dataren[item].promotional*dataren[item].qty);
            }else{
                tong +=(dataren[item].price*dataren[item].qty);
            }
        }
    }
    // this.setState({total : tong})
    return tong;
}
componentDidMount(){
    this.props.navigation.addListener('focus',()=>{
        this.getcartdata()
        this.getdataServer()
        this.Carttotal(this.state.datarender)
        setTimeout(() => {
            this.getRenderdata()
            // console.log("asasasasasass")
            this.setState({isLoading : false})
           
            // console.log(this.state.datarender)
        },1000);
        // console.log(this.Carttotal(this.state.datarender))
    })
    // console.log("data cart")
}

numberWithCommas =(x)=> {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

Increase = async(id)=>{
    console.log("day la "+id)
    var data = this.state.cartdata;
    var dataren = this.state.datarender;
    for( var i = 0 ; i <= data.length-1 ; i++){
        if(data[i].id == id){
            if(data[i].quantity == 5){
                Alert.alert("","Tối đa 5 sản phẩm!")
            }else{
                data[i].quantity +=1;
                dataren[i].qty +=1;
                
                // this.setState({isLoading : true})
                setTimeout(() => {
                    // this.getRenderdata()
                    this.setState({datarender : dataren})
                    // this.setState({isLoading : false})
                }, 1000);

            }
        }
    }
    // data = data.reverse();
    await AsyncStorage.removeItem("InforCart")
    await AsyncStorage.setItem("InforCart",JSON.stringify(data))
    // console.log(data)
    // console.log(dataren)
  
}
reduce = async(id)=>{
    // giảm số lượng
    var data = this.state.cartdata
    var dataren = this.state.datarender
    for( var i = 0 ; i <= data.length-1 ; i++){
        if(data[i].id == id){
            if(data[i].quantity == 1){
                // console.log("asasasas")
                Alert.alert(
                    "",
                    "Bạn muốn xóa sản phẩm này!",
                [
                    {
                    text: "Cancel",
                    style: "cancel"
                    },
                {
                    text: "Ok",
                    onPress:async()=>{
                        for(let j = 0;j<=data.length-1;j++){ 
                            if(data[j].id==id){
                                data.splice(j,1)
                                dataren.splice(j,1)
                                await AsyncStorage.removeItem("InforCart")
                                await AsyncStorage.setItem("InforCart",JSON.stringify(data))
                                setTimeout(() => {
                                    // this.getRenderdata()
                                    this.setState({datarender : dataren})
                                    // this.setState({isLoading : false})
                                }, 1000);
                                console.log("xoa roi")
                            }
                        }
    
                        
                    }
                    
                    }

                ]
                
                )
            }else{
                data[i].quantity -=1;
                dataren[i].qty -=1;
                // dataren.reverse();
                // this.setState({isLoading : true})
                setTimeout(() => {
                    // this.getRenderdata()
                    this.setState({datarender : dataren})
                    // this.setState({isLoading : false})
                }, 1000);

            }
        }
    }
    await AsyncStorage.removeItem("InforCart")
    await AsyncStorage.setItem("InforCart",JSON.stringify(data))
    // console.log(data)
  
}

CartStatus = async(id)=>{
    
    var data = this.state.cartdata;
    var dataren = this.state.datarender;
    for(var i = 0; i <= data.length-1; i++){
        if(data[i].id == id){
            if(data[i].addStatus == false)
            {
                data[i].addStatus= true;
                dataren[i].addStatus= true;
            }else{
                data[i].addStatus= false;
                dataren[i].addStatus= false;
            }
            setTimeout(() => {
                // this.getRenderdata()
                this.setState({datarender : dataren})
                // this.setState({isLoading : false})
            }, 100);

        }
    }

    await AsyncStorage.removeItem("InforCart")
    await AsyncStorage.setItem("InforCart",JSON.stringify(data))

}

removeAllCart = async()=>{
    try {
    await AsyncStorage.removeItem("InforCart")
    } catch (error) {
        console.log(error)
        
    }
}

renderItem= ({item,type})=>{
    return(
       <View style={styles.item}>
           <View style={styles.itemcheck}>
           {item.addStatus == true? 
           <>
           <TouchableOpacity onPress={()=>this.CartStatus(item.id)}
           >
           <Image source={ require("../assets/icons/check.png")}
           style={{ width: windowW*0.055, height: windowH*0.055 }}
           resizeMode="contain"></Image>
           </TouchableOpacity>
           </> :
            <>
            <TouchableOpacity onPress={()=>this.CartStatus(item.id)}>           
            <Image source={ require("../assets/icons/uncheck.png")}
            style={{ width: windowW*0.055, height: windowH*0.055 }}
            resizeMode="contain"></Image>
            </TouchableOpacity>

            </>
           }
           </View>
           <View style={styles.itemImage}>
           <Image
           source={{ uri:"http://"+global.URL+"/myshoe/public/img/upload/product/"+item.image }}
           resizeMode="contain"
           style={{ width: 90, height: 90, borderRadius : 10 }}
           />
           </View>
           <View style={styles.itemName}>
           <Text style={{ flex : 1 }}>{item.name}</Text>
           <View style={{ flex: 1, flexDirection: "row" }}>
           <View style={styles.itemPrice}>
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
           <View style={styles.itemQty}>
           <TouchableOpacity onPress={()=>{
               this.reduce(item.id);
           }} >
                   <Text style={styles.addQty}>-</Text>
               </TouchableOpacity>
               <Text style={styles.addQty}>{item.qty}</Text>
               <TouchableOpacity onPress={()=>{
               this.Increase(item.id);
           }}>
                   <Text style={styles.addQty}>+</Text>
               </TouchableOpacity>


           </View>
           </View>
           </View>
       </View> 
    )
}

    
    render(){
        const { datarender, isLoading} = this.state;
        return(

            <View style={styles.container}>
            <SearchBar></SearchBar>
            {isLoading ? <ActivityIndicator/>:<>
            <View style={{ flex:1,flexDirection:"row",maxHeight  : 40, borderBottomWidth : 1,
        borderColor : "#848486",marginTop : 10}}>
                <Text style={styles.title}>Your Cart !</Text>
                <TouchableOpacity style={styles.deleteAll} onPress={()=>
                Alert.alert("","Xoá tất cả sản phẩm khỏi giỏ hàng !",[
                    {
                        text: "Cancel",
                        stylee: "cancel"
                    },

                    {
                        text: "OK",
                        onPress:()=>{this.removeAllCart();
                        this.setState({datarender : []})
                        alert("Xóa thành công");

                    } 
                    }
                ])}>           
                <Image source={ require("../assets/icons/delete_26px.png")}
                style={{ width: windowW*0.06, height: windowH*0.06 }}
                resizeMode="contain"></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.itemProduct}>
            {datarender.length > 0 ?
            (<FlatList
            data= {datarender}
            keyExtractor= {({id})=> id}
            renderItem = {this.renderItem}
            />) :<>
            <   View style= {{ alignContent : 'center', alignItems:"center",marginTop : 60 }}>
            <LottieView
                source= {require('../assets/icons/36605-shopping-cart.json')}
                style={{ width: windowW*0.5, height:windowH*0.6}}
                size={6}
                autoPlay
                loop
                >

            </LottieView>
            </View>
            </>  }

            </View>
            <View style={styles.order}>
                <View style={{ flex:3 }}>
                {this.Carttotal(datarender) > 0 ? 
                <>
                <View style={{ flex:1, flexDirection: "row" }}>
                    <Text style={{ flex: 2, color: "red" }}>Phí vận chuyển:</Text>
                    <Text style={{ flex: 2, color: "green" ,textAlign: "right"}}>{this.numberWithCommas(30000)}vnđ</Text>
                </View>
                </>
                :<>
                <View style={{ flex:1, flexDirection: "row" }}>
                    <Text style={{ flex: 2, color: "red" }}>Phí vận chuyển:</Text>
                    <Text style={{ flex: 2, color: "green" ,textAlign: "right"}}>0 vnđ</Text>
                </View>
                </>}
                <View style={{ flex:1, flexDirection: "row"}}>
                    <Text style={{ flex: 2, color: "red" }}>Tiền hàng :</Text>
                    <Text style={{ flex: 2, color: "green",borderBottomWidth :1, borderBottomColor:"#848486" ,textAlign: "right"}}>{this.numberWithCommas(this.Carttotal(datarender))}vnđ</Text>
                </View>
                {this.Carttotal(datarender) > 0 ? 
                <>
                <View style={{ flex:1, flexDirection: "row",textAlign:"center" }}>
                    <Text style={{ flex: 2, color: "red",fontWeight:'bold' }}>Tổng tiền :</Text>
                    <Text style={{ flex: 2, color: "red",fontWeight:"bold",textAlign: "right" }}>{this.numberWithCommas(this.Carttotal(datarender)+30000)}vnđ</Text>
                </View>
                </>
                :<>
                <View style={{ flex:1, flexDirection: "row",textAlign:"center" }}>
                    <Text style={{ flex: 2, color: "red",fontWeight:'bold' }}>Tổng tiền :</Text>
                    <Text style={{ flex: 2, color: "red",fontWeight:"bold",textAlign: "right" }}>{this.numberWithCommas(this.Carttotal(datarender))}vnđ</Text>
                </View>
                </>}


                </View>

               
                <TouchableOpacity style={{ flex:2 }} onPress={()=>{console.log("adafe")}}>
                    <LinearGradient colors={["#734993","#2999AD"]} style={styles.Buy}>     
                            <Text style={{ color: "white",fontSize:16,marginTop:14,fontWeight: "bold",textAlign: "center",alignContent:"center" }}> Đặt hàng</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    
            </View>

            </>}
            </View>
        );
    }
}

const windowH = Dimensions.get('window').width;
const windowW = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container : {
        flex : 1,
        // alignItems : "center",
        // justifyContent : 'center',
        backgroundColor : '#FFFFFF',
        marginBottom : 65
        
    },title:{
        flex:6,
        fontSize : 20,
        color : "red",
        fontWeight : "bold",
        marginLeft : 5,

        marginRight : 5,
        
    },
    deleteAll:{
        flex:1,
        fontSize : 20,
        color : "red",
        fontWeight : "bold",
        marginLeft : 5,

        // alignContent : "flex-end"

    },
    item:{
        margin : 5,
        flex : 1,
        flexDirection : 'row',
        borderBottomWidth : 1,
        borderColor : "#DADCE0"

    },
    itemcheck:{
        flex : 1,
    },
    itemImage:{
        flex : 3,
        paddingBottom : 5,
        paddingLeft : -20
    }
    ,itemName:{
        flex : 7,
        paddingLeft : -30,
    },
    itemPrice:{
        flex : 1
    },
    itemQty:{
        flex : 1,
        flexDirection: 'row',
        maxWidth : 90,
        maxHeight : 25
    },
    textprice : {
    
        color :"#777777",
        textDecorationLine:"line-through",
        fontSize : 12
        
      },
      textprice1 : {
     
        color :"red",
      
        fontSize : 12
        
      },
      textpricepromotion:{
       
        color :"red",
        fontSize : 12
        
        
      },addQty:{
          flex: 1,
          fontSize : 15,
          backgroundColor : "white",
          width : 30,
          height : 25,
          borderWidth : 1,
          borderColor : "#DADCE0",
          alignItems : 'center',
          alignContent : 'center',
          textAlign : 'center'
      },order:{
          flex:1,
          flexDirection:"row",
          marginLeft: 5,
          marginRight:5,
          position : 'relative',
          maxHeight:55,
          height : 55,
          borderTopWidth : 1,
          borderTopColor: "#DADCE0",
          

      },Buy:{
          flex: 2,
          position:"absolute",
          width: windowW*0.21,
          height: 50,
          backgroundColor: "red",
          alignItems: "center",
          marginLeft: 5,
          marginTop : 4,
          borderRadius  :3,
      },
      itemProduct:{
          flex:1
      }

});