import {ScrollView, SafeAreaView, Text, View, TextInput} from 'react-native';
import useEstablishProducts from './hooks/useEstablishProducts';
import generalStyles from '../../../../styles/styles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Icon} from '@rneui/themed';
import stylesEstablishChoresScreen from '../../../../styles/stylesEstablishChoresScreen';

const EstablishProductsScreen: React.FunctionComponent = () => {
  const {
    products,
    addMode,
    addInput,
    setAddInput,
    createProduct,
    confirmAndDeleteProduct,
    changeToViewMode,
    changeToAddMode,
  } = useEstablishProducts();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>
              Establish Shopping List Screen
            </Text>
          </View>

          <Text style={generalStyles.defaultSubHeader}>
            Current products added to the system:
          </Text>

          <GestureHandlerRootView>
            {products === undefined ? (
              <Text>Loading...</Text>
            ) : (
              <>
                {products.length === 0 ? (
                  <Text>No products found :(</Text>
                ) : (
                  <>
                    {products.map(product => (
                      <View
                        key={product.id}
                        style={stylesEstablishChoresScreen.containerTask}>
                        <View
                          style={stylesEstablishChoresScreen.containerTextTask}>
                          <Text
                            style={stylesEstablishChoresScreen.styleTextTask}>
                            {product.name}
                          </Text>
                        </View>
                        <View
                          style={stylesEstablishChoresScreen.containerIconTask}>
                          <Icon
                            name="delete"
                            type="material-community"
                            color="#ff4d4d"
                            accessibilityLabel="Delete product"
                            onPress={() => {
                              confirmAndDeleteProduct(product.id);
                            }}
                            size={40}
                          />
                        </View>
                      </View>
                    ))}
                  </>
                )}

                {addMode ? (
                  <>
                    <View style={generalStyles.defaultInput}>
                      <TextInput value={addInput} onChangeText={setAddInput} />
                    </View>
                    <View
                      style={
                        stylesEstablishChoresScreen.containerSaveCancelNewTask
                      }>
                      <Icon
                        reverse
                        reverseColor="white"
                        name="content-save"
                        type="material-community"
                        color="#2196F3"
                        accessibilityLabel="Save new products"
                        onPress={createProduct}
                        size={40}
                      />
                      <Icon
                        reverse
                        reverseColor="white"
                        name="close"
                        type="material-community"
                        color="#2196F3"
                        accessibilityLabel="Cancel adding a new product"
                        onPress={changeToViewMode}
                        size={40}
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <Icon
                      reverse
                      reverseColor="white"
                      name="plus"
                      type="material-community"
                      color="#2196F3"
                      accessibilityLabel="Change to Add Mode"
                      onPress={changeToAddMode}
                      size={30}
                    />
                  </>
                )}
              </>
            )}
          </GestureHandlerRootView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EstablishProductsScreen;
