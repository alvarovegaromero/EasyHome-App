import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useGroupDebtsController from './hooks/useGroupDebtsController';
import generalStyles from '../../../../styles/styles';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';

const GroupDebtscreen: React.FunctionComponent = () => {
  const {} = useGroupDebtsController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>Group's debts</Text>
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="Expenses" />
    </SafeAreaView>
  );
};

export default GroupDebtscreen;
