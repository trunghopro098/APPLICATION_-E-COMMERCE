
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet ,Image,Dimensions } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
export default class HeaderBanner extends Component{
constructor(props) {
    super(props);
    this.state = {
      images: [
        require("../assets/images/banner.png"),
        require("../assets/images/banner1.png"),
        require("../assets/images/banner2.png"),
        require("../assets/images/banner3.png"),
      ]
    };
  }
 
  render() {
    const windowWidth = Dimensions.get('window').width;
    const windowheight = Dimensions.get('window').height;
    return (
      <View style={styles.container}>
<SliderBox
  images={this.state.images}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="red"
  inactiveDotColor="#90A4AE"
  paginationBoxVerticalPadding={20}
  autoplay
  circleLoop
  resizeMethod={'resize'}
  resizeMode={'cover'}
  paginationBoxStyle={{
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10
  }}
  dotStyle={{
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)"
  }}
  ImageComponentStyle={{ width: windowWidth*0.999,height : windowheight*0.25, marginTop: 5}}
  imageLoadingColor="#E91E63"
></SliderBox>
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