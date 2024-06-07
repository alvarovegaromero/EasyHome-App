import {Text, View} from 'react-native';
import useTodaysChoresController from './hooks/useTodaysChoresController';

const ChoresHomeScreen: React.FunctionComponent = () => {
  const {} = useTodaysChoresController();

  return (
    <View>
      <Text>Today's Chores Screen</Text>
    </View>
  );
};

export default ChoresHomeScreen;
