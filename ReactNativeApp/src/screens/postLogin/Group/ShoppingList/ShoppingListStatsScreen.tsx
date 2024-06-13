import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useShoppingListStatsController from './hooks/useShoppingListStatsController';
import generalStyles from '../../../../styles/styles';
import stylesShoppingListStatsScreen from '../../../../styles/stylesShoppingListStatsScreen';
import {Icon} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import Picker from 'react-native-picker-select';
import {PieChart} from 'react-native-gifted-charts';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';
import Header from '../../../../utils/Header/Header';

type CenterLabelProps = {
  totalBoughtProducts: number;
};

const CenterLabelComponent: React.FC<CenterLabelProps> = ({
  totalBoughtProducts,
}) => (
  <View style={stylesShoppingListStatsScreen.containerTextPieChart}>
    <Text style={stylesShoppingListStatsScreen.styleTextPieChart}>
      {totalBoughtProducts}
    </Text>
  </View>
);

const ShoppingListStatsScreen: React.FunctionComponent = () => {
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
    products,
    selectedProductId,
    setSelectedProductId,
    fetchBoughtProductsStats,
    pieData,
    totalBoughtProducts,
  } = useShoppingListStatsController();

  const renderCenterLabelComponent = () => (
    <CenterLabelComponent totalBoughtProducts={totalBoughtProducts} />
  );

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <Header secctionText="Shopping List Stats" />
        <View style={generalStyles.defaultContainerScreen}>
          <View>
            <Text style={generalStyles.defaultSubHeader}>
              Select the start and end date to filter:
            </Text>
            <View style={stylesShoppingListStatsScreen.containerDatesPickers}>
              <View style={stylesShoppingListStatsScreen.containerDatePicker}>
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

                <Text> {startDate.toLocaleDateString('en-GB')} </Text>

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

              <View style={stylesShoppingListStatsScreen.containerDatePicker}>
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

                <Text> {endDate.toLocaleDateString('en-GB')} </Text>

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

          <View style={stylesShoppingListStatsScreen.containerPickers}>
            <Text style={generalStyles.defaultSubHeader}>
              Select a user and a product:
            </Text>
            <View style={stylesShoppingListStatsScreen.containerPicker}>
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

            <View style={stylesShoppingListStatsScreen.containerPicker}>
              <Picker
                value={selectedProductId || 'All'}
                onValueChange={itemValue =>
                  setSelectedProductId(
                    itemValue === 'all' ? undefined : itemValue,
                  )
                }
                items={[
                  {label: 'All', value: 'all'},
                  ...products.map(productOption => ({
                    label: productOption.name,
                    value: productOption.id,
                  })),
                ]}
                textInputProps={{
                  accessibilityLabel: 'Select User picker',
                  testID: 'SelectUserPicker',
                }}
                placeholder={{}}
              />
            </View>
          </View>

          <View
            style={stylesShoppingListStatsScreen.containerCreateOrReloadChart}>
            {totalBoughtProducts === 0 ? (
              <Icon
                name="chart-box"
                reverse
                reverseColor="white"
                type="material-community"
                color="#2196F3"
                accessibilityLabel="Create new chart"
                onPress={fetchBoughtProductsStats}
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
                onPress={fetchBoughtProductsStats}
                size={30}
              />
            )}
          </View>

          <View style={stylesShoppingListStatsScreen.containerPieChart}>
            <PieChart
              data={pieData}
              strokeWidth={4}
              strokeColor="#333"
              innerCircleBorderWidth={4}
              innerCircleBorderColor="#333"
              centerLabelComponent={renderCenterLabelComponent}
            />
          </View>

          <View style={stylesShoppingListStatsScreen.containerPieChartLegend}>
            <View
              style={
                stylesShoppingListStatsScreen.containerPieChartLegendItems
              }>
              {pieData.map(({label, color, value, total}) => (
                <View
                  style={
                    stylesShoppingListStatsScreen.containerPieChartLegendItem
                  }
                  key={label}>
                  <View
                    style={[
                      stylesShoppingListStatsScreen.colorPieChartLegendItem,
                      {backgroundColor: color},
                    ]}
                  />
                  <Text
                    style={
                      stylesShoppingListStatsScreen.styleTextPieChartLegendItem
                    }>{`${label} - ${value} ocurrencies - Total: ${total}€`}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="ShoppingList" />
    </SafeAreaView>
  );
};

export default ShoppingListStatsScreen;
