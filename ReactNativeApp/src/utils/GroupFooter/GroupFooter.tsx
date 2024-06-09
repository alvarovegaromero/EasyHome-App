import React from 'react';
import {View} from 'react-native';
import {Icon} from '@rneui/themed';
import useGroupFooterController from './hooks/useGroupFooterController';

const GroupFooter: React.FunctionComponent = () => {
  const {
    navigateToExpenses,
    navigateToChores,
    navigateToShoppingList,
    navigateToGroupHome,
    navigateToGroupPantry,
    navigateToGroupBoard,
    navigateToGroupSettings,
  } = useGroupFooterController();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#2196F3',
      }}>
      <Icon
        name="currency-usd"
        type="material-community"
        color="white"
        accessibilityLabel="Navigate to Expenses"
        onPress={navigateToExpenses}
        size={40}
      />
      <Icon
        name="cart-plus"
        type="material-community"
        color="white"
        accessibilityLabel="Navigate to Shopping List"
        onPress={navigateToShoppingList}
        size={40}
      />
      <Icon
        name="broom"
        type="material-community"
        color="white"
        accessibilityLabel="Navigate to Chores"
        onPress={navigateToChores}
        size={40}
      />
      <Icon
        name="home"
        type="material-community"
        color="white"
        accessibilityLabel="Navigate to Group Home"
        onPress={navigateToGroupHome}
        size={40}
      />
      <Icon
        name="file-cabinet"
        type="material-community"
        color="white"
        accessibilityLabel="Navigate to Group Pantry"
        onPress={navigateToGroupPantry}
        size={40}
      />
      <Icon
        name="bulletin-board"
        type="material-community"
        color="white"
        accessibilityLabel="Navigate to Group Board"
        onPress={navigateToGroupBoard}
        size={40}
      />
      <Icon
        name="cog"
        type="material-community"
        color="white"
        accessibilityLabel="Navigate to Group Settings"
        onPress={navigateToGroupSettings}
        size={40}
      />
    </View>
  );
};

export default GroupFooter;
