import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationType } from '../../App';

type Props = NativeStackScreenProps<NavigationType, 'OrderSummaryPage'>

const OrderSummaryPage: React.FC<Props> = (props) => {
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  const renderItem = ({ item }: { item: { id: number; name: string; quantity: number; price: number } }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Price: ₹{item.price.toFixed(2)}</Text>
    </View>
  );

  const calculateTotal = () => {
    return cartItems.reduce((total: number, item: { quantity: number; price: number; }) => total + item.quantity * item.price, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Order Summary</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>₹{calculateTotal()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
  },
});

export default OrderSummaryPage;

