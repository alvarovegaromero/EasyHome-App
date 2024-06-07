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
    pieData,
    totalAssignableTasks,
  } = useChoresStatsController();

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

      <PieChart
        data={pieData}
        strokeWidth={4}
        strokeColor="#333"
        innerCircleBorderWidth={4}
        innerCircleBorderColor="#333"
      />

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        {pieData.map(({label, color, value}) => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: color,
                marginRight: 10,
              }}
            />
            <Text>{`${label} - ${value}`}</Text>
          </View>
        ))}
      </View>
      <Text>Total: {totalAssignableTasks}</Text>
    </View>
  );
};

export default ChoresStatsScreen;
