import { useContext, useState } from "react";
import { GroupContext } from "../../../../contexts/GroupContext";
import { useNavigation } from "@react-navigation/native";
import Clipboard from '@react-native-clipboard/clipboard';
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../../../config";


const useGroupSettingsController = () => {
    const navigation = useNavigation();

    const { groupId, setGroupId } = useContext(GroupContext)

    const [dialogVisible, setDialogVisible] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    

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
                    onPress: leaveGroup
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
                navigateHome();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const generateJoinCode = async () => {
        const token = await AsyncStorage.getItem('token');
    
        fetch(BASE_URL+'/api/groups/'+groupId+'/generate_code', {
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
            setJoinCode(data.join_code);
            setDialogVisible(true);        
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const closeDialog = () => {
        setDialogVisible(false);
    };

    const copyJoinCodeToClipboard = () => {
        Clipboard.setString(joinCode);
        setDialogVisible(false);
    };

    const navigateHome = () => {
        setGroupId('');
        navigation.navigate('HomeScreen' as never);
    }

    const navigateGroupHome = () => {
        navigation.navigate('GroupHomeScreen' as never);
    }

    return {confirmAndLeaveGroup, confirmAndDeleteGroup, generateJoinCode, dialogVisible, 
        closeDialog, joinCode, copyJoinCodeToClipboard, navigateGroupHome};
};

export default useGroupSettingsController;
