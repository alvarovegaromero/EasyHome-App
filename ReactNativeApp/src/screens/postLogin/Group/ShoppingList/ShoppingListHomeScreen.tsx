import {ScrollView, SafeAreaView, View} from 'react-native';
import useShoppingListHomeController from './hooks/useShoppingListHomeController';
import generalStyles from '../../../../styles/styles';
import {Icon} from '@rneui/themed';
//using same styles as in GroupHome
import stylesGroupHomeScreen from '../../../../styles/stylesGroupHomeScreen';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';
import Header from '../../../../utils/Header/Header';

const ShoppingListHomeScreen: React.FunctionComponent = () => {
  const {
    navigateEstablishProductsScreen,
    navigateProductsScreen,
    navigateProductsShoppingListScreen,
    navigateShoppingListStatsScreen,
  } = useShoppingListHomeController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <Header secctionText="Shopping List Home" />
        <View style={generalStyles.defaultContainerScreen}>
          <View style={stylesGroupHomeScreen.containerButtons}>
            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="pencil"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="Add and Edit Available Products"
                onPress={navigateEstablishProductsScreen}
                size={55}
              />
            </View>
            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="notebook-edit"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="Set products to buy"
                onPress={navigateProductsScreen}
                size={55}
              />
            </View>
            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="cart-plus"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="Buy products"
                onPress={navigateProductsShoppingListScreen}
                size={55}
              />
            </View>
            <View style={stylesGroupHomeScreen.containerButton}>
              <Icon
                name="chart-box"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="See shopping list stats"
                onPress={navigateShoppingListStatsScreen}
                size={55}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="ShoppingList" />
    </SafeAreaView>
  );
};

export default ShoppingListHomeScreen;
