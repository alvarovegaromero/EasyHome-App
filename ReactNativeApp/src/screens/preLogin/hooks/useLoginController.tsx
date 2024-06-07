import {useState, useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../../contexts/UserContext';

const useLoginController = () => {
  const navigation = useNavigation();

  const {setId, setContextUsername} = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    //TODO: add tests for this and new method
    AsyncStorage.getItem('token').then(token => {
      if (token !== null) {
        getInfoAutomaticLogin();
        navigation.navigate('HomeScreen' as never);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInfoAutomaticLogin = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(BASE_URL + '/api/users/my-info', {
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
        setId(String(data.id));
        setContextUsername(data.username);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleLoginSubmit = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Username and password must be filled');
      console.error('Login Failed - Username and password must be filled');
      return;
    }

    fetch(BASE_URL + '/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
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
        setId(String(data.id));
        setContextUsername(data.username);
        AsyncStorage.setItem('token', data.token);

        navigation.navigate('HomeScreen' as never);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const navigateRegisterScreen = () => {
    navigation.navigate('RegisterScreen' as never);
  };

  const navigateResetPasswordScreen = () => {
    navigation.navigate('ResetPasswordScreen' as never);
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLoginSubmit,
    navigateRegisterScreen,
    navigateResetPasswordScreen,
  };
};

export default useLoginController;
