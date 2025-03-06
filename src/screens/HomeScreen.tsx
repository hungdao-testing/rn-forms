import {View, StyleSheet} from 'react-native';
import React from 'react';
import CustomButton from '../component/CustomButton';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Checkout"
        onPress={() => navigation.navigate('InitialCheckoutFlow')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default HomeScreen;
