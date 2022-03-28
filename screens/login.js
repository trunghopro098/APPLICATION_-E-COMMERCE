import React, { Component } from 'react'
import { Text, View, Button,SafeAreaView,Animated,ActivityIndicator, Image,StyleSheet,Dimensions ,TextInput,TouchableOpacity,Alert} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import URL from '../navigation/global'


export default class Login extends Component {
    constructor(props){
        super(props)

        this.state={
            showpass : true,
            press :false,
            email : '',
            password : '',
            data : [],
            notifyerr:false,
            isLoading : false
        }

        
    }

    storeDataLogin = async ()=>{
        try {
            await AsyncStorage.setItem('UserName',this.state.email)
            // alert("luw thanh cong")
        } catch (error) {
            console.log(error)
        }
    }


    toggle=()=>{
        if(this.state.press==false){
            this.setState({press: true, showpass: false})
        }else(
            this.setState({press: false, showpass: true})
        )
    }
    login= async ()=>{
        fetch('http://'+URL+'/myshoe/public/api/login',{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
              })
        })
        .then((response)=>response.json())
        .then((json)=>{
            if(json.message == "login successfully"){
                this.storeDataLogin()
                this.props.navigation.replace('home')

            }else{
            //    Alert.alert("Đăng nhập thất bại");
               this.setState({notifyerr:true})
               //spiner
            }           
        })
        .catch((err)=>{
            console.error(err)
        });

        }
        // this.props.navigation.navigate('home')
    

    render() {
        return (

            <View style = {styles.container}>
                <View style={styles.contentContainer}>
                    <Image source={ require("../assets/icons/logo.png")}
                     style={{ width: windowW*0.3, height: windowH*0.3 }}
                      resizeMode="contain"></Image>
                       <Text style={{ color: "#295A8A", fontSize : 18, fontWeight :'bold', textAlign :'center' }}>MY SHOES </Text>
                      <Text style={{ color: "red", fontSize : 18, fontWeight :'bold', textAlign :'center', marginTop:10 }}> THƯƠNG HIỆU VIỆT CHẤT LƯỢNG VIỆT</Text>
                </View>
                <LinearGradient 
                colors={['#FFDAB6','#76FFFD']} 
                 style={styles.loginContainer}>
                     <Text style={ styles.title }>LOGIN</Text>
                     {/* {
                         this.state.isLoading&&<ActivityIndicator size="large" color="#CA44FB"/>
                     } */}
                     {/* userName */}
                    <View style={styles.lineInput}>
                        <Image source={require("../assets/icons/user.png")}
                        style={{ width : 30, height:30, marginLeft  :10,marginTop:7 }} resizeMode="contain"></Image>
                        <TextInput
                        placeholder='Email'
                        placeholderTextColor="red"
                        style={styles.textInput}
                        value={this.state.email}
                        onChangeText={(value)=>this.setState({email:value})}
                        />
                         <Image source={require("../assets/icons/pen.png")}
                        style={{ width : 30, height:30, marginLeft  :3,marginTop:7 }} resizeMode="contain"></Image>
                        
                    </View>
                    {/* password */}
                    <View style={{ ...styles.lineInput, marginTop : 10 }}>
                    <Image source={require("../assets/icons/password.png")}
                            style={{ width : 30, height:30, marginLeft  :3,marginTop:7 }} resizeMode="contain"></Image>
                            <TextInput
                            placeholder='Password'
                            placeholderTextColor="red"
                            secureTextEntry={this.state.showpass}
                            style={styles.textInput}
                            value={this.state.password}
                            onChangeText={(value)=>this.setState({password :value})}
                        
                            />
                        <TouchableOpacity onPress={this.toggle}>
                            {this.state.press == false ? (<Image source={require("../assets/icons/eye.png")}
                            style={{ width : 30, height:30, marginLeft  :10,marginTop:7 }} resizeMode="contain"></Image>)
                        :(<Image source={require("../assets/icons/eyeoff.png")}
                        style={{ width : 30, height:30, marginLeft  :10,marginTop:7 }} resizeMode="contain"></Image>)}
                        </TouchableOpacity>
                    </View>
                    {this.state.notifyerr &&
                    <View>
                        <Text style={{ color : "red", marginLeft: 35}}>Đăng nhập thất bại</Text>
                    </View>
                    
                    }

                    {/* btn login */}
                    <TouchableOpacity onPress={this.login} 
                    style={{ ...styles.lineInput,backgroundColor : "#524E11",borderColor:"white", marginTop : 10,alignItems : "center",justifyContent: "center" }}>
                        <Text style={{ color: "white", fontSize: 18, }}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.register}>
                        <Text> For get password ?</Text>
                        <Text style={{color: "red"}}> Register</Text>
                    </View>

                    
                </LinearGradient>
            </View>
        )
    }
}
const windowH = Dimensions.get('window').width;
const windowW = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#EDFFFF",


    },
    contentContainer: {
        position:"relative",
        flex : 3,
        alignContent : "center",
        alignItems : "center",
        
    },
    loginContainer:{
        position:"relative",
        flex: 5,
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
        alignContent: "center",
        alignItems:'center'
       
    },
    textInput:{
        borderRadius : 50,
        marginLeft: 5,

        width : windowW*0.37
    },
    lineInput:{
        
        flexDirection: "row",
        width : windowW*0.51,
        height : windowH*0.14,
        borderColor : "#C845FB",
        borderWidth : 2,
        // marginLeft : 10,
        borderRadius : 50
       
        
        
    },
    title:{
        fontSize : 25,
        textAlign : "center",
        margin : 20,
        fontWeight: "bold",
        color: "red"

    },
    btnlogin:{
        margin : 10,
        borderRadius : 50,
        backgroundColor: "red",

    },
    register:{
        flexDirection: "row",
        textAlign: "center",
        alignContent:"center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    }
})
