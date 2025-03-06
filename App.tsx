/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
import Router from './src/router/Router';

function App(): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </View>
  );
}

export default App;
