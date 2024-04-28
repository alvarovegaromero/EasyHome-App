import { useEffect, useState } from "react";
import { BASE_URL } from '../../../../config';
import { Alert } from "react-native";


const useCreateGroupController = () => {
    const [groupname, setGroupname] = useState('');
    const [description, setDescription] = useState('');
    const [currency, setCurrency] = useState('EUR'); //Initial value
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

    return { groupname, setGroupname, 
        description, setDescription, 
        currency, setCurrency, 
        currencies, setCurrencies
    };
}

export default useCreateGroupController;
