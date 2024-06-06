import {Button, Text, View} from 'react-native';
import useChoresHomeScreen from './hooks/useChoresHomeController';

const ChoresHomeScreen: React.FunctionComponent = () => {
  const {isOwner, navigateGroupHome} = useChoresHomeScreen();

  return (
    <View>
      <Text>Chores Home Screen</Text>

      {isOwner && (
        <View>
          <Button
            title="Establish and start Household Chores Process"
            onPress={() => {}}
          />
        </View>
      )}

      <View>
        <Button title="View today's Houselhold Chores" onPress={() => {}} />
        <Button title="Stats" onPress={() => {}} />
      </View>

      <View>
        <Button title="Go Back" onPress={navigateGroupHome} />
      </View>
    </View>
  );
};

export default ChoresHomeScreen;
