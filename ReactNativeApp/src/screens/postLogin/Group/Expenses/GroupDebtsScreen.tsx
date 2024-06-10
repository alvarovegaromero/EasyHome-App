import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useGroupDebtsController from './hooks/useGroupDebtsController';
import generalStyles from '../../../../styles/styles';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';
import stylesGroupExpensesScreen from '../../../../styles/stylesGroupExpensesScreen';

const GroupDebtsScreen: React.FunctionComponent = () => {
  const {settlements, confirmAndSettleDebt} = useGroupDebtsController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={generalStyles.defaultContainerHeader}>
            <Text style={generalStyles.defaultHeader}>Group's debts</Text>
          </View>

          <View>
            <Text style={generalStyles.defaultSubHeader}>Settlements</Text>
            <View>
              {settlements.map((settlement, index) => (
                <View
                  key={index}
                  style={
                    stylesGroupExpensesScreen.containerSettlementAndButton
                  }>
                  <View
                    style={stylesGroupExpensesScreen.containerSettlementText}>
                    <Text style={stylesGroupExpensesScreen.styleTextSettlement}>
                      {`● ${settlement.payer.username}`}
                      {` owes ${settlement.receiver.username}`}
                      {` ${settlement.amount}€`}
                    </Text>
                  </View>
                  <View
                    style={stylesGroupExpensesScreen.containerSettlementButton}>
                    <TouchableOpacity
                      onPress={() => {
                        confirmAndSettleDebt(
                          settlement.payer.id.toString(),
                          settlement.receiver.id.toString(),
                          settlement.amount,
                        );
                      }}>
                      <Text
                        style={
                          stylesGroupExpensesScreen.styleSettlementButtonText
                        }>
                        Mark as Paid
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="Expenses" />
    </SafeAreaView>
  );
};

export default GroupDebtsScreen;
