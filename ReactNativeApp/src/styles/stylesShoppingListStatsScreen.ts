import {StyleSheet} from 'react-native';
import generalStyles from './styles';

const stylesShoppingListStatsScreen = StyleSheet.create({
  containerDatesPickers: {
    flexDirection: 'row',
    height: 100,
    marginTop: 10,
  },

  containerDatePicker: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerPickers: {
    marginBottom: 5,
    marginTop: 15,
  },

  containerPicker: {
    ...generalStyles.defaultInput,
    marginTop: 5,
    marginBottom: 5,
  },

  containerCreateOrReloadChart: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },

  containerPieChart: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  containerTextPieChart: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  styleTextPieChart: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  containerPieChartLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },

  containerPieChartLegendItems: {
    flexDirection: 'column',
  },

  containerPieChartLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  colorPieChartLegendItem: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  styleTextPieChartLegendItem: {
    fontSize: 16,
  },

  styleTextDates: {
    fontSize: 16,
  },
});

export default stylesShoppingListStatsScreen;
