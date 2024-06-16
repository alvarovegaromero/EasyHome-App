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
    marginBottom: 10,
    height: 300,
  },
  containerButtons: {
    flex: 0.4,
  },
  container2Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cccccc', // light gray
    padding: 10,
    margin: 10,
    borderRadius: 10,
    height: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  styleTextGroup: {
    marginLeft: 5,
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
