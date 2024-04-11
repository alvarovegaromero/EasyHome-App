import { useNavigation } from "@react-navigation/native";
import { Alert, Button, GestureResponderEvent, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import generalStyles from "../styles/styles";
import stylesProfileScreen from "../styles/stylesProfileScreens";
import { StackScreenProps } from "@react-navigation/stack";
import { MyStackParamsList } from "../components/types";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

type props = StackScreenProps<MyStackParamsList, 'EditProfileScreen'>;

const EditProfileScreen: React.FunctionComponent<props> = ({navigation, route}: props) => {
    const [username, setUsername] = useState<string>(route.params.username);
    const [email, setEmail] = useState<string>(route.params.email);
    const [firstName, setFirstName] = useState<string>(route.params.firstName);
    const [lastName, setLastName] = useState<string>(route.params.lastName);

    const handleEditProfileSubmit = async (event: GestureResponderEvent) => {

        if (username === '' || email === '') {
            Alert.alert('Error', 'Username and email must be filled');
            console.error('Edit profile Failed - Username and email must be filled');
            return;
        }

        const token = await AsyncStorage.getItem('token');

        fetch(BASE_URL+'/api/users/profile', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({ username, email, firstName, lastName}),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(({ error }) => {
                    Alert.alert('Error', error);
                    throw new Error(`${response.status} - ${error}`, );
                });
            }
            navigation.navigate('ProfileScreen' as never); 
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView style={generalStyles.defaultScrollView}>
                <View style={stylesProfileScreen.containerProfile}>
                    <Text accessibilityLabel='My Profile:' style={stylesProfileScreen.headerMyProfile}>My Profile: </Text>

                    <View style={generalStyles.defaultContainerTextAndInput}>
                        <Text accessibilityLabel='Username:'>Username:</Text>
                        <TextInput
                            style={generalStyles.defaultInput}
                            value={username}
                            onChangeText={setUsername}
                            accessibilityLabel={`Username input field. Value ${username}`}
                        />
                    </View>
                    <View style={generalStyles.defaultContainerTextAndInput}>
                        <Text accessibilityLabel='Email:'>Email:</Text>
                        <TextInput
                            style={generalStyles.defaultInput}
                            value={email}
                            onChangeText={setEmail}
                            accessibilityLabel={`Email input field. Value ${email}`}
                        />
                    </View>
                    <View style={generalStyles.defaultContainerTextAndInput}>
                        <Text accessibilityLabel='First Name (optional):'>First Name (optional):</Text>
                        <TextInput
                            style={generalStyles.defaultInput}
                            value={firstName}
                            onChangeText={setFirstName}
                            accessibilityLabel={`First Name input field. Value ${firstName}`}
                        />
                    </View>
                    <View style={generalStyles.defaultContainerTextAndInput}>
                        <Text accessibilityLabel='Last Name (optional):'>Last Name (optional):</Text>
                        <TextInput
                            style={generalStyles.defaultInput}
                            value={lastName}
                            onChangeText={setLastName}
                            accessibilityLabel={`Last Name input field. Value ${lastName}`}
                        />
                    </View>
                </View>
                <View style={stylesProfileScreen.containerButtonsProfile}>
                    <View style={stylesProfileScreen.containerEditProfileButton}>
                        <Button accessibilityLabel='Save changes button' title="Save changes" onPress={handleEditProfileSubmit} /> 
                    </View>
                    <View style={stylesProfileScreen.containerGoBackButton}>
                        <Button accessibilityLabel='Go back button' title="Go Back" onPress={handleGoBack} /> 
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfileScreen;