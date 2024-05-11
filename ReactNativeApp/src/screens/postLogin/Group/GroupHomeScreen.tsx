import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import useGroupHomeController from "./hooks/useGroupHomeController";
import generalStyles from "../../../styles/styles";


const GroupHomeScreen: React.FunctionComponent = () => {
    const { navigateHome } = useGroupHomeController();

    return (
        <SafeAreaView style={generalStyles.defaultSafeAreaView}>
            <ScrollView style={generalStyles.defaultScrollView}>
                <Text>Group Name</Text>
                <Text> What do you want to do today?</Text>
                <Button
                    title = "Distribute Expenses"
                    onPress={() => {}}
                    accessibilityLabel='Distribute expenses button'
                    testID='DistributeExpensesButton'
                />
                <Button
                    title="Manage Shopping Lists"
                    onPress={() => {}}
                    accessibilityLabel='Manage shopping lists button'
                    testID='ManageShoppingListsButton'
                />
                <Button 
                    title="Distribute household chores"
                    onPress={() => {}}
                    accessibilityLabel='Distribute household chores button'
                    testID='DistributeHouseholdChoresButton'
                />
                <Button
                    title="View the pantry"
                    onPress={() => {}}
                    accessibilityLabel='View the pantry button'
                    testID='ViewThePantryButton'
                />
                <Button 
                    title="Group Board"
                    onPress={() => {}}
                    accessibilityLabel='Group Board button'
                    testID='GroupBoardButton'
                />
                <Button 
                    title="Group Settings"
                    onPress={() => {}}
                    accessibilityLabel='Group Settings button'
                    testID='GroupSettingsButton'
                />
                <Button 
                    title="Go back to Home"
                    onPress={navigateHome}
                    accessibilityLabel='Go back to Home button'
                    testID='GoBackToHomeButton'
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default GroupHomeScreen;