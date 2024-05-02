import React from 'react';
import { Button, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import generalStyles from '../../../styles/styles';
import useCreateGroupController from './hooks/useCreateGroupController';
import Picker from 'react-native-picker-select';
import stylesCreateGroupScreen from '../../../styles/stylesCreateGroupScreen';


const CreateGroupScreen: React.FunctionComponent = () => {
    const { name, setName, description, setDescription, currency, setCurrency, 
            currencies, handleCreateGroupSubmit } = useCreateGroupController();

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView contentContainerStyle={generalStyles.defaultScrollView}>
                <View style={stylesCreateGroupScreen.containerScreen}>
                    <View style={generalStyles.defaultContainerHeader}> 
                        <Text style={generalStyles.defaultHeader}>Create a Group form</Text>
                    </View>
                    <View style={stylesCreateGroupScreen.containerInputs}>
                        <View style={stylesCreateGroupScreen.containerInputName}>
                            <Text> Group name: </Text>
                            <TextInput
                                style={generalStyles.defaultInput}
                                value={name}
                                onChangeText={setName}
                                accessibilityLabel='Group name input'
                                testID='NameInput'
                            />
                        </View>
                        <View style={stylesCreateGroupScreen.containerInputDescription}>
                            <Text> Description: </Text> 
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
                            <Text> Currency: </Text>
                            <View style={generalStyles.defaultInput}>
                                <Picker
                                    value={currency}
                                    onValueChange={(itemValue) => setCurrency(itemValue)}
                                    items={currencies.map((currencyOption) => ({
                                        label: currencyOption[1],
                                        value: currencyOption[0],
                                    }))}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={generalStyles.defaultContainerButton}>
                        <View style={generalStyles.defaultButton}>
                            <Button 
                                title='Create group' 
                                onPress={handleCreateGroupSubmit} 
                                accessibilityLabel="Create group button"
                                testID='CreateGroupButton'
                            /> 
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateGroupScreen;
