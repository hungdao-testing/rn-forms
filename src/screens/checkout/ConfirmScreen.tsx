/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../../component/CustomButton';
import KeyboardAwareScrollView from '../../component/KeyboardAwareScrollView';
import {useCheckoutForm} from '../../contexts/CheckoutFormProvider';

const ConfirmForm = ({navigation}: any) => {
  const {personalInfo, paymentInfo, setPersonalInfo, setPaymentInfo, onSubmit} =
    useCheckoutForm();

  function handleSubmit() {
    onSubmit();
    setPaymentInfo(undefined);
    setPersonalInfo(undefined);
  }

  console.log({personalInfo, paymentInfo});
  return (
    <KeyboardAwareScrollView>
      <View style={{flex: 1, gap: 10}} >
        {personalInfo && (
          <View style={styles.dataContainer} testID='personalInfo'>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Personal Info</Text>
              <Text
                style={{color: '#005055', fontWeight: '600'}}
                onPress={() => navigation.navigate('personal')}
                testID={'editPersonal'}
                >
                Edit
              </Text>
            </View>
            {Object.entries(personalInfo).map(([key, value]) => (
              <Text key={key}>
                {key}: {value.toString()}
              </Text>
            ))}
          </View>
        )}

        {paymentInfo && (
          <View style={styles.dataContainer} testID='paymentInfo'>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Payment Info</Text>
              <Text
                style={{color: '#005055', fontWeight: '600'}}
                onPress={() => navigation.navigate('payment')}
                testID={'editPayment'}
                >
                Edit
              </Text>
            </View>
            {Object.entries(paymentInfo).map(([key, value]) => (
              <Text key={key}>
                {key}: {value.toString()}
              </Text>
            ))}
          </View>
        )}
        <CustomButton
          title="Submit"
          style={styles.button}
          onPress={handleSubmit}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    paddingBottom: 25,
    gap: 15,
  },
  button: {marginTop: 'auto', marginBottom: 25},
  dataContainer: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    padding: 10,
    borderRadius: 10,
    gap: 3,
  },
  dataContainerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {fontSize: 20, fontWeight: '600', marginBottom: 10},
});

export default ConfirmForm;
