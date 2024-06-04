import {StyleSheet} from 'react-native';
import generalStyles from './styles';

const stylesExpenseDetailScreen = StyleSheet.create({
  containerTitleAndText: {
    marginBottom: 10,
  },

  styleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  styleText: {
    fontSize: 16,
  },

  containerButtons: {
    marginTop: 20,
  },

  containerButton: {
    ...generalStyles.defaultContainerButton,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default stylesExpenseDetailScreen;
