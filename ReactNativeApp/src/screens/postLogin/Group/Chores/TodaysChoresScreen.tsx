import {Text, View} from 'react-native';
import useTodaysChoresController from './hooks/useTodaysChoresController';
import {Icon} from '@rneui/themed';

const TodaysChoresScreen: React.FunctionComponent = () => {
  const {assignableTasks, currentDate, confirmAndCompleteTask} =
    useTodaysChoresController();

  return (
    <View>
      <Text>Today's Chores Screen</Text>
      <Text>Today: {currentDate}</Text>
      <View>
        {assignableTasks === undefined ? (
          <Text>Loading asignable tasks...</Text>
        ) : (
          <>
            {assignableTasks.map(assignableTask => (
              <View key={assignableTask.id}>
                <Text>{assignableTask.task.title}</Text>
                {!assignableTask.is_completed ? (
                  <Icon
                    name="check-circle-outline"
                    type="material-community"
                    color="#2196F3"
                    accessibilityLabel="Complete task"
                    onPress={() => {
                      confirmAndCompleteTask(assignableTask.id);
                    }}
                  />
                ) : (
                  <Text>
                    Completed by {assignableTask.assigned_user.username}
                  </Text>
                )}
              </View>
            ))}
          </>
        )}
      </View>
    </View>
  );
};

export default TodaysChoresScreen;
