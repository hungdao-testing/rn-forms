/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PersonalScreen from './PersonalScreen';
import ConfirmForm from './ConfirmScreen';
import PaymentDetailsForm from './PaymentScreen';
import CheckoutFormProvider from '../../contexts/CheckoutFormProvider';
import CheckoutStepFormIndicator from '../../component/CheckoutStepFormIndicator';

const CheckOutGroupStack = createNativeStackNavigator();

const InitialCheckoutFlow = ({navigation}: any) => {
  return (
    <CheckoutFormProvider>
      <CheckoutStepFormIndicator />

      <CheckOutGroupStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <CheckOutGroupStack.Screen
          name="personal"
          component={PersonalScreen}
          options={{}}
        />
        <CheckOutGroupStack.Screen
          name="payment"
          component={PaymentDetailsForm}
          options={{}}
        />

        <CheckOutGroupStack.Screen
          name="confirm"
          component={ConfirmForm}
          options={{}}
        />
      </CheckOutGroupStack.Navigator>
    </CheckoutFormProvider>
  );
};

export default InitialCheckoutFlow;
