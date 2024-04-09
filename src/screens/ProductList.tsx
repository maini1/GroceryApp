import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {groceryData} from '../assests/mockData';
import {Product} from '../assests/productTypes';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../redux/cartSlice';
import BottomSheet from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationType } from '../../App';
type Props = NativeStackScreenProps<NavigationType, 'ProductList'>

const ProductList: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedProducts, setSortedProducts] = useState<Product[]>(groceryData);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  //-------> Redux Code
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity({id}));
  };

  const handleDecreaseQuantity = (id: number) => {
    let quantity = 0;
    cartItems.forEach((cartItem: any) => {
      if (cartItem.id === id) {
        quantity = cartItem.quantity;
      }
    });
    if (quantity > 1) {
      dispatch(decreaseQuantity({id}));
    } else {
      dispatch(removeFromCart({id}));
    }
  };
  //-------------->

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredProducts = groceryData.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
    setSortedProducts(filteredProducts);
  };

  //---------> BottomSheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const openBottomSheet = (product: Product) => {
    setSelectedProduct(product); // Set selected product
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    setSelectedProduct(null); // Clear selected product
    bottomSheetRef.current?.collapse();
  };

  const renderBottomSheetContent = () => (
    <TouchableWithoutFeedback onPress={closeBottomSheet}>
      <View style={styles.bottomSheetContainer}>
        {selectedProduct && (
          <View>
            <Image
              source={{uri: selectedProduct.image}}
              style={styles.bottomSheetImage}
            />
            <Text style={styles.bottomSheetName}>{selectedProduct.name}</Text>
            <Text style={styles.bottomSheetName}>
              {selectedProduct.category}
            </Text>
            <Text style={styles.bottomSheetPrice}>
              ₹{selectedProduct.price.toFixed(2)}
            </Text>
            <Text style={styles.bottomSheetDescription}>
              Description: {selectedProduct.description}
            </Text>
            {/* Other product details can be added here */}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );

  //--------->

  const handleSortByPrice = () => {
    const sortedByPrice = [...sortedProducts].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSortedProducts(sortedByPrice);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const renderProductItem = ({item}: {item: Product}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', item)}>
        <Image source={{uri: item.image}} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
      {cartItems.find((cartItem: any) => cartItem.id === item.id) ? (
        ''
      ) : (
        <TouchableOpacity
          style={styles.addItemBtn}
          onPress={() => handleAddToCart(item)}>
          <Text style={styles.addItemBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
      {cartItems.find((cartItem: any) => cartItem.id === item.id) && (
        <View style={styles.quantityButtons}>
          <TouchableOpacity
            style={styles.minusBtn}
            onPress={() => handleDecreaseQuantity(item.id)}>
            <Text style={styles.addItemBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityBtn}>
            {
              cartItems.find((cartItem: any) => cartItem.id === item.id)
                .quantity
            }
          </Text>
          <TouchableOpacity
            style={styles.plusBtn}
            onPress={() => handleIncreaseQuantity(item.id)}>
            <Text style={styles.addItemBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by item name"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.sortButton} onPress={handleSortByPrice}>
          <Text style={styles.sortButtonText}>
            Sort by Price {sortDirection === 'asc' ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedProducts}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderProductItem}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Start with collapsed bottom sheet
        snapPoints={['1%', '60%']} // Define snap points for bottom sheet
        handleComponent={() => <View style={styles.bottomSheetHandle} />}>
        {renderBottomSheetContent()}
      </BottomSheet>
      {cartItems.length > 0 && (
        <Pressable
          style={styles.checkoutbtn}
          onPress={() => navigation.navigate('CheckoutPage' as never)}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  sortButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  flatListContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#777',
  },

  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    flexDirection: 'column',
    margin: 12,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: 160,
    height: 'auto',
    justifyContent: 'center',
  },

  bottomSheetHandle: {
    backgroundColor: '#ccc',
    width: '100%',
    height: 4,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 8,
  },
  bottomSheetContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  bottomSheetImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  bottomSheetName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  bottomSheetPrice: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 16,
  },
  bottomSheetDescription: {
    fontSize: 14,
    textAlign: 'justify',
  },
  checkoutbtn: {
    backgroundColor: '#ff0000',
    width: '100%',
    padding: 15,
    borderRadius: 8,
  },
  checkoutText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  addItemBtn: {
    backgroundColor: '#0066ff',
    padding: 10,
    borderRadius: 6,
  },
  addItemBtnText: {
    color: '#fff',
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
  quantityBtn: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductList;
