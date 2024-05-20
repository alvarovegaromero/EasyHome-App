import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GroupContext } from "../../../../../contexts/GroupContext";
import { Alert } from "react-native";


const useGroupBoardController = () => {
    const navigation = useNavigation();

    const { groupId } = useContext(GroupContext)

    const [boardContent, setBoardContent] = useState('');

    useEffect(() => {
        fetchGroupContent();
    }, []);

    const fetchGroupContent = async () => {
        const token = await AsyncStorage.getItem('token');

        fetch(BASE_URL+'/api/shared_board/'+groupId, {
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
        .then((data) => {
            setBoardContent(data.content);
        })
        .catch(error => {
            console.error('Error:', error);
        });    
    }

    const navigateGroupHome = () => {
        navigation.navigate('GroupHomeScreen' as never);
    }

    return {boardContent, navigateGroupHome}
};

export default useGroupBoardController;
