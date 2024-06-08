import {StyleSheet} from 'react-native';

//maybe can be united with stylesEstablishChoresScreen
const stylesEstablishProductsScreen = StyleSheet.create({
  containerProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },

  containerTextProduct: {},

  styleTextProduct: {
    fontSize: 18,
  },

  containerIconProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  containerSaveCancelNewProduct: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default stylesEstablishProductsScreen;
