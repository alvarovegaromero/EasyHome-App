import React from 'react';
import { Button, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import generalStyles from '../../../styles/styles';
import useCreateGroupController from './hooks/useCreateGroupController';
import Picker from 'react-native-picker-select';
import stylesCreateGroupScreen from '../../../styles/stylesCreateGroupScreen';


const CreateGroupScreen: React.FunctionComponent = () => {
    const { name, setName, description, setDescription, currency, setCurrency, 
            currencies, handleCreateGroupSubmit, handleGoBack } = useCreateGroupController();

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView contentContainerStyle={generalStyles.defaultScrollView}>
                <View style={generalStyles.defaultContainerScreen}>
                    <View style={generalStyles.defaultContainerHeader}> 
                        <Text style={generalStyles.defaultHeader}>Create a Group form</Text>
                    </View>
                    <View style={stylesCreateGroupScreen.containerInputs}>
                        <View style={stylesCreateGroupScreen.containerInputName}>
                            <Text accessibilityLabel='Group name:'> Group name: </Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                value={name}
                                onChangeText={setName}
                                accessibilityLabel='Group name input'
                                testID='NameInput'
                            />
                        </View>
                        <View style={stylesCreateGroupScreen.containerInputDescription}>
                            <Text accessibilityLabel='Description:'> Description: </Text> 
                            <TextInput
                                style={stylesCreateGroupScreen.InputDescription}
                                value={description}
                                onChangeText={setDescription}
                                accessibilityLabel='Description input'
                                testID='DescriptionInput'
                                multiline
                                numberOfLines={5}
                            />
                        </View>
                        <View style={stylesCreateGroupScreen.containerInputCurrency}>
                            <Text accessibilityLabel='Currency:'> Currency: </Text>
                            <View style={generalStyles.defaultInput}>
                                <Picker
                                    value={currency}
                                    onValueChange={(itemValue) => setCurrency(itemValue)}
                                    items={currencies.map((currencyOption) => ({
                                        label: currencyOption[1],
                                        value: currencyOption[0],
                                    }))}
                                    textInputProps={{ accessibilityLabel: 'Currency picker', testID: 'CurrencyPicker' }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={stylesCreateGroupScreen.containerButton}>
                        <View style={generalStyles.defaultButton}>
                            <Button 
                                title='Create group' 
                                onPress={handleCreateGroupSubmit} 
                                accessibilityLabel="Create group button"
                                testID='CreateGroupButton'
                            /> 
                        </View>
                    </View>
                    <View style={stylesCreateGroupScreen.containerButton}>
                        <View style={generalStyles.defaultButton}>
                            <Button 
                                title='Go back' 
                                onPress={handleGoBack} 
                                accessibilityLabel='Go back button'
                                testID='GoBackButton'    
                            /> 
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateGroupScreen;
