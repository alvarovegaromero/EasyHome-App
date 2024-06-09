import {useContext, useEffect, useState} from 'react';
import {BASE_URL} from '../../../../../config';
import {GroupContext} from '../../../../../contexts/GroupContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {ProductToBuy} from '../types';

const useShoppingListController = () => {
  const {groupId} = useContext(GroupContext);

  const [productsMarkedToBuy, setProductsMarkedToBuy] = useState<
    ProductToBuy[] | undefined
  >(undefined);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [price, setPrice] = useState('');
  const [productToBuyId, setProductToBuyId] = useState<number>();

  useEffect(() => {
    fetchProductsMarkedToBuy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProductsMarkedToBuy = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/shopping_list/' + groupId + '/products/to_buy', {
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
        setProductsMarkedToBuy(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const confirmAndMarkProductAsBought = (productId: number) => {
    Alert.alert(
      'Mark product as bought',
      'Are you sure you want to mark this product as bought?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            showDialog();
            setProductToBuyId(productId);
          },
        },
      ],
    );
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setProductToBuyId(undefined);
  };

  const markProductAsBought = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(
      BASE_URL +
        '/api/shopping_list/' +
        groupId +
        '/products/' +
        productToBuyId +
        '/bought',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({price: price}), //To define how to set the product elsewhere
      },
    )
      .then(response => {
        if (!response.ok) {
          return response.json().then(({error}) => {
            Alert.alert('Error', error);
            throw new Error(`${response.status} - ${error}`);
          });
        } else {
          fetchProductsMarkedToBuy();
          closeDialog();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return {
    productsMarkedToBuy,
    confirmAndMarkProductAsBought,
    dialogVisible,
    closeDialog,
    setPrice,
    markProductAsBought,
  };
};

export default useShoppingListController;
