import {ScrollView, SafeAreaView, Text, View} from 'react-native';
import generalStyles from '../../../../styles/styles';
import useProductsController from './hooks/useProductsController';

const ProductsScreen: React.FunctionComponent = () => {
  const {} = useProductsController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>
              Shopping List Screen
            </Text>
          </View>

          <Text style={generalStyles.defaultSubHeader}>
            Current products added to the system:
          </Text>

          <Text>Loading...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductsScreen;
