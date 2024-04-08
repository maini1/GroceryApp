import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {increaseQuantity, decreaseQuantity} from '../redux/store';
import { useNavigation } from '@react-navigation/native';

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity({id}));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity({id}));
  };

  const navigation = useNavigation();

  const renderItem = ({
    item,
  }: {
    item: {
      image: string;
      id: number;
      name: string;
      quantity: number;
      price: number;
    };
  }) => (
    <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
            <Image source={{uri: item.image}} style={styles.image} />
        </View>
      <View style={styles.itemActionsContainer}>
        <View style={styles.itemNameText}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
        </View>
        <View style={styles.quantityButtons}>
          <TouchableOpacity style={styles.minusBtn} onPress={() => handleDecreaseQuantity(item.id)}>
            <Text>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.plusBtn} onPress={() => handleIncreaseQuantity(item.id)}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.itemTotal}>Total: ₹{(item.quantity * item.price).toFixed(2)}</Text>
      </View>
    </View>
  );

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total: number, item: number) => total + item.quantity * item.price,
        0,
      )
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Text style={styles.total}>Total: ₹{calculateTotal()}</Text>
      <Pressable style={styles.buyBtn} onPress={() => navigation.navigate('PaymentPage' as never)}>
        <Text style={styles.buyBtnText}>Buy</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 12,
  },
  itemContainer: {
    flex: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 8,
    alignContent: 'center'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemActionsContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  itemNameText: {
    marginRight: 10
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityButtons: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
    marginRight: 10
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 16,
  },
  buyBtn: {
    backgroundColor: '#ff0000',
    width: '100%',
    padding: 15,
    borderRadius: 8,
  },
  buyBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  minusBtn: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
  },
  plusBtn: {
    backgroundColor: '#00e600',
    padding: 10,
    borderRadius: 6,
    marginLeft: 10,
  },
});

export default CheckoutPage;
