import React from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import generalStyles from '../../../styles/styles';
import useCreateGroupController from './hooks/useCreateGroupController';


const CreateGroupScreen: React.FunctionComponent = () => {
    const { groupname, setGroupname, description, setDescription, currency, setCurrency, currencies, setCurrencies } = useCreateGroupController();

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView contentContainerStyle={generalStyles.defaultScrollView}>
                <View>
                    <Text>CreateGroupScreen</Text>
                    <Text> Group name: </Text>
                    <TextInput
                        value={groupname}
                        onChangeText={setGroupname}
                        accessibilityLabel='Group name input'
                        testID='GroupnameInput'
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
                        selectedValue={selectedCurrency}
                        onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
                    >
                        {currencies.map((currencyOption) => 
                            <Picker.Item key={currencyOption[0]} label={currencyOption[1]} value={currencyOption[0]} />
                        )}
                    </Picker>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateGroupScreen;