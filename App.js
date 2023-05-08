import { View, Text, Button } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './components/screens/Home';
import ProductInfo from './components/screens/ProductInfo';
import MyCart from './components/screens/MyCart';


const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
        <Stack.Screen name="MyCart" component={MyCart}></Stack.Screen>
        <Stack.Screen name="ProductInfo" component={ProductInfo}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App