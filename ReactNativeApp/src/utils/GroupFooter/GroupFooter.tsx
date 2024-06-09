import React from 'react';
import {View} from 'react-native';
import {Icon} from '@rneui/themed';
import useGroupFooterController from './hooks/useGroupFooterController';
import stylesGroupFooter from './stylesGroupFooter';

interface GroupFooterProps {
  activeSection: string;
}

const GroupFooter: React.FunctionComponent<GroupFooterProps> = ({
  activeSection,
}) => {
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
    <View style={stylesGroupFooter.containerFooter}>
      <View style={stylesGroupFooter.smallIcon}>
        <Icon
          name="currency-usd"
          type="material-community"
          color={activeSection === 'Expenses' ? '#FF7F50' : 'white'}
          accessibilityLabel="Navigate to Expenses"
          onPress={navigateToExpenses}
          size={40}
        />
      </View>

      <View style={stylesGroupFooter.smallIcon}>
        <Icon
          name="cart-plus"
          type="material-community"
          color={activeSection === 'ShoppingList' ? '#FF7F50' : 'white'}
          accessibilityLabel="Navigate to Shopping List"
          onPress={navigateToShoppingList}
          size={40}
        />
      </View>

      <View style={stylesGroupFooter.smallIcon}>
        <Icon
          name="broom"
          type="material-community"
          color={activeSection === 'Chores' ? '#FF7F50' : 'white'}
          accessibilityLabel="Navigate to Chores"
          onPress={navigateToChores}
          size={40}
        />
      </View>

      <View style={stylesGroupFooter.homeIcon}>
        <Icon
          name="home"
          type="material-community"
          color={activeSection === 'GroupHome' ? '#FF7F50' : 'white'}
          accessibilityLabel="Navigate to Group Home"
          onPress={navigateToGroupHome}
          size={60}
        />
      </View>

      <View style={stylesGroupFooter.smallIcon}>
        <Icon
          name="file-cabinet"
          type="material-community"
          color={activeSection === 'GroupPantry' ? '#FF7F50' : 'white'}
          accessibilityLabel="Navigate to Group Pantry"
          onPress={navigateToGroupPantry}
          size={40}
        />
      </View>

      <View style={stylesGroupFooter.smallIcon}>
        <Icon
          name="bulletin-board"
          type="material-community"
          color={activeSection === 'Board' ? '#FF7F50' : 'white'}
          accessibilityLabel="Navigate to Group Board"
          onPress={navigateToGroupBoard}
          size={40}
        />
      </View>

      <View style={stylesGroupFooter.smallIcon}>
        <Icon
          name="cog"
          type="material-community"
          color={activeSection === 'GroupSettings' ? '#FF7F50' : 'white'}
          accessibilityLabel="Navigate to Group Settings"
          onPress={navigateToGroupSettings}
          size={40}
        />
      </View>
    </View>
  );
};

export default GroupFooter;
