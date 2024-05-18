import { useContext, useEffect, useState } from "react";
import { GroupContext } from "../../../../contexts/GroupContext";
import { useNavigation } from "@react-navigation/native";
import Clipboard from '@react-native-clipboard/clipboard';
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../../../config";
import { UserContext } from "../../../../contexts/UserContext";
import { User } from "../types";


const useGroupSettingsController = () => {
    const navigation = useNavigation();

    const { id } = useContext(UserContext);
    const { groupId, setGroupId } = useContext(GroupContext)

    const [dialogVisible, setDialogVisible] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    const [groupUsers, setGroupUsers] = useState<User[]>([]);    
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        fetchGroupUsersData();
    }, []);

    const fetchGroupUsersData = async () => {
        const token = await AsyncStorage.getItem('token');

        fetch(BASE_URL+'/api/groups/'+groupId+'/users', {
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
        .then((data: {users: User[]}) => {
            setGroupUsers(data.users);

            if (data.users.some(user => (user.id.toString() === id 
                                        && user.is_owner === true))) 
                setIsOwner(true);
                       
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

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

    const confirmAndKickUser = async (userId: string) => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to remove this user from the group?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: () => kickUser(userId)
                }
            ]
        );
    }

    const kickUser = async (userId: string) => {
        const token = await AsyncStorage.getItem('token');
    
        fetch(BASE_URL+'/api/groups/'+groupId+'/kick/'+userId, {
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
                fetchGroupUsersData();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const confirmAndPromoteUser = async (userId: string) => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to promote this user to owner?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: () => promoteUser(userId)
                }
            ]
        );
    }

    const promoteUser = async (userId: string) => {
        const token = await AsyncStorage.getItem('token');
    
        fetch(BASE_URL+'/api/groups/'+groupId+'/change_owner/'+userId, {
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
            else{
                fetchGroupUsersData();
            }
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
        closeDialog, joinCode, groupUsers, isOwner, confirmAndKickUser, confirmAndPromoteUser,
        copyJoinCodeToClipboard, navigateGroupHome};
};

export default useGroupSettingsController;
