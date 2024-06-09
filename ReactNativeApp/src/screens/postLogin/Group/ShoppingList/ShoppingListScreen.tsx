import {ScrollView, SafeAreaView, Text, View} from 'react-native';
import useShoppingListController from './hooks/useShoppingListController';
import generalStyles from '../../../../styles/styles';
import stylesShoppingListScreen from '../../../../styles/stylesShoppingListScreen';
import {Icon} from '@rneui/themed';

const ShoppingListScreen: React.FunctionComponent = () => {
  const {productsMarkedToBuy, confirmAndMarkProductAsBought} =
    useShoppingListController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>
              Products Shopping List Screen
            </Text>
          </View>

          <View style={stylesShoppingListScreen.containerProducts}>
            {productsMarkedToBuy === undefined ? (
              <Text>Loading products marked to buy...</Text>
            ) : (
              <>
                {productsMarkedToBuy.length === 0 ? (
                  <Text>No products marked to buy</Text>
                ) : (
                  <>
                    <View style={stylesShoppingListScreen.containerProduct}>
                      <View
                        style={stylesShoppingListScreen.containerTextProduct}>
                        <Text style={stylesShoppingListScreen.styleTitle}>
                          Product
                        </Text>
                      </View>

                      <View
                        style={stylesShoppingListScreen.containerIconProduct}>
                        <Text style={stylesShoppingListScreen.styleTitle}>
                          Buy
                        </Text>
                      </View>
                    </View>

                    {productsMarkedToBuy.map(productMarkedToBuy => (
                      <View
                        key={productMarkedToBuy.id}
                        style={stylesShoppingListScreen.containerProduct}>
                        <View
                          style={stylesShoppingListScreen.containerTextProduct}>
                          <Text
                            style={stylesShoppingListScreen.styleTextProduct}>
                            {productMarkedToBuy.product.name}
                          </Text>
                        </View>

                        <View
                          style={stylesShoppingListScreen.containerIconProduct}>
                          <Icon
                            name="basket-plus-outline"
                            type="material-community"
                            color="#2196F3"
                            accessibilityLabel="Buy the product"
                            onPress={() => {
                              confirmAndMarkProductAsBought(
                                productMarkedToBuy.product.id,
                              );
                            }}
                            size={40}
                          />
                        </View>
                      </View>
                    ))}
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShoppingListScreen;
