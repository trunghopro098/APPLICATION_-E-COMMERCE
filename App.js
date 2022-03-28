/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabNavigation from './navigation/tabs';
import ProductDetail from './screenListproduct/productDetail';
import SearchBar from './navigation/searchBar';
import Login from './screens/login';
import Splash from './screens/Splash';
import FlashSale from './screens/FlashSale';
import ProfileScreen from './screens/Profile';
import Favorite from './screens/Favorite';

const Stack = createStackNavigator()
// const Stack = createBottomTabNavigator()
const App= () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="splash"
        screenOptions={
          {
            headerShown:false
          }
        }
      >
        <Stack.Screen name='profile' component={ProfileScreen}/>
        <Stack.Screen name='flashsale' component={FlashSale}/>
        <Stack.Screen name="home" component={TabNavigation}  />
        <Stack.Screen name="details" component={ProductDetail} />
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="splash" component={Splash}/>
        <Stack.Screen name="Favorites" component={Favorite} options={{ headerShown:true }}/>
      </Stack.Navigator>
    </NavigationContainer>
 
  );
};

export default App;
