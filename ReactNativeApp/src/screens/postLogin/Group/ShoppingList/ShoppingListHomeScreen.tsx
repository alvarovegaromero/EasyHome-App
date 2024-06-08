import {ScrollView, SafeAreaView, Text, View} from 'react-native';
import useShoppingListHomeController from './hooks/useShoppingListHomeController';
import generalStyles from '../../../../styles/styles';

const ShoppingListHomeScreen: React.FunctionComponent = () => {
  const {} = useShoppingListHomeController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View>
          <Text> Shopping List Home Screen </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShoppingListHomeScreen;
