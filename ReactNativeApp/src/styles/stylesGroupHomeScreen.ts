import {StyleSheet} from 'react-native';
import generalStyles from './styles';

const stylesGroupSettingsScreen = StyleSheet.create({
  headerText: {
    ...generalStyles.defaultHeader,
    marginTop: 20,
    marginBottom: 20,
  },

  containerButtons: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  containerButton: {
    ...generalStyles.defaultContainerButton,
    marginTop: 5,
    marginBottom: 5,
    width: '45%', //two buttons per row
  },

  lastButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default stylesGroupSettingsScreen;
