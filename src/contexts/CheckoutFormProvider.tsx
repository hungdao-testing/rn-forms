import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import * as z from 'zod';

export const PersonalInfoSchema = z.object({
  fullName: z
    .string({
      message: 'Full name must be required',
    })
    .min(1, {message: 'Full name must be longer than 1'}),
  address: z.string().min(1, {message: 'Please provide address'}),
  city: z.string().min(1, {message: 'City is required'}),
  postCode: z.string().min(1, {message: 'PostalCode is required'}),
  country: z.string().length(2),
  phoneNumber: z.string().min(1, {message: 'Please provide phone number'}),
  dateOfBirth: z.string(),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

export const PaymentInfoSchema = z.object({
  cardNumber: z
    .string({message: 'Please provide card number'})
    .min(1, {message: 'Card number must be longer than 1'}),
  expireDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Please use MM/YY format'),
  cvv: z.coerce
    .number({message: 'Please provide cvv number'})
    .min(100, {message: 'input should be greater than 100'})
    .max(999, {message: 'input should be less than 999'}),
  saveCard: z.boolean().optional(),
});

export type PaymentInfo = z.infer<typeof PaymentInfoSchema>;

type CheckoutFormContextType = {
  personalInfo: PersonalInfo | undefined;
  setPersonalInfo: (val: PersonalInfo | undefined) => void;
  paymentInfo: PaymentInfo | undefined;
  setPaymentInfo: (val: PaymentInfo | undefined) => void;
  onSubmit: () => void;
};

const CheckoutFormContext = createContext<CheckoutFormContextType>({
  personalInfo: undefined,
  setPersonalInfo: () => {},
  paymentInfo: undefined,
  setPaymentInfo: () => {},
  onSubmit: () => {},
});

const CheckoutFormProvider = ({children}: PropsWithChildren) => {
  const navigation = useNavigation();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | undefined>();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | undefined>();

  const onSubmit = () => {
    if (!personalInfo || !paymentInfo) {
      console.log('The form is not completed, please check it');
      return;
    }
    setPersonalInfo(undefined);
    setPaymentInfo(undefined);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      }),
    );
  };
  return (
    <CheckoutFormContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        paymentInfo,
        setPaymentInfo,
        onSubmit,
      }}>
      {children}
    </CheckoutFormContext.Provider>
  );
};

export default CheckoutFormProvider;

export const useCheckoutForm = () => useContext(CheckoutFormContext);
