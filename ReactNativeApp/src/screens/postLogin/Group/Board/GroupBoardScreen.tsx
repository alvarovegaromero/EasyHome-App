import { Button, Text, View } from "react-native";
import generalStyles from '../../../../styles/styles';
import useGroupBoardController from "./hooks/useGroupBoardController";

const GroupBoardScreen: React.FunctionComponent = () => {
    const {boardContent, navigateGroupHome} = useGroupBoardController();

    return (
        <View>
            <Text>GroupBoardScreen</Text>
            <Button
                title="Go to Group Home"
                onPress={navigateGroupHome}
                accessibilityLabel='Go to Group Home button'
                testID='GoToGroupHomeButton'
            />
            <View>
                <Text> {boardContent} </Text>
            </View>
        </View>
    );
};

export default GroupBoardScreen;
