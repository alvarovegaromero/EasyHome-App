import {SafeAreaView, ScrollView, View} from 'react-native';
import useGroupHomeController from './hooks/useGroupHomeController';
import generalStyles from '../../../styles/styles';
import stylesGroupHomeScreen from '../../../styles/stylesGroupHomeScreen';
import GroupFooter from '../../../utils/GroupFooter/GroupFooter';
import {Icon} from '@rneui/themed';
import Header from '../../../utils/Header/Header';

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
        <Header secctionText={groupName} />
        <View style={generalStyles.defaultContainerScreen}>
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
                size={55}
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
                size={55}
                testID="ManageShoppingListsIcon"
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
                size={55}
                testID="HouseholdChoresIcon"
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
                size={55}
                disabled={true}
                testID="ViewThePantryIcon"
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
                size={55}
                testID="GroupBoardIcon"
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
                size={55}
                testID="GroupSettingsIcon"
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
                size={55}
                testID="GoBackToHomeIcon"
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
