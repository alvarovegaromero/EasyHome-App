import {View} from 'react-native';
import {Text} from 'react-native-svg';
import useShoppingListHomeController from './hooks/useShoppingListHomeController';

const ShoppingListHomeScreen: React.FunctionComponent = () => {
  const {} = useShoppingListHomeController();

  return (
    <View>
      <Text> Shopping List Home Screen </Text>
    </View>
  );
};

export default ShoppingListHomeScreen;
