import {ScrollView, SafeAreaView, Text, View} from 'react-native';
import useShoppingListHomeController from './hooks/useShoppingListHomeController';
import generalStyles from '../../../../styles/styles';
import {Icon} from '@rneui/themed';
//using same styles as in ChoresHomeScreen as it follows the same pattern
import stylesChoresHomeScreen from '../../../../styles/stylesChoresHomeScreen';

const ShoppingListHomeScreen: React.FunctionComponent = () => {
  const {
    navigateEstablishProductsScreen,
    navigateProductsScreen,
    navigateProductsShoppingListScreen,
    navigateShoppingListStatsScreen,
    navigateGroupHomeScreen,
  } = useShoppingListHomeController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>
              {' '}
              Shopping List Home Screen{' '}
            </Text>
          </View>

          <View style={stylesChoresHomeScreen.containerIcons}>
            <View>
              <Icon
                name="pencil"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="Add and Edit Available Products"
                onPress={navigateEstablishProductsScreen}
                size={50}
              />
            </View>
            <View>
              <Icon
                name="notebook-edit"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="Set products to buy"
                onPress={navigateProductsScreen}
                size={50}
              />
            </View>
            <View>
              <Icon
                name="cart-plus"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="Buy products"
                onPress={navigateProductsShoppingListScreen}
                size={50}
              />
            </View>
            <View>
              <Icon
                name="chart-box"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="See shopping list stats"
                onPress={navigateShoppingListStatsScreen}
                size={50}
              />
            </View>
            <View>
              <Icon
                name="arrow-left-circle"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="Go back to Group Home Screen"
                onPress={navigateGroupHomeScreen}
                size={50}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShoppingListHomeScreen;
