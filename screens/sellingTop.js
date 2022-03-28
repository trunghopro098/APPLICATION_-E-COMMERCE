
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet ,Image,Dimensions } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
export default class SellingTop extends Component{
constructor(props) {
    super(props);
    this.state = {
    data : [],
    images  : [],
   
    };
  }
 componentDidMount(){
     fetch('http://192.168.1.6/myshoe/public/api/fll')
     .then((response)=>response.json())
     .then((json)=>{
         this.setState({data : json})
        console.log(JSON.stringify(json.name))
     })
     .catch((error)=>{console.error(error)})
     
 }

 LoopFoR(arrImg){
     arrImg=[''];
const data1 = this.state.data
for(var i = 0; i < data1.length;i++ ){
    console.log('image :' +data1[i].name)
    arrImg=arrImg+ data1[i].name;
}
console.log(arrImg)
 }

  render() {
      const {data} = this.state;
    const windowWidth = Dimensions.get('window').width;
    const windowheight = Dimensions.get('window').height;
    return (
      <View style={styles.container}>
{/* <Text>{JSON.stringify(data)}</Text> */}
<Text>{this.LoopFoR()}</Text>
    <Image source={require('../assets/images/logo.png')} style={{ width:windowWidth, height :windowheight*0.1,marginTop : -4,marginBottom :-7 }}
                resizeMode='contain'
    ></Image>
  </View>
      
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});