import React from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import generalStyles from '../../../styles/styles';
import useCreateGroupController from './hooks/useCreateGroupController';


const CreateGroupScreen: React.FunctionComponent = () => {
    const { groupname, setGroupname, description, setDescription } = useCreateGroupController();

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
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


/*
        name = request.data.get('name')
        description = request.data.get('description', '') #empty string if not provided
        currency = request.data.get('currency')
*/

export default CreateGroupScreen;