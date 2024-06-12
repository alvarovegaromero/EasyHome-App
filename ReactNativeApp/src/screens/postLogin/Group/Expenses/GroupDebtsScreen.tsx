import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useGroupDebtsController from './hooks/useGroupDebtsController';
import generalStyles from '../../../../styles/styles';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';
import stylesGroupExpensesScreen from '../../../../styles/stylesGroupExpensesScreen';
import {Icon} from '@rneui/themed';
import Header from '../../../../utils/Header/Header';

const GroupDebtsScreen: React.FunctionComponent = () => {
  const {userId, settlements, confirmAndSettleDebt} = useGroupDebtsController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <Header secctionText="Group's Debts" />
        <View style={generalStyles.defaultContainerScreen}>
          <View>
            <View
              style={stylesGroupExpensesScreen.containerSettlementAndButton}>
              <View style={stylesGroupExpensesScreen.containerSettlementText}>
                <Text
                  style={stylesGroupExpensesScreen.styleTitleTextSettlement}>
                  Settlements
                </Text>
              </View>
              <View style={stylesGroupExpensesScreen.containerSettlementButton}>
                <Text style={stylesGroupExpensesScreen.styleTitleTextPay}>
                  Paid
                </Text>
              </View>
            </View>
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
                      {`${settlement.payer.username}`}
                      {` owes ${settlement.receiver.username}`}
                      {` ${settlement.amount}€`}
                    </Text>
                  </View>

                  {settlement.receiver.id.toString() === userId && (
                    <View
                      style={
                        stylesGroupExpensesScreen.containerSettlementButton
                      }>
                      <Icon
                        name="check-circle-outline"
                        type="material-community"
                        color="#2196F3"
                        accessibilityLabel="Pay debt"
                        onPress={() => {
                          confirmAndSettleDebt(
                            settlement.payer.id.toString(),
                            settlement.receiver.id.toString(),
                            settlement.amount,
                          );
                        }}
                        size={40}
                      />
                    </View>
                  )}
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
