import {StyleSheet} from 'react-native';

const stylesTodaysChoresScreen = StyleSheet.create({
  containerTasks: {
    marginTop: 20,
  },

  containerTask: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },

  containerTextTask: {
    flex: 5,
  },

  styleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  styleTextTask: {
    fontSize: 19,
    marginRight: 5,
  },

  containerIconTask: {
    flex: 5,
    alignItems: 'flex-start',
  },

  containerIconTaskCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  styleTextTaskCompleted: {
    marginLeft: 5,
    fontStyle: 'italic',
    fontSize: 14,
  },
});

export default stylesTodaysChoresScreen;
