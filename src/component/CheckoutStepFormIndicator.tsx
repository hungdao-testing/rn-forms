/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigationState} from '@react-navigation/native';

const steps = [
  {
    index: 0,
    key: 'personal',
    title: 'Personal',
  },
  {
    index: 1,
    key: 'payment',
    title: 'Payment',
  },
  {
    index: 2,
    key: 'confirm',
    title: 'Comfirmation',
  },
];
const CheckoutStepFormIndicator = () => {
  const appNavState = useNavigationState(state => state);
  const checkoutFlowIndex = appNavState?.routeNames.findIndex(
    r => r.toString() === 'InitialCheckoutFlow',
  );

  const stateOfCheckoutFlow = appNavState.routes[checkoutFlowIndex ?? 0].state;
  const currentScreenIndex = stateOfCheckoutFlow?.index ?? 0;

  const stepIndex = steps.findIndex(step => step.index === currentScreenIndex);

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        height: 100,
        gap: 15,
      }}>
      {steps.map((step, index) => (
        <View
          testID={`step-${stepIndex}-testId`}
          key={step.key}
          style={{
            borderBottomWidth: 3,
            borderColor: stepIndex >= index ? '#005055' : 'lightgray',
            flex: 1,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: stepIndex >= index ? '#005055' : 'gray',
            }}>
            {step.title}
          </Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default CheckoutStepFormIndicator;

