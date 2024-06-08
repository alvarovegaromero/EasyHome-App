import {StyleSheet} from 'react-native';
import generalStyles from './styles';

//maybe can be united with stylesEstablishChoresScreen
const stylesEstablishProductsScreen = StyleSheet.create({
  containerProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    height: 40,
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

  editProductInput: {
    ...generalStyles.defaultInput,
    paddingRight: 15,
    fontSize: 16,
  },
});

export default stylesEstablishProductsScreen;
