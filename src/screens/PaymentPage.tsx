import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationType } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<NavigationType, 'PaymentPage'>

const PaymentPage: React.FC<Props> = ({navigation, route}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const validateCardNumber = (cardNumber: string): boolean => {
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
      Alert.alert('Error', 'Invalid card number. Card number must be a 16-digit numeric value.');
      return false;
    }
    return true;
  };

  const validateCVV = (cvv: string): boolean => {
    if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
      Alert.alert('Error', 'Invalid CVV. CVV must be a 3-digit numeric value.');
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    // if (cardNumber.trim() === '' || expiryDate.trim() === '' || cvv.trim() === '') {
    //   Alert.alert('Error', 'Please fill in all payment details.');
    //   return;
    // }

    if (!validateCardNumber(cardNumber) || !validateCVV(cvv) || expiryDate.trim() === '') {
      return;
    }

    navigation.navigate('OrderSummaryPage');
    Alert.alert('Payment Successful', 'Thank you for your payment!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YYYY)"
        value={expiryDate}
        onChangeText={(text) => setExpiryDate(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        onChangeText={(text) => setCvv(text)}
        keyboardType="numeric"
        maxLength={3}
      />
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  payButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentPage;
