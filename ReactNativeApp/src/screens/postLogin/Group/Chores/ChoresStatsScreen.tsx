import {Text, View} from 'react-native';
import useChoresStatsController from './hooks/useChoresStatsController';
import {Icon} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';

const ChoresStatsScreen: React.FunctionComponent = () => {
  const {startDate, setStartDate, endDate, setEndDate, fetchChoresStats} =
    useChoresStatsController();

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
        accessibilityLabel="Save new task"
        onPress={fetchChoresStats}
      />
    </View>
  );
};

export default ChoresStatsScreen;
