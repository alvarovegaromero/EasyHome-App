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

    const confirmAndLeaveGroup = async () => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to leave the group?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: () => leaveGroup()
                }
            ]
        );
    }

    const leaveGroup = async () => {
        const token = await AsyncStorage.getItem('token');
    
        fetch(BASE_URL+'/api/groups/'+groupId+'/leave', {
            method: 'POST',
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
            navigateHome();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const confirmAndDeleteGroup = async () => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to delete the group?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: () => deleteGroup()
                }
            ]
        );
    }

    const deleteGroup = async () => {
        const token = await AsyncStorage.getItem('token');
    
        fetch(BASE_URL+'/api/groups/'+groupId, {
            method: 'DELETE',
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
            navigateHome();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const navigateHome = () => {
        setGroupId('');
        navigation.navigate('HomeScreen' as never);
    }

    return {confirmAndLeaveGroup, confirmAndDeleteGroup, navigateHome};
};

export default useGroupHomeController;