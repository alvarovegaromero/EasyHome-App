import { Button, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import generalStyles from '../../../../styles/styles';
import useGroupBoardController from "./hooks/useGroupBoardController";

const GroupBoardScreen: React.FunctionComponent = () => {
    const {boardContent, setBoardContent, isEditable, allowEdit, saveChanges, navigateGroupHome} = useGroupBoardController();

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView style={generalStyles.defaultScrollView}>
                <View style={generalStyles.defaultContainerScreen}>
                    <View>
                        <ScrollView>
                            <View style={{ margin: 30, borderWidth: 1, borderColor: 'black' }}>
                                {isEditable ? (
                                    <>
                                        <TextInput
                                            multiline
                                            value={boardContent}
                                            onChangeText={setBoardContent}
                                            accessibilityLabel="Board content input"
                                            testID="BoardContentInput"
                                        />
                                        <Button 
                                            title="Save" 
                                            onPress={saveChanges}
                                            accessibilityLabel="Save changes button"
                                            testID="SaveChangesButton" 
                                        />
                                    </>
                                ) : (
                                    <Text accessibilityLabel={`Board Content ${boardContent}`}> 
                                        {boardContent} 
                                    </Text>
                                )}
                                <Button 
                                    title="Edit" 
                                    onPress={allowEdit} 
                                    accessibilityLabel="Allow edition button"
                                    testID="AllowEditionButton"
                                />
                            </View>
                        </ScrollView>
                    </View>
                    <View style={generalStyles.defaultContainerButton}>
                            <View style={generalStyles.defaultButton}>
                                <Button
                                title="Go to Group Home"
                                onPress={navigateGroupHome}
                                accessibilityLabel='Go to Group Home button'
                                testID='GoToGroupHomeButton'
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GroupBoardScreen;
