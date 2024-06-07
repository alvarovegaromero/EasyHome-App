import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useEstablishChoresController from './hooks/useEstablishChoresController';
import {Icon} from '@rneui/themed';
import {TextInput} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import generalStyles from '../../../../styles/styles';
import stylesEstablishChoresScreen from '../../../../styles/stylesEstablishChoresScreen';

const ChoresHomeScreen: React.FunctionComponent = () => {
  const {
    tasks,
    isActivated,
    addMode,
    addInput,
    setAddInput,
    createTask,
    confirmAndDeleteTask,
    confirmAndStartAssignableTasksProcess,
    changeToViewMode,
    changeToAddMode,
  } = useEstablishChoresController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>
              Establish Chores Screen
            </Text>
          </View>

          <Text style={generalStyles.defaultSubHeader}>
            Current tasks added to the system:
          </Text>

          <GestureHandlerRootView>
            {tasks === undefined ? (
              <Text>Loading...</Text>
            ) : (
              <>
                {tasks.length === 0 ? (
                  <Text>No tasks found :(</Text>
                ) : (
                  <>
                    {tasks.map(task => (
                      <View
                        key={task.id}
                        style={stylesEstablishChoresScreen.containerTask}>
                        <View
                          style={stylesEstablishChoresScreen.containerTextTask}>
                          <Text
                            style={stylesEstablishChoresScreen.styleTextTask}>
                            {task.title}
                          </Text>
                        </View>
                        <View
                          style={stylesEstablishChoresScreen.containerIconTask}>
                          <Icon
                            name="delete"
                            type="material-community"
                            color="#ff4d4d"
                            accessibilityLabel="Delete task"
                            onPress={() => {
                              confirmAndDeleteTask(task.id);
                            }}
                            size={40}
                          />
                        </View>
                      </View>
                    ))}
                  </>
                )}

                {addMode ? (
                  <>
                    <View style={generalStyles.defaultInput}>
                      <TextInput value={addInput} onChangeText={setAddInput} />
                    </View>
                    <View
                      style={
                        stylesEstablishChoresScreen.containerSaveCancelNewTask
                      }>
                      <Icon
                        reverse
                        reverseColor="white"
                        name="content-save"
                        type="material-community"
                        color="#2196F3"
                        accessibilityLabel="Save new task"
                        onPress={createTask}
                        size={40}
                      />
                      <Icon
                        reverse
                        reverseColor="white"
                        name="close"
                        type="material-community"
                        color="#2196F3"
                        accessibilityLabel="Cancel adding a new task"
                        onPress={changeToViewMode}
                        size={40}
                      />
                    </View>
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
                      size={30}
                    />
                  </>
                )}
                {!isActivated && (
                  <Icon
                    reverse
                    reverseColor="white"
                    name="play"
                    type="material-community"
                    color="#2196F3"
                    accessibilityLabel="Start assignable tasks' process"
                    onPress={confirmAndStartAssignableTasksProcess}
                    size={30}
                  />
                )}
              </>
            )}
          </GestureHandlerRootView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChoresHomeScreen;
