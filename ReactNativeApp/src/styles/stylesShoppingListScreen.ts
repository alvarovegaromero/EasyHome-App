import {StyleSheet} from 'react-native';

const stylesShoppingListScreen = StyleSheet.create({
  containerProducts: {
    marginTop: 20,
  },

  containerProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },

  containerTextProduct: {
    flex: 8,
  },

  styleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  styleTextProduct: {
    fontSize: 20,
  },

  containerIconProduct: {
    flex: 2.5,
    alignItems: 'center',
  },
});

export default stylesShoppingListScreen;
