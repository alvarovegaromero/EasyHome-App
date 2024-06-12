import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useTodaysChoresController from './hooks/useTodaysChoresController';
import {Icon} from '@rneui/themed';
import generalStyles from '../../../../styles/styles';
import stylesTodaysChoresScreen from '../../../../styles/stylesTodaysChoresScreen';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';
import Header from '../../../../utils/Header/Header';

const TodaysChoresScreen: React.FunctionComponent = () => {
  const {assignableTasks, currentDate, confirmAndCompleteTask} =
    useTodaysChoresController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <Header secctionText="Today's Chores" />
        <View style={generalStyles.defaultContainerScreen}>
          <Text style={generalStyles.defaultSubHeader}>
            Today: {currentDate}
          </Text>

          <View style={stylesTodaysChoresScreen.containerTasks}>
            {assignableTasks === undefined ? (
              <Text>Loading asignable tasks...</Text>
            ) : (
              <>
                <View style={stylesTodaysChoresScreen.containerTask}>
                  <View style={stylesTodaysChoresScreen.containerTextTask}>
                    <Text style={stylesTodaysChoresScreen.styleTitle}>
                      Task
                    </Text>
                  </View>

                  <View style={stylesTodaysChoresScreen.containerIconTask}>
                    <Text style={stylesTodaysChoresScreen.styleTitle}>
                      Done
                    </Text>
                  </View>
                </View>

                {assignableTasks.map(assignableTask => (
                  <View
                    key={assignableTask.id}
                    style={stylesTodaysChoresScreen.containerTask}>
                    <View style={stylesTodaysChoresScreen.containerTextTask}>
                      <Text style={stylesTodaysChoresScreen.styleTextTask}>
                        {assignableTask.task.title}
                      </Text>
                    </View>

                    <View style={stylesTodaysChoresScreen.containerIconTask}>
                      {!assignableTask.is_completed ? (
                        <Icon
                          name="check-circle-outline"
                          type="material-community"
                          color="#2196F3"
                          accessibilityLabel="Complete task"
                          onPress={() => {
                            confirmAndCompleteTask(assignableTask.id);
                          }}
                          size={40}
                        />
                      ) : (
                        <View
                          style={
                            stylesTodaysChoresScreen.containerIconTaskCompleted
                          }>
                          <Icon
                            name="check-circle"
                            type="material-community"
                            color="#2196F3"
                            accessibilityLabel="Complete task"
                            size={40}
                          />
                          <Text
                            style={
                              stylesTodaysChoresScreen.styleTextTaskCompleted
                            }>
                            Completed by {assignableTask.assigned_user.username}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="Chores" />
    </SafeAreaView>
  );
};

export default TodaysChoresScreen;
