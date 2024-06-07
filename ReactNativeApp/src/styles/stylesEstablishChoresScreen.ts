import {StyleSheet} from 'react-native';

const stylesEstablishChoresScreen = StyleSheet.create({
  containerTask: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },

  containerTextTask: {},

  styleTextTask: {
    fontSize: 18,
  },

  containerIconTask: {
    alignItems: 'flex-end',
  },

  containerSaveCancelNewTask: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default stylesEstablishChoresScreen;
