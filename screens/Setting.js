import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Setting = ({navigation})=>{
    return(
        <View style={styles.container}>
            <Text>Setting Screen</Text>
        </View>
    );
}
export default Setting;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : 'center',
        backgroundColor : '#8fcbbc'
        
    }
});