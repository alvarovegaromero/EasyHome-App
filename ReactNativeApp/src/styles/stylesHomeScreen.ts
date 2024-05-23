import {StyleSheet} from 'react-native';
import generalStyles from './styles';

const stylesHomeScreen = StyleSheet.create({
  containerHeaders: {
    ...generalStyles.defaultContainerHeader,
    flex: 0.2,
    justifyContent: 'center',
  },
  containerGroups: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    flex: 2,
    marginBottom: 30,
    height: 300,
  },
  containerButtons: {
    flex: 0.4,
  },
  containerButton: {
    ...generalStyles.defaultContainerButton,
    marginTop: 5,
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  listButton: {
    backgroundColor: '#cccccc', // light gray
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    height: 40,
  },
  containerNoGroups: {
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  textNoGroups: {
    marginTop: 5,
    fontSize: 16,
    marginBottom: 5,
  },
});

export default stylesHomeScreen;
