import { Button, Text, TextInput, View } from "react-native";
import generalStyles from '../../../../styles/styles';
import useGroupBoardController from "./hooks/useGroupBoardController";

const GroupBoardScreen: React.FunctionComponent = () => {
    const {boardContent, setBoardContent, isEditable, allowEdit, saveChanges, navigateGroupHome} = useGroupBoardController();

    return (
        <View>
            <Text>GroupBoardScreen</Text>
            <Button
                title="Go to Group Home"
                onPress={navigateGroupHome}
                accessibilityLabel='Go to Group Home button'
                testID='GoToGroupHomeButton'
            />
            <View style={{ margin: 30, borderWidth: 1, borderColor: 'black' }}>
                {isEditable ? (
                    <>
                        <TextInput
                            multiline
                            value={boardContent}
                            onChangeText={setBoardContent}
                        />
                        <Button 
                            title="Save" 
                            onPress={saveChanges} 
                        />
                    </>
                ) : (
                    <Text> {boardContent} </Text>
                )}
                <Button title="Edit" onPress={allowEdit} />
            </View>
        </View>
    );
};

export default GroupBoardScreen;
