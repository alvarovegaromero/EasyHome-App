import {StyleSheet} from 'react-native';
import generalStyles from '../../styles/styles';

const stylesHeader = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#2196F3',
    height: 60,
    marginBottom: 10,
  },

  iconArrowBack: {
    marginLeft: 10,
    marginRight: 10,
  },

  styleTextHeader: {
    ...generalStyles.defaultHeader,
    color: 'white',
  },
});

export default stylesHeader;
