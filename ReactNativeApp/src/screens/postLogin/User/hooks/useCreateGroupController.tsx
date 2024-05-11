import { useContext, useEffect, useState } from "react";
import { BASE_URL } from '../../../../config';
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { GroupContext } from "../../../../contexts/GroupContext";


const useCreateGroupController = () => {
    const navigation = useNavigation();
    
    const { setGroupId } = useContext(GroupContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [currency, setCurrency] = useState('')
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const fetchCurrencies = () => {    
        fetch(BASE_URL + '/api/groups/currencies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(({ error }) => {
                    Alert.alert('Error', error);
                    throw new Error(`${response.status} - ${error}`);
                });
            } else {
                return response.json();
            }
        })
        .then(data => {
            setCurrencies(data);
        })
        .catch(error => {
            console.error('Error:', error);
        })
    };

    const handleCreateGroupSubmit = async () => {

        if (name === '' || !currency) {
            Alert.alert('Error', 'Name and currency are required');
            console.error('Error: Name and currency are required');
            return;
        }

        const token = await AsyncStorage.getItem('token');

        fetch(BASE_URL+'/api/groups/create', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({name, description, currency}),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(({ error }) => {
                    Alert.alert('Error', error);
                    throw new Error(`${response.status} - ${error}`, );
                });
            }
            else{
                return response.json();
            }
        })
        .then(data => {
            setGroupId(data.id.toString());
            navigation.navigate('GroupHomeScreen' as never);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return { name, setName, 
        description, setDescription, 
        currency, setCurrency, 
        currencies,
        handleCreateGroupSubmit, handleGoBack
    };
}

export default useCreateGroupController;
