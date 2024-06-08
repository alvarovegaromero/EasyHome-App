import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useShoppingListStatsController from './hooks/useShoppingListStatsController';
import generalStyles from '../../../../styles/styles';

const ShoppingListStatsScreen: React.FunctionComponent = () => {
  const {} = useShoppingListStatsController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>
              Shopping List Stats Screen
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShoppingListStatsScreen;
