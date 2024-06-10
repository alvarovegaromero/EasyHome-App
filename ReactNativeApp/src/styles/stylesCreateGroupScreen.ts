import {StyleSheet} from 'react-native';
import generalStyles from './styles';

const stylesCreateGroupScreen = StyleSheet.create({
  containerInputs: {
    marginBottom: 20,
  },
  containerInputName: {
    marginBottom: 10,
  },
  containerInputDescription: {
    marginBottom: 10,
  },
  InputDescription: {
    ...generalStyles.defaultInput,
    textAlignVertical: 'top',
    textAlign: 'left',
  },
  containerInputCurrency: {
    marginBottom: 10,
  },

  containerButtons: {
    flexDirection: 'row',
  },

  styleTextInputTitle: {
    fontSize: 16,
  },
});

export default stylesCreateGroupScreen;
