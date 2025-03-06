/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../component/CustomButton';
import CustomTextInput from '../../component/CustomTextInput';
import KeyboardAwareScrollView from '../../component/KeyboardAwareScrollView';
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';
import {
  PersonalInfo,
  PersonalInfoSchema,
  useCheckoutForm,
} from '../../contexts/CheckoutFormProvider';
import countries from '../../../assets/countries.json';
import CustomPicker from '../../component/CustomPicker';
import CustomDateTimePicker from '../../component/CustomDateTimePicker';

const PersonalScreen = ({navigation}: any) => {
  const {setPersonalInfo, personalInfo} = useCheckoutForm();
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {...personalInfo},
  });

  const onNext: SubmitHandler<PersonalInfo> = data => {
    // validate form
    setPersonalInfo(data);
    // redirect to payment
    navigation.navigate('payment');
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <CustomTextInput
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          containerStyle={{}}
        />
        <CustomTextInput
          name="address"
          label="Address"
          placeholder="123 street"
          style={{}}
          containerStyle={{}}
        />
        <View style={{flexDirection: 'row', gap: 10}}>
          <CustomTextInput
            name="city"
            label="City"
            placeholder="New York"
            containerStyle={{flex: 2}}
          />
          <CustomTextInput
            name="postCode"
            label="Post code"
            placeholder="70000"
            containerStyle={{flex: 1}}
          />
        </View>
        <CustomPicker
          label="Country"
          name="country"
          placeholder={{label: 'Select a country'}}
          items={countries.map(country => ({
            label: country.name,
            value: country.code,
            testID: country.code,
          }))}
        />
        <CustomTextInput
          name="phoneNumber"
          label="Telephone"
          placeholder="+1234567"
          inputMode="tel"
        />

        <CustomDateTimePicker name="dateOfBirth" />

        <CustomButton
          title="Next"
          style={styles.button}
          onPress={form.handleSubmit(onNext)}
        />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flexGrow: 1, padding: 10, backgroundColor: 'white', gap: 10},
  button: {marginTop: 'auto'},
});
export default PersonalScreen;
