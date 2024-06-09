import {useContext, useEffect, useState} from 'react';
import {BASE_URL} from '../../../../../config';
import {GroupContext} from '../../../../../contexts/GroupContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {ProductToBuy} from '../types';
import {UserContext} from '../../../../../contexts/UserContext';

const useShoppingListController = () => {
  const {groupId} = useContext(GroupContext);
  const {id} = useContext(UserContext);

  const [productsMarkedToBuy, setProductsMarkedToBuy] = useState<
    ProductToBuy[] | undefined
  >(undefined);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [price, setPrice] = useState('');

  //Used for the product that is going to be marked as bought
  const [productToBuy, setProductToBuy] = useState<ProductToBuy | undefined>(
    undefined,
  );

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

  const confirmAndMarkProductAsBought = (product: ProductToBuy) => {
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
            setProductToBuy(product);
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
    setProductToBuy(undefined);
  };

  const markProductAsBought = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(
      BASE_URL +
        '/api/shopping_list/' +
        groupId +
        '/products/' +
        productToBuy!.product.id +
        '/bought',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({price: Number(price)}), //To define how to set the product elsewhere
      },
    )
      .then(response => {
        if (!response.ok) {
          return response.json().then(({error}) => {
            Alert.alert('Error', error);
            throw new Error(`${response.status} - ${error}`);
          });
        } else {
          addProductBoughtAsExpense();
          setProductsMarkedToBuy(prevProducts =>
            prevProducts!.filter(
              product => product.product.id !== productToBuy!.product.id,
            ),
          );
          closeDialog();
          Alert.alert(
            'Success',
            'Product marked as bought and groupal expense created successfully',
          );
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const addProductBoughtAsExpense = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/expense_distribution/' + groupId + '/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        name: 'Product bought: ' + productToBuy!.product.name,
        amount: Number(price),
        paid_by: id,
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(({error}) => {
            Alert.alert('Error', error);
            throw new Error(`${response.status} - ${error}`);
          });
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
