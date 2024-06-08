import {useContext, useEffect, useState} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product} from '../types';

const useEstablishProductsController = () => {
  const {groupId} = useContext(GroupContext);

  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  const [addMode, setAddMode] = useState(false);
  const [addInput, setAddInput] = useState('');

  const [editMode, setEditMode] = useState(false);
  const [editInput, setEditInput] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

  const createProduct = async () => {
    if (addInput === '') {
      Alert.alert('Error', 'Name of the new product must be filled');
      console.error('Creation Failed - name of the new product must be filled');
      return;
    }

    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/shopping_list/' + groupId + '/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({name: addInput}),
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
      .then((data: Product) => {
        setProducts(prevProducts => {
          if (!prevProducts) {
            return [data];
          }

          return [...prevProducts, data];
        });
        setAddInput('');
        changeToViewMode();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const confirmAndDeleteProduct = (productId: number) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete this product?\n\nAll the products bought` +
        `will be deleted.`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteProduct(productId),
        },
      ],
    );
  };

  const deleteProduct = async (productId: number) => {
    const token = await AsyncStorage.getItem('token');

    fetch(
      BASE_URL +
        '/api/shopping_list/' +
        groupId +
        '/products/' +
        productId.toString(),
      {
        method: 'DELETE',
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
          setProducts(prevProducts => {
            if (!prevProducts) {
              return;
            }

            return prevProducts.filter(product => product.id !== productId);
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const changeToViewMode = () => {
    setAddMode(false);
  };

  const changeToAddMode = () => {
    setAddMode(true);
  };

  const startEditingProduct = (product: any) => {
    setEditMode(true);
    setEditInput(product.name);
    setEditingProduct(product);
  };

  const saveEditedProduct = async () => {
    editProduct(editingProduct!.id);
    setEditMode(false);
    setEditingProduct(null);
  };

  const cancelEditingProduct = () => {
    setEditMode(false);
    setEditingProduct(null);
  };

  const editProduct = async (productId: number) => {
    const token = await AsyncStorage.getItem('token');

    fetch(
      BASE_URL +
        '/api/shopping_list/' +
        groupId +
        '/products/' +
        productId.toString(),
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({name: editInput}),
      },
    )
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
      .then((data: Product) => {
        setProducts(prevProducts => {
          return prevProducts!.map(product =>
            product.id === productId ? data : product,
          );
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return {
    products,
    addMode,
    addInput,
    setAddInput,
    createProduct,
    confirmAndDeleteProduct,
    changeToViewMode,
    changeToAddMode,
    editMode,
    editInput,
    setEditInput,
    editingProduct,
    startEditingProduct,
    saveEditedProduct,
    cancelEditingProduct,
  };
};

export default useEstablishProductsController;
