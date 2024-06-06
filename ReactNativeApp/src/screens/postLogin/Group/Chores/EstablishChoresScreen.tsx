import {Text, View} from 'react-native';
import useEstablishChoresController from './hooks/useEstablishChoresController';
import {Icon} from '@rneui/themed';
import {TextInput} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const ChoresHomeScreen: React.FunctionComponent = () => {
  const {
    tasks,
    addMode,
    addInput,
    setAddInput,
    createTask,
    confirmAndDeleteTask,
    changeToViewMode,
    changeToAddMode,
  } = useEstablishChoresController();

  return (
    <View>
      <Text>Establish Chores Screen</Text>

      <GestureHandlerRootView>
        {tasks === undefined ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {tasks.length === 0 ? (
              <Text>No tasks</Text>
            ) : (
              <>
                {tasks.map(task => (
                  <>
                    <Text key={task.id}>{task.title}</Text>
                    <Icon
                      name="delete"
                      type="material-community"
                      color="#ff0000"
                      accessibilityLabel="Delete task"
                      onPress={() => {
                        confirmAndDeleteTask(task.id);
                      }}
                    />
                  </>
                ))}
              </>
            )}

            {addMode ? (
              <>
                <TextInput value={addInput} onChangeText={setAddInput} />
                <Icon
                  reverse
                  reverseColor="white"
                  name="content-save"
                  type="material-community"
                  color="#2196F3"
                  accessibilityLabel="Save new task"
                  onPress={createTask}
                />
                <Icon
                  reverse
                  reverseColor="white"
                  name="close"
                  type="material-community"
                  color="#2196F3"
                  accessibilityLabel="Cancel adding a new task"
                  onPress={changeToViewMode}
                />
              </>
            ) : (
              <>
                <Icon
                  reverse
                  reverseColor="white"
                  name="plus"
                  type="material-community"
                  color="#2196F3"
                  accessibilityLabel="Add a new task"
                  onPress={changeToAddMode}
                />
              </>
            )}
            <Icon
              reverse
              reverseColor="white"
              name="play"
              type="material-community"
              color="#2196F3"
              accessibilityLabel="Start assignable tasks' process"
              onPress={() => {}}
            />
          </>
        )}
      </GestureHandlerRootView>
    </View>
  );
};

export default ChoresHomeScreen;
