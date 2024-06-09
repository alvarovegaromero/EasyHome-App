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
    flex: 4,
  },

  styleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  styleTextProduct: {
    fontSize: 20,
  },

  containerIconProduct: {
    flex: 6,
    alignItems: 'flex-start',
  },

  containerIconProductCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  styleTextProductCompleted: {
    marginLeft: 10,
    fontStyle: 'italic',
    fontSize: 15,
  },
});

export default stylesShoppingListScreen;
