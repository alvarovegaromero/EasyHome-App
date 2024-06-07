import {Button, Text, View} from 'react-native';
import useChoresHomeController from './hooks/useChoresHomeController';

const ChoresHomeScreen: React.FunctionComponent = () => {
  const {
    isOwner,
    isActivated,
    navigateEstablishChores,
    navigateViewTodaysChores,
    navigateStats,
    navigateGroupHome,
  } = useChoresHomeController();

  return (
    <View>
      <Text>Chores Home Screen</Text>

      {isOwner && (
        <View>
          <Button
            title="Establish and start Household Chores Process"
            onPress={navigateEstablishChores}
          />
        </View>
      )}

      {isActivated ? (
        <View>
          <Button
            title="View today's Houselhold Chores"
            onPress={navigateViewTodaysChores}
          />
          <Button title="Stats" onPress={navigateStats} />
        </View>
      ) : (
        <View>
          <Text> The owner must start the process first! </Text>
        </View>
      )}

      <View>
        <Button title="Go Back" onPress={navigateGroupHome} />
      </View>
    </View>
  );
};

export default ChoresHomeScreen;
