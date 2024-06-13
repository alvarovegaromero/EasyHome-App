import {StyleSheet} from 'react-native';
import generalStyles from './styles';

const stylesGroupSettingsScreen = StyleSheet.create({
  containerUsersPart: {
    marginBottom: 10,
  },
  containerUsers: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    height: 300,
    paddingTop: 12,
  },
  containerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap', // allow the row to wrap onto the next line
    justifyContent: 'space-between', // distribute evenly
  },
  containerButton: {
    ...generalStyles.defaultContainerButton,
    marginTop: 5,
    marginBottom: 10,
    width: '45%', // 2 buttons per row
  },
  lastButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listElement: {
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textList: {
    fontSize: 20,
    marginRight: 10,
  },
  containerRow: {
    flexDirection: 'row',
  },
});

export default stylesGroupSettingsScreen;
