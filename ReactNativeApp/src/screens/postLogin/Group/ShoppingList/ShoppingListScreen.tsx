import {ScrollView, SafeAreaView, Text, View} from 'react-native';
import useShoppingListController from './hooks/useShoppingListController';
import generalStyles from '../../../../styles/styles';

const ShoppingListScreen: React.FunctionComponent = () => {
  const {} = useShoppingListController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>
              Products Shopping List Screen
            </Text>
          </View>
          <View />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShoppingListScreen;
