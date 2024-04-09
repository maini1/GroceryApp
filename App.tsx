import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProductScreen from './src/screens/ProductList';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store';
import './src/debugger/debuggerConfig'
import CheckoutPage from './src/screens/CheckoutPage';
import PaymentPage from './src/screens/PaymentPage';
import OrderSummaryPage from './src/screens/OrderSummaryPage';
import { Product } from './src/assests/productTypes';
import { ProductDetails } from './src/components/ProductDetails';
import {PersistGate} from 'redux-persist/integration/react';
import './debugger';

const Stack = createNativeStackNavigator<NavigationType>();

export type NavigationType = {
  ProductList: undefined,
  CheckoutPage: undefined,
  PaymentPage: undefined,
  OrderSummaryPage: undefined,
  ProductDetails: Product,
}

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ProductList" component={ProductScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="CheckoutPage" component={CheckoutPage} />
          <Stack.Screen name="PaymentPage" component={PaymentPage} />
          <Stack.Screen name="OrderSummaryPage" component={OrderSummaryPage} />
        </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
    </Provider>
    </GestureHandlerRootView>
  );
}


export default App;
