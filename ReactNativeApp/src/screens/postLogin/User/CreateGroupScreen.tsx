import React from 'react';
import { Button, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import generalStyles from '../../../styles/styles';
import useCreateGroupController from './hooks/useCreateGroupController';
import Picker from 'react-native-picker-select';


const CreateGroupScreen: React.FunctionComponent = () => {
    const { name, setName, description, setDescription, currency, setCurrency, 
            currencies, handleCreateGroupSubmit } = useCreateGroupController();

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView contentContainerStyle={generalStyles.defaultScrollView}>
                <View>
                    <Text>CreateGroupScreen</Text>
                    <Text> Group name: </Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        accessibilityLabel='Group name input'
                        testID='NameInput'
                    />
                    <Text> Description: </Text>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        accessibilityLabel='Description input'
                        testID='DescriptionInput'
                    />
                    <Text> Currency: </Text>
                    <Picker
                        value={currency}
                        onValueChange={(itemValue) => setCurrency(itemValue)}
                        items={currencies.map((currencyOption) => ({
                            label: currencyOption[1],
                            value: currencyOption[0],
                        }))}
                    />
                    <Button 
                        title='Create group' 
                        onPress={handleCreateGroupSubmit} 
                        accessibilityLabel="Create group button"
                        testID='CreateGroupButton'
                    /> 
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateGroupScreen;