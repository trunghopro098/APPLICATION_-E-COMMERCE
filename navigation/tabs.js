import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import Favorite from '../screens/Favorite';
import Setting from '../screens/Setting';
import CartScreen from '../screens/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
export default class TabNavigation extends Component{
  constructor(props){
    super(props)
    this.state={
      cartData : [],
      dataGetFavorite : [],
      contFa : 0,
      countCart: 0,
    }
    // this.getDatafavorite()
    
  }

  componentDidMount(){
    this.interval = setInterval(()=>{
      this.getdataCart()
      this.getDatafavorite()
      
    },1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }
  // componentDidUpdate(){
  //   this.getDatafavorite();
  //   // setInterval(this.getDatafavorite,5000)
  // }
  getDatafavorite = async()=>{    
   const getData = await AsyncStorage.getItem("PRODUCTFAVORITE")
    if(getData != null){
        this.setState({dataGetFavorite : JSON.parse(getData)})
        }else{
          this.setState({contFa : 0})
        }
        // return this.state.dataGetFavorite.length  
    }
  getdataCart = async()=>{
    const getdata = await AsyncStorage.getItem("InforCart")
    if(getdata != null){
      this.setState({cartData : JSON.parse(getdata)})
    }else{
      this.setState({countCart : 0})
    }
  }




  render(){

    return(
      <View style={{ flex:1 }}>
        {/* <Text>{route.params.id}</Text> */}
<Tab.Navigator
  tabBarOptions={{ 
    showLabel : false,
    style:{
      position : "absolute",
      // borderRadius : 15,
      borderTopLeftRadius  :11, 
      borderTopRightRadius : 11,
      // left : 5,
      // right : 5,
      // bottom : 5,
      height : 60,
      elevation : 0,
      backgroundColor : '#ffffff',
      ...styles.shadow,

    }
    
   }}

  >
    {/* <HomeScreen update={()=>this.getDatafavorite()}/>  */}
    <Tab.Screen name="Home" 
    component={HomeScreen} 
    options={{
      tabBarIcon: ({focused})=>(
        <View style={{ alignItems : "center", justifyContent : "center", top : 5 }}>
          <Image 
          source={ require('../assets/icons/home.png')}
          resizeMode="contain"
          style={{
            width: 25,
            height : 25,
            tintColor : focused ? '#e32f45' : '#748c94'         
             }}/>
            <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>HOME</Text>
        </View>
      )
  }}/>

   <Tab.Screen name="Favorite" component={Favorite}
   
       options={{
        tabBarIcon: ({focused})=>(
          <View style={{ alignItems : "center", justifyContent : "center", top : 5 }}>

            <Image 
            source={ require('../assets/icons/favourite.png')}
            resizeMode="contain"
            style={{
              width: 25,
              height : 25,
              tintColor : focused ? '#e32f45' : '#748c94'         
               }}/>

              <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>FAVORITE</Text>
          </View>
        ),
        // {(this.state.dataGetFavorite.length)}
        tabBarBadge : this.state.dataGetFavorite != null ? this.state.dataGetFavorite.length : 0
    }}/>
 
   
   <Tab.Screen name="Setting" component={Setting}
       options={{
        tabBarIcon: ({focused})=>(
          <View style={{ alignItems : "center", justifyContent : "center", top : 5 }}>
            <Image
            source={ require('../assets/icons/setting.png')}
            resizeMode="contain"
            style={{
              width: 25,
              height : 25,
              tintColor : focused ? '#e32f45' : '#748c94'         
               }}/>
              <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>SETTING</Text>
          </View>
        )
    }}/>
       <Tab.Screen name="Cart" component={CartScreen}
       options={{
        tabBarIcon: ({focused})=>(
          <View style={{ alignItems : "center", justifyContent : "center", top : 5 }}>
            <Image 
            source={require('../assets/icons/cart.png')}
            resizeMode="contain"
            style={{
              width: 25,
              height : 25,
              tintColor : focused ? '#e32f45' : '#748c94'         
               }}/>
              <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>CART</Text>
          </View>
        ),
        tabBarBadge : this.state.cartData == null ? 0 : this.state.cartData.length
    }}/>
   

    <Tab.Screen name="Profile" component={ProfileScreen} 
        options={{
            tabBarIcon: ({focused})=>(
              <View style={{ alignItems : "center", justifyContent : "center", top : 5 }}>
                <Image 
                source={ require('../assets/icons/profile.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height : 25,
                  tintColor : focused ? '#e32f45' : '#748c94'         
                   }}/>
                  <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>PROFILE</Text>
              </View>
            )
        }}/>

  </Tab.Navigator>
  </View>
    );
  }
}
// const TabNavigation = ()=>{




// }
// export default TabNavigation;

const styles = StyleSheet.create({
    shadow : {
        shadowColor :"#7F5DF0",
        shadowOffset :{
            width : 0,
            height : 10,

        },
        shadowOpacity  :0.25,
        shadowRadius : 3.5,
        elevation : 5
    }
})