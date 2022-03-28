import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = ({navigation})=>{
const removeDataLogin = async ()=>{
    const value = await AsyncStorage.removeItem('UserName');
    alert('logout sucessfully')
    navigation.replace('login')
}

    return(
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <TouchableOpacity onPress={removeDataLogin} style={styles.buttonLogout}>
                <Text style={{ color: "white", fontSize : 16 }}>logout</Text>
            </TouchableOpacity>
        </View>
    );
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : 'center',
        backgroundColor : '#8fcbbc'
        
    },
    buttonLogout:{
        alignContent : "center",
        alignItems : "center",
        justifyContent : "center",
        width: 50,
        height: 40,
        backgroundColor  : "red"
    }
});