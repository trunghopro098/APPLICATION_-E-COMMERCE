
import React, { Component } from 'react';
import {Alert,SafeAreaView, View, Text, Button, StyleSheet ,Image,Dimensions ,ScrollView,FlatList,ActivityIndicator,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from '../navigation/searchBar';
import Listproduct from './listProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderTitle } from '@react-navigation/stack';

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
export default class ProductDetail extends Component{
    constructor(props){
        super(props);
        // this.checkdata();
        this.state={
            data : [],
            isLoading : true,
            isClick : true,
            checkfavorite : false

        };

    }
    componentDidMount(){
        this.checkdata()
        setTimeout(() => {
            this.setState({isLoading : false})
        }, 100);
    }
    componentWillUnmount() {
        
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }
    numberWithCommas =(x)=> {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    check = (arr,value)=>{
        if(arr != null){
            for(const item of arr){
                if(item.id === value){
                    return true;
                }
            }
            return false
        }else{
            return 0;
        }
    }
    checkdata = async()=>{
        const data = this.props.route.params;
        let DataFavorite = [];
        let Getdata = await AsyncStorage.getItem("PRODUCTFAVORITE")
        if(Getdata != null){
            DataFavorite = JSON.parse(Getdata)
        }
        for(const item of DataFavorite){
            if(item.id === data.id){
               this.setState({checkfavorite: true})
               return 0;
            }
        }
        this.setState({checkfavorite: false})
        return 0;
    }


    AddProductFavorite = async()=>{
        const data = this.props.route.params;
        let DataFavorite = [];
        let Getdata = await AsyncStorage.getItem("PRODUCTFAVORITE")
        if(Getdata==null){
            DataFavorite = [{"id": data.id}]
            alert("Đã thêm sane phẩm"+data.name+"vào danh sách yêu thích")
        }else{
            DataFavorite = JSON.parse(Getdata)
            if(this.check(DataFavorite,data.id)==false){
                DataFavorite = DataFavorite.concat([{"id": data.id}])
                this.setState({checkfavorite: true})
                alert("Đã thêm sane phẩm"+data.name+"vào danh sách yêu thích")
            }else{
                  alert("san pham da ton tai")
            }
        }
        // console.log(DataFavorite)
        // console.log(data.id)
        await AsyncStorage.setItem("PRODUCTFAVORITE",JSON.stringify(DataFavorite))
    }

   RemoveFavorite= async()=>{
        try {
            const data = this.props.route.params;
            let DataFavorite = [];
            let Getdata = await AsyncStorage.getItem("PRODUCTFAVORITE")
            if(Getdata != null){
                DataFavorite= JSON.parse(Getdata)
                for (let i = 0; i< DataFavorite.length;i++){
                    if(DataFavorite[i].id === data.id){
                       DataFavorite.splice(i,1)
                    }
                }
            }
            // console.log(DataFavorite)
            await AsyncStorage.removeItem("PRODUCTFAVORITE");
            await AsyncStorage.setItem("PRODUCTFAVORITE",JSON.stringify(DataFavorite))
            this.setState({checkfavorite: false})
            alert("delete success")
        } catch (error) {
            
        }
    }

    Remove= async()=>{

            await AsyncStorage.removeItem("PRODUCTFAVORITE");
            alert("delete success")

    }
    Removecart= async()=>{

        await AsyncStorage.removeItem("InforCart");
        alert("delete cart success")

}


    addcart = async()=>{
        let CurrentArr = [];
        const data = this.props.route.params;
        // console.log(data.id);
        // await AsyncStorage.removeItem('InforCart');
        let ArrAsync = await AsyncStorage.getItem('InforCart');
        // console.log("Đây là ass "+ArrAsync);
        if(ArrAsync==null){
            CurrentArr = [{"id":data.id, "quantity":1,"addStatus" : false}];
        }
        else {
            CurrentArr = JSON.parse(ArrAsync);
            if(this.check(CurrentArr,data.id)== true){
                for(let item of CurrentArr){
                    if(item.id === data.id){
                        item.quantity += 1;
                        // console.log(item.quantity)
                    }
                }
                alert("Sản phẩm đã tồn tại trong giỏ hàng")

            }else{
                const add = [{"id":data.id, "quantity":1, "addStatus" : false}]
                CurrentArr = add.concat(CurrentArr);
                alert("Đã thêm sản phẩm "+data.name+ "và trong giỏ hàng")
            }
        }
        console.log(CurrentArr);
        await AsyncStorage.setItem('InforCart',JSON.stringify(CurrentArr));
    }







render(){
    const data = this.props.route.params;
    return(
        
        
        <SafeAreaView >
            <View>
            {this.state.isLoading == true ? <ActivityIndicator/> :<>
            <SearchBar/>
            
        <VirtualizedView  >
            <View style={styles.container}>
                <LinearGradient
                colors={['#F56BF4', '#C0BF52']}
                style={styles.background}  
                >
                    <View style= {styles.setImage}>
                    <Image source={{uri:"http://"+global.URL+"/myshoe/public/img/upload/product/"+data.image}} 
                        style={{ width : windoww*0.8, height: windowH*0.28,marginTop : 10,marginBottom:10,  flex:1,alignContent:"center",marginLeft: 8 }}
                        resizeMode="contain">
                        </Image>
                    </View>
                </LinearGradient>
            </View>
            <View style={styles.priceItem}>
                <View style={{ flex:6 }}>
                
                {data.promotional == 0 ?
                (<Text style={styles.textPrice}>{this.numberWithCommas(data.price)}đ</Text>):
                <>
                <View style={{ flex: 1, flexDirection : "row" }}>
                <Text style={styles.textPrice1}>{this.numberWithCommas(data.price)}đ</Text>
                <Text style={styles.priceMotional}>{this.numberWithCommas(data.promotional)}đ</Text>
                </View>
                </>
                 }
                <Text style={{ fontWeight :"bold", fontSize : 14 }}>{data.name}</Text>
                </View>
                 {(this.state.checkfavorite==true) ? 
                 (<TouchableOpacity style={{ flex:1 }} onPress={ ()=>{
                        //   this.AddProductFavorite()        
                        this.RemoveFavorite() 
                    }}>
                <Image source={require("../assets/icons/like_red.png")} style={{ width: 28, height : 28, marginLeft : 10, marginRight : 10 }} resizeMode="contain"></Image>
                </TouchableOpacity>) 
                : <>
                <TouchableOpacity style={{ flex:1 }} onPress={()=>{
                          this.AddProductFavorite()       
                    }}>
                <Image source={require("../assets/icons/like.png")} style={{ width: 28, height : 28, marginLeft : 10, marginRight : 10 }} resizeMode="contain"></Image>
                </TouchableOpacity></>
                }
               
         
            </View >
            <View style={{ flex:1, flexDirection : "row" }}>
                <Text style={{ fontSize : 14, fontWeight: "bold", marginTop : 13, marginLeft:14 ,flex : 1}}>Hình thức giao hàng</Text>
                <Text style={{ fontSize : 14, fontWeight: "bold", marginTop : 13,textAlign: "right",marginRight : 13 ,flex : 1}}>Quảng Nam-Nông-Sơn</Text>
            </View>

            <View style={{ flex:1, flexDirection : "row" , borderBottomWidth: 2 ,borderBottomColor: "#B8BAFF", marginHorizontal : 14}}>
                <Text style={{ fontSize : 14, marginTop : 13,flex : 1}}>Giao hàng tiêu chuẩn</Text>
                <Text style={{ fontSize : 14, marginTop : 13 ,flex : 1,textAlign: "right", marginBottom : 15 }}>22.000đ</Text>
            </View>

            <View style={{ flex:1, borderBottomWidth: 2 ,borderBottomColor: "#B8BAFF", marginHorizontal : 14}}>
                <Text style={{ fontSize : 14, marginTop : 13,flex : 1, fontWeight: "bold"}}>Đặc điểm nổi bật</Text>
                <Text style={{ fontSize : 14, marginTop : 13 ,flex : 1,textAlign: "left", marginBottom : 15 , textAlign: "justify"}}>{data.description}</Text>
            </View>
            {/* <View style = {{  marginBottom : 100}}> */}
                <Listproduct  navigation={this.props.navigation} text="CÓ THỂ BẠN CẦN"/>
            {/* </View>  */}
            {/* <Listproduct navigation ={this.props.navigation} text="CÓ THỂ BẠN CẦN"/> */}
     
        </VirtualizedView>
       
        <View style={styles.contact}>
                {/* <Text style={{ fontSize : 20 }}>{this.state.cartProduct}</Text> */}
              <TouchableOpacity style={styles.addcart} onPress={
                  ()=>{
                    this.addcart()
                    // this.GetProductCart()

                  }
              } >
              <Image source={require("../assets/icons/addcart.png")}
              style={{ width: 34, height : 34,
                 marginLeft : 5,flex: 1 }} resizeMode="contain"></Image>
              <Text style={{ color : "white", fontSize:16,textAlign: "center" ,flex:2}}>
                 Thêm giỏ hàng
              </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                  this.Removecart()
                  this.Remove()
            // this.handelRemoveFavorite()
            // this.RemoveFavorite()
            }} style={styles.buynow}>
              <Text style={{ color : "white", fontSize:16,textAlign: "center" }}>
                  Mua ngay
              </Text>
              </TouchableOpacity>
          </View>

          </> } 
          </View>
        </SafeAreaView>
        

    );
 }

}
const windowH = Dimensions.get('window').height;
const windoww = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container:{
        flex:1,
        height: windowH*0.45,
        backgroundColor : "#FFF83B",
        marginTop : 5,

    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: windowH*0.44,
      borderBottomLeftRadius : 50,
      borderTopRightRadius: 50,
      borderWidth : 1,
      borderTopColor : "red",
      margin : 5
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
    setImage:{
        backgroundColor : "white",
        width : windoww*0.89,
        height : windowH*0.34,
        marginTop : 30,
        alignContent : "center",
        marginLeft : 15,
        borderTopRightRadius : 50,
        borderBottomLeftRadius : 50,
        borderRightColor: "#913286",
        borderLeftColor: "green",
        borderBottomColor : "#913286",
        borderTopColor : "green",
        borderWidth: 3,
        alignContent : "center",
        borderLeftWidth : 15,
        borderRightWidth : 15,

    },

    item : {
        
        backgroundColor : "white",
        width: windoww*0.9,
        marginHorizontal : 5,
        alignItems : "center",
        alignContent :"center",
        justifyContent :"center",
        borderRadius : 6,
        borderColor : "red",
        borderColor : "red",
        marginLeft: 15,
        marginTop : 10
        
    },
    red : {
        color : "red"
    },
    pink : {
        color : "pink"
    },
    priceItem:{
        flex : 1,
        flexDirection:"row",
        marginTop : 14,
        marginLeft : 14,
        borderBottomWidth  :2,
        borderBottomColor : "white",
       
        marginRight  :14

    },
    textPrice : {
        color: "red",
        fontSize : 18,
        flex:1
    },
    priceMotional:{
        flex:1.9,
        color: "red",
        fontSize : 18,
        
        

    },
    textPrice1:{
        flex : 1,
        color: "#777777",
        textDecorationLine: "line-through",
        fontSize : 18,

    },
    contact:{
        flex:1,
        flexDirection:'row',
        position: 'absolute',
        height: 50,
        marginTop :(windowH-75),
        width: windoww,
        

    },
    addcart:{
        flex:1.2,
        flexDirection:"row",
        backgroundColor: "green",
        fontSize : 24,
        alignContent : 'center',
        alignItems : "center",
        

    },
    buynow: {
        
        flex:1,
        paddingTop : 14,
        backgroundColor:"red"
        
        

    }
})