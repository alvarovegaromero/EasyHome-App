import { SafeAreaView, ScrollView, Text } from "react-native";
import generalStyles from "../../../styles/styles";

const GroupSettingsScreen: React.FunctionComponent = () => {

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView style={generalStyles.defaultScrollView}>
                <Text> Settings </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GroupSettingsScreen;
