import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import generalStyles from '../../../styles/styles';


const CreateGroupScreen: React.FunctionComponent = () => {
    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView contentContainerStyle={generalStyles.defaultScrollView}>
                <View>
                    <Text>CreateGroupScreen</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateGroupScreen;