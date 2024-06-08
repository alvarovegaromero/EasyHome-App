import {useContext, useEffect, useState} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product} from '../types';

const useProductsController = () => {
  const {groupId} = useContext(GroupContext);

  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/shopping_list/' + groupId + '/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(({error}) => {
            Alert.alert('Error', error);
            throw new Error(`${response.status} - ${error}`);
          });
        } else {
          return response.json();
        }
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const confirmAndMarkProductToBuy = (productId: number) => {
    Alert.alert(
      'Mark product to buy',
      'Are you sure you want to mark this product to buy?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => markProductToBuy(productId),
        },
      ],
    );
  };

  const markProductToBuy = async (productId: number) => {
    const token = await AsyncStorage.getItem('token');

    fetch(
      BASE_URL +
        '/api/shopping_list/' +
        groupId +
        '/products/' +
        productId +
        '/to_buy',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      },
    )
      .then(response => {
        if (!response.ok) {
          return response.json().then(({error}) => {
            Alert.alert('Error', error);
            throw new Error(`${response.status} - ${error}`);
          });
        } else {
          fetchProducts();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return {products, confirmAndMarkProductToBuy};
};

export default useProductsController;
