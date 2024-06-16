import {useContext, useEffect, useRef, useState} from 'react';
import {GroupContext} from '../../../../../contexts/GroupContext';
import {Alert, ScrollView} from 'react-native';
import {BASE_URL} from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFormatedDateForRequests} from '../../../../../utils/utils';
import {BoughtProduct, Product} from '../types';
import {User} from '../../Chores/types';

const useShoppingListStatsController = () => {
  const {groupId} = useContext(GroupContext);

  const [startDate, setStartDate] = useState(new Date());
  const [startDateModalOpen, setStartDateModalOpen] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [endDateModalOpen, setEndDateModalOpen] = useState(false);
  const [boughtProductsInfo, setBoughtProductsInfo] = useState<BoughtProduct[]>(
    [],
  );

  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
    undefined,
  );
  const [selectedProductId, setSelectedProductId] = useState<
    number | undefined
  >(undefined);

  const [groupUsers, setGroupUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  }, [boughtProductsInfo]);

  useEffect(() => {
    fetchProducts();
    fetchGroupUsersData();
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

  const fetchGroupUsersData = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/groups/' + groupId + '/users', {
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
      .then((data: {users: User[]}) => {
        setGroupUsers(data.users);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const fetchBoughtProductsStats = async () => {
    if (startDate > endDate) {
      Alert.alert('Error', 'Start date can not be bigger than End date');
      console.error(
        'Filtering Failed - Start date can not be bigger than End date',
      );
      return;
    }

    const start_date_formatted = getFormatedDateForRequests(startDate);
    const end_date_formatted = getFormatedDateForRequests(endDate);

    const token = await AsyncStorage.getItem('token');

    const url =
      BASE_URL +
      '/api/shopping_list/' +
      groupId +
      '/products/bought/range?start_date=' +
      start_date_formatted +
      '&end_date=' +
      end_date_formatted +
      (selectedProductId ? '&product_id=' + selectedProductId : '') +
      (selectedUserId ? '&user_id=' + selectedUserId : '');

    fetch(url, {
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
          return response.json() as Promise<BoughtProduct[]>;
        }
      })
      .then(data => {
        if (data.length === 0) {
          Alert.alert('Error', 'No products found with these conditions');
          setBoughtProductsInfo([]);
        } else {
          setBoughtProductsInfo(data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Stats part

  const boughtProductCounts = boughtProductsInfo.reduce(
    (counts, boughtProduct) => {
      const productType = boughtProduct.product.name;
      if (!counts[productType]) {
        counts[productType] = {count: 0, total: 0};
      }
      counts[productType].count += 1;
      counts[productType].total += parseFloat(boughtProduct.price.toString());
      return counts;
    },
    {} as {[key: string]: {count: number; total: number}},
  );

  const pieData = Object.entries(boughtProductCounts).map(
    ([label, {count, total}]) => {
      let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      color = color.padEnd(7, '0'); // in case doesnt have 6 digits, fill with 0s

      return {
        label,
        value: count, // quantity
        total, // total price
        color,
      };
    },
  );

  return {
    startDate,
    setStartDate,
    startDateModalOpen,
    setStartDateModalOpen,
    endDate,
    setEndDate,
    endDateModalOpen,
    setEndDateModalOpen,
    groupUsers,
    selectedUserId,
    setSelectedUserId,
    products,
    selectedProductId,
    setSelectedProductId,
    fetchBoughtProductsStats,
    pieData,
    totalBoughtProducts: boughtProductsInfo.length,
    scrollViewRef,
  };
};

export default useShoppingListStatsController;
