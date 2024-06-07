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
    flex: 4,
  },

  styleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  styleTextTask: {
    fontSize: 20,
  },

  containerIconTask: {
    flex: 6,
    alignItems: 'flex-start',
  },

  containerIconTaskCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  styleTextTaskCompleted: {
    marginLeft: 10,
    fontStyle: 'italic',
    fontSize: 15,
  },
});

export default stylesTodaysChoresScreen;
