import {Text, View} from 'react-native';
import useChoresStatsController from './hooks/useChoresStatsController';
import {Icon} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import {PieChart} from 'react-native-gifted-charts';

const ChoresStatsScreen: React.FunctionComponent = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fetchChoresStats,
    completedTasks,
    uncompletedTasks,
  } = useChoresStatsController();

  const pieData = [
    {value: completedTasks, label: 'Completed Tasks', color: '#00ff00'},
    {value: uncompletedTasks, label: 'Uncompleted Tasks', color: '#ff0000'},
  ];

  return (
    <View>
      <Text>Chores Stats Screen</Text>

      <DatePicker
        mode="date"
        date={startDate}
        onDateChange={setStartDate}
        locale="en-GB"
        testID="StartDatePicker"
      />

      <DatePicker
        mode="date"
        date={endDate}
        onDateChange={setEndDate}
        locale="en-GB"
        testID="EndDatePicker"
      />

      <Icon
        name="chart-pie"
        reverse
        reverseColor="white"
        type="material-community"
        color="#2196F3"
        accessibilityLabel="Create new chart"
        onPress={fetchChoresStats}
      />

      <PieChart data={pieData} />
    </View>
  );
};

export default ChoresStatsScreen;
