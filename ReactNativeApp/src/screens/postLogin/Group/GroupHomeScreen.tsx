import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useGroupHomeController from './hooks/useGroupHomeController';
import generalStyles from '../../../styles/styles';
import stylesGroupHomeScreen from '../../../styles/stylesGroupHomeScreen';
import GroupFooter from '../../../utils/GroupFooter/GroupFooter';
import {Icon} from '@rneui/themed';

const GroupHomeScreen: React.FunctionComponent = () => {
  const {
    groupName,
    navigateBoard,
    navigateSettings,
    navigateHome,
    navigateExpenses,
    navigateChores,
    navigateShoppingList,
  } = useGroupHomeController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <Text style={stylesGroupHomeScreen.headerText}>{groupName}</Text>
          <Text style={generalStyles.defaultSubHeader}>
            What do you want to do today?
          </Text>

          <View style={stylesGroupHomeScreen.containerButtons}>
            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="currency-usd"
                type="material-community"
                reverse
                reverseColor="white"
                color="#2196F3"
                accessibilityLabel="Navigate to Expenses"
                onPress={navigateExpenses}
                size={60}
                testID="DistributeExpensesIcon"
              />
            </View>

            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="cart-plus"
                type="material-community"
                reverse
                reverseColor="white"
                color="#2196F3"
                accessibilityLabel="Navigate to Shopping List"
                onPress={navigateShoppingList}
                size={60}
                testID="ManageShoppingListsButton"
              />
            </View>

            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="broom"
                type="material-community"
                reverse
                reverseColor="white"
                color="#2196F3"
                accessibilityLabel="Navigate to Household Chores"
                onPress={navigateChores}
                size={60}
                testID="HouseholdChoresButton"
              />
            </View>

            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="file-cabinet"
                type="material-community"
                reverse
                reverseColor="white"
                color="#2196F3"
                accessibilityLabel="Navigate to Pantry"
                onPress={() => {}}
                size={60}
                disabled={true}
                testID="ViewThePantryButton"
              />
            </View>

            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="bulletin-board"
                type="material-community"
                reverse
                reverseColor="white"
                color="#2196F3"
                accessibilityLabel="Navigate to Group Board"
                onPress={navigateBoard}
                size={60}
                testID="GroupBoardButton"
              />
            </View>

            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="cog"
                type="material-community"
                reverse
                reverseColor="white"
                color="#2196F3"
                accessibilityLabel="Navigate to Group Settings"
                onPress={navigateSettings}
                size={60}
                testID="GroupSettingsButton"
              />
            </View>

            <View style={stylesGroupHomeScreen.lastButtonContainer}>
              <Icon
                name="account"
                type="material-community"
                reverse
                reverseColor="white"
                color="#2196F3"
                accessibilityLabel="Navigate to User Home"
                onPress={navigateHome}
                size={60}
                testID="GoBackToHomeButton"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="GroupHome" />
    </SafeAreaView>
  );
};

export default GroupHomeScreen;
