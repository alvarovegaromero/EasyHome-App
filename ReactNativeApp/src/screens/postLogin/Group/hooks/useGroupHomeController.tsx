import { useContext, useEffect } from "react";
import { GroupContext } from "../../../../contexts/GroupContext";
import { BASE_URL } from "../../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const useGroupHomeController = () => {
    const navigation = useNavigation();

    const { groupId, setGroupId } = useContext(GroupContext)

    useEffect(() => {
        fetchGroupData();
    }, []);

    const fetchGroupData = async () => {
        const token = await AsyncStorage.getItem('token');
        
        fetch(BASE_URL+'/api/groups/'+groupId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(({ error }) => {
                    Alert.alert('Error', error);
                    throw new Error(`${response.status} - ${error}`);
                });
            }
            else
                return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const navigateBack = () => {
        setGroupId('');
        navigation.goBack();
    }

    return {navigateBack};
};

export default useGroupHomeController;