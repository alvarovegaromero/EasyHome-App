import { Button, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import generalStyles from "../styles/styles";
import stylesProfileScreen from "../styles/stylesProfileScreens";
import { StackScreenProps } from "@react-navigation/stack";
import { MyStackParamsList } from "../components/types";
import useEditProfileController from "./hooks/useEditProfileController";

type props = StackScreenProps<MyStackParamsList, 'EditProfileScreen'>;

const EditProfileScreen: React.FunctionComponent<props> = ({route}: props) => {
    const { username, setUsername, email, setEmail, firstName, setFirstName, lastName, setLastName, handleEditProfileSubmit, handleGoBack } = useEditProfileController(route.params.username, route.params.email, route.params.firstName, route.params.lastName);
    
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
                            testID="UsernameInput"
                        />
                    </View>
                    <View style={generalStyles.defaultContainerTextAndInput}>
                        <Text accessibilityLabel='Email:'>Email:</Text>
                        <TextInput
                            style={generalStyles.defaultInput}
                            value={email}
                            onChangeText={setEmail}
                            accessibilityLabel={`Email input field. Value ${email}`}
                            testID="EmailInput"
                        />
                    </View>
                    <View style={generalStyles.defaultContainerTextAndInput}>
                        <Text accessibilityLabel='First Name (optional):'>First Name (optional):</Text>
                        <TextInput
                            style={generalStyles.defaultInput}
                            value={firstName}
                            onChangeText={setFirstName}
                            accessibilityLabel={`First Name input field. Value ${firstName}`}
                            testID="FirstNameInput"
                        />
                    </View>
                    <View style={generalStyles.defaultContainerTextAndInput}>
                        <Text accessibilityLabel='Last Name (optional):'>Last Name (optional):</Text>
                        <TextInput
                            style={generalStyles.defaultInput}
                            value={lastName}
                            onChangeText={setLastName}
                            accessibilityLabel={`Last Name input field. Value ${lastName}`}
                            testID="LastNameInput"
                        />
                    </View>
                </View>
                <View style={stylesProfileScreen.containerButtonsProfile}>
                    <View style={stylesProfileScreen.containerEditProfileButton}>
                        <Button 
                            title="Save changes" 
                            onPress={handleEditProfileSubmit} 
                            accessibilityLabel='Save changes button' 
                            testID="SaveChangesButton"    
                        /> 
                    </View>
                    <View style={stylesProfileScreen.containerGoBackButton}>
                        <Button 
                            title="Go Back" 
                            onPress={handleGoBack}
                            accessibilityLabel='Go back button' 
                            testID="GoBackButton"
                        /> 
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfileScreen;