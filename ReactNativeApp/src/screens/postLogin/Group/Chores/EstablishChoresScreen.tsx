import {Text, View} from 'react-native';
import useEstablishChoresController from './hooks/useEstablishChoresController';
import {Icon} from '@rneui/themed';
import {TextInput} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const ChoresHomeScreen: React.FunctionComponent = () => {
  const {
    tasks,
    editMode,
    addMode,
    addInput,
    setAddInput,
    createTask,
    changeToEditMode,
    changeToViewMode,
    changeToAddMode,
  } = useEstablishChoresController();

  return (
    <View>
      <Text>Establish Chores Screen</Text>

      <GestureHandlerRootView>
        {!editMode ? (
          tasks === undefined ? (
            <Text>Loading...</Text>
          ) : (
            <>
              {tasks.length === 0 ? (
                <Text>No tasks</Text>
              ) : (
                <>
                  {tasks.map(task => (
                    <Text key={task.id}>{task.title}</Text>
                  ))}

                  <Icon
                    reverse
                    reverseColor="white"
                    name="play"
                    type="material-community"
                    color="#2196F3"
                    onPress={() => {}}
                  />
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
                    onPress={createTask}
                  />
                  <Icon
                    reverse
                    reverseColor="white"
                    name="close"
                    type="material-community"
                    color="#2196F3"
                    onPress={changeToViewMode}
                  />
                </>
              ) : (
                <>
                  <Icon
                    reverse
                    reverseColor="white"
                    name="pencil"
                    type="material-community"
                    color="#2196F3"
                    onPress={changeToEditMode}
                  />

                  <Icon
                    reverse
                    reverseColor="white"
                    name="plus"
                    type="material-community"
                    color="#2196F3"
                    onPress={changeToAddMode}
                  />
                </>
              )}
            </>
          )
        ) : (
          <>
            <Text>Edit mode</Text>
            {tasks?.map(task => <TextInput key={task.id} value={task.title} />)}
            <Icon
              reverse
              reverseColor="white"
              name="content-save"
              type="material-community"
              color="#2196F3"
              onPress={changeToViewMode}
            />
          </>
        )}
      </GestureHandlerRootView>
    </View>
  );
};

export default ChoresHomeScreen;
