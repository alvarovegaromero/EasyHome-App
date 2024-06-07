import {Text, View} from 'react-native';
import useTodaysChoresController from './hooks/useTodaysChoresController';

const TodaysChoresScreen: React.FunctionComponent = () => {
  const {assignableTasks, currentDate} = useTodaysChoresController();

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
              </View>
            ))}
          </>
        )}
      </View>
    </View>
  );
};

export default TodaysChoresScreen;
