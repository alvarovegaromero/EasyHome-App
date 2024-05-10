import { SafeAreaView, ScrollView, Text } from "react-native";
import generalStyles from "../../../styles/styles";
import useGroupSettingsController from "./hooks/useGroupSettingsController";

const GroupSettingsScreen: React.FunctionComponent = () => {
    const {} = useGroupSettingsController();

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView style={generalStyles.defaultScrollView}>
                <Text> Settings </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GroupSettingsScreen;
