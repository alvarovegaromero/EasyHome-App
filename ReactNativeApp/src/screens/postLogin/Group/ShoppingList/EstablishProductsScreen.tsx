import {ScrollView, SafeAreaView, Text, View} from 'react-native';
import useEstablishProducts from './hooks/useEstablishProducts';
import generalStyles from '../../../../styles/styles';

const EstablishProductShoppingListScreen: React.FunctionComponent = () => {
  const {} = useEstablishProducts();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View>
          <Text> Establish Shopping List Screen </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EstablishProductShoppingListScreen;
