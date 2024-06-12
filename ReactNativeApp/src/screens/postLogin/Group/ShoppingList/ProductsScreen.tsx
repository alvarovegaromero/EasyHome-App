import {ScrollView, SafeAreaView, Text, View} from 'react-native';
import generalStyles from '../../../../styles/styles';
import useProductsController from './hooks/useProductsController';
import stylesProductsScreen from '../../../../styles/stylesProductsScreen';
import {Icon} from '@rneui/themed';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';

const ProductsScreen: React.FunctionComponent = () => {
  const {products, confirmAndMarkProductToBuy} = useProductsController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>Product List</Text>
          </View>

          <View style={stylesProductsScreen.containerProducts}>
            {products === undefined ? (
              <Text>Loading products...</Text>
            ) : (
              <>
                {products.length === 0 ? (
                  <Text>No products to mark to buy</Text>
                ) : (
                  <>
                    <View style={stylesProductsScreen.containerProduct}>
                      <View style={stylesProductsScreen.containerTextProduct}>
                        <Text style={stylesProductsScreen.styleTitle}>
                          Product
                        </Text>
                      </View>

                      <View style={stylesProductsScreen.containerIconProduct}>
                        <Text style={stylesProductsScreen.styleTitle}>
                          To buy
                        </Text>
                      </View>
                    </View>

                    {products.map(product => (
                      <View
                        key={product.id}
                        style={stylesProductsScreen.containerProduct}>
                        <View style={stylesProductsScreen.containerTextProduct}>
                          <Text style={stylesProductsScreen.styleTextProduct}>
                            {product.name}
                          </Text>
                        </View>

                        <View style={stylesProductsScreen.containerIconProduct}>
                          {!product.marked_to_buy ? (
                            <Icon
                              name="check-circle-outline"
                              type="material-community"
                              color="#2196F3"
                              accessibilityLabel="Mark to buy the product"
                              onPress={() => {
                                confirmAndMarkProductToBuy(product.id);
                              }}
                              size={40}
                            />
                          ) : (
                            <View
                              style={
                                stylesProductsScreen.containerIconProductCompleted
                              }>
                              <Icon
                                name="check-circle"
                                type="material-community"
                                color="#2196F3"
                                accessibilityLabel="Product marked to buy"
                                size={40}
                              />
                            </View>
                          )}
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
      <GroupFooter activeSection="ShoppingList" />
    </SafeAreaView>
  );
};

export default ProductsScreen;
