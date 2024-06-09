import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useChoresStatsController from './hooks/useChoresStatsController';
import {Icon} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import {PieChart} from 'react-native-gifted-charts';
import Picker from 'react-native-picker-select';
import generalStyles from '../../../../styles/styles';
import stylesChoreStatsScreen from '../../../../styles/stylesChoreStatsScreen';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';

type CenterLabelProps = {
  totalAssignableTasks: number;
};

const CenterLabelComponent: React.FC<CenterLabelProps> = ({
  totalAssignableTasks,
}) => (
  <View style={stylesChoreStatsScreen.containerTextPieChart}>
    <Text style={stylesChoreStatsScreen.styleTextPieChart}>
      {totalAssignableTasks}
    </Text>
  </View>
);

const ChoresStatsScreen: React.FunctionComponent = () => {
  const {
    startDate,
    setStartDate,
    startDateModalOpen,
    setStartDateModalOpen,
    endDate,
    setEndDate,
    endDateModalOpen,
    setEndDateModalOpen,
    groupUsers,
    selectedUserId,
    setSelectedUserId,
    selectedCompleted,
    setSelectedCompleted,
    fetchChoresStats,
    pieData,
    totalAssignableTasks,
  } = useChoresStatsController();

  const renderCenterLabelComponent = () => (
    <CenterLabelComponent totalAssignableTasks={totalAssignableTasks} />
  );

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>Chores Stats Screen</Text>
          </View>

          <View>
            <Text style={generalStyles.defaultSubHeader}>
              Select the start and end date to filter:
            </Text>
            <View style={stylesChoreStatsScreen.containerDatesPickers}>
              <View style={stylesChoreStatsScreen.containerDatePicker}>
                <Icon
                  name="calendar-start"
                  reverse
                  reverseColor="white"
                  type="material-community"
                  color="#2196F3"
                  accessibilityLabel="Open Start Date picker"
                  onPress={() => setStartDateModalOpen(true)}
                  size={40}
                />

                <DatePicker
                  mode="date"
                  date={startDate}
                  onDateChange={setStartDate}
                  locale="en-GB"
                  testID="StartDatePicker"
                  modal={true}
                  open={startDateModalOpen}
                  onConfirm={date => {
                    setStartDate(date);
                    setStartDateModalOpen(false);
                  }}
                  onCancel={() => setStartDateModalOpen(false)}
                />
              </View>

              <View style={stylesChoreStatsScreen.containerDatePicker}>
                <Icon
                  name="calendar-end"
                  reverse
                  reverseColor="white"
                  type="material-community"
                  color="#2196F3"
                  accessibilityLabel="Open End Date picker"
                  onPress={() => setEndDateModalOpen(true)}
                  size={40}
                />

                <DatePicker
                  mode="date"
                  date={endDate}
                  locale="en-GB"
                  testID="EndDatePicker"
                  modal={true}
                  open={endDateModalOpen}
                  onConfirm={date => {
                    setEndDate(date);
                    setEndDateModalOpen(false);
                  }}
                  onCancel={() => setEndDateModalOpen(false)}
                />
              </View>
            </View>
          </View>

          <View style={stylesChoreStatsScreen.containerPickers}>
            <Text style={generalStyles.defaultSubHeader}>
              Select the user and completion status:
            </Text>
            <View style={stylesChoreStatsScreen.containerPicker}>
              <Picker
                value={selectedUserId || 'All'}
                onValueChange={itemValue =>
                  setSelectedUserId(itemValue === 'all' ? undefined : itemValue)
                }
                items={[
                  {label: 'All', value: 'all'},
                  ...groupUsers.map(userOption => ({
                    label: userOption.username,
                    value: userOption.id,
                  })),
                ]}
                textInputProps={{
                  accessibilityLabel: 'Select User picker',
                  testID: 'SelectUserPicker',
                }}
                placeholder={{}}
              />
            </View>

            <View style={stylesChoreStatsScreen.containerPicker}>
              <Picker
                value={selectedCompleted}
                onValueChange={itemValue =>
                  setSelectedCompleted(
                    itemValue === 'both' ? undefined : itemValue,
                  )
                }
                items={[
                  {label: 'Completed', value: true},
                  {label: 'Uncompleted', value: false},
                  {label: 'Completed and Uncompleted', value: 'both'},
                ]}
                textInputProps={{
                  accessibilityLabel: 'Select Completion Status picker',
                  testID: 'SelectCompletionStatusPicker',
                }}
                placeholder={{}}
              />
            </View>
          </View>

          <View style={stylesChoreStatsScreen.containerCreateOrReloadChart}>
            {totalAssignableTasks === 0 ? (
              <Icon
                name="chart-box"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="Create new chart"
                onPress={fetchChoresStats}
                size={50}
              />
            ) : (
              <Icon
                name="reload"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="Reload chart"
                onPress={fetchChoresStats}
                size={30}
              />
            )}
          </View>

          <View style={stylesChoreStatsScreen.containerPieChart}>
            <PieChart
              data={pieData}
              strokeWidth={4}
              strokeColor="#333"
              innerCircleBorderWidth={4}
              innerCircleBorderColor="#333"
              centerLabelComponent={renderCenterLabelComponent}
            />
          </View>

          <View style={stylesChoreStatsScreen.containerPieChartLegend}>
            <View style={stylesChoreStatsScreen.containerPieChartLegendItems}>
              {pieData.map(({label, color, value}) => (
                <View
                  style={stylesChoreStatsScreen.containerPieChartLegendItem}
                  key={label}>
                  <View
                    style={[
                      stylesChoreStatsScreen.colorPieChartLegendItem,
                      {backgroundColor: color},
                    ]}
                  />
                  <Text
                    style={
                      stylesChoreStatsScreen.styleTextPieChartLegendItem
                    }>{`${label} - ${value} ocurrencies`}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="Chores" />
    </SafeAreaView>
  );
};

export default ChoresStatsScreen;
