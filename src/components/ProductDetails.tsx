import React, { useEffect, useLayoutEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native"
import { NavigationType } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<NavigationType, 'ProductDetails'>

export const ProductDetails:React.FC<Props> = ({navigation, route}) => {
    const selectedProduct = route.params;

    useEffect(()=>{
        navigation.setOptions({
            title: selectedProduct.name
        })
    }, [selectedProduct])

    return <View style={styles.bottomSheetContainer}>
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
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
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