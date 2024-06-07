import {Text, View} from 'react-native';
import useChoresStatsController from './hooks/useChoresStatsController';

const ChoresStatsScreen: React.FunctionComponent = () => {
  const {} = useChoresStatsController();

  return (
    <View>
      <Text>Today's Chores Screen</Text>
    </View>
  );
};

export default ChoresStatsScreen;
