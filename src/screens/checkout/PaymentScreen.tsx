/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomButton from '../../component/CustomButton';
import KeyboardAwareScrollView from '../../component/KeyboardAwareScrollView';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import CustomTextInput from '../../component/CustomTextInput';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  PaymentInfo,
  PaymentInfoSchema,
  useCheckoutForm,
} from '../../contexts/CheckoutFormProvider';
import CustomCheckbox from '../../component/CustomCheckbox';

const PaymentDetailsForm = ({navigation}: any) => {
  const {setPaymentInfo, paymentInfo} = useCheckoutForm();

  const form = useForm<PaymentInfo>({
    resolver: zodResolver(PaymentInfoSchema),
    defaultValues: paymentInfo,
  });

  const onNext: SubmitHandler<PaymentInfo> = data => {
    // validate form
    setPaymentInfo(data);

    // redirect to payment
    navigation.navigate('confirm');
  };
  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <CustomTextInput
          name="cardNumber"
          label="Card Number"
          placeholder="1231231234"
        />
        <View style={{flexDirection: 'row', gap: 5}}>
          <CustomTextInput
            name="expireDate"
            label="Expire Date"
            placeholder="01/23"
            containerStyle={{flex: 1}}
          />
          <CustomTextInput
            name="cvv"
            label="CVV"
            placeholder="187"
            inputMode="numeric"
            containerStyle={{flex: 0.5}}
          />
        </View>
        <CustomCheckbox name="saveCard" label="Save Credit Card" size={20} />
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
  container: {flex: 1, padding: 10, backgroundColor: 'white'},
  button: {marginTop: 'auto', marginBottom: 25},
});

export default PaymentDetailsForm;
