import {Text, View} from 'react-native';
import useChoresHomeScreen from './hooks/useChoresHomeController';

const ChoresHomeScreen: React.FunctionComponent = () => {
  const {} = useChoresHomeScreen();

  return (
    <View>
      <Text>Chores Home Screen</Text>
    </View>
  );
};

export default ChoresHomeScreen;
