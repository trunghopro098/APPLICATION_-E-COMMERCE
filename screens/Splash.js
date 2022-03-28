import React, { Component,useEffect,useRef } from 'react'
import { Text, View, Dimensions, Image, StyleSheet, Animated, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

  export default Splash=({navigation})=> {
    const moveAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;


    useEffect(()=>{
        Animated.timing(fadeAnim,{
            duration : 2000,
            toValue : 1,
            delay  :2000,
            useNativeDriver : false
        }).start()
        Animated.sequence([
        Animated.timing(moveAnim,{
            duration: 2000,
            toValue : windowW/3,
            delay: 0,
            useNativeDriver : false,
        }),
        Animated.timing(moveAnim,{
            duration: 2000,
            toValue : -6,
            delay: 0,
            useNativeDriver : false,
        }),
    ]).start( async ()=>{
        // navigation.replace('login');
        try {
            const value = await AsyncStorage.getItem('UserName')

            if(value == null){
                navigation.replace('login');
            }else{
                navigation.replace('home')
            }
        } catch (error) {
            console.log(error) 
        }
       
    })
    },[moveAnim,fadeAnim]);

        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient
                // colors={["#B0FCFC",'#FDB3D8']}
                colors={["white",'#B0FCFC']}
                style={{ ...styles.container,width: windowW, height : windowH}}
                >
                    <View style={styles.contentContainer}>
                        <Animated.Image  source={require('../assets/icons/logo.png')}
                         style={{ width : windowW*0.6 , height: windowH*0.3 , opacity : fadeAnim}} resizeMode="contain">
                         </Animated.Image>
                    </View>
                    <Animated.View style={{...styles.logoContainer , marginLeft : moveAnim}}>
                        <Text style={{ ...styles.logoText,fontSize : 25}}> MY SHOES</Text>
                        {/* <Animated.Text style={{...styles.logoText,marginLeft:-6, opacity : fadeAnim}}> </Animated.Text> */}
                        <Animated.Text style={{...styles.logoText,color : "#295A8A", opacity : fadeAnim, paddingTop : 7}}> QUALITY FROM BRAND</Animated.Text>
                    </Animated.View>
                </LinearGradient>
            </SafeAreaView>
        )
    }
    const windowW = Dimensions.get('window').width;
    const windowH = Dimensions.get('window').height;
    const styles = StyleSheet.create({
        container:{
            display :"flex",
            flex: 1,
            backgroundColor: "white",
            justifyContent : "center",
            alignContent : "center",
            alignItems : "center"
        },
        contentContainer:{
            marginTop  : -80,
            alignItems : "center",
            
        },
        logoText:{
           
            fontSize : 18,
            fontWeight: "bold",
            color : "red",
            
            
            
            
        },
        logoContainer : {
            flexDirection:"row"
        }
    })

