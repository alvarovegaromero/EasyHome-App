import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';
import useGroupHomeController from './hooks/useGroupHomeController';
import generalStyles from '../../../styles/styles';
import stylesGroupHomeScreen from '../../../styles/stylesGroupHomeScreen';

const GroupHomeScreen: React.FunctionComponent = () => {
  const {groupName, navigateBoard, navigateSettings, navigateHome} = useGroupHomeController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <Text style={stylesGroupHomeScreen.headerText}>{groupName}</Text>
          <Text style={generalStyles.defaultSubHeader}> What do you want to do today?</Text>

          <View style={stylesGroupHomeScreen.containerButtons}>
            <View style={stylesGroupHomeScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Distribute Expenses"
                  onPress={() => {}}
                  accessibilityLabel="Distribute expenses button"
                  testID="DistributeExpensesButton"
                />
              </View>
            </View>

            <View style={stylesGroupHomeScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Manage Shopping Lists"
                  onPress={() => {}}
                  accessibilityLabel="Manage shopping lists button"
                  testID="ManageShoppingListsButton"
                />
              </View>
            </View>

            <View style={stylesGroupHomeScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Distribute household chores"
                  onPress={() => {}}
                  accessibilityLabel="Distribute household chores button"
                  testID="DistributeHouseholdChoresButton"
                />
              </View>
            </View>

            <View style={stylesGroupHomeScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="View the pantry"
                  onPress={() => {}}
                  accessibilityLabel="View the pantry button"
                  testID="ViewThePantryButton"
                />
              </View>
            </View>

            <View style={stylesGroupHomeScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Group Board"
                  onPress={navigateBoard}
                  accessibilityLabel="Group Board button"
                  testID="GroupBoardButton"
                />
              </View>
            </View>

            <View style={stylesGroupHomeScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Group Settings"
                  onPress={navigateSettings}
                  accessibilityLabel="Group Settings button"
                  testID="GroupSettingsButton"
                />
              </View>
            </View>

            <View style={stylesGroupHomeScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Go back to Home"
                  onPress={navigateHome}
                  accessibilityLabel="Go back to Home button"
                  testID="GoBackToHomeButton"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupHomeScreen;
