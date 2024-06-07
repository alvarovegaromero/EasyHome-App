import {Text, View} from 'react-native';
import useChoresStatsController from './hooks/useChoresStatsController';
import {Icon} from '@rneui/themed';

const ChoresStatsScreen: React.FunctionComponent = () => {
  const {startDate, setStartDate, endDate, setEndDate, fetchChoresStats} =
    useChoresStatsController();

  return (
    <View>
      <Text>Chores Stats Screen</Text>

      <Icon
        name="chart-pie"
        reverse
        reverseColor="white"
        type="material-community"
        color="#2196F3"
        accessibilityLabel="Save new task"
        onPress={fetchChoresStats}
      />
    </View>
  );
};

export default ChoresStatsScreen;
