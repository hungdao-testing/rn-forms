import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import InitialCheckoutFlow from '../screens/checkout';

const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="InitialCheckoutFlow"
        component={InitialCheckoutFlow}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
